# Monitoring Composite Application-Level Logs

The advantage of having per-composite application logs is that it is very easy to analyze/monitor what went wrong in this particular composite application (integration) by looking at the logs. 

## Enabling log4j2 for capp logging

Follow the instructions below to enable log4j2 logs for a sample composite application (named `HelloWorldCompositeExporter`).

1.  Open up the `log4j2.properties` file (stored in the `<MI_HOME>/conf` directory. 
2.  Let's modify the layout pattern of a new or existing appender for the `HelloWorldCompositeExporter` composite application by adding the following section.

    ```bash
    %X{Artifact-Container}
     ```
    For exmaple:
    ```bash
    # CARBON_LOGFILE is set to be a DailyRollingFileAppender using a PatternLayout.
    appender.CARBON_LOGFILE.type = RollingFile
    appender.CARBON_LOGFILE.name = CARBON_LOGFILE
    appender.CARBON_LOGFILE.fileName = ${sys:logfiles.home}/wso2carbon.log
    appender.CARBON_LOGFILE.filePattern = ${sys:logfiles.home}/wso2carbon-%d{MM-dd-yyyy}.log
    appender.CARBON_LOGFILE.layout.type = PatternLayout
    appender.CARBON_LOGFILE.layout.pattern = [%d] %5p {%c}  |%X{Artifact-Container}| - %m%ex%n
    appender.CARBON_LOGFILE.policies.type = Policies
    appender.CARBON_LOGFILE.policies.time.type = TimeBasedTriggeringPolicy
    appender.CARBON_LOGFILE.policies.time.interval = 1
    appender.CARBON_LOGFILE.policies.time.modulate = true
    appender.CARBON_LOGFILE.policies.size.type = SizeBasedTriggeringPolicy
    appender.CARBON_LOGFILE.policies.size.size=10MB
    appender.CARBON_LOGFILE.strategy.type = DefaultRolloverStrategy
    appender.CARBON_LOGFILE.strategy.max = 20
    appender.CARBON_LOGFILE.filter.threshold.type = ThresholdFilter
    appender.CARBON_LOGFILE.filter.threshold.level = DEBUG
    ```

3. Save the `log4j2.properties` file.

A sample log output:

    ```bash
    [2024-07-11 08:34:36,970]  INFO {org.apache.synapse.mediators.builtin.LogMediator}  |[ Deployed From Artifact Container: HelloWorldCompositeExporter ] | - {api:testAPI} SampleLog = started
    [2024-07-11 08:34:46,110]  INFO {org.apache.synapse.core.axis2.TimeoutHandler}  |[ Deployed From Artifact Container: HelloWorldCompositeExporter ] | - This engine will expire all callbacks after GLOBAL_TIMEOUT: 120 seconds, irrespective of the timeout action, after the specified or optional timeout
    ```
