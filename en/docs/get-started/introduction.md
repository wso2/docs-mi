# Introduction

WSO2 API Manager 4.2.0 is shipped with an integration runtime (Micro Integrator) with comprehensive enterprise integration capabilities. Therefore, you can now use WSO2 API Manager to develop complex integration services and expose them as managed APIs in an API marketplace. This allows you to enable API-led connectivity across your business using a single platform.

## Get Started with Integration

Let's get started with the integration capabilities and concepts of the Micro Integrator of WSO2 API Manager.

<div>
    <div class="content">
        <!-- card -->
        <div class="card img" onclick="location.href='{{base_path}}/get-started/quick-start-guide/integration-qsg';">
            <div class="line"></div>
            <div class="card-icon">
                <img src='{{base_path}}/assets/img/integrate/quick-start.png' alt="integration quick start" />
            </div>
            <div class="card-content" >
                <p class="title">Quick Start with Integration</p>
                <p class="hint">Try out a simple message mediation using the Micro Integrator.</p>
            </div>
        </div>
        <!-- end card -->
        <!-- card -->
        <div class="card img" onclick="location.href='{{base_path}}/integrate/develop/integration-development-kickstart';">
            <div class="line"></div>
            <div class="card-icon">
                <img src='{{base_path}}/assets/img/integrate/first-service.png' alt="develop first integration" />
            </div>
            <div class="card-content">
                <p class="title">Develop your First Integration</p>
                <p class="hint">Build a simple integration scenario using WSO2 Integration Studio.</p>
            </div>
        </div>
        <!-- end card -->
        <!-- card -->
        <div class="card img" onclick="location.href='{{base_path}}/integrate/integration-key-concepts';">
            <div class="line"></div>
            <div class="card-icon">
                <img src='{{base_path}}/assets/img/integrate/key-concepts.png' alt="integration key concepts" />
            </div>
            <div class="card-content">
                <p class="title">Key Concepts of Integration</p>
                <p class="hint">Explore the key concepts used by the Micro Integrator.</p>
            </div>
        </div>
        <!-- end card -->
    </div>
</div>

## Integration Strategy

You can now leverage the integration capabilities as well as the API management capabilities of the product to implement any of the following integration strategies.

### API-led Integration

WSO2 API Manager consists of an API management layer as well as an integration layer, which enables API-led integration through a single platform. The integration layer (Micro Integrator) is used for running the integration APIs, which are developed using WSO2 Integration Studio. The API management layer is used for converting the integration APIs into experience APIs and making them discoverable to developers. 

See <a href="{{base_path}}/integrate/api-led-integration">API-led Integration</a> for more information.

### Microservices Integration

The Micro Integrator is lightweight and container friendly. This allows you to leverage the comprehensive enterprise messaging capabilities of the Micro Integrator in your decentralized, cloud-native integrations.

<img src="{{base_path}}/assets/img/integrate/intro/mi-microservices-architecture.png" width="700">

If your organization is running on a decentralized, cloud-native, integration architecture where microservices are used for integrating the various APIs, events, and systems, the Micro Integrator can easily function as your Integration microservices and API microservices.

### Centralized Integration (Enterprise Service Bus)

At the heart of the Micro Integrator server is an event-driven, standards-based messaging engine (the Bus). This ESB supports message routing, message transformations, and other types of messaging use cases. If your organization uses an API-driven, centralized, integration architecture, the Micro Integrator can be used as the central integration layer that implements the message mediation logic connecting all the systems, data, events, APIs, etc. in your integration ecosystem.

<img src="{{base_path}}/assets/img/integrate/intro/mi-esb-architecture.png" width="700">
