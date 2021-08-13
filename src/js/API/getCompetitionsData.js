import '../component/competitionsCardList.js';

const baseUrl = "https://api.football-data.org/v2/";
const compContent = document.querySelector('.competitions-content');
const currentUrl = window.location.href;
const spinner = document.getElementById("spinner");

function fetchAPI(url){
    return fetch(url, {
        headers: {
            "X-Auth-Token": "97d629c1cc4940cfbe74613c85c25ce1"
        }
    })
}

function fetchCompetitionsData(endpoint){

    return new Promise((resolve, reject) => {
    
        if('caches' in window) {
            caches
                .match(`${baseUrl}competitions/${endpoint}`)
                .then(resp => {
                    console.log('response dari fetchCompetitionsData cache: ', resp);

                    if(resp){
                        resolve(resp.json());
                        return;
                    }
                })
                .catch(err => {
                    reject(err);
                })
        }
        
        fetchAPI(`${baseUrl}competitions/${endpoint}`)
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


function fetchCompetitionsMatch(id){  
    return fetchCompetitionsData(`${id}/matches`)
}

if(currentUrl.includes('competitions-detail.html')){
    
    const urlParams = new URLSearchParams(window.location.search);
    const idParams = urlParams.get('id')
    spinner.removeAttribute('hidden');
    fetchCompetitionsMatch(idParams)
        .then(compData => {

            // Competitions Name (h1)
            const competitionsName = document.createElement('h1');
            competitionsName.setAttribute('style','text-align: center; ');
            competitionsName.innerText = compData.competition.name;
            compContent.appendChild(competitionsName);

            // Competitions Match Container (.match-container)
            const matchContainer = document.createElement('div');
            matchContainer.setAttribute('class', 'card-parent row');
            compContent.appendChild(matchContainer);

            // Match Card
            compData.matches.reverse().forEach(matchData => {
                const matchCard = document.createElement('match-card');
                matchCard.match = matchData;
                matchContainer.appendChild(matchCard);
            });

            spinner.setAttribute('hidden', '');
        })
        .catch(err => {
            console.log('Error .catch fetchCompetitionsMatch : ', err);
            if(err == "TypeError: Failed to fetch" ){
                compContent.innerHTML = `
                    <div class="alert-box deep-orange white-text">
                        <h2>Check your internet connection</h2>
                    </div>
                `;
                console.error('(getCompetitionsData catch) Error: ', err);
            } else {
                compContent.innerHTML = `
                    <div class="alert-box deep-orange white-text">
                        <h2>${err}</h2>
                    </div>
                `;
                console.error('(getCompetitionsData catch) Error: ', err);
            }
            spinner.setAttribute('hidden', '');
        })
}

export {fetchCompetitionsData, fetchAPI};