# Moesif Dashboards for WSO2 Integrator: MI

## Import MI dashboards to Moesif

1. Download the <a href="{{base_path}}/assets/attachments/moesif-metrics/dashboards_template.json" download="dashboards_template.json">dashboards_template.json</a> file containing the template dashboards for MI.
2. On the Moesif UI, click on **Create New** → **Dashboard Templates** → **Import JSON Template** and provide the JSON template downloaded above. 

<a href="{{base_path}}/assets/attachments/moesif-metrics/dashboard_templates.png"><img src="{{base_path}}/assets/attachments/moesif-metrics/dashboard_templates.png" width="70%" alt="Moesif Dashboard Templates"></a>

The new dashboards will be visible under your Saved Dashboards along with the default Moesif Dashboards.

## Dashboards

### Overall dashboard

This dashboard provides an overview of overall analytics.

<a href="{{base_path}}/assets/attachments/moesif-metrics/dashboard_overall.png"><img src="{{base_path}}/assets/attachments/moesif-metrics/dashboard_overall.png" width="70%" alt="Overall Dashboard"></a>

|Name|Displayed Data|
|:----|:----|
|Distribution by Component Type|Distribution of the different components
|Total Requests|Total number of requests handled by WSO2 Integrator: MI
|Fault Responses|Total number of fault responses
|Overall Message Count over Time|Total number of requests received over a selected time span
|Success Requests|Total number of successful requests
|Failure Rate|Percentage of requests by failure
|Top APIs by Request Count|Top APIs that served the highest number of requests
|Top Proxy Services by Request Count|Top Proxy services that served the highest number of requests
|Top Sequences by Request Count|Top Sequences that served the highest number of requests
|Top Endpoints by Request Count|Top Endpoints that served the highest number of requests
|Top Inbound Endpoints by Request Count|Top Inbound Endpoints that served the highest number of requests

### API dashboard

This dashboard provides an overview of API analytics.

<a href="{{base_path}}/assets/attachments/moesif-metrics/dashboard_api.png"><img src="{{base_path}}/assets/attachments/moesif-metrics/dashboard_api.png" width="70%" alt="API Dashboard"></a>

|Name|Displayed Data|
|:----|:----|
|Total Requests|Total number of requests handled by the APIs
|API Message Count|API requests received over time
|Top APIs by Message Count|Top APIs that served the highest number of requests
|Fault Responses|Total number of fault responses
|Success Requests|Total number of successful requests
|Failure Request Rate|Percentage of requests by failure
|Success Rate by API|Successful requests received for each API
|Fault Response Rate|Percentage of requests by fault response
|Message Latency|Maximum, minimum and average latency for the messages in the time span
|Average Latency|Average latency for a request
|Average Latency by API|Average latency by each API
|Maximum Latency|Maximum latency recorded by a single request

### Endpoints dashboard

This dashboard provides an overview of the endpoints analytics.

<a href="{{base_path}}/assets/attachments/moesif-metrics/dashboard_ep.png"><img src="{{base_path}}/assets/attachments/moesif-metrics/dashboard_ep.png" width="70%" alt="Endpoints Dashboard"></a>

|Name|Displayed Data|
|:----|:----|
|Total Requests|Total number of requests handled by the Endpoints
|Endpoint Message Count|Requests received over time
|Top Endpoints by Message Count|Top Endpoints that served the highest number of requests
|Fault Responses|Total number of fault responses
|Success Requests|Total number of successful requests
|Failure Request Rate|Percentage of requests by failure
|Success Rate by Endpoint|Successful requests received for each Endpoint
|Fault Response Rate|Percentage of requests by fault response
|Message Latency|Maximum, minimum and average latency for the messages in the time span
|Average Latency|Average latency for a request
|Average Latency by Endpoint|Average latency by each Endpoint
|Maximum Latency|Maximum latency recorded by a single request

### Inbound endpoints dashboard

This dashboard provides an overview of inbound endpoints analytics.

<a href="{{base_path}}/assets/attachments/moesif-metrics/dashboard_iep.png"><img src="{{base_path}}/assets/attachments/moesif-metrics/dashboard_iep.png" width="70%" alt="Inbound Endpoints Dashboard"></a>

|Name|Displayed Data|
|:----|:----|
|Total Requests|Total number of requests handled by the Inbound Endpoints
|Inbound Endpoint Message Count|Requests received over time
|Top Inbound Endpoints by Message Count|Top Inbound Endpoints that served the highest number of requests
|Fault Responses|Total number of fault responses
|Success Requests|Total number of successful requests
|Failure Request Rate|Percentage of requests by failure
|Success Rate by Inbound Endpoint|Successful requests received for each Inbound Endpoint
|Fault Response Rate|Percentage of requests by fault response
|Message Latency|Maximum, minimum and average latency for the messages in the time span
|Average Latency|Average latency for a request
|Average Latency by Inbound Endpoint|Average latency by each Inbound Endpoint
|Maximum Latency|Maximum latency recorded by a single request

### Sequences dashboard

This dashboard provides an overview of sequences analytics.

<a href="{{base_path}}/assets/attachments/moesif-metrics/dashboard_seq.png"><img src="{{base_path}}/assets/attachments/moesif-metrics/dashboard_seq.png" width="70%" alt="Sequences Dashboard"></a>

|Name|Displayed Data|
|:----|:----|
|Total Requests|Total number of requests handled by the Sequences
|Sequences Message Count|Requests received over time
|Top Sequences by Message Count|Top Sequences that served the highest number of requests
|Fault Responses|Total number of fault responses
|Success Requests|Total number of successful requests
|Failure Request Rate|Percentage of requests by failure
|Success Rate by Sequences|Successful requests received for each sequence
|Fault Response Rate|Percentage of requests by fault response
|Message Latency|Maximum, minimum and average latency for the messages in the time span
|Average Latency|Average latency for a request
|Average Latency by Sequence|Average latency by each Sequence
|Maximum Latency|Maximum latency recorded by a single request

### Proxy services dashboard

This dashboard provides an overview of proxy services analytics.

<a href="{{base_path}}/assets/attachments/moesif-metrics/dashboard_ps.png"><img src="{{base_path}}/assets/attachments/moesif-metrics/dashboard_ps.png" width="70%" alt="Proxy Services Dashboard"></a>

|Name|Displayed Data|
|:----|:----|
|Total Requests|Total number of requests handled by the Proxy Services
|Proxy Services Message Count|Requests received over time
|Top Proxy Services by Message Count|Top Proxy Services that served the highest number of requests
|Fault Responses|Total number of fault responses
|Success Requests|Total number of successful requests
|Failure Request Rate|Percentage of requests by failure
|Success Rate by Proxy Service|Successful requests received for each Proxy Service
|Fault Response Rate|Percentage of requests by fault response
|Message Latency|Maximum, minimum and average latency for the messages in the time span
|Average Latency|Average latency for a request
|Average Latency by Proxy Service|Average latency by each Proxy Service
|Maximum Latency|Maximum latency recorded by a single request

