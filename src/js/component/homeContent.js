import {fetchPageContent, addActiveClass} from '../script/nav.js';

class HomeContent extends HTMLElement {
    
    connectedCallback(){
        console.log('<home-content>: constructed');
        this.render();
        this.homeEvent();
    }

    render(){
        this.innerHTML = `

            <div class="home">
                <div class="bg-home"></div>
                <div class="home-content">
                    <div class="home-header">
                        <div class="header-container">
                            <h1 class="home-h1">Football App</h1>
                            <p>
                                This Football App is created for dicoding submission 3 PWA. if there are similarities with a real website or company, it happens unintentionally. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium explicabo vel officia ex accusantium iste corrupti eos, eaque voluptas blanditiis?
                            </p>
                        </div>
                    </div>

                    <div class="card-list">

                        <div class="row">
                            <div class="col s10 m8 l7 competitions-home-card">
                                <div class="card hoverable">
                                    <div class="card-image">
                                        <a href="#competitions" class="waves-effect waves-light"><img src="./img/competitions-thumbnail.png" alt="competitions-thumbnail"></a>
                                        <span class="card-title">Competitions</span>
                                    </div>

                                    <div class="card-body">
                                        
                                        <p class="card-content">
                                            On this page, you can see many competitions, such as Champions league, Netherland league, England league, etc.
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ex corrupti molestiae. Accusantium neque consequatur fuga necessitatibus nostrum, quis veniam!
                                        </p>

                                        <div class="card-action" style="padding: 0;">
                                            <a href="#competitions" class="btn waves-effect waves-light blue" style="margin: 20px 0 20px 20px">Competitions<i class="fas fa-chevron-right button-icons"></i></a>
                                        </div>
                                    </div>
                                </div>                  
                            </div>

                            <div class="col s10 m8 l7 teams-home-card">
                                <div class="card hoverable">
                                    <div class="card-image">
                                        <a href="#team_list" class="waves-effect waves-light"><img src="./img/teams-thumbnail.jpeg" alt="teams-thumbnail"></a>
                                        <span class="card-title">Teams</span>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-content">
                                            On this page, you can see football teams such as Arsenal, Chelsea, Manchester United, Barcelona, Real madrid, Manchester City, etc.
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ipsam consectetur maxime quibusdam suscipit repellat officiis veniam.
                                        </p>

                                        <div class="card-action" style="padding: 0;">
                                            <a href="#team_list" class="btn waves-effect waves-light blue" style="margin: 20px 0 20px 20px">Teams <i class="fas fa-chevron-right button-icons"></i></a>
                                        </div>
                                    </div>
                                </div>                  
                            </div>

                            <div class="col s10 m8 l7">
                                <div class="card hoverable">
                                    <div class="card-image">
                                        <a href="#standings" class="waves-effect waves-light"><img src="./img/standings-thumbnail.jpg" class="card-img-top" alt="standings-thumbnail"></a>
                                        <span class="card-title">Standings</span>
                                    </div>
                                    <div class="card-body">
                                        <p class="card-content">
                                            On this page, you can see football standings.
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque fuga repellendus a ex porro velit amet nulla ducimus iure pariatur delectus dolorum neque, libero quia cumque molestiae modi unde quos non esse. Dolorem, eaque delectus.
                                        </p>

                                        <div class="card-action" style="padding: 0;">
                                            <a href="#standings" class="btn waves-effect waves-light blue" style="margin: 20px 0 20px 20px">Standings <i class="fas fa-chevron-right button-icons"></i></a>
                                        </div>
                                    </div>
                                </div>                  
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

        `;
    }

    homeEvent(){
        const imgBtn = document.querySelectorAll('.card-image a');
        const cardBtn = document.querySelectorAll('.card-action a');

        cardBtn.forEach(btn => {
            btn.addEventListener('click', event => {
                const btnHref = btn.getAttribute('href').substr(1);

                fetchPageContent(btnHref);
                addActiveClass(btnHref);
            })
        });

        imgBtn.forEach(btn => {
            btn.addEventListener('click', event => {
                const btnHref = btn.getAttribute('href').substr(1);

                fetchPageContent(btnHref);
                addActiveClass(btnHref);
            })
        });
    }

}

customElements.define('home-content', HomeContent);