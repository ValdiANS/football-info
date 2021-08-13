import {getAllFavTeam} from '../script/teamDb.js';

class FavTeamList extends HTMLElement {
    connectedCallback(){
        console.log('<fav-team-list> : constructed');
        this.render();
    }

    render(){
        this.innerHTML = `            
            <div class="fav-team-list row">

            </div>
        `;

        this.appendData();
    }

    appendData(){
        const teamList = document.querySelector('.fav-team-list');
        
        getAllFavTeam()
            .then(teamData => {

                if(teamData.length === 0){
                    const header = document.createElement('h2');
                    header.setAttribute('class', 'noFavTeam amber white-text');
                    header.innerText = 'There is no favorite team';
                    teamList.appendChild(header);
                } else {
                    teamData.forEach(team => {
                        const favTeamCard = document.createElement('fav-team-card');
                        favTeamCard.team = team;
                        favTeamCard.totalTeam = teamData.length;
                        teamList.appendChild(favTeamCard);
                    })
                }
                
            })
    }

}

customElements.define('fav-team-list', FavTeamList);