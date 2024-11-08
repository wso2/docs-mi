# Customize Task Scheduling

When you create a task using the default task implementation, the task can inject messages to a proxy service, or to a sequence. If you have a specific task-handling requirement, you can write your own task-handling implementation by creating a custom Java Class that implements the `org.apache.synapse.startup.Task` interface.

For example, the below sections demonstrate how you can create and schedule a task to receive stock quotes by invoking a back-end service, which exposes stock quotes. The scheduled task will read stock order information from a text file, and print the stock quotes.

## Create the custom Task implementation

Follow the steps below to create the implementation of the custom Task.

### Create the Maven project

Create a Maven project using the following information.  
    **Group Id** : `org.wso2.task`  
    **Artifact Id** : `StockQuoteTaskMavenProject`

### Create the Java Package

Create a Java Package inside the Maven Project using the following name: `org.wso2.task.stockquote.v1`

![]({{base_path}}/assets/img/integrate/custom-task-scheduling/119130458/119130467.png)

### Create the Java Class

1.  Create a Java Class named `StockQuoteTaskV1` inside the Maven Project.  

2.  In the **Project Explorer**, double-click on the **StockQuoteTaskV1.java** file and replace its source with the below content.  

    ```java
    package org.wso2.task.stockquote.v1;

    import java.io.BufferedReader;
    import java.io.File;
    import java.io.FileReader;
    import java.io.IOException;
    import java.nio.file.Files;
    import java.nio.file.StandardCopyOption;
    
    import org.apache.axiom.om.OMAbstractFactory;
    import org.apache.axiom.om.OMElement;
    import org.apache.axiom.om.OMFactory;
    import org.apache.axiom.om.OMNamespace;
    import org.apache.axis2.addressing.EndpointReference;
    import org.apache.commons.logging.Log;
    import org.apache.commons.logging.LogFactory;
    import org.apache.synapse.ManagedLifecycle;
    import org.apache.synapse.MessageContext;
    import org.apache.synapse.SynapseException;
    import org.apache.synapse.core.SynapseEnvironment;
    import org.apache.synapse.mediators.base.SequenceMediator;
    import org.apache.synapse.startup.Task;
    import org.apache.synapse.util.PayloadHelper;
    
    public class StockQuoteTaskV1 implements Task, ManagedLifecycle {
    private final Log log = LogFactory.getLog(StockQuoteTaskV1.class);
    private String sequenceName;
    
        private String stockFile;
    
        private String injectTo;
        private SynapseEnvironment synapseEnvironment;
    
        public void execute() {
            log.debug("PlaceStockOrderTask begin");
    
            if (synapseEnvironment == null) {
                log.error("Synapse Environment not set");
                return;
            }
    
            if (injectTo == null) {
                log.error("to not set");
                return;
            }
    
            if (sequenceName == null || sequenceName.isEmpty()) {
                log.error("Sequence name not specified");
                return;
            }
    
            File existFile = new File(stockFile);
    
            if (!existFile.exists()) {
                log.debug("waiting for stock file");
                return;
            }
    
            SequenceMediator seq = (SequenceMediator) synapseEnvironment.getSynapseConfiguration().
                    getSequence(sequenceName);
            if (seq != null) {
                if (log.isDebugEnabled()) {
                    log.debug("injecting message to sequence : " + sequenceName);
                }
    
                try {
    
                    // file format IBM,100,120.50
    
                    BufferedReader reader = new BufferedReader(new FileReader(stockFile));
                    String line;
                    while ((line = reader.readLine()) != null) {
                        line = line.trim();
    
                        if (line.isEmpty()) {
                            continue;
                        }
    
                        String[] split = line.split(",");
                        String symbol = split[0];
                        String quantity = split[1];
                        String price = split[2];
                        MessageContext mc = synapseEnvironment.createMessageContext();
                        mc.setTo(new EndpointReference("http://localhost:9000/soap/SimpleStockQuoteService"));
                        mc.setSoapAction("urn:placeOrder");
                        mc.setProperty("OUT_ONLY", "true");
                        OMElement placeOrderRequest = createPlaceOrderRequest(symbol, quantity, price);
                        PayloadHelper.setXMLPayload(mc, placeOrderRequest);
                        synapseEnvironment.injectAsync(mc, seq);
                        log.info("placed order symbol:" + symbol + " quantity:" + quantity + " price:" + price);
                    }
                    reader.close();
                } catch (IOException e) {
                    throw new SynapseException("error reading file", e);
                }
            }
            // Copy the existing file to the same directory and rename it with timestamp appended to the file name
            File newFile = new File(stockFile.replace(".txt", "") + "." + System.currentTimeMillis() + ".txt");
            try {
                Files.copy(existFile.toPath(), newFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                log.error("Error while copying the file", e);
                throw new SynapseException("Error while copying the file", e);
            }
            log.debug("PlaceStockOrderTask end");
        }
    
        public static OMElement createPlaceOrderRequest(String symbol, String qty, String purchPrice) {
            OMFactory factory = OMAbstractFactory.getOMFactory();
            OMNamespace ns = factory.createOMNamespace("http://services.samples/xsd", "m0");
            OMElement placeOrder = factory.createOMElement("placeOrder", ns);
            OMElement order = factory.createOMElement("order", ns);
            OMElement price = factory.createOMElement("price", ns);
            OMElement quantity = factory.createOMElement("quantity", ns);
            OMElement symb = factory.createOMElement("symbol", ns);
            price.setText(purchPrice);
            quantity.setText(qty);
            symb.setText(symbol);
            order.addChild(price);
            order.addChild(quantity);
            order.addChild(symb);
            placeOrder.addChild(order);
            return placeOrder;
        }
    
        public void destroy() {}
    
        public void init(SynapseEnvironment synapseEnvironment) {
            this.synapseEnvironment = synapseEnvironment;
        }
    
        public SynapseEnvironment getSynapseEnvironment() {
            return synapseEnvironment;
        }
    
        public void setSynapseEnvironment(SynapseEnvironment synapseEnvironment) {
            this.synapseEnvironment = synapseEnvironment;
        }
    
        public void setSequenceName(String sequenceName) {
            this.sequenceName = sequenceName;
        }
    
        public void setInjectTo(String injectTo) {
            this.injectTo = injectTo;
        }
    
        public String getStockFile() {
            return stockFile;
        }
    
        public void setStockFile(String stockFile) {
            this.stockFile = stockFile;
        }
    }
    ```

