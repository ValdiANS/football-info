
const bodyContent = document.querySelector('.body-content');
const navItemList = document.querySelectorAll('nav .navbar-collapse ul li.navItem');
const navLinkList = document.querySelectorAll('nav .navbar-collapse ul li a.navLink');
const dropdownItem = document.querySelectorAll('nav .navbar-collapse ul li .dropdown .dropdown-menu a');
const teamsNav = document.querySelector('nav .navbar-collapse ul li .dropdown span');
const navbarBrand = document.querySelectorAll('nav .navbar-brand');


 // fetching content
 function fetchPageContent(page){
    if(page === 'competitions-detail'){
        return;
    } else if (page === 'team-list-detail'){
        return;
    } else if (page === 'standings-detail'){
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

const removeNavActiveClass = _ => {
    navItemList.forEach(navItem => {
        navItem.classList.remove('active');
    });
};

const removeTeamsDropdownActiveClass = _ => {
    teamsNav.classList.remove('active');
    dropdownItem.forEach(dropItem => {
        dropItem.classList.remove('active');
    });
}


// Add and remove active class from .nav-item element
const addAndRemoveActiveClassFromNavItem = navItemList.forEach(navItem => {
    navItem.addEventListener('click', function(ev){
        removeNavActiveClass();
        navItem.classList.add('active');
        teamsNav.classList.remove('active');
        dropdownItem.forEach(dropItem => {
            dropItem.classList.remove('active');
        });
    });
});



document.addEventListener('DOMContentLoaded', _ => {
    
    addAndRemoveActiveClassFromNavItem;

    // Add and remove active class from .dropdown-item element
    dropdownItem.forEach(dropItem => {
        dropItem.addEventListener('click', function(ev) {        
            dropdownItem.forEach(dropItem => {
                dropItem.classList.remove('active');
            });
            removeNavActiveClass();
            dropItem.classList.add('active');
            teamsNav.classList.add('active');
        })
    });

    // Fetching from navItemHref
    navItemList.forEach(navItem => {
        navItem.addEventListener('click', event => {
            const navItemHref = event.target.hash.substr(1);

            fetchPageContent(navItemHref);
        });
    });

    // Fetching from .dropdown-item
    dropdownItem.forEach(dropItem => {
        dropItem.addEventListener('click', event => {
            const dropItemHref = event.target.hash.substr(1);

            fetchPageContent(dropItemHref);
        });
    });

    // Fetching from .navbar-brand
    navbarBrand.forEach(navBrand => {
        navBrand.addEventListener('click', _ => {
            fetchPageContent('home');
        });
    });

    // Get Home page content 
    let pageUrl = window.location.hash.substr(1);
    if(pageUrl === ''){
        pageUrl = 'home';
    } else {
        navItemList.forEach(navItem => {
            if(navItem.classList.contains(pageUrl)){
                removeNavActiveClass();
                teamsNav.classList.remove('active');
                dropdownItem.forEach(dropItem => {
                    dropItem.classList.remove('active');
                });
                navItem.classList.add('active');
            } else if(pageUrl === "team_list" || pageUrl === 'fav_team') {
                removeNavActiveClass();
                teamsNav.classList.add('active');
                dropdownItem.forEach(dropItem => {
                    dropItem.classList.remove('active')
                    if(dropItem.getAttribute('href').substr(1) === pageUrl){
                        dropItem.classList.add('active');
                    }
                });

            }
        });
    }
    
    fetchPageContent(pageUrl); 

    const currentUrl = window.location.href;

    if(currentUrl.includes('competitions')){
        const compNav = document.querySelector('.competitions');
        const navListItem = document.querySelectorAll('.nav-item');

        navListItem.forEach(navItem => {
            navItem.classList.remove('active')
        })
        compNav.classList.add('active');

        // fetchPageContent('competitions')
    }

    if(currentUrl.includes('team') && (currentUrl.includes('team_list') || currentUrl.includes('team_squad'))){
        const navListItem = document.querySelectorAll('.nav-item');
        const teamListNav = dropdownItem[0];
        const favTeamNav = dropdownItem[1];

        navListItem.forEach(navItem => {
            navItem.classList.remove('active')
        })
        teamsNav.classList.add('active');
        teamListNav.classList.add('active')
        favTeamNav.classList.remove('active');
    }

    if(currentUrl.includes('team') && currentUrl.includes('fav_team')){
        const navListItem = document.querySelectorAll('.nav-item');
        const teamListNav = dropdownItem[0];
        const favTeamNav = dropdownItem[1];

        navListItem.forEach(navItem => {
            navItem.classList.remove('active')
        })
        teamsNav.classList.add('active');
        teamListNav.classList.remove('active')
        favTeamNav.classList.add('active');
    }

    if(currentUrl.includes('standings.html')){
        const standingsNav = document.querySelector('.standings');
        const navListItem = document.querySelectorAll('.nav-item');
        
        navListItem.forEach(navItem => {
            navItem.classList.remove('active');
        })

        dropdownItem.forEach(dropItem => {
            dropItem.classList.remove('active');
        })

        teamsNav.classList.remove('active');
        standingsNav.classList.add('active');
    }

});

export {fetchPageContent, navItemList};