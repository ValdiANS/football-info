
class TeamItem extends HTMLElement {
    connectedCallback(){
        this.render();
        console.log('<team-card-item> : constructed');
        this.responsiveEvent();
    }

    set compTeamData(jsonData){
        this.teamData = jsonData;
    }

    render(){
        let imgThumbnails;

        switch (this.teamData.area.name) {    
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
                imgThumbnails = this.teamData.emblemUrl;
        }


        const link = `/team-list.html?name=team_list&id=${this.teamData.id}#team-list-detail`;
        
        this.innerHTML = `
            <div class="col s11 m9" style="float: none; margin: 0 auto 20px auto;">
                <div class="card horizontal hoverable">
                    <div class="card-image">
                        <a href="${link}" class="waves-effect waves-light"><img src="${imgThumbnails}" style="max-height: 501px; width: 100%; object-fit: fill;"></a>
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            <h4>${this.teamData.name}</h4>
                            <span class="card-title" style="font-weight: 400;">${this.teamData.area.name}</span>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, ipsam velit fuga omnis tempora animi temporibus aut recusandae sapiente soluta, ad necessitatibus magnam facilis reprehenderit quis officia. Facilis saepe, aperiam voluptatibus reiciendis quo placeat laudantium nihil laboriosam pariatur quis explicabo non eligendi ratione eos laborum vero repudiandae voluptatem quisquam tempore.</p>
                        </div>
                        
                        <div class="card-action">
                            <a href="${link}">See This Competitions Team List <i class="fas fa-chevron-right button-icons"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    responsiveEvent(){
        const cardElement = this.querySelector('.card');

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
    }

}

customElements.define('team-card-item', TeamItem);