import {fetchCompetitionsData} from '../API/getCompetitionsData.js'

class StandingsCompList extends HTMLElement {
    connectedCallback(){
        console.log('<standings-competitions-list> : constructed');
        this.render();
    }

    render(){
        this.innerHTML = `
            <div class="standings-competitions-list row">

            </div>
        `;

        this.appendData();
    }

    appendData(){
        const standingsCompList = document.querySelector('.standings-competitions-list');
        const competitionsEndpoint = [2001, 2003, 2021, 2014, 2015];

        competitionsEndpoint.forEach(endpoint => {
            fetchCompetitionsData(endpoint)
                .then(data => {
                    let imgThumbnails;

                    switch (data.area.name) {    
                        case 'Netherlands':
                            imgThumbnails = './img/country-flag/netherlands-flag-medium.png';
                            break;
            
                        case 'England':
                            imgThumbnails = './img/country-flag/united-kingdom-flag-medium.png';
                            break;
            
                        case 'Spain':
                            imgThumbnails = './img/country-flag/spain-flag-medium.png';
                            break;
            
                        case 'France':
                            imgThumbnails = './img/country-flag/france-flag-medium.png';
                            break;

                        case 'Europe':
                            imgThumbnails = './img/country-flag/UEFA_Champions_League_logo.svg';
                            break;
            
                        default:
                            imgThumbnails = data.emblemUrl;
                    }
                    const link = `/standings.html?name=standings&id=${data.id}#standings-detail`;

                    const standingsCompItem = document.createElement('div');
                    standingsCompItem.setAttribute('class', 'col s11 m9');
                    standingsCompItem.setAttribute('style', 'float: none; margin: 0 auto 20px auto;');
                    
                    standingsCompItem.innerHTML = `
                        <div class="card horizontal hoverable standingsCompCard">
                            <div class="card-image">
                                <a href="${link}" class="waves-effect waves-light"><img src="${imgThumbnails}" style="max-height: 501px; width: 100%; object-fit: fill;"></a>
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                    <h4>${data.name}</h4>
                                    <span class="card-title" style="font-weight: 400;">${data.area.name}</span>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, ipsam velit fuga omnis tempora animi temporibus aut recusandae sapiente soluta, ad necessitatibus magnam facilis reprehenderit quis officia. Facilis saepe, aperiam voluptatibus reiciendis quo placeat laudantium nihil laboriosam pariatur quis explicabo non eligendi ratione eos laborum vero repudiandae voluptatem quisquam tempore.</p>
                                </div>
                                
                                <div class="card-action">
                                    <a href="${link}">See This Competitions <i class="fas fa-chevron-right button-icons"></i></a>
                                </div>
                            </div>
                        </div>
                    `;

                    const cardElement = standingsCompItem.querySelector('.standingsCompCard');

                    if(screen.width <= 768) {
                        cardElement.classList.remove('horizontal');
                    }

                    window.addEventListener('resize', event => {
                        if(window.outerWidth <= 768){
                            cardElement.classList.remove('horizontal');
                        } else {
                            cardElement.classList.add('horizontal');
                        }
                    });
                    

                    standingsCompList.appendChild(standingsCompItem);
                    
                })
                .catch(err => {
                    if(err == "TypeError: Failed to fetch"){
                        standingsCompList.innerHTML = `
                            <div class="alert-box deep-orange white-text">
                                <h2>Check your internet connection</h2>
                            </div>
                        `;
                    } else {
                        standingsCompList.innerHTML = `
                            <div class="alert-box deep-orange white-text">
                                <h2>${err}</h2>
                            </div>
                        `;
                    }
                })
        })
        
    }

}

customElements.define('standings-competitions-list', StandingsCompList);