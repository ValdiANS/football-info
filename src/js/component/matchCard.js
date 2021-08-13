
class MatchCard extends HTMLElement {

    connectedCallback(){
        this.render();
        console.log('<match-card>: constructed');
    }

    set match(data){
        this.matchData = data;
    }

    render(){

        let isHomeWin, isAwayWin, homeScore, awayScore, isScheduled;

        if(this.matchData.score.winner === 'HOME_TEAM' || this.matchData.score.fullTime.homeTeam > this.matchData.score.fullTime.awayTeam){
            isHomeWin = 'Win';
            isAwayWin = 'Lose';
            isScheduled = '';
        } else if(this.matchData.score.winner === 'AWAY_TEAM' || this.matchData.score.fullTime.homeTeam < this.matchData.score.fullTime.awayTeam){
            isHomeWin = 'Lose';
            isAwayWin = 'Win';
            isScheduled = '';
        } else if(this.matchData.score.winner === 'DRAW' || this.matchData.score.fullTime.homeTeam === this.matchData.score.fullTime.awayTeam && this.matchData.score.fullTime.homeTeam !== null){
            isHomeWin = 'Draw';
            isAwayWin = 'Draw';
            isScheduled = '';
        } else {
            isHomeWin = '';
            isAwayWin = '';
            isScheduled = 'Scheduled';
        }

        if(this.matchData.score.fullTime.homeTeam === null || this.matchData.score.fullTime.awayTeam === null){
            homeScore = '-';
            awayScore = '-';
        } else {
            homeScore = this.matchData.score.fullTime.homeTeam;
            awayScore = this.matchData.score.fullTime.awayTeam;
        }

        this.innerHTML = `
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-content">
                        
                        <div class="match-data-container">

                            <div class="scheduled">
                                <h6>${isScheduled}</h6>
                            </div>
                            
                            <div class="score-container">

                                <div class="homeTeam">
                                    <div>
                                        <h5>${this.matchData.homeTeam.name}</h5>
                                    </div>
                                    <div>
                                        <h2>${homeScore}</h2>
                                    </div>
                                    <div>
                                        <h4>${isHomeWin}</h4>
                                    </div>
                                </div>

                                <div class="vs-dash">
                                    <div>
                                        <h1>-</h1>
                                    </div>
                                </div>

                                <div class="awayTeam">
                                    <div>
                                        <h5>${this.matchData.awayTeam.name}</h5>
                                    </div>
                                    <div>
                                        <h2>${awayScore}</h2>
                                    </div>
                                    <div>
                                        <h4>${isAwayWin}</h4>
                                    </div>
                                </div>

                            </div>

                            <div class="date">
                                <h6>${this.matchData.utcDate.substr(0,10)}</h6>
                            </div>

                        </div>

                    </div>
                    
                </div>
            </div>
        `;
    }
}

customElements.define('match-card', MatchCard);