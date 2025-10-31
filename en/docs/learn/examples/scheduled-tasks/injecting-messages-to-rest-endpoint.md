# How to Inject Messages to a RESTful Endpoint
In order to use the Message Injector to inject messages to a RESTful endpoint, you can specify the injector with the required payload and inject the message to the sequence or proxy service as defined below. The sample below shows a RESTful message injection through a proxy service.

## Synapse configurations

Following are the integration artifacts that we can used to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Scheduled trigger"
    ```xml
    <task class="org.apache.synapse.startup.tasks.MessageInjector" group="synapse.simple.quartz" name="SampleInjectToProxyTask" xmlns="http://ws.apache.org/ns/synapse">
        <trigger count="2" interval="5"/>
        <property name="injectTo" value="proxy" xmlns:task="http://www.wso2.org/products/wso2commons/tasks"/>
        <property name="message" xmlns:task="http://www.wso2.org/products/wso2commons/tasks">
            <request xmlns="">
                <location>
                    <city>London</city>
                    <country>GB</country>
                </location>
            </request>
        </property>
        <property name="proxyName" value="SampleProxy" xmlns:task="http://www.wso2.org/products/wso2commons/tasks"/>
    </task>
    ```
=== "Proxy Service"            
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="SampleProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <property expression="//request/location/city" name="uri.var.city" scope="default" type="STRING"/>
                <property expression="//request/location/country" name="uri.var.cc" scope="default" type="STRING"/>
                <log>
                    <property expression="get-property('uri.var.city')" name="Which city?"/>
                    <property expression="get-property('uri.var.cc')" name="Which country?"/>
                </log>
                <call>
                    <endpoint key="EP" />
                </call>
                <log level="full"/>
                <respond />
            </inSequence>
            <faultSequence/>
        </target>
    </proxy>
    ```
=== "Endpoint"
    ```xml
    <endpoint name="EP" xmlns="http://ws.apache.org/ns/synapse">
        <http method="get" uri-template="http://api.openweathermap.org/data/2.5/weather?q={uri.var.city},{uri.var.cc}&amp;APPID=ae2a70399cf2c35940a6538f38fee3d3" />
    </endpoint>
    ```

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}
3. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service), [endpoint]({{base_path}}/develop/creating-artifacts/creating-endpoint-templates), and a [scheduled trigger]({{base_path}}/develop/creating-artifacts/creating-scheduled-task) with the configurations given above.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your WSO2 Integrator: MI.

The XML message you injected (i.e., This is a scheduled task of the default implementation.) will be printed in the logs of the WSO2 Integrator: MI twice, 5 seconds apart.

```bash
INFO {org.apache.synapse.mediators.builtin.LogMediator} - Which city? = London, Which country? = UK
```
