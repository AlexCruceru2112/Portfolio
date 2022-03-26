let contentArea = document.getElementById("content");
let searchBTN = document.getElementById("searchBTN");
//
let inputText = document.getElementById("inputText");
let inputBt = document.getElementById("inputBattleTag");
//
let inputServer = document.querySelectorAll(".input-server-btn");

let currentRegion;
inputServer.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    inputServer.forEach((f) => f.classList.remove("active"));
    e.target.classList.toggle("active");
    currentRegion = e.target.value;
  });
});
///////////////////////////
function getProfileData() {
  //fetch data

  let apiDATA = {
    url: "https://ow-api.com/v1/stats/pc/",
    region: currentRegion,
    name: inputText.value,
    tag: inputBt.value.replaceAll("#", "-"),
    type: "complete",
  };

  const apiURL = `${apiDATA.url}${apiDATA.region}/${apiDATA.name}${apiDATA.tag}/${apiDATA.type}`;

  fetch(apiURL)
    .then((data) => data.json())

    .then((ow) => generateHTML(ow))
    .catch((error) => {
      const errorHTML = `
                  <div class="content-header">
                  <div class="content-error-text">
                  Something went wrong, make sure:
                  <ul>
                  <li>Username was typed correctly,</li>
                  <li>You've added "#" before battletag (no space in between),</li>
                  <li>Server was correctly selected [US, EU, ASIA]</li>
                  
                  
                  </ul>
                  </div>
                  </div>
                  `;
      contentArea.innerHTML = errorHTML;
    });
  console.log(apiURL);
  const generateHTML = (data) => {
    let levelTotal = data.prestige * 100 + data.level;

    if (!data.private && data.competitiveStats.topHeroes === null) {
      fetchErrorHtml();
    }

    //profile is public and ranked
    if (!data.private && !data.ratings == 0) {
      fetchPublicRankedHtml();
    } //profile is public but unranked
    else if (!data.private) {
      fetchPublicUnrankedHtml();
    } //profile is private
    else if (data.private) {
      fetchPrivateHtml();
    }

    function fetchPublicRankedHtml() {
      const publicRankedHTML = `
            <div class="content-header">
                  <div class="content-header-title">${inputText.value}</div>
                  <div class="content-header-battletag">${inputBt.value}</div>
                  <div class="content-header-data">
              
                        <img src="${data.icon}" class="content-header-avatar"/>
                                  <div class="content-header-info">
              
                                  <div class="content-header-level">
                                            LEVEL <span>${levelTotal}</span>
                                  </div>
                                  <div class="content-header-gamesWon">
                                            GAMES WON <span>${data.gamesWon}</span>
                                  </div>
                        </div>  
                  </div>
                </div>
              
                <div class="content-main">
                  <div class="content-main-title">COMPETITIVE</div>
                  <div class="content-main-subtitle">CURRENT RANK</div>
              
                  <div class="content-main-ranks">
                    <div class="content-main-rank">
                      <img src="${data.ratings[0].roleIcon}" class="rank-icon"/>
                      <div class="rank-name">TANK</div>
                      <div class="rank-score">${data.ratings[0].level} <span>sr</span></div>
                    </div>
                    <div class="content-main-rank">
                    <img src="${data.ratings[1].roleIcon}" class="rank-icon"/>
                      <div class="rank-name">DAMAGE</div>
                      <div class="rank-score">${data.ratings[1].level} <span>sr</span></div>
                    </div>
                    <div class="content-main-rank">
                    <img src="${data.ratings[2].roleIcon}" class="rank-icon"/>
                      <div class="rank-name">SUPPORT</div>
                      <div class="rank-score">${data.ratings[2].level} <span>sr</span></div>
                    </div>
                  </div>
                </div>
                            `;
      contentArea.innerHTML = publicRankedHTML;
    }
    function fetchPublicUnrankedHtml() {
      const publicUnrankedHTML = `
                                          <div class="content-header">
                                          <div class="content-header-title">${inputText.value}</div>
                                          <div class="content-header-battletag">${inputBt.value}</div>
                                          <div class="content-header-data">
                                      
                                                <img src="${data.icon}" class="content-header-avatar"/>
                                                          <div class="content-header-info">
                                      
                                                          <div class="content-header-level">
                                                                    LEVEL <span>${levelTotal}</span>
                                                          </div>
                                                          <div class="content-header-gamesWon">
                                                                    GAMES WON <span>${data.gamesWon}</span>
                                                          </div>
                                                </div>  
                                          </div>
                                        </div>
                                      
                                        <div class="content-main">
                                          <div class="content-main-title">COMPETITIVE</div>
                                          <div class="content-main-subtitle">CURRENT RANK</div>   
                                          <div class="content-main-ranks">
                                            <div class="content-main-rank">
                                              <div class="rank-score">UNRANKED</div>
                                            </div>
                                          </div>
                                        </div>
                                                    `;
      contentArea.innerHTML = publicUnrankedHTML;
    }
    function fetchPrivateHtml() {
      const privateHTML = `
        <div class="content-header">
        <div class="content-header-title">${inputText.value}</div>
        <div class="content-header-battletag">
          ${inputBt.value}
        </div>
        <div class="content-header-data">
          <div class="content-header-avatar">?</div>
          <div class="content-header-info">
            <div class="content-header-level">
              LEVEL <span>UNKNOWN</span>
            </div>
            <div class="content-header-gamesWon">
              GAMES WON <span>HIDDEN</span>
            </div>
          </div>
        </div>
        </div>
        
        <div class="content-main">
        <div class="main-title-private">PRIVATE PROFILE</div>
        <div class="main-subtitle-private">
          MAKE SURE YOUR SEARCHED PROFILE IS SET ON PUBLIC
        </div>
        </div>
                          `;
      contentArea.innerHTML = privateHTML;
    }
    function fetchErrorHtml() {
      const errorHTML = `
                  <div class="content-header">
                  <div class="content-error-text">
                  Something went wrong, make sure:
                  <ul>
                  <li>Username was typed correctly,</li>
                  <li>You've added "#" before battletag (no space in between),</li>
                  <li>Server was correctly selected [US, EU, ASIA]</li>
                  
                  
                  </ul>
                  </div>
                  </div>
                  `;
      contentArea.innerHTML = errorHTML;
    }
  };
}

function pageLoad() {
  contentArea.innerHTML = `
          <div class="content-header-loading">
          <div class="content-loading"></div>
          </div>
  `;
  getProfileData();
}
////////////////////////////////////////
// submit forms, ENTER || CLICK "Search"
searchBTN.addEventListener("click", () => {
  pageLoad();
});
window.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    pageLoad();
  }
});
