# How to Process a File

## What you'll build

This sample demonstrates how to pick a file from a folder and process it within the Micro Integrator. In this sample scenario, you pick a file from the local directory, insert the records in the file to a database, send an email with the file content, trace and write the log, and finally move the file to another directory.

<!--
The result of the query should be as follows when you query to view the records in the `test.info` table. You will see that there is no data in the table.
-->

## Let's get started!

### Step 1: Set up the workspace

Install the [Micro Integrator VS Code](https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator) extension.

Let's setup a MySQL database:

1.  Manually set up the database.
2.  Create a table named `info` in your schema. You
    can run the following commands to do this.

    ```java
    delimiter $$

    CREATE TABLE `info` (
      `name` varchar(45) DEFAULT '',
      `surname` varchar(45) DEFAULT NULL,
      `phone` varchar(45) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8$$
    ```

3.  Make sure the `info` table is created and that it contains the following columns:
    -   **name**
    -   **surname**
    -   **phone**

### Step 2: Develop the integration artifacts 

Follow the instructions given in this section to create and configure the required artifacts.

#### Set up the integration project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the **Integration Project**. Set the `FileProcessingService` as the project name.

#### Create the `FileProxy`

1. Create a proxy service named `FileProxy` with the following configuration. See the instructions on [creating a proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service).

    ```xml
    <proxy xmlns="http://ws.apache.org/ns/synapse" name="FileProxy" transports="vfs" startOnLoad="true" trace="disable">
        <target>
            <inSequence>
                <log level="full"/>
                <clone>
                    <target sequence="fileWriteSequence"/>
                    <target sequence="sendMailSequence"/>
                    <target sequence="databaseSequence"/>
                </clone>
            </inSequence>
        </target>
        <parameter name="transport.vfs.ActionAfterProcess">MOVE</parameter>
        <parameter name="transport.PollInterval">15</parameter>
        <parameter name="transport.vfs.MoveAfterProcess">file:///home/username/test/original</parameter>
        <parameter name="transport.vfs.FileURI">file:///home/username/test/in</parameter>
        <parameter name="transport.vfs.MoveAfterFailure">file:///home/username/test/failure</parameter>
        <parameter name="transport.vfs.FileNamePattern">.*.txt</parameter>
        <parameter name="transport.vfs.ContentType">text/plain</parameter>
        <parameter name="transport.vfs.ActionAfterFailure">MOVE</parameter>
    </proxy>
    ```

2.  Edit the proxy service and define the directory to which the original file should be moved after processing.

    ```xml
    <parameter name="transport.vfs.MoveAfterProcess">[file:///home/]<username>/test/original</parameter>
    ```

3.  Edit the proxy service and define where the input file should be placed.

    ```xml
    <parameter name="transport.vfs.FileURI">[file:///home/]<username>/test/in</parameter>
    ```

4.  Edit the proxy service and define the directory to which the file should be moved if an error occurs.

    ```xml
    <parameter name="transport.vfs.MoveAfterFailure">[file:///home/]<username>/test/failure</parameter>
    ```

<img src="{{base_path}}/assets/img/learn/file-processing/file-proxy.png" title="File Proxy." alt="File Proxy"/>

#### Create the `databaseSequence`

Follow the instructions below to create a sequence that can be used to connect to the database to insert data.

1.  Create a sequence named `databaseSequence` with the following configuration. See the instructions on [creating a sequence]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences).

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence xmlns="http://ws.apache.org/ns/synapse" name="databaseSequence">
        <log level="full">
            <property name="sequence" value="before-smooks"/>
        </log>
        <smooks config-key="smooks">
            <input type="text"/>
            <output type="xml"/>
        </smooks>
        <log level="full">
            <property name="sequence" value="after-smooks"/>
        </log>
        <iterate expression="//csv-set/csv-record">
            <target>
                <sequence>
                    <dbreport>
                        <connection>
                            <pool>
                                <driver>com.mysql.cj.jdbc.Driver</driver>
                                <url>jdbc:mysql://localhost:3306/mi</url>
                                <user>user</user>
                                <password>password</password>
                            </pool>
                        </connection>
                        <statement>
                            <sql><![CDATA[insert into INFO values (?, ?, ?)]]></sql>
                            <parameter expression="//csv-record/name/text()" type="VARCHAR"/>
                            <parameter expression="//csv-record/surname/text()" type="VARCHAR"/>
                            <parameter expression="//csv-record/phone/text()" type="VARCHAR"/>
                        </statement>
                    </dbreport>
                </sequence>
            </target>
        </iterate>
    </sequence>
    ```

2.  Specify your database username, password, and URL in the `<pool>` section of the sequence.

#### Create the `fileWriteSequence`

1.  Create a sequence named `fileWriteSequence` with the following configuration. See the instructions on [creating a sequence]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences).

2.  Edit the sequence and define the directory to which the file should be moved.

=== "Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence xmlns="http://ws.apache.org/ns/synapse" name="fileWriteSequence">
        <log level="custom">
            <property name="sequence" value="fileWriteSequence" />
        </log>
        <property xmlns:ns2="http://org.apache.synapse/xsd" name="transport.vfs.ReplyFileName"
            expression="fn:concat(fn:substring-after(get-property('MessageID'), 'urn:uuid:'), '.txt')"
            scope="transport" />
        <property name="OUT_ONLY" value="true"/>
        <call>
            <endpoint key="FileEp" />
        </call>
        <respond />
    </sequence>
    ```