3.  In the **Project Explorer**, double-click on the **pom.xml** file and replace its source with the below content.

    ```xml
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <groupId>org.wso2.task</groupId>
        <artifactId>StockQuoteTask</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <repositories>
            <repository>
                <id>wso2.releases</id>
                <name>WSO2 internal Repository</name>
                <url>https://maven.wso2.org/nexus/content/repositories/releases/</url>
                <releases>
                    <enabled>true</enabled>
                    <updatePolicy>daily</updatePolicy>
                    <checksumPolicy>ignore</checksumPolicy>
                </releases>
            </repository>
        </repositories>
        <dependencies>
            <dependency>
                <groupId>org.apache.synapse</groupId>
                <artifactId>synapse-core</artifactId>
                <version>4.0.0-wso2v99</version>
            </dependency>
        </dependencies>
    </project>
    ```

### Write the custom Task

#### Step 1: Write the Task Class

You can create a custom task class, which implements the `org.apache.synapse.startup.Task` interface as follows. This interface has a single `execute()` method, which contains the code that will be executed according to the defined schedule.

The `execute()` method contains the following actions:

1.  Check whether the file exists at the desired location.
2.  If it does, then read the file line by line composing place order messages for each line in the text file.
3.  Individual messages are then injected into the Synapse environment, targeting the specified sequence as defined by the `InjectTo` property in the task configuration.
4.  Set each message as `OUT_ONLY` since it is not expected any response for messages.

In addition to the `execute()` method, it is also possible to make the class implement a `JavaBean` interface.

Also, add the following dependency to the POM file of the custom task project: `Apache Synapse - Core` (groupId: `org.apache.synapse`, artifactId: `synapse-core`).
        
This is a bean implementing three properties: StockFile, InjectTo and Sequence. These are used to configure the task.

**Implementing `ManagedLifecycle` for Initialization and Clean-up**

