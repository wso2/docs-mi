# Install both artifacts and deploy a CAR

At the end of this guide both 2.0.0 artifacts are in your project, the server has the Solace client, and a CAR with one inbound endpoint and one connection is deployed and running.

## Steps

1. Put the Solace client into the server. Copy sol-jcsmp 10.30.1 and jzlib 1.1.3\_2 into the lib folder of WSO2 Integrator: MI and restart the server. Both can be fetched from Maven Central:

    ```bash
    mvn dependency:copy -Dartifact=com.solacesystems:sol-jcsmp:10.30.1 -DoutputDirectory=$MI_HOME/lib
    mvn dependency:copy -Dartifact=org.apache.servicemix.bundles:org.apache.servicemix.bundles.jzlib:1.1.3_2 -DoutputDirectory=$MI_HOME/lib
    ```

2. Open the project in VS Code with the MI extension, or create one. In the Add Artifact view choose Event Integration, Solace, for the inbound endpoint, and in a sequence choose the Solace connector operation you need. The extension adds both dependencies to the project's pom. Or add them by hand:

    ```xml
    <dependency>
        <groupId>org.wso2.integration.inbound</groupId>
        <artifactId>mi-inbound-solace</artifactId>
        <version>2.0.0</version>
        <type>zip</type>
    </dependency>
    <dependency>
        <groupId>org.wso2.integration.connector</groupId>
        <artifactId>mi-connector-solace</artifactId>
        <version>2.0.0</version>
        <type>zip</type>
    </dependency>
    ```

3. Create a connection for the connector, a local entry with the broker, the VPN and the credentials, as in [use case 7]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-use-case-publish-with-confirmation/). Create an inbound endpoint as in the [quick start]({{base_path}}/reference/connectors/solace-connector/2.x/solace-2.x-quick-start/).
4. Build the CAR and deploy it: copy it into the carbonapps folder of the server, or run the project from the extension.

## Verify

The log shows the connector's connection initialised with its pool size and the inbound endpoint's first generation started with the queue name. The management API lists the endpoint with status connected or active.

```bash
curl -k -u admin:admin 'https://localhost:9164/management/inbound-endpoints'
```

A missing client library shows as a class not found error for a com.solacesystems class at deploy time: check the lib folder and restart.

## Undo

Remove the CAR from the carbonapps folder. The inbound endpoint drains within drainTimeout and its flow disappears from the broker. The connector's connection closes its sessions and the broker's client list shows none of its names.
