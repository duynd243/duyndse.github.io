function showNavMobile() {
    document.getElementsByClassName("nav-overlay")[0].style.display = "block";

    document.getElementsByClassName("nav-mobile")[0].style.transform = "translateX(0%)";
}


function hideNavMobile() {
    document.getElementsByClassName("nav-overlay")[0].style.display = "none";

    document.getElementsByClassName("nav-mobile")[0].style.transform = "translateX(100%)";
}