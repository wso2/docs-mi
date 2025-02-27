<div class="homePage">
    <div class="description-section">
        <div>
            WSO2 Micro Integrator is a comprehensive integration solution that simplifies your digital transformation journey. The Micro Integrator streamlines connectivity among applications, services, data, and the cloud using a user-friendly, low-code graphical design experience. Deployment options include both microservices and ESB styles for greater flexibility.
        </div>
        <div>
            <a href="https://wso2.com/micro-integrator/" class="banner-link"></a>
        </div>
    </div>
    <div class="section02">
        <div class="tiles-container">
            <div class="tile">
                <div class="tile-header">
                    <h3>Getting Started</h3>
                    <span class="tile-icon">🚀</span>
                </div>
                <ul class="links-list">
                    <li>
                        <a href="/introduction" class="link">Introduction</a>
                    </li>
                    <li>
                        <a href="/introduction" class="link">Key Concepts</a>
                    </li>
                    <li>
                        <a href="/introduction" class="link">Quick Start Guide</a>
                    </li>
                    <li>
                        <a href="/introduction" class="link">"How To" Guides</a>
                    </li>
                </ul>
            </div>
            <div class="tile">
                <div class="tile-header">
                    <h3>Mediators & Connectors</h3>
                    <span class="tile-icon">🔗</span>
                </div>
                <ul class="links-list">
                    <li>
                        <a href="/introduction" class="link">Mediators</a>
                    </li>
                    <li>
                        <a href="/introduction" class="link">Connectors</a>
                    </li>
                    <li>
                        <a href="/introduction" class="link">Extensions</a>
                    </li>
                </ul>
            </div>
            <div class="tile">
                <div class="tile-header">
                    <h3>References</h3>
                    <span class="tile-icon">🔧</span>
                </div>
                <ul class="links-list">
                    <li>
                        <a href="/introduction" class="link">Product Configurations</a>
                    </li>
                    <li>
                        <a href="/introduction" class="link">Synapse Configurations</a>
                    </li>
                </ul>
            </div>
            <div class="tile">
                <div class="tile-header">
                    <h3>Tutorials</h3>
                    <span class="tile-icon">📚</span>
                </div>
                <ul class="links-list">
                    <li>
                        <a href="/introduction" class="link">Routing and Transformation</a>
                    </li>
                    <li>
                        <a href="/introduction" class="link">Service Orchestration</a>
                    </li>
                    <li>
                        <a href="/introduction" class="link">Asynchronous Messaging</a>
                    </li>
                </ul>
            </div>
            <div class="tile">
                <div class="tile-header">
                    <h3>Community & Support</h3>
                    <span class="tile-icon">❓</span>
                </div>
                <ul class="links-list">
                    <li>
                        <a href="/introduction" class="link">Github</a>
                    </li>
                    <li>
                        <a href="/introduction" class="link">Discord</a>
                    </li>
                    <li>
                        <a href="/introduction" class="link">Enterprise Support</a>
                    </li>
                </ul>
            </div>
            <div class="tile">
                <div class="tile-header">
                    <h3>What's New</h3>
                    <span class="tile-icon">📢</span>
                </div>
                <ul class="links-list">
                    <li>
                        <a href="/introduction" class="link">Enhanced VS Code User Interface</a>
                    </li>
                    <li>
                        <a href="/introduction" class="link">Simplified Expressions</a>
                    </li>
                    <li>
                        <a href="/introduction" class="link">New Mediators, Connectors, and UI Enhancements</a>
                    </li>
                </ul>
                <div class="button-container">
                    <a href="features/all.html" class="view-all-button">View All Features</a>
                </div>
            </div>
        </div>
    </div>
</div>
{% raw %}
<style>
.md-sidebar.md-sidebar--primary {
    display: none;
}
.md-sidebar.md-sidebar--secondary{
    display: none;
}
.section02 {
    display: flex;
    justify-content: space-between;
}
header.md-header .md-header__button:not([hidden]) {
    /* display: none; */
}
.about-home {
    display: flex;
}
.about-home div:first-child {
    width: 50%;
    padding-top: 20px;
}
.about-home div:nth-child(2) {
    width: 50%;
}
@media screen and (max-width: 76.1875em) {
    .md-sidebar.md-sidebar--primary {
        display: block;
    }
}
@media screen and (max-width: 945px) {
    .about-home div:first-child {
        width: 100%;
    }
    .about-home div:nth-child(2) {
        width: 100%;
    }
    .about-home {
        flex-direction: column;
    }
    .md-typeset a {
        background-position-x: left;
    }
    .download-btn-wrapper {
        display: block;
        text-align: center;
    }
}
.md-typeset h1{
    visibility: hidden;
    margin-bottom: 0;
}
.md-search-result__article.md-typeset h1{
    visibility: visible;
}
.homePage {
    /* background: linear-gradient(100deg, #fff9ee, #ffffff); */
}
.description-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  margin-left: 100px;
}
.tiles-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 70%;
  margin: 0 auto;
  grid-auto-rows: auto;
}
.tile {
  background-color: rgba(255, 255, 255, 0.6); 
  padding: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  position: relative;
  border: 1px solid rgb(215, 215, 215);
  height: auto; /* Ensures tiles adjust height based on content */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
}
.tile:hover {
  transform: scale(1.03);
}
.tile-header {
  display: flex;
  justify-content: space-between;
}
.tile h3 {
  font-weight: 400;
  margin-top: 0px;
}
.tile-icon {
  margin-left: 30px;
  font-size: 1rem;
}
.links-list li {
  list-style-type: none;
}
.link {
  display: inline-block;
  margin-left: -30px;
  color:rgb(0, 0, 0) !important;
  text-decoration: none;
}
.link:hover {
  color: rgb(252, 92, 8) !important;
  text-decoration: none;
}
.link:before {
  content: '→';
  font-weight: bold;
  margin-right: 5px;
}
.button-container {
    text-align: right;
    margin-top: 10px;
}
</style>
{% endraw %}
