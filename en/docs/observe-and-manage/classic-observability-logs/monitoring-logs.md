# Monitor Logs

Logging is one of the most important aspects of a production-grade server. A properly configured logging system is vital for identifying errors, security threats, and usage patterns.

By default, the WSO2 Integrator: MI is configured to generate the basic log files that are required for monitoring the server. These log files are stored in the `<MI_HOME>/repository/logs` directory by default. 

## Before you begin

The following topics explain how you can use the default logs that are configured in the WSO2 Integrator: MI. If you have additional logs configured,
you will be able to access those logs as well.

See [Configure Logs]({{base_path}}/observe-and-manage/classic-observability-logs/configuring-log4j2-properties) for details on how to configure logging in WSO2 Integrator: MI.

## Download Log files

You can download log files directly from the [Integration Control Plane]({{base_path}}/observe-and-manage/working-with-integration-control-plane).

!!! info
    - You can also access the log files from the `<MI_HOME>/repository/logs` directory
    - Alternatively, use the MI CLI. Refer to [Download log files]({{base_path}}/observe-and-manage/managing-integrations-with-micli/#download-log-files) for instructions.

1. Sign in to the Integration Control Plane.  
2. Click **Log Files** in the left-hand menu to view the list of available logs.

    <img alt="Download log files" src="{{base_path}}/assets/img/integrate/monitoring-dashboard/log-files-dashboard.png" width="80%">

3. Use the **Search** option to locate a specific log file.  
4. Click the log file to download it.

The default log files used in the WSO2 Integrator: MI are explained below.

## Monitor Carbon logs

The Carbon log file (`wso2carbon.log`) captures all management related logs for the WSO2 Integrator: MI. These logs are also printed to the console, as configured in the `log4j2.properties` file.

Below is a sample log entry printed when starting the WSO2 Integrator: MI with some deployed integration artifacts.

```bash
TID: [2020-09-24 23:00:04,634]  INFO {org.wso2.config.mapper.ConfigParser} - Initializing configurations with deployment configurations {org.wso2.config.mapper.ConfigParser}
[2020-09-24 23:00:09,292]  INFO {org.ops4j.pax.logging.spi.support.EventAdminConfigurationNotifier} - Logging configuration changed. (Event Admin service unavailable - no notification sent).
[2020-09-24 23:00:12,071]  INFO {org.apache.synapse.rest.API} - {api:HelloWorld} Initializing API: HelloWorld
[2020-09-24 23:00:12,075]  INFO {org.apache.synapse.deployers.APIDeployer} - API named 'HelloWorld' has been deployed from file : /Applications/IntegrationStudio.app/Contents/Eclipse/runtime/microesb/tmp/carbonapps/-1234/1600968612042TestCompositeApplication_1.0.0.car/HelloWorld_1.0.0/HelloWorld-1.0.0.xml
[2020-09-24 23:00:12,076]  INFO {org.wso2.micro.integrator.initializer.deployment.application.deployer.CappDeployer} - Successfully Deployed Carbon Application : helloworldCompositeExporter_1.0.0{super-tenant}
[2020-09-24 23:00:12,110]  INFO {org.apache.synapse.transport.passthru.core.PassThroughListeningIOReactorManager} - Pass-through HTTP Listener started on 0.0.0.0:8290
[2020-09-24 23:00:12,113]  INFO {org.apache.synapse.transport.passthru.core.PassThroughListeningIOReactorManager} - Pass-through HTTPS Listener started on 0.0.0.0:8253
[2020-09-24 23:00:12,114]  INFO {org.wso2.micro.integrator.initializer.StartupFinalizer} - WSO2 Integrator: MI started in 7.49 seconds
[2020-09-24 23:00:12,229]  INFO {org.apache.synapse.transport.passthru.core.PassThroughListeningIOReactorManager} - Pass-through EI_INTERNAL_HTTP_INBOUND_ENDPOINT Listener started on 0.0.0.0:9201
[2020-09-24 23:00:12,240]  INFO {org.apache.synapse.transport.passthru.core.PassThroughListeningIOReactorManager} - Pass-through EI_INTERNAL_HTTPS_INBOUND_ENDPOINT Listener started on 0.0.0.0:9164
[2020-09-24 23:00:14,616]  INFO {org.wso2.micro.integrator.management.apis.security.handler.AuthenticationHandlerAdapter} - User admin logged in successfully
```

## Monitor API Logs

The API log file (`wso2-mi-api.log`) captures logs related to all APIs deployed in the WSO2 Integrator: MI. By default, all API related logs are written to this common file.

Below are sample logs generated when the **Healthcare API** and the **UserInfoRESTAPI** are invoked.

If you have configured [individual log files]({{base_path}}/develop/monitoring-api-level-logs/) for specific APIs, you can download the log file corresponding to each API separately.

```bash
[2020-11-10 08:44:15,258]  INFO {API_LOGGER.UserInfoRestAPI} - Initializing API: UserInfoRestAPI
[2020-11-10 08:45:59,419]  INFO {API_LOGGER.UserInfoRestAPI} - MESSAGE = Request received to /users resource.
[2020-11-10 08:50:45,351]  INFO {API_LOGGER.UserInfoRestAPI} - Destroying API: UserInfoRestAPI
[2020-11-10 08:50:45,373]  INFO {API_LOGGER.HealthcareAPI} - Initializing API: HealthcareAPI
[2020-11-10 08:52:35,607]  INFO {API_LOGGER.HealthcareAPI} - Log Property message = "Welcome to HealthcareService"
[2020-11-10 08:57:45,457]  INFO {API_LOGGER.HealthcareAPI} - Destroying API: HealthcareAPI
[2020-11-10 08:57:45,477]  INFO {API_LOGGER.StockQuoteAPI} - Initializing API: StockQuoteAPI
[2020-11-10 08:57:49,400]  INFO {API_LOGGER.StockQuoteAPI} - Destroying API: StockQuoteAPI
```

## Monitor Service Logs

The service log file (`wso2-mi-service.log`) captures logs related to all proxy services deployed in the WSO2 Integrator: MI. By default, all service related logs are written to this common log file.

Below are sample log entries generated when the **hl7testproxy** and **HL7Proxy1** services are invoked.

If you have configured [individual log files]({{base_path}}/develop/monitoring-service-level-logs/) for specific services, you can download the log file corresponding to each service separately.

```bash
[2020-10-14 10:16:15,399]  INFO {SERVICE_LOGGER.hl7testproxy} - Building Axis service for Proxy service : hl7testproxy
[2020-10-14 10:16:15,401]  INFO {SERVICE_LOGGER.hl7testproxy} - Adding service hl7testproxy to the Axis2 configuration
[2020-10-14 10:16:15,401]  INFO {SERVICE_LOGGER.hl7testproxy} - Successfully created the Axis2 service for Proxy service : hl7testproxy
[2020-10-14 10:26:16,335]  INFO {SERVICE_LOGGER.hl7testproxy} - Stopped the proxy service : hl7testproxy
[2020-10-14 10:37:21,790]  INFO {SERVICE_LOGGER.HL7Proxy1} - Building Axis service for Proxy service : HL7Proxy1
[2020-10-14 10:37:21,791]  INFO {SERVICE_LOGGER.HL7Proxy1} - Adding service HL7Proxy1 to the Axis2 configuration
[2020-10-14 10:37:21,791]  INFO {SERVICE_LOGGER.HL7Proxy1} - Successfully created the Axis2 service for Proxy service : HL7Proxy1
```

## Monitor Error Logs

The error log file (`wso2error.log`) captures all error-level logs generated while the WSO2 Integrator: MI is running. These error logs are also printed to the server console by default.

Below is an example of a server error entry recorded in the error log file.

```bash
[2020-10-14 10:26:16,361] ERROR {org.apache.synapse.deployers.ProxyServiceDeployer} - ProxyService named : HL7Proxy already exists
[2020-10-14 10:26:16,363] ERROR {org.apache.synapse.deployers.ProxyServiceDeployer} - ProxyService Deployment from the file : /Applications/IntegrationStudio.app/Contents/Eclipse/runtime/microesb/tmp/carbonapps/-1234/1602651376337TestCompositeApplication_1.0.0.car/HL7Proxy2_1.0.0/HL7Proxy2-1.0.0.xml : Failed. org.apache.synapse.deployers.SynapseArtifactDeploymentException: ProxyService named : HL7Proxy already exists
    at org.apache.synapse.deployers.AbstractSynapseArtifactDeployer.handleSynapseArtifactDeploymentError(AbstractSynapseArtifactDeployer.java:482)
    at org.apache.synapse.deployers.ProxyServiceDeployer.deploySynapseArtifact(ProxyServiceDeployer.java:66)
    at org.apache.synapse.deployers.AbstractSynapseArtifactDeployer.deploy(AbstractSynapseArtifactDeployer.java:204)
    at org.wso2.micro.integrator.initializer.deployment.synapse.deployer.SynapseAppDeployer.deployArtifactType(SynapseAppDeployer.java:1106)
    at org.wso2.micro.integrator.initializer.deployment.synapse.deployer.SynapseAppDeployer.deployArtifacts(SynapseAppDeployer.java:134)
    at org.wso2.micro.integrator.initializer.deployment.application.deployer.CappDeployer.deployCarbonApps(CappDeployer.java:141)
    at org.wso2.micro.integrator.initializer.deployment.application.deployer.CappDeployer.deploy(CappDeployer.java:99)
    at org.apache.axis2.deployment.repository.util.DeploymentFileData.deploy(DeploymentFileData.java:136)
    at org.apache.axis2.deployment.DeploymentEngine.doDeploy(DeploymentEngine.java:807)
    at org.apache.axis2.deployment.repository.util.WSInfoList.update(WSInfoList.java:153)
    at org.apache.axis2.deployment.RepositoryListener.update(RepositoryListener.java:377)
    at org.apache.axis2.deployment.RepositoryListener.checkServices(RepositoryListener.java:254)
    at org.apache.axis2.deployment.RepositoryListener.startListener(RepositoryListener.java:371)
    at org.apache.axis2.deployment.scheduler.SchedulerTask.checkRepository(SchedulerTask.java:59)
    at org.apache.axis2.deployment.scheduler.SchedulerTask.run(SchedulerTask.java:67)
    at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:511)
    at java.util.concurrent.FutureTask.runAndReset(FutureTask.java:308)
    at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.access$301(ScheduledThreadPoolExecutor.java:180)
    at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:294)
    at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
    at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
    at java.lang.Thread.run(Thread.java:748)
```

### Mediator ID in error logs

The `wso2error.log` file automatically includes the **Mediator ID** for mediation-related errors. This identifier helps you quickly pinpoint the exact mediator in your integration flow that caused the error, significantly improving debugging efficiency.

The mediator ID follows a hierarchical format:

`<ArtifactType>:<ArtifactName>/<SequencePath>/<position>.<MediatorType>[<context>]`

Where:

- ArtifactType: The type of integration artifact (e.g., `api`, `proxy`, `sequence`)
- ArtifactName: The name of the artifact (e.g., `petStore`)
- SequencePath: The path to the sequence within the artifact (for APIs: `<method>[<resource>]/<sequence-type>`, for proxies: `<sequence-type>`)
- Position: The hierarchical position of the mediator in the mediation flow
- MediatorType: The type of mediator (e.g., `Log`, `Call`, `PayloadFactory`)
- Context: Additional context information, such as property name if applicable

**Examples:**

- `api:TestAPI/GET[/users/{id}]/in/2.Property[requestType]`
- `proxy:TestProxy/fault/2.Drop`
- `sequence:FilterTestSequence/2.Filter/then/2.Property[status]`
- `template:TestTemplate/1.Log`

Below is an example showing how the mediator ID is included in error logs:

```bash
[2026-02-10 10:08:48,552] ERROR {org.apache.synapse.mediators.base.SequenceMediator} {api:petStore/GET[/pet]/in/2.CallSequence} - {api:petStore} Sequence named Value {name ='null', keyValue ='sample-sequence'} cannot be found
```

!!! tip "Adding Mediator ID to Other Log Files"
    While mediator IDs are automatically included in error logs, you can also add them to other log files (such as `wso2carbon.log`, `wso2-mi-service.log`, or `wso2-mi-api.log`) by updating the log pattern in the `log4j2.properties` file. 
    
    See [Configuring Mediator ID in Log Patterns]({{base_path}}/observe-and-manage/classic-observability-logs/configuring-log4j2-properties/#configuring-mediator-id-in-log-patterns) for instructions.

## Monitor Audit Logs

Audit logs track the sequence of actions performed on the server, providing visibility into operations that affect system behavior or configuration.

See [Monitor MI Audit Logs]({{base_path}}/observe-and-manage/classic-observability-logs/monitoring-mi-audit-logs) for more information.

## Monitor Service/Event Tracing Logs 

The WSO2 Integrator: MI provides a dedicated log file `wso2carbon-trace-messages.log` for tracing service and event flows. These logs help track how messages are processed through the system, which is useful for debugging and auditing purposes.

Below is an example of a trace entry recorded in the trace log file.

```bash
[2025-06-04 14:33:52,240]  INFO {TRACE_LOGGER} - {api:PartAQ1} Start : Enrich mediator
[2025-06-04 14:33:52,240] TRACE {TRACE_LOGGER} - {api:PartAQ1} Message : <?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Body><jsonObject><name>ibm</name><stock>154.25</stock></jsonObject></soapenv:Body></soapenv:Envelope>
[2025-06-04 14:33:52,243]  INFO {TRACE_LOGGER} - {api:PartAQ1} End : Enrich mediator
[2025-06-04 14:33:52,243]  INFO {TRACE_LOGGER} - {api:PartAQ1} Switch mediator : Mediating from ContinuationState
[2025-06-04 14:33:52,243]  INFO {TRACE_LOGGER} - {api:PartAQ1} Sequence <AnonymousListMediator> :: mediate()
[2025-06-04 14:33:52,243]  INFO {TRACE_LOGGER} - {api:PartAQ1} Mediation started from mediator position : 1
[2025-06-04 14:33:52,244]  INFO {TRACE_LOGGER} - {api:PartAQ1} Sequence <SequenceMediator> :: mediate()
[2025-06-04 14:33:52,244]  INFO {TRACE_LOGGER} - {api:PartAQ1} Mediation started from mediator position : 2
[2025-06-04 14:33:52,244]  INFO {TRACE_LOGGER} - {api:PartAQ1} Start : Respond Mediator
[2025-06-04 14:33:52,244] TRACE {TRACE_LOGGER} - {api:PartAQ1} Message : <?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"><soapenv:Body><jsonObject><name>ibm</name><stock>154.25</stock></jsonObject></soapenv:Body></soapenv:Envelope>
[2025-06-04 14:33:52,251]  INFO {TRACE_LOGGER} - {api:PartAQ1} End : Respond Mediator
[2025-06-04 14:42:30,382]  INFO {TRACE_LOGGER} - {api:PartAQ1} Destroying API: PartAQ1
```

## Monitor HTTP Access Logs

HTTP access logs capture request and response details, helping you monitor client activity, request volumes, error patterns, and more which are useful for troubleshooting and analytics.

In the WSO2 Integrator: MI, access logs are generated for the **PassThrough transport**, which handles API and service invocations over ports `8290` (HTTP) and `8253` (HTTPS). By default, all access logs from the PassThrough transport are written to the common access log file: `http_access.log`.

!!! note
    See [HTTP Access Logs]({{base_path}}/observe-and-manage/classic-observability-logs/configuring-log4j2-properties/#http-access-logs) for instructions on how to configure access logging.

```xml
[10/Nov/2020:08:52:35.604 +0530] "GET /healthcare/querydoctor/surgery HTTP/1.1" - - "-" "curl/7.64.1"
[10/Nov/2020:08:52:35.610 +0530] "GET /healthcare/surgery HTTP/1.1" - - "-" "Synapse-PT-HttpComponents-NIO"
[10/Nov/2020:08:52:35.610 +0530] "- - " 200 - "-" "-"
[10/Nov/2020:08:52:35.604 +0530] "- - " 200 - "-" "-"
```

## Monitor Patch Logs 

The Patch log file contains details related to patches applied to the product. Patch logs cannot be customized.

```bash
[2020-09-24 23:00:05,319]  FINE {org.wso2.micro.integrator.server.util.PatchUtils processPatches} - Checking for patch changes ...  
[2020-09-24 23:00:05,322]  FINE {org.wso2.micro.integrator.server.util.PatchUtils processPatches} - No new patch or service pack detected, server will start without applying patches   
[2020-09-24 23:00:05,323]  FINE {org.wso2.micro.integrator.server.util.PatchUtils checkMD5Checksum} - Patch verification started  
[2020-09-24 23:00:05,323]  FINE {org.wso2.micro.integrator.server.util.PatchUtils checkMD5Checksum} - Patch verification successfully completed  
[2020-10-14 10:16:07,812]  FINE {org.wso2.micro.integrator.server.util.PatchUtils processPatches} - Checking for patch changes ...  
[2020-10-14 10:16:07,815]  FINE {org.wso2.micro.integrator.server.util.PatchUtils processPatches} - No new patch or service pack detected, server will start 
```

## Monitor Correlation Logs

Correlation logs help trace the complete round trip of a message processed by the WSO2 Integrator: MI. This is particularly useful when diagnosing end-to-end message flow across multiple services.

See [Monitor Correlation Logs]({{base_path}}/observe-and-manage/classic-observability-logs/monitoring-correlation-logs) for more information.

## Monitor Console Logs

When you run the WSO2 Integrator: MI, the console outputs logs from the [Carbon log file](#monitor-carbon-logs) and the [Error log file](#monitor-error-logs) by default.

If you have enabled **wire logs**, these will also be printed to the console. See [Enable and Use Wire Logs]({{base_path}}/develop/using-wire-logs/) for more details.
