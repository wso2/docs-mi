# Publish Custom Analytics Events Data

## Introduction

WSO2 Micro Integrator provides the capability to publish custom analytics data with the existing event schema. This guide explains the steps required to achieve this.

This section outlines the process of creating a sample and configuring it with WSO2 Micro Integrator.

## Create a sample

To begin, create a new Java/Maven project.

!!! note    
    Alternatively, you can use an existing [sample](https://github.com/wso2/product-micro-integrator/tree/master/samples/AnalyticsSampleDataProvider). If you choose to use the provided sample instead of developing one from scratch, you can skip the steps for creating the sample and proceed directly to [Configuring the Sample](#configuring-the-sample).

This section covers how to configure the `pom.xml` file, implement the required classes, and build the sample project.

### Configure the pom.xml

Add the WSO2 Nexus repository to the `pom.xml` file:

```xml
    <repository>
        <id>wso2-nexus</id>
        <name>WSO2 internal Repository</name>
        <url>https://maven.wso2.org/nexus/content/groups/wso2-public/</url>
        <releases>
            <enabled>true</enabled>
            <updatePolicy>daily</updatePolicy>
            <checksumPolicy>ignore</checksumPolicy>
        </releases>
    </repository>
```

Add the following dependencies.

```xml
    <dependencies>
        <dependency>
            <groupId>org.wso2.ei</groupId>
            <artifactId>org.wso2.micro.integrator.analytics.messageflow.data.publisher</artifactId>
            <version>${wso2.mi.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.synapse</groupId>
            <artifactId>synapse-extensions</artifactId>
            <version>${synapse.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.synapse</groupId>
            <artifactId>synapse-core</artifactId>
            <version>${synapse.version}</version>
        </dependency>
    </dependencies>
```

!!! info
    The versions for `${wso2.mi.version}` and `${synapse.version}` can be found in the JAR versions available in the current Micro Integrator package.

### Implement required class

To add custom analytics data to the existing event schema, implement a class from the `org.wso2.micro.integrator.analytics.messageflow.data.publisher.producer.AnalyticsCustomDataProvider` interface. Override the `getCustomProperties` method to push custom analytics data.

An example implementation of this class is shown below:

``` java
    public class SampleCustomDataProvider implements AnalyticsCustomDataProvider {
        @Override
        public Map<String, Object> getCustomProperties(MessageContext messageContext) {
            Map<String, Object> properties = new HashMap<>();
            Mediator mediator = messageContext.getMainSequence();
            properties.put("mediatorName", mediator.getMediatorName());
            return properties;
        }
    }
```

### Build the project

To build the project, run the following command:

```
    mvn clean install
```

## Configure the sample

This section outlines the steps required to configure WSO2 Micro Integrator for the sample created above.

After building the project, copy the created `.jar` file into the `<MI_HOME>/lib` directory.

Edit the `analytics` configuration in the `deployment.toml` file, located inside the `<MI_HOME>/conf` directory, and add the following configuration:

``` toml
    [analytics]
    enable = true
    custom_data_provider_class="org.wso2.ei.SampleCustomDataProvider"
```

This configuration ensures that the custom data provider class is engaged.

Enable statistics for Micro Integrator following the instructions [here]({{base_path}}/mi-analytics/mi-elk-installation-guide/#enabling-statistics-for-artifacts).

Create a log appender following the instructions [here]({{base_path}}/mi-analytics/mi-elk-installation-guide/#creating-log-appender).

Now, trigger an event and check the `<MI_HOME>/repository/logs/synapse-analytics.log` to verify the event data being published by WSO2 Micro Integrator.
