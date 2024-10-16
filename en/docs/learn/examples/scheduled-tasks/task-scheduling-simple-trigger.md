# How to Schedule Tasks Using a Simple Trigger
This example demonstrates the concept of tasks and how a simple trigger works. Here the `MessageInjector` class is used, which injects a specified message to the Micro Integrator environment. You can write your own task class implementing the `org.apache.synapse.startup.Task` interface and implement the `execute` method to run the task.

## Synapse configurations

Following are the integration artifacts that we can used to implement this scenario. See the instructions on how to [build and run](#build-and-run) this example.

=== "Scheduled Task"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <task class="org.apache.synapse.startup.tasks.MessageInjector" group="synapse.simple.quartz" name="CheckPrice" xmlns="http://ws.apache.org/ns/synapse">
        <trigger interval="5"/>
        <property name="soapAction" value="urn:getQuote" xmlns:task="http://www.wso2.org/products/wso2commons/tasks"/>
        <property name="format" value="soap11" xmlns:task="http://www.wso2.org/products/wso2commons/tasks"/>
        <property name="message" xmlns:task="http://www.wso2.org/products/wso2commons/tasks">
            <m0:getQuote xmlns:m0="http://services.samples">
                <m0:request>
                    <m0:symbol>IBM</m0:symbol>
                </m0:request>
            </m0:getQuote>
        </property>
        <property xmlns:task="http://www.wso2.org/products/wso2commons/tasks" name="injectTo" value="sequence"/>
        <property xmlns:task="http://www.wso2.org/products/wso2commons/tasks" name="sequenceName" value="retrieveQuote"/>
    </task>
    ```
=== "Main Sequence"    
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="retrieveQuote" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <call>
            <endpoint key="SimpleStockQuoteService"/>
        </call>
        <log level="custom">
            <property name="First_Value"
                expression="//ns:getQuoteResponse/ns:return/ax21:open/child::text()"
                xmlns:ax21="http://services.samples/xsd" xmlns:ns="http://services.samples"/>
            <property name="For_the_organization"
                expression="//ns:getQuoteResponse/ns:return/ax21:name/child::text()"
                xmlns:ax21="http://services.samples/xsd" xmlns:ns="http://services.samples"/>
            <property name="Last_Value"
                expression="//ns:getQuoteResponse/ns:return/ax21:last/child::text()"
                xmlns:ax21="http://services.samples/xsd" xmlns:ns="http://services.samples"/>
        </log>
        <drop />
    </sequence>
    ```
=== "Endpoint"
    ```xml
    <endpoint name="SimpleStockQuoteService" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
     </endpoint>
    ```

## Build and run

Create the artifacts:

{!includes/build-and-run.md!}
3. Create the [main sequence]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences) and a [scheduled task]({{base_path}}/develop/creating-artifacts/creating-scheduled-task) with the configurations given above.
4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Set up the back-end service:

1. Download the [back-end service](https://github.com/wso2-docs/WSO2_EI/blob/master/Back-End-Service/axis2Server.zip).
2. Extract the downloaded zip file.
3. Open a terminal, navigate to the `axis2Server/bin/` directory inside the extracted folder.
4. Execute the following command to start the axis2server with the SimpleStockQuote back-end service:

    === "On MacOS/Linux"   
          ```bash
          sh axis2server.sh
          ```
    === "On Windows"              
          ```bash
          axis2server.bat
          ```

When the Micro Integrator is invoked, you will see that the back-end service generates a quote every 5 seconds and that the Micro Integrator receives the stock quote response.
