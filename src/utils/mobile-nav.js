const mobileNav = () => {
    const headerBtn = document.querySelector('.header__bars');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link')
    // State
    let isMobileNavOPen = false;

    headerBtn.addEventListener('click', () => {
        isMobileNavOPen = !isMobileNavOPen;
        if (isMobileNavOPen) {
            mobileNav.style.display = 'flex';
            document.body.style.overflowY = 'hidden'
        } else {
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto'
        }
    });

    mobileLinks.forEach( Link => {
        Link.addEventListener('click', () => {
            isMobileNavOPen = false;
            mobileNav.style.display = 'none'
            document.body.style.overflowY = 'auto'
        })
    })
    
};

export default mobileNav;