{% set tiles = [
    [{
        "title": "Get Started",
        "icon": "🚀",
        "links": [
            {"name": "Introduction", "url": "get-started/introduction/"},
            {"name": "Key Concepts", "url": "get-started/key-concepts/"},
            {"name": "Quick Start Guide", "url": "get-started/quick-start-guide/"},
            {"name": '"How To" Guides', "url": "get-started/how-to-guides/"}
        ]
    },
    {
        "title": "Community & Support",
        "icon": "❓",
        "links": [
            {"name": "GitHub", "url": "https://github.com/wso2/product-micro-integrator/issues"},
            {"name": "Discord", "url": "https://discord.com/invite/wso2"},
            {"name": "Enterprise Support", "url": "https://wso2.com/subscription/"}
        ]
    }],
    [{
        "title": "Mediators & Connectors",
        "icon": "🔗",
        "links": [
            {"name": "Mediators", "url": "reference/mediators/about-mediators/"},
            {"name": "Connectors", "url": "reference/connectors/connectors-overview/"},
            {"name": "Extensions", "url": "develop/customizations/creating-custom-mediators/"}
        ]
    },
    {
        "title": "Tutorials",
        "icon": "📚",
        "links": [
            {"name": "Routing and Transformation", "url": "learn/integration-use-case/message-routing-overview/"},
            {"name": "Service Orchestration", "url": "learn/integration-use-case/service-orchestration-overview/"},
            {"name": "Asynchronous Messaging", "url": "learn/integration-use-case/asynchronous-message-overview/"},
            {"name": "File Processing", "url": "learn/integration-use-case/file-processing-overview/"},
            {"name": "Enterprise Integration Patterns", "url": "learn/enterprise-integration-patterns/eip-overview/"}
        ],
        "more_btn": {"name": "View all", "url": "learn/learn-overview/"}
    }
    ],
    [{
        "title": "References",
        "icon": "🔧",
        "links": [
            {"name": "Product Configurations", "url": "reference/config-catalog-mi/"},
            {"name": "Synapse Configurations", "url": "reference/mediators/property-reference/generic-properties/"}
        ]
    },
    {
        "title": "What's New",
        "icon": "📢",
        "links": [
            {"name": "Enhanced VS Code User Interface", "url": "develop/mi-for-vscode/mi-for-vscode-overview/"},
            {"name": "Simplified Expressions", "url": "reference/synapse-properties/synapse-expressions/#tooling-support"},
            {"name": "Mediator Tryout", "url": "develop/mediator-tryout/#mediator-tryout-feature"}
        ],
        "more_btn": {"name": "View all", "url": "get-started/about-this-release/#whats-new-in-this-release"}
    }]
] %}

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
            {% for column in tiles %}
            <div class="tiles-column">
                {% for tile in column %}
                <div class="tile">
                    <div class="tile-header">
                        <h3>{{ tile.title }}</h3>
                        <span class="tile-icon">{{ tile.icon }}</span>
                    </div>
                    <ul class="links-list">
                        {% for link in tile.links %}
                        <li>
                            {% if tile.title == "Community & Support" %}
                                <a href="{{ link.url }}" target="_blank" class="link">{{ link.name }}</a>
                            {% else %}
                                <a href="{{ base_path }}/{{ link.url }}" class="link">{{ link.name }}</a>
                            {% endif %}
                        </li>
                        {% endfor %}
                    </ul>
                    {% if tile.more_btn %}
                    <div class="button-container">
                        <a href="{{base_path}}/{{ tile.more_btn.url }}" class="view-all-button">{{ tile.more_btn.name }}</a>
                    </div>
                    {% endif %}
                </div>
                {% endfor %}
            </div>
            {% endfor %}
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
    justify-content: center;
    /* background: linear-gradient(100deg, #fff9ee, #ffffff); */
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
.description-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    margin-left: 100px;
}
.tiles-container {
    display: flex;
    align-items: start;
}
.tile {
    display: inline-block;
    vertical-align: top;
    background-color: rgba(255, 255, 255, 0.6); 
    padding: 20px;
    border-radius: 10px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    position: relative;
    border: 1px solid rgb(215, 215, 215);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 0 25px 25px;
}
.tile:hover {
    transform: scale(1.01);
}
.tile-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(215, 215, 215);
}
.tile h3 {
    font-size: 0.9rem;
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
    color: rgb(255, 112, 67) !important;
    text-decoration: none;
}
.link:before {
    content: '→';
    font-weight: bold;
    margin-right: 5px;
}
.button-container {
    text-align: right;
}
.view-all-button {
    display: inline-block;
    background-color: none;
    color: rgb(80, 80, 80) !important;
    text-decoration: none;
    border-radius: 5px;
}
.view-all-button:hover {
    color: rgb(255, 112, 67) !important;
}
</style>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".link").forEach(function(link) {
      link.addEventListener("click", function(event) {
        gtag('event', 'link_click', {
          'event_category': 'engagement',
          'event_label': event.target.textContent,
          'link_url': event.target.href
        });
      });
    });
  });
</script>
{% endraw %}