=== "Endpoint"
    ```xml
    <endpoint name="FileEp" xmlns="http://ws.apache.org/ns/synapse">
    <address uri="vfs:file:///home/username/test/out"/>
    </endpoint>
    ```

#### Create the `sendMailSequence`

1.  Create a sequence named `sendMailSequence` with the following configuration. See the instructions on [creating a sequence]({{base_path}}/develop/creating-artifacts/creating-reusable-sequences). 

2. Edit the sequence and define the e-mail address to which the notification should be sent.

=== "Sequence"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <sequence xmlns="http://ws.apache.org/ns/synapse" name="sendMailSequence">
        <log level="custom">
            <property name="sequence" value="sendMailSequence" />
        </log>
        <property name="messageType" value="text/html" scope="axis2" />
        <property name="ContentType" value="text/html" scope="axis2" />
        <property name="Subject" value="File Received" scope="transport" />
        <property name="OUT_ONLY" value="true"/>
        <call>
            <endpoint key="MailEP" />
        </call>
    </sequence>
    ```
=== "Endpoint"
    ```xml
    <endpoint name="MailEp" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="mailto:email@mail.com"/>
    </endpoint>
    ```

#### Create the Smooks configuration

Create a smooks configuration file (for example `smooks-config.xml`) as shown below and save it to a location on your computer. 

```xml
<smooks-resource-list xmlns="http://www.milyn.org/xsd/smooks-1.0.xsd">
  <!--Configure the CSVParser to parse the message into a stream of SAX events. -->
  <resource-config selector="org.xml.sax.driver">
    <resource>org.milyn.csv.CSVReader</resource>
    <param name="fields" type="string-list">name,surname,phone</param>
  </resource-config>
</smooks-resource-list>
```

#### Create a local registry entry

Configure a local entry as shown below. This local entry will be used to refer to the [smooks configuration](#create-the-smooks-configuration).
See the instructions on [creating a local registry configuration]({{base_path}}/develop/creating-artifacts/registry/creating-local-registry-entries).

```xml
<localEntry key="smooks" src="file:resources/smooks-config.xml"/>
```

### Step 4: Configure the Micro Integrator server

1. Add the following server configurations to the `deployment.toml` file in the <MI_HOME>/conf directory.

    -   The **VFS** transport is enabled in the Micro Integrator by default. Enable the [MailTo transport]({{base_path}}/install-and-setup/setup/transport-configurations/configuring-transports/#configuring-the-mailto-transport) for sending the email message as shown below and update the values:

        ```toml
        [[transport.mail.sender]]
        name = "mailto"
        parameter.hostname = "smtp.gmail.com"
        parameter.port = "587"
        parameter.enable_tls = true
        parameter.auth = true
        parameter.username = "demo_user"
        parameter.password = "mailpassword"
        parameter.from = "demo_user@wso2.com"
        ```

        !!! Note
            In this sample, you will not retrieve mail from a mailbox. Therefore, you do not need to enable the mailto transport receiver.

3.  Add the following drivers and libraries to the `<PROJECT_HOME>/deployment/libs` directory.
    -   [MySQL database driver](https://mvnrepository.com/artifact/mysql/mysql-connector-java/8.0.24).
    -   [CSV smooks library](https://github.com/wso2-docs/WSO2_EI/blob/master/Integration-Tutorial-Artifacts/Integration-Tutorial-Artifacts-EI7.1.0/EI7.1.0-file-processing-tutorial-JARS/milyn-smooks-csv-1.2.4.jar).


### Step 5: Build and run the artifacts

To deploy and run the project, refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer to the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-apictl).

### Step 6: Test the use case

#### Create the input file

Create a text file with the following format:

```xml
name_1, surname_1, phone_1
name_2, surname_2, phone_2
```

Save the file in the `.txt` format to the `in` directory that you specified.

#### Analyze the result

The Micro Integrator listens on a local file system directory. When a file is dropped into the `in` directory, the Micro Integrator picks this file.

1.  Make sure the file appears in the `out` directory.
2.  The Micro Integrator inserts the records from the text file to the database. Make sure the data is in the info table. The following screenshot displays the content of the `test.info` table with the data from the file.  
3.  Make sure the original file is moved to the `/home/<username>/test/original` directory.
4.  Make sure the e-mail notification is sent to the email address that is specified. The message should contain the file data. The following screenshot displays a notification received. If you see the error message `Username and Password not accepted` in the logs, you might need to turn on `Allow less secure apps` in your Google account from [here](https://myaccount.google.com/lesssecureapps).
