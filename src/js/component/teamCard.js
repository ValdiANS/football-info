import {saveFavTeam, getAllFavTeam, getTeam, saveFavTeamSquad, getTeamSquad} from '../script/teamDb.js'
import {fetchTeamSquadData} from '../API/getPlayerData.js';
import { toast } from 'materialize-css';

class TeamCard extends HTMLElement {
    connectedCallback(){
        console.log('<team-card> : constructed');
        this.render();
    }

    set team(jsonData){
        this.teamData = jsonData;
    }

    set competitionsId(id){
        this.compId = id;
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
            crestUrl.replace(/^http:\/\//i, 'https://');
        }
        
        this.innerHTML = `
            <div class="col s12 m4 l3">
                <div class="card">
                    <div class="card-image">
                        <a href="${this.teamData.website}"><img src="${crestUrl}"></a>
                        <a class="btn-floating btn-large halfway-fab waves-effect waves-light blue ligthen-1 scale-transition addToFav"><i class="material-icons">add</i></a>
                    </div>

                    <div class="card-content">
                        <span class="card-title">${name}</span>
                    </div>

                    <div class="card-action">
                        <a href="/team-list.html?name=team_squad&id=${id}&comp_id=${this.compId}#team-list-detail" class="btn blue ligthen-1 waves-effect waves-light z-depth-1 squadList">Squad List</a>
                    </div>

                </div>
            </div>
        `;

        const addToFav = this.querySelector('.addToFav');

        getAllFavTeam()
            .then(function(teamData) {
                for(let i = 0; i < teamData.length; i++){

                    if(name === teamData[i].name){
                        addToFav.innerHTML = '<i class="material-icons">check</i>';
                        break;
                    } else {
                        addToFav.innerHTML = '<i class="material-icons">add</i>';
                    }
                }
            })

        addToFav.addEventListener('click', function(event){

            // Check if key already exist
            getTeam(id)
                .then(function(obj){

                    if(obj !== undefined){
                        alert('Already Added');
                        return;
                    } else {
                        const toastHTML = '<span class"blue darken-1">Added</span>';
                        M.toast({html: toastHTML, classes: 'rounded'});
                    }
                })

            saveFavTeam(dataTeam, name);

            const squadDbObj = {};
            squadDbObj.team_id = id;
            squadDbObj.name = name;
            fetchTeamSquadData(id)
                .then(data => {
                    squadDbObj.squad = data.squad;
                    saveFavTeamSquad(squadDbObj)
                })
            
            addToFav.classList.add('scale-out');
            setTimeout(_ => {
                addToFav.classList.remove('scale-out');
                event.target.innerHTML = '<i class="material-icons">check</i>';
            }, 200);
        })
    }
}

customElements.define('team-card', TeamCard);