Since a task implements `ManagedLifecyle` interface, the Micro Integrator will call the `init()` method at the initialization of a `Task` object and `destroy()` method when a `Task` object is destroyed:

```java
public interface ManagedLifecycle {
    public void init(SynapseEnvironment se);
    public void destroy();
}
```

The `PlaceStockOrderTask` stores the Synapse environment object reference in an instance variable for later use with the `init()` method. The `SynapseEnvironment` is needed for injecting messages into the ESB.

#### Step 2: Customize the Task

It is possible to pass values to a task at runtime using property
    elements. In this example, the location of the stock order file and
    its address was given using two properties within the
    `             Task            ` object:

-   **String type**
-   **OMElement type**

!!! Info
    For **OMElement** type, it is possible to pass XML elements as
        values in the configuration file.
    
When creating a `             Task            ` object, the ESB will
    initialize the properties with the given values in the configuration
    file.

```java
public String getStockFile() {
    return stockFile;
}
public void setStockFile(String stockFile) {
    this.stockFile = stockFile;
}
```

For example, the following properties in the `Task` class are initialized with the given values within the property element of the task in the configuration.

```xml
<syn:property xmlns="http://ws.apache.org/ns/synapse" name="stockFile" value="/path/to/stock.txt"/>
```

For those properties given as XML elements, properties need to be defined within the `Task` class using the format given below. OMElement comes from [Apache AXIOM](http://ws.apache.org/commons/axiom/), which is used by the Micro Integrator. AXIOM is an object model similar to DOM. To learn more about AXIOM, see the tutorial in the [AXIOM user guide](http://ws.apache.org/axiom/userguide/userguide.html).

```java
public void setMessage(OMElement elem) {
    message = elem;
}
```

It can be initialized with an XML element as follows:

```xml
<property name="message">
    <m0:getQuote xmlns:m0="http://services.samples/xsd">
    <m0:request>
    <m0:symbol>IBM</m0:symbol>
    </m0:request>
    </m0:getQuote>
</property>
```

### Deploy the custom Task implementation

To deploy the custom Task implementation, you need to copy the JAR file of the Maven project to the `<MI_HOME>/lib` directory. Or else you can copy the JAR file to the `deployment/lib` directory of your project.

## Create the Task

Follow the steps below to create the task and schedule it.

1. [Create an Integration project]({{base_path}}/develop/create-integration-project) named `PrintStockQuote`.
2. [Create an address endpoint]({{base_path}}/develop/creating-artifacts/creating-endpoints/) named `SimpleStockQuoteServiceEndpoint` with the URI `http://localhost:9000/soap/SimpleStockQuoteService`.  
3. [Create a Sequence]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences) named `PrintStockQuoteSequence`.  
4. Add a [Call Mediator]({{base_path}}/reference/mediators/call-mediator/) by selecting the `SimpleStockQuoteServiceEndpoint` as the endpoint.
5. Add a [Log Mediator]({{base_path}}/reference/mediators/log-mediator/) with the log level set to `full` and provide `,` as the log separator. The graphical view of the sequence is as follows:

    ![]({{base_path}}/assets/img/integrate/custom-task-scheduling/119130458/119130461.png)

    The below is the complete source configuration of the Sequence (i.e., the `PrintStockQuoteSequence.xml` file):
 
6. [Create a Scheduled Task]({{base_path}}/develop/creating-artifacts/creating-scheduled-task) using the following information:
    <table>
        <tr>
            <th>Task Property</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Task Name</td>
            <td><code>PrintStockQuoteScheduledTask </code></td>
        </tr>
        <tr>
            <td>Count</td>
            <td>1</td>
        </tr>
        <tr>
            <td>Interval (in seconds)</td>
            <td>5</td>
        </tr>
        <tr>
            <td>Message inject destination</td>
            <td><code>sequence</code></td>
        </tr>
        <tr>
            <td>Sequence name</td>
            <td><code>PrintStockQuoteSequence</code></td>
        </tr>
        <tr>
            <td>Task Group</td>
            <td><code>synapse.simple.quartz</code>code></td>
        </tr>
        <tr>
            <td>Task Implementation</td>
            <td><code>org.wso2.task.stockquote.v1.StockQuoteTaskV1</code></td>
        </tr>
        <tr>
            <td>StockFile</td>
            <td>The directory path to the <code>stockfile.txt</code> file.</td>
        </tr>
    </table>

    ![]({{base_path}}/assets/img/integrate/custom-task-scheduling/119130458/119130460.png)

