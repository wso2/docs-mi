# Observing WSO2 Integrator: MI metrics with Moesif

WSO2 Integrator: MI supports publishing and observing metrics with Moesif. With this functionality, users can observe operational data for the following entities:

- APIs
- Sequences
- Endpoints
- Inbound Endpoints
- Proxy services

Follow the steps below to set up WSO2 Integrator: MI and Moesif to view MI metrics.

## Step 1: Create a Moesif account and obtain an application ID

Once you have created a Moesif account and logged in, you can obtain the application ID during the app setup process. 
You can also obtain the application ID of the app you are currently on by following the steps below:

```
Account → API Keys → Collector Application Id
```

## Step 2: Configure WSO2 Integrator: MI

To enable operational analytics, you must first update the deployment.toml file with the required configurations.


### Enable statistics for artifacts

If you want to collect statistics for all your integration artifacts, be sure to add the `flow.statistics.capture_all` parameter to the `deployment.toml` file. You can also enable statistics for the integration artifacts you wish to monitor individually.

```toml
[mediation]
flow.statistics.enable=true
flow.statistics.capture_all=true
```

### Enable analytics

Add the following configurations to the deployment.toml file to enable analytics, which includes custom analytics.

```toml
[analytics]
enabled=true
```

You can have more control over the analytics data with the following additional configurations.

```toml
[analytics]
enabled = true
publisher = "log"
id = "wso2mi_server_1234"
prefix = "SYNAPSE_ANALYTICS_DATA"
api_analytics.enabled = true
proxy_service_analytics.enabled = true
sequence_analytics.enabled = true
endpoint_analytics.enabled = true
inbound_endpoint_analytics.enabled = true
```

|Config Key|Data Type|Default Value|Description|
|:----|:----|:----|:----|
|api_analytics.enabled|bool|TRUE|If set to false, analytics for APIs will not be published|
|proxy_service_analytics.enabled|bool|TRUE|If set to false, analytics for Proxy Services will not be published|
|sequence_analytics.enabled|bool|TRUE|If set to false, analytics for Sequences will not be published|
|endpoint_analytics.enabled|bool|TRUE|If set to false, analytics for Endpoints will not be published|
|inbound_endpoint_analytics.enabled|bool|TRUE|If set to false, analytics for Inbound Endpoints will not be published|
|prefix|string|SYNAPSE_ANALYTICS_DATA|This string will be used as a prefix when Synapse analytics are being published. The purpose of this prefix is to distinguish log lines that hold analytics data from others. If you override this default value, you will have to update the Fluent Bit configuration files accordingly.|
|enabled|bool|FALSE|If set to true, analytics service will be enabled|
|id|string|hostname|An identifier that will be published with the analytic|

### Creating a log appender

Open the `<MI_HOME>/conf` directory and edit the `log4j2.properties` file following the instructions given below.

1. Add `SYNAPSE_ANALYTICS_APPENDER` to the appenders list.

```properties
appenders = SYNAPSE_ANALYTICS_APPENDER,.... (list of other available appenders)
```

2. Add the following configurations after the appenders:

```properties
appender.SYNAPSE_ANALYTICS_APPENDER.type = RollingFile
appender.SYNAPSE_ANALYTICS_APPENDER.name = SYNAPSE_ANALYTICS_APPENDER
appender.SYNAPSE_ANALYTICS_APPENDER.fileName = ${sys:carbon.home}/repository/logs/synapse-analytics.log
appender.SYNAPSE_ANALYTICS_APPENDER.filePattern = ${sys:carbon.home}/repository/logs/synapse-analytics-%d{MM-dd-yyyy}-%i.log
appender.SYNAPSE_ANALYTICS_APPENDER.layout.type = PatternLayout
appender.SYNAPSE_ANALYTICS_APPENDER.layout.pattern = %d{HH:mm:ss,SSS} [%X{ip}-%X{host}] [%t] %5p %c{1} %m%n
appender.SYNAPSE_ANALYTICS_APPENDER.policies.type = Policies
appender.SYNAPSE_ANALYTICS_APPENDER.policies.time.type = TimeBasedTriggeringPolicy
appender.SYNAPSE_ANALYTICS_APPENDER.policies.time.interval = 1
appender.SYNAPSE_ANALYTICS_APPENDER.policies.time.modulate = true
appender.SYNAPSE_ANALYTICS_APPENDER.policies.size.type = SizeBasedTriggeringPolicy
appender.SYNAPSE_ANALYTICS_APPENDER.policies.size.size=1000MB
appender.SYNAPSE_ANALYTICS_APPENDER.strategy.type = DefaultRolloverStrategy
appender.SYNAPSE_ANALYTICS_APPENDER.strategy.max = 10
```

