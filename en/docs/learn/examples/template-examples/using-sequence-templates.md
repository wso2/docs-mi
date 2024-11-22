# How to Use a Sequence Template

!!! Info
    The **Call Template** mediator allows you to construct a sequence by passing values into a **sequence template**. This is currently only supported for special types of mediators such as the **Iterator** and **Aggregate Mediators**, where actual XPath operations are performed on a different SOAP message, and not on the message coming into the mediator.

Sequence template parameters can be referenced using an [XPath expression]({{base_path}}/reference/synapse-properties/expressions/#xpath-expressions) defined inside the in-line sequence. For example, the parameter named "foo" can be referenced by the Property mediator (defined inside the in-line sequence of the template) in the following ways:

```xml
<property name=”fooValue” expression=”$func:foo” />
```

or

```xml
<property name=”fooValue” expression=”get-property('foo','func')” />
```

Using function scope or 'func' in the [XPath expression]({{base_path}}/reference/synapse-properties/expressions/#xpath-expressions) allows us to refer a particular parameter value passed externally by an invoker such as the Call Template mediator.

See the examples given below.

## Example 1: Call a sequence template

Let's illustrate the sequence template with a simple example. Suppose we have a sequence that logs the text "hello" in three different languages. We shall make use of a proxy to which we shall send a payload. The switch statement will log a greeting based on the language.

```xml
<proxy name="HelloProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
    <target>
        <inSequence>
            <switch source="//lang[1]/text()">
                <case regex="English">
                  <log level="custom">
                    <property name="GREETING_MESSAGE" value="Hello"/>
                  </log>
                </case>
                <case regex="French">
                  <log level="custom">
                    <property name="GREETING_MESSAGE" value="Bonjour"/>
                  </log>
                </case>
                <case regex="Japanese">
                  <log level="custom">
                    <property name="GREETING_MESSAGE" value="Konnichiwa"/>
                  </log>
                </case>
                <default>
                  <log level="custom">
                    <property name="GREETING_MESSAGE" value="??"/>
                  </log>
                </default>
            </switch>
            <drop/>
        </inSequence>
        <faultSequence/>
    </target>
</proxy>
```   

Instead of printing our "hello" message for each and every language inside the sequence (as shown above), we can create a generalized template of these actions, which will accept any greeting message (from a particular language) and log it on screen. For example, let's create the following template named "Hello_Logger". Thus, due to the availability of the Call Template mediator, you are not required to have the message entered in all four languages included in the sequence template configuration itself.

### Synapse configuration

Following are the integration artifacts we can use to implement this scenario. See the instructions on how to [build and run](#build-and-run-example-1) this example.

=== "Sequence template"
    ```xml 
    <template name="Hello_Logger" xmlns="http://ws.apache.org/ns/synapse">
        <parameter name="message"/>
        <sequence>
            <log level="custom">
                <property expression="$func:message" name="GREETING_MESSAGE"/>
            </log>
        </sequence>
    </template>
    ```
=== "Proxy Service"    
    ```xml 
    <proxy name="HelloProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <switch source="//lang[1]/text()">
                    <case regex="English">
                        <call-template target="Hello_Logger">
                            <with-param name="message" value="Hello"/>
                        </call-template>
                    </case>
                    <case regex="French">
                        <call-template target="Hello_Logger">
                            <with-param name="message" value="Bonjour"/>
                        </call-template>
                    </case>
                    <case regex="Japanese">
                        <call-template target="Hello_Logger">
                            <with-param name="message" value="Konnichiwa"/>
                        </call-template>
                    </case>
                    <default>
                        <call-template target="Hello_Logger"/>
                    </default>
                </switch>
                <drop/>
            </inSequence>
            <faultSequence/>
        </target>
    </proxy>
    ```

Note the following;

-   The following four Call Template mediator configurations populate a sequence template named Hello_Logger with the "Hello" text in four different languages.

    === "Call Template 1"
        ```xml 
        <call-template target="Hello_Logger">
          <with-param name="message" value="Hello" />
        </call-template>
        ```
    === "Call Template 2"    
        ```xml 
        <call-template target="Hello_Logger">
           <with-param name="message" value="Bonjour" />
        </call-template>
        ```
    === "Call Template 3"         
        ```xml 
        <call-template target="Hello_Logger">
          <with-param name="message" value="Konnichiwa" />
        </call-template>
        ```
    === "Call Template 4"         
        ```xml 
        <call-template target="Hello_Logger">
          <with-param name="message" value="??" />
        </call-template>
        ```

-   With our "Hello_Logger" in place, the Call Template mediator can
populate the template with actual hello messages and execute the
sequence of actions defined within the template like with any other
sequence.

-   The Call Template mediator points to the same template "Hello_Logger" and passes different arguments to it. In this way, sequence templates make it easy to stereotype different workflows inside the Micro Integrator.

-   The `target` attribute is used to specify the sequence template you want to use. The `<with-param>` element is used to parse parameter values to the target sequence template. The parameter names should be the same as the names specified in target template. The parameter value can contain a string, an XPath expression (passed in with curly braces { }), or a dynamic XPath expression (passed in with double curly braces) of which the values are compiled dynamically.

### Build and run (Example 1)

Create the artifacts:

1. {!includes/build-and-run.md!}
2. Create the [proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service) and [sequence template]({{base_path}}/develop/creating-artifacts/creating-sequence-templates) with the configurations given above.
3. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

You can test this out with the following payload sent to the proxy via `http://localhost:8290/services/HelloProxy`:

```xml
<body>
    <lang>English</lang>
    <lang>French</lang>
    <lang>Japanese</lang>
</body>
```

## Example 2: Optional parameters and default values

Following are the integration artifacts we can use to implement this scenario. See the instructions on how to [build and run](#build-and-run-example-2) this example.

### Synapse configuration

In this example, the sequence template is configured to log the greeting message that is passed from the mediation sequence in the REST API. According to the sequence template, a value for the greeting message is optional. The REST API is not passing a greeting message to this template. Therefore, the <b>default</b> greeting message specified in the template is effectively applied.

=== "Sequence Template"
    ```xml  
    <?xml version="1.0" encoding="UTF-8"?>
    <template name="sequence-temp" xmlns="http://ws.apache.org/ns/synapse">
        <parameter isMandatory="false" defaultValue="Welcome" name="greeting_message"/>
        <sequence>
            <log level="custom">
                <property expression="$func:greeting_message" name="greeting"/>
            </log>
        </sequence>
    </template>
    ```
=== "REST API"    
    ```xml 
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/test" name="test" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="POST">
            <inSequence>
                <call-template target="sequence-temp" />
                <respond/>
            </inSequence>
            <faultSequence/>
        </resource>
    </api>
    ```

### Build and run (Example 2)

Create the artifacts:

1. {!includes/build-and-run.md!}
2. Create the [REST API]({{base_path}}/develop/creating-artifacts/creating-an-api) and [sequence template]({{base_path}}/develop/creating-artifacts/creating-sequence-templates) with the configurations given above.
3. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Invoke this REST API via `http://localhost:8290/test`. See that the default greeting message (`Welcome`) is logged on the console.

## Example 3: Call the sequence template using dynamic XPATH expression

In this example, the sequence template is configured to dynamically determine the name of the Message Store using an [XPath expression]({{base_path}}/reference/synapse-properties/expressions/#xpath-expressions). It routes messages to a Message Store via the Store mediator by resolving the name of the Message Store from the message context.

### Synapse configuration

Following are the integration artifacts we can use to implement this scenario. See the instructions on how to [build and run](#build-and-run-example-3) this example.

=== "REST API"    
```xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/test" name="Test" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST" uri-template="/temp">
        <inSequence>
            <log>
                <property name="status" value="Start"/>
            </log>
            <log category="INFO" level="simple">
                <property name="STORE_NAME" expression="$func:message_store/ns1:store/ns1:request/ns2:storeName" xmlns:ns1="http://services.samples" xmlns:ns2="http://services.samples/ns2"/>
            </log>
            <call-template target="TestTemp">
                <with-param name="message_store" value="{$body}"/>
            </call-template>
            <respond/>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
</api>
```

=== "Sequence template"
```xml
<?xml version="1.0" encoding="UTF-8"?>
<template name="Testtemp" xmlns="http://ws.apache.org/ns/synapse">
    <parameter isMandatory="false" name="message_store"/>
    <sequence>
        <store messageStore="{$func:message_store/ns1:store/ns1:request/ns2:storeName}" xmlns:ns1="http://services.samples" xmlns:ns2="http://services.samples/ns2"/>
    </sequence>
</template>
```

=== "Sequence"
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sequence name="testSeq"  trace="disable"  xmlns="http://ws.apache.org/ns/synapse">
    <log level="full">
        <property name="status" value="Storing message"/>
    </log>
</sequence>
```

=== "Message Store"
```xml
<?xml version="1.0" encoding="UTF-8"?>
<messageStore name="testStore" class="org.apache.synapse.message.store.impl.memory.InMemoryStore" xmlns="http://ws.apache.org/ns/synapse">
</messageStore>
```

=== "Message Processor"
```xml
<?xml version="1.0" encoding="UTF-8"?>
<messageProcessor class="org.apache.synapse.message.processor.impl.sampler.SamplingProcessor" name="testProcessor" messageStore="testStore"  xmlns="http://ws.apache.org/ns/synapse">
    <parameter name="sequence">testSeq</parameter>
    <parameter name="interval">1000</parameter>
    <parameter name="is.active">true</parameter>
    <parameter name="concurrency">1</parameter>
</messageProcessor>
```

### Build and run (Example 3)

Create the artifacts:

1. {!includes/build-and-run.md!}
2. Create the [REST API]({{base_path}}/develop/creating-artifacts/creating-an-api), [sequence template]({{base_path}}/develop/creating-artifacts/creating-sequence-templates), [sequence]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences/), [message store]({{base_path}}/develop/creating-artifacts/creating-a-message-store/), and [message processor]({{base_path}}/develop/creating-artifacts/creating-a-message-processor/) with the configurations given above.
3. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

Use the following request and payload to invoke the service.

```xml
POST /test/temp HTTP/1.1
Host: localhost:8290
User-Agent: curl/7.85.0
Accept: */*
ontent-Type: application/xml
Content-Length: 180

<ns1:store xmlns:ns1="http://services.samples" xmlns:ns2="http://services.samples/ns2">
    <ns1:request>
        <ns2:storeName>testStore</ns2:storeName>
    </ns1:request>
</ns1:store>
```
