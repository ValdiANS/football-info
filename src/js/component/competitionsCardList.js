import {fetchCompetitionsData} from '../API/getCompetitionsData.js'

class CompCardList extends HTMLElement {

    connectedCallback(){
        this.render();
        console.log('<competitions-card-list>: constructed');
    }

    render(){
        this.innerHTML = `           
            <div class="competitions-card-list row">

            </div>
        `;
        this.appendData();
    }

    appendData(){
        const comCardListElm = document.querySelector('.competitions-card-list');
        const competitionsEndpoint = [2001, 2003, 2021, 2014, 2015];

        competitionsEndpoint.forEach(compEndpoint => {
            fetchCompetitionsData(compEndpoint)
                .then(compData => {
                    const comCardItem = document.createElement('competitions-card-item');
                    comCardItem.competitionsData = compData;
                    comCardListElm.appendChild(comCardItem);
                })
                .catch(err => {
                    if(err == "TypeError: Failed to fetch" ){
                        comCardListElm.innerHTML = `
                            <div class="alert-box deep-orange white-text">
                                <h2>Check your internet connection</h2>
                            </div>
                        `;
    
                    } else {
                        comCardListElm.innerHTML = `
                            <div class="alert-box deep-orange white-text">
                                <h2>${err}</h2>
                            </div>
                        `;
                        console.log(err)
                    }
                })
        })
    }
}

customElements.define('competitions-card-list', CompCardList);

