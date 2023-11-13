---
template: templates/single-column.html
---

<style>
    @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(https://wso2.cachefly.net/wso2/sites/all/fonts/docs/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
    }

    .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    }
</style>

<div class="homePage">
    <div class="section01">
        <div class="leftContent">
            <h2>Robust, Lightweight, Powerful Integration  </h2>
            <p>
                WSO2 Micro Integrator is a comprehensive integration solution that simplifies your digital transformation journey. 
            </p>
            <p>
                The Micro Integrator streamlines connectivity among applications, services, data, and cloud using a user-friendly low-code graphical designing experience. 
            </p>
            <p>Deployment options include both microservices and ESB style for better flexibility.</p>
            </br>
        </div>
    </div>
    </br>
    </br>
    <div class="section02">
        <h3>Quick Start Guide</h3>
        <div class="linkWrapper">
            <div class="linkSet2" onclick="location.href='{{base_path}}/get-started/quick-start-guide';">
                <img src="{{base_path}}/assets/img/home/landing-page/write-your-first-integration-service.svg" title="Integration Service" width="75" alt="Integration Service"/>
                <h4>Write your first Integration Service</h4>
                <p>
                    Let's get started with WSO2 Micro Integrator by running a simple integration use case in your local environment.
                </p>
        </div>
    </div>
    <div class="section03">
        <div class="linkSet2" onclick="location.href='{{base_path}}/get-started/introduction';">
            <h3>Overview</h3>
            <p>
                Introduces WSO2 Micro Integrator and quickly describes what it can do.
            </p>
            <a href='{{base_path}}/get-started/introduction'><h4>Read a Short Overview</h4></a>
        </div>
        <div class="linkSet2 middle" onclick="location.href='{{base_path}}/get-started/key-concepts';">
            <h3>Concepts</h3>
            <p>
                The key concepts of WSO2 Micro Integrator give you a brief introduction to the terminology.
            </p>
            <a href='{{base_path}}/get-started/key-concepts'><h4>Understand the Concepts</h4></a>
        </div>
        <!--
        <div class="linkSet2 last" onclick="location.href='{{base_path}}/get-started/introduction';">
            <h3>Architecture</h3>
            <p>
                The WSO2 Micro Integrator consists of an integration runtime, a graphical integration designing tool, and a dashboard, along with multiple developer-friendly tools to help you work with the various components.
            </p>
            <a href='{{base_path}}/get-started/introduction'><h4>View Architecture</h4></a>
        </div>
        --> 
    </div>
    <div class="section04">
        <h3>What can WSO2 Micro Integrator do?</h3>
        <div class="linkWrapper">
            <div class="linkSet2" onclick="location.href='{{base_path}}/learn/integration-use-case/message-routing-overview';">
                <img src="{{base_path}}/assets/img/home/landing-page/integrate-with-services-via-connectors.svg" width="25%" alt="Create REST API from an OpenAPI Definition">
                <h4>Routing and Transformation</h4>
                <p>
                    Supports content-based routing, header-based routing, and policy-based routing. Transforms the message to different formats.
                </p>
            </div>
            <div class="linkSet2 middle" onclick="location.href='{{base_path}}/learn/integration-use-case/service-orchestration-overview';">
                <img src="{{base_path}}/assets/img/home/landing-page/graphql-support.svg" width="25%" alt="Engage Access Control to the API">
                <h4>Service Orchestration</h4>
                <p>
                    Has the ability to present multiple fine-grained services using a single coarse-grained service.
                </p>
            </div>
            <div class="linkSet2 last" onclick="location.href='{{base_path}}/learn/integration-use-case/asynchronous-message-overview';">
                <img src="{{base_path}}/assets/img/home/landing-page/guaranteed-message-delivery.svg" width="25%" alt="Implementing an API">
                <h4>Asynchronous Messaging</h4>
                <p>
                    Messages can be queued and do not require an immediate response to continue processing.
                </p>
            </div>
        </div>
        <div class="linkWrapper">
            <div class="linkSet2" onclick="location.href='{{base_path}}/learn/integration-use-case/connectors';">
                <img src="{{base_path}}/assets/img/home/landing-page/create-rest-api-from-an-openapi-definition.svg" width="25%" alt="Create REST API from an OpenAPI Definition">
                <h4>SaaS Integration</h4>
                <p>
                    Connectors are available across various categories such as payments, CRM, ERP, social networks, and legacy systems.
                </p>
            </div>
            <div class="linkSet2 middle" onclick="location.href='{{base_path}}/get-started/introduction';">
                <img src="{{base_path}}/assets/img/home/landing-page/design-and-implement-apis.svg" width="25%" alt="Engage Access Control to the API">
                <h4>Microservices Integration</h4>
                <p>
                    Lightweight runtime for container-based deployments. Native integration with container-management platforms.
                </p>
            </div>
            <div class="linkSet2 last" onclick="location.href='{{base_path}}/learn/integration-use-case/data-integration-overview';">
                <img src="{{base_path}}/assets/img/home/landing-page/integrating-with-data-sources.svg" width="25%" alt="Implementing an API">
                <h4>Data Integration</h4>
                <p>
                    Decouples the data from the datasource layer and exposes them as data services.
                </p>
            </div>
        </div>
        <div class="linkWrapper">
            <div class="linkSet2" onclick="location.href='{{base_path}}/learn/integration-use-case/file-processing-overview';">
                <img src="{{base_path}}/assets/img/home/landing-page/write-your-first-integration-service.svg" width="25%" alt="Create REST API from an OpenAPI Definition">
                <h4>File Integration</h4>
                <p>
                    Supports processing of files with large amounts of data.
                </p>
            </div>
            <div class="linkSet2 middle" onclick="location.href='https://wso2docs.atlassian.net/wiki/spaces/EIP/overview';">
                <img src="{{base_path}}/assets/img/home/landing-page/implementing-an-api.svg" width="25%" alt="Engage Access Control to the API">
                <h4>Enterprise Integration Patterns</h4>
                <p>
                    Support for all enterprise integration patterns (EIPs) and common enterprise messaging scenarios.
                </p>
            </div>
            <div class="linkSet2 last" onclick="location.href='{{base_path}}/learn/integration-use-case/scheduled-task-overview';">
                <img src="{{base_path}}/assets/img/home/landing-page/realtime-data-with-websocket-api.svg" width="25%" alt="Implementing an API">
                <h4>Periodic Execution of Integration Processes</h4>
                <p>
                    Execute an integration process at a specified time.
                </p>
            </div>
        </div>
    </div>
</div>