import {getTeamSquad} from '../script/teamDb.js';
import {fetchAPI} from './getCompetitionsData';

const baseUrl = "https://api.football-data.org/v2/teams";
const urlParams = new URLSearchParams(window.location.search);
const nameParams = urlParams.get('name');
const favTeamParams = urlParams.get('fav_team');
const compIdParams = urlParams.get('comp_id');
const idParams = urlParams.get('id');
const teamListContent = document.querySelector('.team-list-content');
const spinner = document.getElementById("spinner");
const teamBackBtn = document.querySelector('.team-list-back-btn')

function fetchTeamSquadData(id){

    return new Promise((resolve, reject) => {

        if('caches' in window){
            caches
                .match(`${baseUrl}/${id}`)
                .then(resp => {
                    console.log('response dari fetchTeamSquadData cache: ', resp);

                    if(resp){
                        resolve(resp.json());
                    }
                })
                .catch(err => {
                    reject(err);
                })
        }
    
        fetchAPI(`${baseUrl}/${id}`)
        .then(resp => {
            if(resp.status !== 200){
                reject(new Error(resp.statusText));
            } else {
                resolve(resp.json());
            }
        })
        .catch(err => {
            reject(err);
        })
    })   
}

if(nameParams === 'team_squad'){
    spinner.removeAttribute('hidden');

        getTeamSquad(parseInt(idParams))
            .then(teamData => {

                if(teamData != undefined || teamData != null) {
                    
                    teamListContent.innerHTML = '';

                    // Nama team (h1)
                    const teamName = document.createElement('h1');
                    teamName.setAttribute('style', 'text-align: center;');
                    teamName.innerText = teamData.name;
                    teamListContent.appendChild(teamName);

                    // Squad Table
                    const squadTable = document.createElement('squad-table');
                    squadTable.playerData = teamData;
                    teamListContent.appendChild(squadTable);

                    spinner.setAttribute('hidden', '');
                    return;
                }
                
            })
            .catch(err => {
                teamListContent.innerHTML = `
                        <div class="alert-box  deep-orange white-text">
                            <h2>${err}</h2>
                        </div>
                    `;
                console.error('(getCompetitionsData catch) Error: ', err);
                spinner.setAttribute('hidden', '');
                
            })

    fetchTeamSquadData(idParams)
        .then(teamData => {
            
            // Nama team (h1)
            const teamName = document.createElement('h1');
            teamName.setAttribute('style', 'text-align: center;');
            teamName.innerText = teamData.name;
            teamListContent.appendChild(teamName);

            // Squad Table
            const squadTable = document.createElement('squad-table');
            squadTable.playerData = teamData;
            teamListContent.appendChild(squadTable);

            spinner.setAttribute('hidden', '');
        })
        .catch(err => {
            if(err == "TypeError: Failed to fetch" ){
                teamListContent.innerHTML = `
                    <div class="alert-box deep-orange white-text">
                        <h2>Check your internet connection</h2>
                    </div>
                `;
                console.error('(getCompetitionsData catch) Error: ', err);
            } else {
                teamListContent.innerHTML = `
                    <div class="alert-box  deep-orange white-text">
                        <h2>${err}</h2>
                    </div>
                `;
                console.error('(getCompetitionsData catch) Error: ', err);
            }
            
            spinner.setAttribute('hidden', '');
        })
}

if(compIdParams){
    teamBackBtn.setAttribute('href', `/team-list.html?name=team_list&id=${compIdParams}#team-list-detail`)
}

if(favTeamParams){
    teamBackBtn.setAttribute('href', `/#fav_team`)
}

export {fetchTeamSquadData};