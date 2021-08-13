
const bodyContent = document.querySelector('.body-content');
const navUlList = document.querySelectorAll('nav ul li');
const navLinkList = document.querySelectorAll('nav li a.navLink');
const dropdownContent = document.querySelectorAll('.dropdown-content li.dropdown-content-list');
const teamsNav = document.querySelector('nav ul li.team');
const navbarBrand = document.querySelectorAll('nav .brand-logo');

const sidenavUlList = document.querySelectorAll('ul.sidenav li');
const teamsSidenav = document.querySelector('ul.collapsible li.team');
const sidenavCollapsibleContent = document.querySelectorAll('.collapsible-body ul li')

 // fetching content
 function fetchPageContent(page){
    if(page === 'competitions-detail'){
        return;
    } else if (page === 'team-list-detail'){
        return;
    } else if (page === 'standings-detail'){
        return;
    } else if (page === '!'){
        return;
    } else if(page === "") {
        return;
    }

    return fetch(`/src/pages/${page}.html`)
        .then(resp => {
            return resp.text();
        })
        .then(contentText => {
            bodyContent.innerHTML = contentText;
        
        })
        .catch(err => {
            console.error(`Error Message: ${err}`);
        });
}

// add class active to nav list
function addActiveClass(page){
    navUlList.forEach(navList => {
        navList.classList.remove('active');

        if(navList.classList.contains(page)){
            navList.classList.add('active');
        }
    });

    dropdownContent.forEach(dropNav => {
        dropNav.classList.remove('active');

        if(dropNav.classList.contains(page)){
            teamsNav.classList.add('active');
            dropNav.classList.add('active');
        }
    });

    sidenavUlList.forEach(sideNav => {
        sideNav.classList.remove('active');

        if(sideNav.classList.contains(page)){
            sideNav.classList.add('active');
            teamsSidenav.classList.remove('active-nav');
        }
    });

    sidenavCollapsibleContent.forEach(sideDropdown => {
        sideDropdown.classList.remove('active');

        if(sideDropdown.classList.contains(page)){
            teamsSidenav.classList.add('active-nav');
            sideDropdown.classList.add('active');
        }
    })
};


// fetch content after click navbar
function fetchContentAfterClickNav(){
    navUlList.forEach(navList => {
        navList.addEventListener('click', event => {
            const navHref = navList.getAttribute('data-a-href');
            if(navHref === null) {
                return;
            }
            fetchPageContent(navHref);
            addActiveClass(navHref);
        });
    });
    
    dropdownContent.forEach(dropNav => {
        dropNav.addEventListener('click', event => {
            const navHref = dropNav.getAttribute('data-a-href');
            
            fetchPageContent(navHref);
            addActiveClass(navHref);
        });
    });

    sidenavUlList.forEach(sideNav => {
        sideNav.addEventListener('click', event => {
            const navHref = sideNav.getAttribute('data-a-href');
            if(navHref === null) {
                return;
            }

            fetchPageContent(navHref);
            addActiveClass(navHref);
        });
    });

    sidenavCollapsibleContent.forEach(sideDropdown => {
        sideDropdown.addEventListener('click', event => {
            const navHref = sideDropdown.getAttribute('data-a-href');
            
            fetchPageContent(navHref);
            addActiveClass(navHref);
        });
    });
}


document.addEventListener('DOMContentLoaded', _ => {
    
    // Init Sidenav
    const sidenavElm = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavElm);

    // Init Dropdown navbar
    const dropdownElm = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropdownElm, {hover: false, coverTrigger: false, constrainWidth: false});
    
    const collapsibleSidenavElm = document.querySelector('.collapsible');
    M.Collapsible.init(collapsibleSidenavElm);

    // Get Home page content
    let pageUrl = window.location.hash.substr(1);
    if(pageUrl === ''){
        pageUrl = 'home';
    }
    fetchPageContent(pageUrl);
    addActiveClass(pageUrl);
    
    fetchContentAfterClickNav();

});

export {fetchPageContent, addActiveClass};