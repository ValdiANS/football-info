
class SquadTable extends HTMLElement {
    connectedCallback(){
        console.log('<squad-table> : constructed');
        this.render();
    }

    set playerData(playerJsonData){
        this.player = playerJsonData;
    }

    render(){
        this.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Position</th>
                            <th scope="col">Nationality</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
        `;
        this.appendPlayerData();
    }

    appendPlayerData(){
        const tableBody = document.querySelector('tbody');
        this.player.squad.forEach((player, index) => {
            const tableRow = document.createElement('tr');
            let playerPosition;

            if(player.position === null){
                playerPosition = player.role.split('_').join(' ');
            } else {
                playerPosition = player.position;
            }

            tableRow.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${player.name}</td>
                <td class="text-lowercase">${playerPosition}</td>
                <td>${player.nationality}</td>
            `;
            tableBody.appendChild(tableRow);
        })
    }
}

customElements.define('squad-table', SquadTable);