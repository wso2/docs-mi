# Scopes

In WSO2 Micro Integrator scopes refer to the different layers where the properties can be set when mediating messages. 

## `default` scope

When the scope of a property is `default`, its value is available throughout the mediation flow. In addition to the user-defined properties, you can retrieve the following special properties from the `default` scope.
[Generic Properties]({{base_path}}/reference/mediators/property-reference/generic-properties) are available in the default scope.

| Property name  | Return value                                                                                                                                                                                    |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `To`             | Incoming URL as a string, or empty string («») if a To address is not defined.                                                                                                      |
| `From`           | From address as a string, or empty string («») if a From address is not defined.                                                                                                    |
| `Action`         | SOAP Addressing Action header value as a string, or empty string («») if an Action is not defined.                                                                                  |
| `FaultTo`        | SOAP FaultTo header value as a string, or empty string («») if a FaultTo address is not defined.                                                                                    |
| `ReplyTo`        | ReplyTo header value as a string, or empty string («») if a ReplyTo address is not defined.                                                                                         |
| `MessageID`      | A unique identifier (UUID) for the message as a string, or empty string («») if a MessageID is not defined. This ID is guaranteed to be unique.                                     |
| `FAULT`          | `TRUE` if the message has a fault, or empty string if the message does not have a fault.                                                                                              |
| `MESSAGE_FORMAT` | Returns pox, get, soap11, or soap12 depending on the message. If a message type is unknown this returns soap12                                                                      |
| `OperationName`  | Operation name corresponding to the message. A proxy service with a WSDL can have different operations. If the WSDL is not defined, WSO2 MI defines a fixed operation called `mediate`. |

Examples:
``` xml
<property name="PROPERTY_1" value="VALUE_1" scope="default" type="STRING"/>
<property name="PROPERTY_2" expression="get-property('PROPERTY_1')"/>
```

!!! Note
    To access a property with the `default` scope inside the `mediate()` method of a mediator, you can include the following configuration in a custom mediator created using the [Class mediator]({{base_path}}/reference/mediators/class-mediator):

    ``` java
    public boolean mediate(org.apache.synapse.MessageContext mc) {  
        // Available throughout the mediation flow  
        String propValue = (String) mc.getProperty("PropName");  
        System.out.println("SCOPE_SYNAPSE : " + propValue);  
        return true;  
    }
    ```

## `axis2` scope

When the scope of a property is `axis2`, its value is available only either throughout the request flow or the response flow for which the property is defined. [Axis2 Properties]({{base_path}}/reference/mediators/property-reference/axis2-properties/) are available in the axis2 scope.

You can retrieve
message context properties within the `axis2` scope
using the following syntax.

`get-property('axis2', String propertyName)`

Examples:
``` xml
<property name="PROPERTY_1" value="VALUE_1" scope="axis2" type="STRING"/>
<property name="PROPERTY_2" expression="get-property('axis2',PROPERTY_1')"/>
```

!!! Note

    To access a property with the `axis2` scope inside the `mediate()` method of a mediator, you can include the following configuration in a custom mediator created using the [Class mediator]({{base_path}}/reference/mediators/class-mediator):

    ``` java
    public boolean mediate(org.apache.synapse.MessageContext mc) {  
        org.apache.axis2.context.MessageContext axis2MsgContext;  
        axis2MsgContext = ((Axis2MessageContext) mc).getAxis2MessageContext();   
        // Available only in the sequence in which the property is defined.  
        String propValue = (String) axis2MsgContext.getProperty("PropName");  
        System.out.println("SCOPE_AXIS2 : " + propValue);  
        return true;  
    } 
    ```

## `transport` scope

When the scope of a property is `transport`, it refers to the transport headers of the message. [HTTP Transport Properties]({{base_path}}/reference/mediators/property-reference/http-transport-properties/) are available in the axis2 scope.

You can retrieve properties within the
`transport` scope using the following syntax.

`get-property('transport', String propertyName)`

Examples:
``` xml
<property name="PROPERTY_1" value="VALUE_1" scope="transport" type="STRING"/>
<property name="PROPERTY_2" expression="get-property('transport',PROPERTY_1')"/>
```

## `registry` scope

The [registry]({{base_path}}/get-started/key-concepts/#registry) in WSO2 MI allows users to store and manage various resources, such as configuration files, XML schemas, WSDL files, XSLT stylesheets, and other reusable assets.
When the scope of a property is `registry`,
it refers to a [registry resource]({{base_path}}/develop/creating-artifacts/creating-registry-resources) or a registry resource property.

You can retrieve properties within the registry using the following syntax.

`get-property('registry', String registryPath@propertyName)`  
`get-property('registry', String registryPath)`


Examples:
``` xml
<property name="regProperty" expression="get-property('registry', 'gov:/data/xml/collectionx')"/>
<property name="regResourceProperty" expression="get-property('registry', 'gov:/data/xml/collectionx@abc')"/>
```

## `system` scope

When the scope of a property is `system`, it refers to [Java System properties](https://docs.oracle.com/javase/tutorial/essential/environment/sysprop.html).
You can retrieve properties in the `system` scope using the following syntax.

`get-property('system', String propertyName)`

## `environment` scope

You can retrieve environment variables using the following syntax.

`get-property('env', String propertyName)`

## `file` scope

You can retrieve properties defined in the `file.properties` configuration file using the following syntax. Properties in the file are reloaded periodically according to the time interval defined by the `file.properties.sync.interval` system property in seconds. If this interval is not defined, changes to the properties will not be reloaded automatically during runtime.

`get-property('file', String propertyName)`

## `operation` scope

You can retrieve a property in the operation context level from the `operation` scope. The properties within the iterated/cloned message with the `operation` scope are preserved in the in sequence even if you have configured your API resources to be sent through the fault sequence when faults exist. A given property with the `operation` scope only exists in a single request and can be accessed by a single resource. 

The syntax of the function takes the following format.

`get-property('operation', String propertyName)`

## `axis2-client` scope

This is similar to the `default` scope. The difference is that it can be accessed inside the
`mediate()` method of a mediator by including one of
the following configurations in a custom mediator, created using the
[Class mediator]({{base_path}}/reference/mediators/class-mediator):


``` java
public boolean mediate(org.apache.synapse.MessageContext mc) {  
    org.apache.axis2.context.MessageContext axis2MsgContext;  
    axis2MsgContext = ((Axis2MessageContext) mc).getAxis2MessageContext();  
    String propValue = (String) axis2MsgContext.getOptions().getProperty("PropName");  
    System.out.println("SCOPE_AXIS2_CLIENT - 1: " + propValue);  
    return true;  
}  
```
