import {fetchAPI} from './getCompetitionsData';

const baseUrl = "https://api.football-data.org/v2/competitions";
const urlParams = new URLSearchParams(window.location.search);
const nameParams = urlParams.get('name');
const idParams = urlParams.get('id');
const standingsContent = document.querySelector('.standings-content');
const spinner = document.getElementById("spinner");

function fetchStandingsData(id){

    return new Promise((resolve, reject) => {

        if('caches' in window){
            caches
                .match(`${baseUrl}/${id}/standings`)
                .then(resp => {
                    console.log('response dari fetchStandingsData cache: ', resp);

                    if(resp){
                        resolve(resp.json());
                    }
                })
                .catch(err => {
                    reject(err);
                })
        }
    
        fetchAPI(`${baseUrl}/${id}/standings`)
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

if(nameParams === 'standings'){
    spinner.removeAttribute('hidden');
    fetchStandingsData(idParams)
        .then(standingsJson => {
        
            // Competitions Name
            const compName = document.createElement('h1');
            compName.setAttribute('style', 'text-align: center;');
            compName.innerText = standingsJson.competition.name;
            standingsContent.appendChild(compName);
            
            // Standings Table
            for(let i = 0; i < standingsJson.standings.length; i++){
                const standingsTable = document.createElement('standings-table');
                standingsTable.standingGroup = standingsJson.standings[i];
                standingsContent.appendChild(standingsTable);
            }

            spinner.setAttribute('hidden', '');
        })
        .catch(err => {
            if(err == "TypeError: Failed to fetch" ){
                standingsContent.innerHTML = `
                    <div class="alert-box deep-orange white-text">
                        <h2>Check your internet connection</h2>
                    </div>
                `;
                console.error('(getCompetitionsData catch) Error: ', err);
            } else {
                standingsContent.innerHTML = `
                    <div class="alert-box deep-orange white-text">
                        <h2>${err}</h2>
                    </div>
                `;
                console.error('(getCompetitionsData catch) Error: ', err);
            }
            
            spinner.setAttribute('hidden', '');
        })
}