According to the above configurations, the `synapse-analytics.log` file is rolled each day or when the log size reaches the limit of 1000 MB by default. Furthermore, only ten revisions will be kept, and older revisions will be deleted automatically. You can change this behavior by changing the configurations above.

3. Add SynapseAnalytics to the loggers list:

```properties
loggers = SynapseAnalytics, ...(list of other available loggers)
```

4. Add the following configurations after the loggers.

```properties
logger.SynapseAnalytics.name = org.wso2.micro.integrator.analytics.messageflow.data.publisher.publish.elasticsearch.ElasticStatisticsPublisher
logger.SynapseAnalytics.level = INFO
logger.SynapseAnalytics.additivity = false
logger.SynapseAnalytics.appenderRef.SYNAPSE_ANALYTICS_APPENDER.ref = SYNAPSE_ANALYTICS_APPENDER
```

## Step 3: Set up and configure Fluent-bit

We will be using Fluent-bit as the agent that gathers MI metrics and sends them to Moesif as [custom actions](https://www.moesif.com/docs/ingest-action-events/collector-api/). 

1. Create the below configuration files in a local directory. 

```
.
├── docker-compose.yaml
├── fluent-bit.conf
├── metrics-parsers.conf
└── metrics-transform.lua
```

- **docker-compose.yaml** – Container setup for Fluent Bit.

You can refer to the [official installation guide](https://docs.fluentbit.io/manual/installation/downloads) if you prefer a different installation setup for Fluent-bit.

- **fluent-bit.conf** – Fluent-bit configurations for reading metrics from MI and publishing them to the Moesif actions endpoint.
- **metrics-parsers.conf** - Configurations for extracting and parsing the metrics after reading them.
- **metrics-transform.lua** - Lua configurations for transforming the MI metrics to Moesif actions.

### docker-compose.yaml

```yaml
services:
  fluent-bit:
    image: fluent/fluent-bit:3.0
    container_name: fluent-bit-moesif
    volumes:
      # Mount MI logs directory
      - ${MI_HOME}/repository/logs:/logs:ro
      # Mount the configuration files
      - ./fluent-bit.conf:/fluent-bit/etc/fluent-bit.conf:ro
      - ./metrics-parsers.conf:/fluent-bit/etc/metrics-parsers.conf:ro
      - ./metrics-transform.lua:/fluent-bit/etc/metrics-transform.lua:ro
      # Fluent Bit database for tracking file positions
      - fluent-bit-db:/var/log
    environment:
      # Moesif Application ID
      - MOESIF_APPLICATION_ID=${MOESIF_APPLICATION_ID}
      # Path of the Log file to tail
      - LOG_FILE_PATH=${LOG_FILE_PATH:-/logs/synapse-analytics.log}
      # Moesif host if not the default
      - MOESIF_HOST=${MOESIF_HOST:-api.moesif.net}
    ports:
      - "2020:2020"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:2020/"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  # Fluent Bit database for tracking file positions
  fluent-bit-db:
```

You can specify all the required environment variables in a `.env` file.

```
MI_HOME=<MI_SERVER_PATH>
LOG_FILE_PATH=/logs/synapse-analytics.log
MOESIF_APPLICATION_ID=<MOESIF_APPLICATION_ID>
MOESIF_HOST=api.moesif.net
```

- Replace `MI_SERVER_PATH` with the path to your MI server home directory.

- Replace `MOESIF_APPLICATION_ID` with the Application Id you obtained in Step 1 above.

- The `LOG_FILE_PATH`  needs to be changed if you have provided a different file name for `appender.SYNAPSE_ANALYTICS_APPENDER.fileName` when adding the log appender in MI in Step 2 above.

### fluent-bit.conf

```
[SERVICE]
    Flush        5
    Log_Level    info
    Parsers_File metrics-parsers.conf
    HTTP_Server  On

# Read metric logs from WSO2 MI logs
[INPUT]
    Name              tail
    Path              ${LOG_FILE_PATH}
    Tag               moesif.metrics
    Read_from_Head    false
    Refresh_Interval  5
    Buffer_Max_Size   64KB
    Skip_Long_Lines   On
    DB                /var/log/fluent-bit-moesif.db
    Mem_Buf_Limit     10MB

# Only process logs containing SYNAPSE_ANALYTICS_DATA
[FILTER]
    Name    grep
    Match   moesif.metrics
    Regex   log SYNAPSE_ANALYTICS_DATA

# Extract JSON string from the log using the json_str_extract parser
[FILTER]
    Name         parser
    Match        moesif.metrics
    Key_Name     log
    Parser       json_str_extract
    Reserve_Data Off

# Parse the extracted JSON string into structured fields using the parse_json parser
[FILTER]
    Name         parser
    Match        moesif.metrics
    Key_Name     json_str
    Parser       parse_json
    Reserve_Data Off

# Transform the extracted data to a Moesif action
[FILTER]
    Name   lua
    Match  moesif.metrics
    script metrics-transform.lua
    call   transform_moesif_metrics

[OUTPUT]
    Name                 http
    Match                moesif.metrics
    # Moesif API endpoint
    Host                 ${MOESIF_HOST}
    Port                 443
    uri                  /v1/actions/batch
    header               Content-Type application/json
    header               X-Moesif-Application-Id ${MOESIF_APPLICATION_ID}
    format               json
    compress             gzip
    json_date_key        false
    workers              2
    tls                  true
    tls.verify           On
    Retry_Limit          3
    Log_response_payload On
```

The `Regex` field in the `grep` filter should change according to the `prefix` you’ve set when enabling MI analytics in step 2 above.

```
[FILTER]
    Name    grep
    Match   moesif.metrics
    Regex   log <prefix>
```

### metrics-parsers.conf

The parsers defined in this file will be used by the `parser` filters in the Fluent-bit configurations.

```
# Extract the JSON string from the log
[PARSER]
    Name        json_str_extract
    Format      regex
    Regex       SYNAPSE_ANALYTICS_DATA\s+(?<json_str>.+)$

# Parse the extracted JSON string into structured fields
[PARSER]
    Name        parse_json
    Format      json
    Time_Keep   Off
```

Mind the `Regex` value used in the `json_str_extract` parser here as well.

### metrics-transform.lua

This Lua script will be used by the `lua` filter in the Fluent-bit configurations for transforming the MI metrics to Moesif actions.

```
-- Generate a transaction ID
function generate_transaction_id()
    local template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    local uuid = string.gsub(template, '[xy]', function(c)
        local v = (c == 'x') and math.random(0, 0xf) or math.random(8, 0xb)
        return string.format('%x', v)
    end)
    return uuid
end

-- Assign the action name based on the entity type
function get_action_name(entity_type)
    local action_mapping = {
        API = "api_metrics_action",
        SequenceMediator = "sequence_metrics_action",
        ProxyService = "proxy_service_metrics_action",
        Endpoint = "endpoint_metrics_action",
        InboundEndpoint = "inbound_endpoint_metrics_action"
    }
    return action_mapping[entity_type] or "unknown_metrics_action"
end

function transform_moesif_metrics(tag, timestamp, record)
    -- Initialize random seed
    if not _G.random_initialized then
        math.randomseed(os.time() + os.clock() * 1000000)
        -- Call random a few times to improve randomness
        math.random(); math.random(); math.random()
        _G.random_initialized = true
    end

    local output = {}

    local entity_type = record["payload"] and record["payload"]["entityType"]
    if entity_type then
        output["action_name"] = get_action_name(entity_type)
    else
        output["action_name"] = "unknown_metrics_action"
    end

    output["transaction_id"] = generate_transaction_id()

    output["request"] = {
        time = record["timestamp"]
    }

    output["metadata"] = {}

    if record["serverInfo"] then
        output["metadata"]["serverInfo"] = record["serverInfo"]
    end

    if record["schemaVersion"] then
        output["metadata"]["schemaVersion"] = record["schemaVersion"]
    end

    if record["payload"] then
        local payload = record["payload"]

        for key, value in pairs(payload) do
            output["metadata"][key] = value
        end
    end

    return 2, timestamp, output
end
```

This script will,

- Generate a transaction Id
- Assign an action name based on the entity type
- Transform the MI metrics data structure to the Moesif actions data structure

## Step 4: Start up Fluent Bit and MI server

Start up Fluent-bit with the `docker compose up` command.

Start your MI server and send a few requests. You will see the actions appearing on your Moesif Event Log.

<a href="{{base_path}}/assets/attachments/moesif-metrics/event_logs.png"><img src="{{base_path}}/assets/attachments/moesif-metrics/event_logs.png" width="70%" alt="Event Log"></a>
