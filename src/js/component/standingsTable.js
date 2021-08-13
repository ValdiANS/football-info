
class StandingsTable extends HTMLElement {
    connectedCallback(){
        console.log('<standings-table> : constructed');
        this.render();
    }

    set standingGroup(standingGroup){
        this.standings = standingGroup;
    }

    render(){
        let group;
        if(this.standings.group === null){
            group = '';
        } else {
            group = `${this.standings.group.split('_').join(' ').toLowerCase()} -`;
        }
        const type = this.standings.type.toLowerCase();

        this.innerHTML = `
                <table>
                    <thead class="blue darken-1 white-text">
                        <tr>
                            <th scope="col" colspan="13" class="standingsGroup">${group} ${type}</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" colspan="4">Team</th>
                            <th scope="col">MP</th>
                            <th scope="col">W</th>
                            <th scope="col">D</th>
                            <th scope="col">L</th>
                            <th scope="col">GF</th>
                            <th scope="col">GA</th>
                            <th scope="col">GD</th>
                            <th scope="col">Pts</th>

                        </tr>
                    </thead>
                    <tbody>
                    
                    </tbody>
                </table>
        `;
        this.appendStandingsData();
    } 

    appendStandingsData(){
        const tbody = document.querySelectorAll('tbody');
        
        this.standings.table.forEach(teamData => {
            const standingsData = document.createElement('tr');
            standingsData.setAttribute('class', 'text-center');
            standingsData.innerHTML = `
                <th scope="row">${teamData.position}</th>
                <td colspan="4"  class="text-left">${teamData.team.name}</td>
                <td>${teamData.playedGames}</td>
                <td>${teamData.won}</td>
                <td>${teamData.draw}</td>
                <td>${teamData.lost}</td>
                <td>${teamData.goalsFor}</td>
                <td>${teamData.goalsAgainst}</td>
                <td>${teamData.goalDifference}</td>
                <td>${teamData.points}</td>
            `;

            for(let i = 0; i < tbody.length; i++){
                tbody[i].appendChild(standingsData);
            }

        });

    }

}

customElements.define('standings-table', StandingsTable);