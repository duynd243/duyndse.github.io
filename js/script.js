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
    var target;
    if (section === 'aboutme')
        target = 0;
    else if (section === 'projects')
        target = projects.offset().top;
    else if (section === 'skills')
        target = skills.offset().top;
    hideNavMobile();
    $([document.documentElement, document.body]).animate({
        scrollTop: target - 65
    }, 700)
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
            skillContentList[tabIndex].style.display = "block";
        }
    })
}