import {deleteFavTeam, deleteFavTeamSquad} from '../script/teamDb.js'

class FavTeamCard extends HTMLElement {
    connectedCallback(){
        console.log('<fav-team-card> : constructed');
        this.render();
    }

    set team(jsonData){
        this.teamData = jsonData;
    }

    set totalTeam(num){
        this.total = num;
    }

    render(){
        const dataTeam = this.teamData;
        const name = this.teamData.name;
        const id = this.teamData.id;

        let crestUrl;
        if(this.teamData.crestUrl === '' || this.teamData.crestUrl === null){
            crestUrl = './img/club-thumbnail-crestUrl.png';
        } else {
            crestUrl = this.teamData.crestUrl;
        }
        
        this.innerHTML = `
            <div class="col s12 m4 l3">
                <div class="card">
                    <div class="card-image">
                        <a href="${this.teamData.website}"><img src="${crestUrl}"></a>
                        <a class="btn-floating btn-large halfway-fab waves-effect waves-light blue ligthen-1 scale-transition removeFromFav"><i class="material-icons">close</i></a>
                    </div>

                    <div class="card-content">
                        <span class="card-title">${name}</span>
                    </div>

                    <div class="card-action">
                        <a href="/team-list.html?name=team_squad&id=${id}&fav_team=true#team-list-detail" class="btn blue ligthen-1 waves-effect waves-light z-depth-1 squadList">Squad List</a>
                    </div>

                </div>
            </div>
        `;

        this.querySelector('.removeFromFav').addEventListener('click', function(event){
            deleteFavTeam(id);
            deleteFavTeamSquad(parseInt(id));
            setTimeout(_ => {
                location.reload();
            }, 100)
            
        })
    }

}

customElements.define('fav-team-card', FavTeamCard);