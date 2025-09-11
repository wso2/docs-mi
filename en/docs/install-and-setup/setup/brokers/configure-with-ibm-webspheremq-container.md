# Connecting to IBM WebSphere MQ Docker image

!!! Info 
    We have tested these steps on IBM WebSphere MQ version 9.4 container image.

## Prerequisites

-   Pull the matching IBM MQ container image for your OS and run it.

    Example
    ```bash
    docker run -d --name ibm-mq -p 1414:1414 -p 9443:9443 -e LICENSE=accept -e MQ_QMGR_NAME=QM1 -e MQ_APP_PASSWORD=admin_password ibmcom/mq:latest
    ```
    
-   If you need a arm64 compatible image, you have to build the image using following steps since IBM MQ does not provide a arm64 compatible image.
    1.  Clone the IBM MQ container repository.
        ```bash
        git clone https://github.com/ibm-messaging/mq-container.git
        ```
    2.  Change the directory to the cloned repository.
        ```bash  
        cd mq-container
        ```
    3.  Checkout the latest tag.
        ```bash
        git checkout v9.4.3.0-r1
        ``` 
    4.  Build the docker image
        ```bash
        make build-devserver COMMAND=docker
        ```
    5. Run the dockerimage.
        ```bash
        docker run  --env LICENSE=accept  --env MQ_QMGR_NAME=QM1 --env  MQ_ADMIN_PASSWORD=passw0rd  --publish 1414:1414  --publish 9443:9443  ibm-mqadvanced-server-dev:9.4.3.0-r1-arm64
        ```

### Creating queue in IBM WebSphere MQ

1.  Access the IBM WebSphere MQ console by navigating to the URL `http://localhost:9443/ibmmq/console` in your web browser. Log in using the credentials you set when running the container.
2.  Navigate to the **Manage** view of the queue manager and select the **Queues** tab.
3.  Click on the **Create +** button to create a new queue.
    ![Create Queue]({{base_path}}/assets/img/integrate/broker-configs/ibm-websphere-mq/create-queue.jpg)
4.  Select **Local** queue type, provide `queue1` as the name and click on the **Create** button.

### Generating the .bindings file

1. Download the <a href="{{base_path}}/assets/attachments/install-and-setup/mq-bindings-generator.zip">MQ bindings generator project</a> and extract the contents.
2. Open the Java project in your favorite IDE and change the required detials in the code. ex: host, port, queue, channel, queue manager name, etc.

    !!! Note
        We can use the default `DEV.ADMIN.SVRCONN` channel for testing purposes.

3. Follow the instructions in the `README.md` file to generate the `.bindings` file.

### Configuring the WSO2 Integrator: MI

!!! Info
    -   **If you are using Windows Operating Systems (e.g., Windows 10)** ,
        mention the `.bindings` file location starting with `file:///         ` format, in the deployment.toml file. 

        `parameter.provider_url = "file:///G:/jndidirectory"`

1.  Add the following configurations to enable the two JMS listeners.

    ```toml
    [[transport.jms.listener]]
    name = "myQueueConnectionFactory1"
    parameter.initial_naming_factory = "com.sun.jndi.fscontext.RefFSContextFactory"
    parameter.provider_url = "file:/G:/jndidirectory"
    parameter.connection_factory_name = "myQueueConnectionFactory"
    parameter.connection_factory_type = "queue"
    parameter.username = "admin"
    parameter.password = "passw0rd"

    [[transport.jms.listener]]
    name = "default"
    parameter.initial_naming_factory = "com.sun.jndi.fscontext.RefFSContextFactory"
    parameter.provider_url = "file:/G:/jndidirectory"
    parameter.connection_factory_name = "myQueueConnectionFactory"
    parameter.connection_factory_type = "queue"
    parameter.username = "admin"
    parameter.password = "passw0rd"
    ```

2.  Add the following configurations to enable the two JMS senders.

    ```toml
    [[transport.jms.sender]]
    name = "myQueueConnectionFactory1"
    parameter.initial_naming_factory = "com.sun.jndi.fscontext.RefFSContextFactory"
    parameter.provider_url = "file:/G:/jndidirectory"
    parameter.connection_factory_name = "myQueueConnectionFactory"
    parameter.connection_factory_type = "queue"
    parameter.username = "admin"
    parameter.password = "passw0rd"

    [[transport.jms.sender]]
    name = "default"
    parameter.initial_naming_factory = "com.sun.jndi.fscontext.RefFSContextFactory"
    parameter.provider_url = "file:/G:/jndidirectory"
    parameter.connection_factory_name = "myQueueConnectionFactory"
    parameter.connection_factory_type = "queue"
    parameter.username = "admin"
    parameter.password = "passw0rd"
    ```

### Copying IBM WebSphere MQ libraries

Follow the instructions below to build and install IBM WebSphere MQ client JAR files to WSO2 Integrator: MI.

!!! Info
    These instructions are tested on IBM WebSphere MQ version 9.4 However, you can follow them for other versions appropriately.

1.  Create a new directory named `wmq-client` , and then create another new directory named `lib` inside it.

