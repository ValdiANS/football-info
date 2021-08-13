import {fetchCompetitionsData} from './getCompetitionsData.js';

const baseUrl = "https://api.football-data.org/v2/";
const urlParams = new URLSearchParams(window.location.search);
const nameParams = urlParams.get('name');
const favTeamParams = urlParams.get('fav_team');
const idParams = urlParams.get('id');
const teamListContent = document.querySelector('.team-list-content');
const spinner = document.getElementById("spinner");

function fetchTeamData(id){
    
    return new Promise((resolve, reject) => {
        
        if('caches' in window){
            caches
                .match(`${baseUrl}competitions/${id}/teams`)
                .then(resp => {
                    console.log('response dari fetchTeamData cache: ', resp);
                    
                    if(resp){
                        resolve(resp.json());
                    }
                })
                .catch(err => {
                    reject(err);
                })
        }

        fetchCompetitionsData(`${id}/teams`)
            .then(jsonData => {
                resolve(jsonData);
            })
            .catch(err => {
                reject(err);
            })
    })
}

if(nameParams === 'team_list'){
    spinner.removeAttribute('hidden');
    fetchTeamData(idParams)
        .then(data => {
            
            // Competitions Name (h1)
            const competitionsName = document.createElement('h1');
            competitionsName.setAttribute('style','text-align: center;');
            competitionsName.innerText = data.competition.name;
            teamListContent.appendChild(competitionsName);

            // Team Container (.team-container)
            const teamContainer = document.createElement('div');
            teamContainer.setAttribute('class', 'card-parent row');
            teamListContent.appendChild(teamContainer);

            // Team Card
            data.teams.forEach(teamData => {
                const teamCard = document.createElement('team-card');
                teamCard.team = teamData;
                teamCard.competitionsId = idParams;
                teamCard.totalTeam = data.count;
                teamContainer.appendChild(teamCard);
            })

            spinner.setAttribute('hidden', '');
        })
        .catch(err => {
            if(err == "TypeError: Failed to fetch" ){
                teamListContent.innerHTML = `
                    <div class="alert-box deep-orange white-text">
                        <h2>Check your internet connection</h2>
                    </div>
                `;
                console.error('getTeamData Error:', err);
            } else {
                teamListContent.innerHTML = `
                    <div class="alert-box deep-orange white-text">
                        <h2>${err}</h2> 
                    </div>
                `;
                console.error('getTeamData Error:', err);
            }
            
            spinner.setAttribute('hidden', '');            
        })
}
