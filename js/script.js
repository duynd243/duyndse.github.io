function showNavMobile() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    document.getElementsByClassName("nav-overlay")[0].style.display = "block";
    document.getElementsByClassName("nav-mobile")[0].style.transform = "translateX(0%)";
    for (var c = document.querySelectorAll(".nav-mobile ul li, .social-btn > a"), a = 0; a < c.length; a++) c[a].style.transform = "translate(0%, 0%) scale(1)"
}

function hideNavMobile() {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
    document.getElementsByClassName("nav-overlay")[0].style.display = "none";
    document.getElementsByClassName("nav-mobile")[0].style.transform = "translateX(100%)";
    for (var c = document.querySelectorAll(".nav-mobile ul li, .social-btn > a"), a = 0; a < c.length; a++) c[a].style.transform = "translate(50%, 100%) scale(0)"
}

function scrollToSection(section) {
    const aboutme = $(".about-me:eq(0)");
    const projects = $(".projects:eq(0)");
    const skills = $(".skills:eq(0)");
    const contact = $(".contact:eq(0)");
    var target;
    if (section === 'aboutme')
        target = 0;
    else if (section === 'projects')
        target = projects.offset().top;
    else if (section === 'skills')
        target = skills.offset().top;
    else if (section === 'contact')
        target = contact.offset().top;
    hideNavMobile();
    $([document.documentElement, document.body]).animate({
        scrollTop: target - 60
    }, 700)
}
function validateEmail(emailAdress) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
        return true;
    } else {
        return false;
    }
}

let tabsList = document.getElementsByClassName("tab_item");
let skillContentList = document.getElementsByClassName("skills_content");

for (var i = 0; i < tabsList.length; i++) {
    tabsList[i].addEventListener("click", function () {
        if (!this.classList.contains("tab--active")) {
            document.getElementsByClassName("tab--active")[0].classList.remove("tab--active")

            this.classList.add("tab--active");
            var arr = Array.prototype.slice.call(tabsList);
            var tabIndex = arr.indexOf(this);
            for (var z = 0; z < skillContentList.length; z++) {
                skillContentList[z].style.display = "none";
            }
            skillContentList[tabIndex].style.display = "flex";
        }
    })
}

let inputs = document.querySelectorAll("section.contact .contact_form .input");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("focus", function () {
        this.classList.remove("input--error");
        var inputId = this.id;
        if (inputId === "nameInput") {
            document.getElementById("nameError").style.display = "none";
        } else if (inputId === "emailInput") {
            document.getElementById("emailError").style.display = "none";
        } else if (inputId === "messageInput") {
            document.getElementById("messageError").style.display = "none";
        }
    })
}

function showErrorMessage(inputId, errorId, message) {
    document.getElementById(inputId).classList.add("input--error");
    document.getElementById(errorId).style.display = "block";
    document.querySelector(`#${errorId} span`).innerText = message;
}

let contactForm = document.getElementById("contact_form");
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (grecaptcha.getResponse() === '') {
        showToast("error", "Failed", "Recaptcha is required!");
        return;
    }
    const nameTxt = document.getElementById("nameInput").value;
    const emailTxt = document.getElementById("emailInput").value;
    const messageTxt = document.getElementById("messageInput").value;
    var check = 0;
    if (nameTxt.trim() === "") {
        showErrorMessage("nameInput", "nameError", "Please enter your name.");
        check++;
    }
    if (emailTxt.trim() === "") {
        showErrorMessage("emailInput", "emailError", "Please enter your email.");
        check++;
    } else if (!validateEmail(emailTxt.trim())) {
        showErrorMessage("emailInput", "emailError", "Please enter a valid email.");
        check++;
    }
    if (messageTxt.trim() === "") {
        showErrorMessage("messageInput", "messageError", "Please enter your message.");
        check++;
    }
    if (check > 0) {
        return;
    }

    var params = new URLSearchParams(new FormData(contactForm)).toString();
    var requestUrl = 'https://portfolio-sendmail.herokuapp.com/api/send';

    axios(
        {
            method: 'post',
            url: requestUrl,
            data: params,
            header: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
    ).then(function (response) {
        console.log(response.data);
        var recaptcha_status = response.data["recaptcha_status"];
        var sendmail_status = response.data["sendmail_status"];
        var isValidInput = response.data["isValidInput"];
        if (recaptcha_status === "empty" || !recaptcha_status) {
            showToast("error", "Failed", "Error occurred with repcatcha. Please try again!");
        } else if (recaptcha_status) {
            if (!isValidInput) {
                var nameError = response.data["nameError"];
                var emailError = response.data["emailError"];
                var messageError = response.data["messageError"];
                if (nameError === "empty") {
                    showErrorMessage("nameInput", "nameError", "Please enter your name.");
                }
                if (emailError === "empty") {
                    showErrorMessage("emailInput", "emailError", "Please enter your email.");
                } else if (emailError === "invalid") {
                    showErrorMessage("emailInput", "emailError", "Please enter a valid email.");
                }
                if (messageError === "empty") {
                    showErrorMessage("messageInput", "messageError", "Please enter your message.");
                }
            } else {
                if (sendmail_status === 202) {
                    showToast("success", "Success", "If you can't find the email, please check your spam and promotional mailboxes.");
                } else {
                    showToast("error", "Failed", "Error occurred with mail sending. Please try again!");
                }
            }
        }

    }).catch(function (err) {
        console.log(err);
        showToast("error", "Failed", err)
    });
    grecaptcha.reset();
});