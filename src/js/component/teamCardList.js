import {fetchCompetitionsData} from '../API/getCompetitionsData.js';

class TeamList extends HTMLElement {
    connectedCallback(){
        console.log('<team-card-list> : constructed');
        this.render();
    }

    render(){
        this.innerHTML = `            
            <div class="team-card-list row">

            </div>
        `;

        this.appendData();
    }

    appendData(){
        const teamList = document.querySelector('.team-card-list');
        const competitionsEndpoint = [2001, 2003, 2021, 2014, 2015];
        
        competitionsEndpoint.forEach(compEndpoint => {
            fetchCompetitionsData(compEndpoint)
                .then(compData => {
                    const teamCardItem = document.createElement('team-card-item');
                    teamCardItem.compTeamData = compData;
                    teamList.appendChild(teamCardItem);
                })
                .catch(err => {
                    if(err == "TypeError: Failed to fetch" ){
                        teamList.innerHTML = `
                            <div class="alert-box deep-orange white-text">
                                <h2>Check your internet connection</h2>
                            </div>
                        `;
    
                    } else {
                        teamList.innerHTML = `
                            <div class="alert-box deep-orange white-text">
                                <h2>${err}</h2>
                            </div>
                        `;
                        console.log(err)
                    }
                })
                
        });
    }
}

customElements.define('team-card-list', TeamList);