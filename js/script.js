function showNavMobile() {
    document.getElementsByClassName("nav-overlay")[0].style.display = "block";
    document.getElementsByClassName("nav-mobile")[0].style.transform = "translateX(0%)";

}


function hideNavMobile() {
    document.getElementsByClassName("nav-overlay")[0].style.display = "none";
    document.getElementsByClassName("nav-mobile")[0].style.transform = "translateX(100%)";
}

// function scrollToSection(section) {
//     const aboutme = document.getElementsByClassName('about-me')[0];

//     hideNavMobile();
//     if (section === 'aboutme') {
//         aboutme.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
//     }
// }

function scrollToSection(section) {
    const aboutme = $(".about-me:eq(0)");
    const projects = $(".projects:eq(0)");
    var target;
    if (section === 'aboutme')
        target = 0;
    else if (section === 'projects')
        target = projects.offset().top;


    hideNavMobile();

    $([document.documentElement, document.body]).animate({
        scrollTop: target - 65
    }, 800, 'swing');
}