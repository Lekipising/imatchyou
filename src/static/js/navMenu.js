const navButton = document.querySelector('.nav-button');
const navMobile = document.querySelector('.nav-mobile');
const body = document.body;

navButton.addEventListener('click', () => {
    if (navButton.classList.contains('nav-button--active')) {
        navButton.classList.remove('nav-button--active');
        navMobile.classList.remove('nav-mobile--active');
        body.classList.remove('no-scroll');
    } else {
        navButton.classList.add('nav-button--active');
        navMobile.classList.add('nav-mobile--active');
        body.classList.add('no-scroll');
    }
});