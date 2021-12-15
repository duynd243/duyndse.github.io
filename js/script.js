function showNavMobile() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    document.getElementsByClassName("nav-overlay")[0].style.display = "block", document.getElementsByClassName("nav-mobile")[0].style.transform = "translateX(0%)";
    for (var c = document.querySelectorAll(".nav-mobile ul li, .social-btn > a"), a = 0; a < c.length; a++) c[a].style.transform = "translate(0%, 0%) scale(1)"
}

function hideNavMobile() {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
    document.getElementsByClassName("nav-overlay")[0].style.display = "none", document.getElementsByClassName("nav-mobile")[0].style.transform = "translateX(100%)";
    for (var c = document.querySelectorAll(".nav-mobile ul li, .social-btn > a"), a = 0; a < c.length; a++) c[a].style.transform = "translate(50%, 100%) scale(0)"
}

function scrollToSection(e) {
    const a = $(".about-me:eq(0)"),
        b = $(".projects:eq(0)");
    var c;
    "aboutme" === e ? c = 0 : "projects" == e && (c = b.offset().top), hideNavMobile(), $([document.documentElement, document.body]).animate({
        scrollTop: c - 65
    }, 700)
}