7. Defining the properties of the Task: Open the source view of the **PrintStockQuoteScheduledTask** artifact and replace its source with the below content.

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <task class="org.wso2.task.stockquote.v1.StockQuoteTaskV1" group="synapse.simple.quartz" name="PrintStockQuoteScheduledTask" xmlns="http://ws.apache.org/ns/synapse">
        <trigger count="3" interval="5"/>
        <property xmlns:task="http://www.wso2.org/products/wso2commons/tasks" name="stockFile" value="/Users/gabilan/json_data/stockfile.txt"/>
        <property xmlns:task="http://www.wso2.org/products/wso2commons/tasks" name="injectTo" value="sequence"/>
        <property xmlns:task="http://www.wso2.org/products/wso2commons/tasks" name="sequenceName" value="PrintStockQuoteSequence"/>
    </task>
    ```
    The task properties will change according to the custom implementation. Therefore, you need to enter values for your custom properties. This sets the below properties.

    <table>
    <thead>
    <tr class="header">
    <th>Parameter Name</th>
    <th>Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><pre><code>stockFile</code></pre></td>
    <td>The directory path to the <code>stockfile.txt</code> file.</td>
    </tr>
    <tr class="even">
    <td><pre><code>synapseEnvironment</code></pre></td>
    <td>Do not enter a value. This will be used during runtime.</td>
    </tr>
    </tbody>
    </table>

    !!! Note
        Currently, you cannot set properties of a custom task using the **Design View** due to a [known issue](https://github.com/wso2/product-ei/issues/2551), which will be fixed in future versions.

The below is the complete source configuration of this project:  

=== "PrintStockQuoteSequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence name="PrintStockQuoteSequence" trace="disable" xmlns="http://ws.apache.org/ns/synapse">
        <call>
            <endpoint key="SimpleStockQuoteServiceEndpoint"/>
        </call>
        <log category="INFO" level="full" separator=","/>
        <drop/>
    </sequence>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockQuoteServiceEndpoint" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/soap/SimpleStockQuoteService"/>
    </endpoint>
    ```
=== "PrintStockQuoteScheduledTask"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <task class="org.wso2.task.stockquote.v1.StockQuoteTaskV1" group="synapse.simple.quartz" name="PrintStockQuoteScheduledTask" xmlns="http://ws.apache.org/ns/synapse">
        <trigger count="3" interval="5"/>
        <property xmlns:task="http://www.wso2.org/products/wso2commons/tasks" name="stockFile" value="/path/to/stockfile.txt"/>
        <property xmlns:task="http://www.wso2.org/products/wso2commons/tasks" name="injectTo" value="sequence"/>
        <property xmlns:task="http://www.wso2.org/products/wso2commons/tasks" name="sequenceName" value="PrintStockQuoteSequence"/>
    </task>
    ```

## Deploy the Task

In order to deploy and run the project, refer the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test the Custom Task

### Start the back-end service

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

### Create the text file

Create a text file named `stockfile.txt` with the following content and save it to a preferred location on your machine. This will include the information to be read by the scheduled task to pass to the backend service.

**stockfile.txt**

```xml
IBM,100,120.50
MSFT,200,70.25
SUN,400,60.758
```

!!! Info
    Each line in the text file contains details for a stock order:
    -   `symbol`
    -   `quantity`
    -   `price`

A task that is scheduled using this custom implementation will read the text file, a line at a time, and create orders using the given values to be sent to the back-end service. 
The text file will then be tagged as processed to include a system time stamp. The task will be scheduled to run every 5 seconds for a total of 3 times as per the configuration.

### View the output

You will view the stock quotes sent by the backend service printed every 5 seconds by the scheduled task in the below format.

```bash
INFO - StockQuoteTask placed order symbol:IBM quantity:100 price:120.50
```

![]({{base_path}}/assets/img/integrate/custom-task-scheduling/119130458/119130459.png)
