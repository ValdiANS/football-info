
class NavBar extends HTMLElement {

    connectedCallback(){
        this.render();
        console.log('<nav-bar> : connected');
    }

    render(){
        this.innerHTML = `
            <ul id="dropdownContent" class="dropdown-content">
                <li class="dropdown-content-list team_list" data-a-href="team_list"><a href="/#team_list">Team List</a></li>
                <li class="divider"></li>
                <li class="dropdown-content-list fav_team" data-a-href="fav_team"><a href="/#fav_team">Favorite Team</a></li>
            </ul>

            <div class="navbar-fixed">
                <nav class="blue lighten-1">
                    <div class="nav-wrapper container">
                        <a href="/" class="brand-logo">Football App</a>
                        <a href="#!" data-target="mobile-nav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                        
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            <li class="home" data-a-href="home"><a class="waves-effect navLink" href="/#home">Home</a></li>
                            <li class="competitions" data-a-href="competitions"><a class="waves-effect navLink" href="/#competitions">Competitions</a></li>
                            <li class="team"><a class="waves-effect navLink dropdown-trigger" href="#!" data-target="dropdownContent">Team<i class="material-icons right">arrow_drop_down</i></a></li>
                            <li class="standings" data-a-href="standings"><a class="waves-effect navLink" href="/#standings">Standings</a></li>
                        </ul>
                    </div>
                </nav>
            </div>

            <ul class="sidenav" id="mobile-nav">
                <li class="home" data-a-href="home"><a class="waves-effect navLink" href="/#home">Home</a></li>
                <li class="competitions" data-a-href="competitions"><a class="waves-effect navLink" href="/#competitions">Competitions</a></li>

                <li>
                    <ul class="collapsible">
                        <li class='team'>
                            <a class="collapsible-header waves-effect team">Team<i class="material-icons right">arrow_drop_down</i></a>
                            <div class="collapsible-body">
                                <ul>
                                    <li class="team_list" data-a-href="team_list"><a href="/#team_list">Team List</a></li>
                                    <li class="fav_team" data-a-href="fav_team"><a href="/#fav_team">Favorite Team</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>

                <li class="standings" data-a-href="standings"><a class="waves-effect navLink" href="/#standings">Standings</a></li>
            </ul>
     
        `;

    }

}

customElements.define('nav-bar', NavBar);

