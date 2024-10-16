<div class="homePage">
    <div class="section01">
        <div class="leftContent">
            <div class="about-home">
                <div>
                    WSO2 Micro Integrator is a comprehensive integration solution that simplifies your digital transformation journey. The Micro Integrator streamlines connectivity among applications, services, data, and the cloud using a user-friendly, low-code graphical design experience. Deployment options include both microservices and ESB styles for greater flexibility.
                </div>
                <div>
                    <a href="https://wso2.com/micro-integrator/" class="banner-link"></a>
                </div>
            </div>
        </div>
    </div>
    <div class="section02">
        <div class="linkWrapper">
            <div class="linkSet2" onclick="location.href='{{base_path}}/get-started/quick-start-guide';">
                <a href="get-started/quick-start-guide"><h3>Quick Start Guide</h3></a>
                <p>
                    Let's get started with WSO2 Micro Integrator by running a simple integration use case in your local environment.
                </p>
            </div>
        </div>
    </div>
    <div class="section03">
        <h3>What can WSO2 Micro Integrator do?</h3>
        <div class="linkWrapper">
            <div class="linkSet3" onclick="location.href='{{base_path}}/learn/integration-use-case/message-routing-overview';">
                <a href="learn/integration-use-case/message-routing-overview"><h3>Routing and Transformation</h3></a>
                <p>
                    Supports content-based routing, header-based routing, and policy-based routing. Transforms the message to different formats.
                </p>
            </div>
            <div class="linkSet3 middle" onclick="location.href='{{base_path}}learn/integration-use-case/service-orchestration-overview';">
                <a href="learn/integration-use-case/service-orchestration-overview"><h3>Service Orchestration</h3></a>
                <p>
                    Has the ability to present multiple fine-grained services using a single coarse-grained service.
                </p>
            </div>
            <div class="linkSet3 last" onclick="location.href='{{base_path}}/learn/integration-use-case/asynchronous-message-overview';">
                <a href="learn/integration-use-case/asynchronous-message-overview"><h3>Asynchronous Messaging</h3></a>
                <p>
                    Messages can be queued and do not require an immediate response to continue processing.
                </p>
            </div>
        </div>
    </div>
<div class="section04">
        <div class="linkWrapper">
            <div class="linkSet4" onclick="location.href='{{base_path}}/learn/integration-use-case/connectors';">
                <a href="learn/integration-use-case/connectors"><h3>SaaS Integration</h3></a>
                <p>
                    Connectors are available across various categories such as payments, CRM, ERP, social networks, and legacy systems.
                </p>
            </div>
            <div class="linkSet4 middle" onclick="location.href='{{base_path}}/get-started/introduction';">
                <a href="get-started/introduction"><h3>Microservices Integration</h3></a>
                <p>
                    Lightweight runtime for container-based deployments. Native integration with container-management platforms.
                </p>
            </div>
            <div class="linkSet4 last" onclick="location.href='{{base_path}}/{{base_path}}/learn/integration-use-case/data-integration-overview';">
                <a href="learn/integration-use-case/data-integration-overview"><h3>Data Integration</h3></a>
                <p>
                    Decouples the data from the datasource layer and exposes them as data services.
                </p>
            </div>
        </div>
    </div>
<div class="section05">
        <div class="linkWrapper">
            <div class="linkSet5" onclick="location.href='{{base_path}}/learn/integration-use-case/file-processing-overview';">
                <a href="learn/integration-use-case/file-processing-overview"><h3>File Integration</h3></a>
                <p>
                    Supports processing of files with large amounts of data.
                </p>
            </div>
            <div class="linkSet5 middle" onclick="location.href='https://mi.docs.wso2.com/en/latest/learn/enterprise-integration-patterns/eip-overview';">
                <a href="https://mi.docs.wso2.com/en/latest/learn/enterprise-integration-patterns/eip-overview"><h3>Enterprise Integration Patterns</h3></a>
                <p>
                    Support for all enterprise integration patterns (EIPs) and common enterprise messaging scenarios.
                </p>
            </div>
            <div class="linkSet5 last" onclick="location.href='{{base_path}}/learn/integration-use-case/scheduled-task-overview';">
                <a href="learn/integration-use-case/scheduled-task-overview"><h3>Periodic Execution of Integration Processes</h3></a>
                <p>
                    Execute an integration process at a specified time.
                </p>
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
</style>
{% endraw %}
