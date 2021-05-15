// Keep navbar sticky
window.onscroll = function() { stickyNav() };

let navbar = document.getElementById('main-header__nav');
let sticky = navbar.offsetTop;

function stickyNav() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}