2.  Copy the following JAR files resides in `/opt/mqm/java/lib` location of the IBM MQ docker container to the `lib` directory you created in the previous step.
    
    !!! Info      
        You can use the docker cp command to copy the files from the container to your local machine. For example:
        ```bash
        docker cp <container_id>:/opt/mqm/java/lib/com.ibm.mq.allclient.jar <local_path>/wmq-client/lib
        ```
   
    !!! Note
        If you are using IBM MQ 8 with Mutual SSL enabled, you need to download the [wmq-client-8.0.0.zip]({{base_path}}/assets/attachments/install-and-setup/wmq-client-8.0.0.zip)
        file and follow the instructions in the readme.txt file.

    -   `             com.ibm.mq.allclient.jar            `
    -   `             fscontext.jar            `
    -   `             jms.jar            `
    -   `             providerutil.jar            `

3.  Create a `pom.xml` file inside the `wmq-client` directory and add all the required dependencies as shown in the example below. 

    ```xml
    <?xml version="1.0"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>wmq-client</groupId>
    <artifactId>wmq-client</artifactId>
    <version>9.4</version>
    <packaging>bundle</packaging>
    <dependencies>
        <dependency>
            <groupId>com.ibm</groupId>
            <artifactId>fscontext</artifactId>
            <version>9.4</version>
            <scope>system</scope>
            <systemPath>${basedir}/lib/fscontext.jar</systemPath>
        </dependency>
        <dependency>
            <groupId>com.ibm</groupId>
            <artifactId>providerutil</artifactId>
            <version>9.4</version>
            <scope>system</scope>
            <systemPath>${basedir}/lib/providerutil.jar</systemPath>
        </dependency>
        <dependency>
            <groupId>com.ibm</groupId>
            <artifactId>allclient</artifactId>
            <version>9.4</version>
            <scope>system</scope>
            <systemPath>${basedir}/lib/com.ibm.mq.allclient.jar</systemPath>
        </dependency>
        <dependency>
            <groupId>javax.jms</groupId>
            <artifactId>jms</artifactId>
            <version>1.1</version>
            <scope>system</scope>
            <systemPath>${basedir}/lib/jms.jar</systemPath>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.felix</groupId>
                <artifactId>maven-bundle-plugin</artifactId>
                <version>6.0.0</version>
                <extensions>true</extensions>
                <configuration>
                    <instructions>
                        <Bundle-SymbolicName>${project.artifactId}</Bundle-SymbolicName>
                        <Bundle-Name>${project.artifactId}</Bundle-Name>
                        <Export-Package>*;-split-package:=merge-first</Export-Package>
                        <Private-Package/>
                        <Import-Package/>
                        <Embed-Dependency>*;scope=system;inline=true</Embed-Dependency>
                        <DynamicImport-Package>*</DynamicImport-Package>
                    </instructions>
                </configuration>
            </plugin>
        </plugins>
    </build>
    </project>
    ```

4.  Navigate to the `wmq-client` directory using your Command Line Interface (CLI), and execute the following
    command, to build the project: `mvn clean install`

    !!! Note
        This build requires Java 17 or later.

5.  Stop the WSO2 Integrator: MI, if it is already running.
6.  Remove any existing IBM MQ client JAR files from the `MI_HOME/dropins` directory and the `MI_HOME/lib` directory.
7.  Copy the `<wmq-client>/target/wmq-client-9.4.jar`
    file to the `MI_HOME/dropins` directory.
8.  Download the [`jta.jar` file from the maven repository](https://repo1.maven.org/maven2/javax/transaction/jta/1.1/jta-1.1.jar), and copy it to the `MI_HOME/lib` directory.
9. Start the WSO2 Integrator: MI server.

### Deploying JMS listener proxy service

In this section, the following simple proxy service is deployed to listen to the `queue1` queue. When a message is published in this queue, the proxy service would pull the message out of the queue and log it.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<proxy name="MyJMSProxy" startOnLoad="true" transports="jms" xmlns="http://ws.apache.org/ns/synapse">
  <target>
    <inSequence>
      <log>
        <message>Received message on MyJMSProxy : ${payload}</message>
      </log>
      <drop/>
    </inSequence>
  </target>
  <parameter name="transport.jms.ContentType">
    <rules>
      <jmsProperty>contentType</jmsProperty>
      <default>application/json</default>
    </rules>
  </parameter>
  <parameter name="transport.jms.Destination">queue1</parameter>
  <parameter name="transport.jms.ConnectionFactory">myQueueConnectionFactory1</parameter>
  <parameter name="transport.jms.DestinationType">queue</parameter>
</proxy>
```

### Testing the proxy service

Open IBM MQ console and select the queue `queue1` that you created earlier.

![Select the queue]({{base_path}}/assets/img/integrate/broker-configs/ibm-websphere-mq/select-queue.jpg)

Click on the **Create +** button to publish a message to the queue.

![Publish Message to Queue]({{base_path}}/assets/img/integrate/broker-configs/ibm-websphere-mq/publish-message.jpg)

Then you will get the following log in the WSO2 Integrator: MI.

```
[2025-07-18 13:34:34,358]  INFO {LogMediator} - {proxy:MyJMSProxy} Received message on MyJMSProxy : {"Hello":"world"}
```
