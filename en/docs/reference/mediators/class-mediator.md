# Class Mediator

The **Class Mediator** creates an instance of a custom-specified class
and sets it as a mediator. The class must implement the
`         org.apache.synapse.api.Mediator        ` interface. If any
properties are specified, the corresponding setter methods are invoked
once on the class during initialization.

The Class mediator is a custom Java class, which you need to maintain by
yourself. Therefore, it is recommended to use the Class mediator only
for not frequently re-used custom developments and very user-specific
scenarios, for which, there is no built-in mediator that already
provides the required functionality.

Your class mediator might not be picked up and updated if you use an existing package when creating. For best results, use [WSO2 Integrator: MI Visual Studio Code extension]({{base_path}}/develop/mi-for-vscode/mi-for-vscode-overview/) for debugging Class mediators.

## Syntax

```xml
<class name="class-name">
   <property name="string" (value="literal" | expression="[XPath|json-eval(JSON Path)]")/>*
</class>
```

!!! Warning
    - Using class variables with expressions can cause performance degradation. Therefore, it is **not recommended** to use dynamic expressions such as `<property name="variable2" expression="${properties.variable1}"/>`. Instead, use setters and getters to dynamically access properties within the Java class's `mediate` method, as shown in [Dynamically access and set properties](#dynamically-access-and-set-properties).

    - For static values, you can pass them directly, for example `<property name="variable1" value="10"/>`.

## Configuration

**Class Name**: The name of the class. To load a class, enter the qualified name of the relevant class in this parameter and click **Load Class**.

## Example

In this configuration, the WSO2 Integrator: MI sends the requested message to the endpoint specified via the [Send mediator]({{base_path}}/reference/mediators/send-mediator). This endpoint is the Axis2server running on port 9000. The response message is passed through a Class mediator before it is sent back to the client. Two parameters named `         variable1        ` and `         variable2        ` are passed to the instance mediator implementation class ( `SimpleClassMediator`).

=== "Proxy Service"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <proxy name="SimpleProxy" startOnLoad="true" transports="http https" xmlns="http://ws.apache.org/ns/synapse">
        <target>
            <inSequence>
                <call>
                    <endpoint key="SimpleStockQuoteServiceEP"/>
                </call>
                <class name="samples.mediators.SimpleClassMediator">
                    <property name="variable1" value="10"/>
                    <property name="variable2" value="5"/>
                </class>
                <respond/>
            </inSequence>
            <faultSequence>
                <sequence key="errorHandler"/>
            </faultSequence>
        </target>
    </proxy>
    ```
=== "Error Handler Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="errorHandler"  trace="disable"  xmlns="http://ws.apache.org/ns/synapse">
        <makefault response="true" description="" version="soap11">
            <code value="soap11Env:VersionMismatch" xmlns:soap11Env="http://schemas.xmlsoap.org/soap/envelope/"/>
            <reason value="Mediation failed."/>
        </makefault>
        <respond/>
    </sequence>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockQuoteServiceEP" xmlns="http://ws.apache.org/ns/synapse">
        <address     uri="http://localhost:9000/soap/services/SimpleStockQuoteService">
            <suspendOnFailure>
                <initialDuration>-1</initialDuration>
                <progressionFactor>1</progressionFactor>
            </suspendOnFailure>
            <markForSuspension>
                <retriesBeforeSuspension>0</retriesBeforeSuspension>
            </markForSuspension>
        </address>
    </endpoint>
    ```

See the following sample Class Mediator and note the `         SynapseMessageContext        ` and the full Synapse API in there.

```java
package samples.mediators;

    import org.apache.synapse.MessageContext;
    import org.apache.synapse.mediators.AbstractMediator;
    import org.apache.axiom.om.OMElement;
    import org.apache.axiom.om.OMAbstractFactory;
    import org.apache.axiom.om.OMFactory;
    import org.apache.axiom.soap.SOAPFactory;
    import org.apache.commons.logging.Log;
    import org.apache.commons.logging.LogFactory;

    import javax.xml.namespace.QName;

    public class SimpleClassMediator extends AbstractMediator {

        private static final Log log = LogFactory.getLog(SimpleClassMediator.class);

        private String variable1="10";

        private String variable2="10";

        private int variable3=0;

        public SimpleClassMediator(){}

        public boolean mediate(MessageContext mc) {
            // Do somthing useful..
            // Note the access to the Synapse Message context
            return true;
        }

        public String getType() {
            return null;
        }

        public void setTraceState(int traceState) {
            traceState = 0;
        }

        public int getTraceState() {
            return 0;
        }

        public void setVariable1(String newValue) {
            variable1=newValue;
        }

        public String getVariable1() {
            return variable1;
        }

        public void setVariable2(String newValue){
            variable2=newValue;
        }

        public String getVariable2(){
            return variable2;
        }
    }
```

### Dynamically access and set properties

```java
package samples.mediators;

    import org.apache.synapse.MessageContext;
    import org.apache.synapse.mediators.AbstractMediator;
    import org.apache.commons.logging.Log;
    import org.apache.commons.logging.LogFactory;

    public class SimpleClassMediator extends AbstractMediator {

        private static final Log log = LogFactory.getLog(SimpleClassMediator.class);

        public boolean mediate(MessageContext mc) {
            // Access a property
            String prop1 = (String) mc.getProperty("PropertyName");
            // Set a property
            mc.setProperty("NewPropertyName", "PropertyValue");
            return true;
        }
    }
```