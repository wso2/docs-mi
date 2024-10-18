# Proxy Service Properties
## Introduction

Proxy services are virtual services that receive messages and optionally process them before forwarding them to a service at a given endpoint. This approach allows you to perform necessary transformations and introduce additional functionality without changing your existing service. 

Just as [REST APIs]({{base_path}}/reference/synapse-properties/rest-api-properties) and [Inbound Endpoints]({{base_path}}/reference/synapse-properties/inbound-endpoints/about-inbound-endpoints), the proxy service uses [mediators]({{base_path}}/reference/mediators/about-mediators) and [sequences]({{base_path}}/reference/mediation-sequences) to define the mediation logic for processing messages. You can also enable WS-Security to a proxy service so that it serves as a security gateway to your actual services. 

Any available transport can be used to receive and send messages from the proxy services. A proxy service is externally visible and can be accessed using a URL similar to a normal web service address.

## Properties

See the topics given below for the list of properties that can be configured when [creating a proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service/).

### General properties

Listed below are the main properties that are required when [creating a proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service/) of any type.

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Proxy Service Name</td>
    <td>A unique name for the proxy service.</td>
  </tr>
  <tr>
    <td>Transports</td>
    <td>
      The transport protocols that are used to receive messages. Once you have selected the required transports, you can later add <a href="#service-parameters">service parameters</a> relevant to each transport type.
    </td>
  </tr>
  <tr>
    <td>Target Endpoint</td>
    <td>
      The proxy service uses an <b>Endpoint</b> artifact inline to define the location to which messages should be routed. You can choose one of the following options to specify the endpoint.
      <ul>
        <li>If you have a <a href="{{base_path}}/develop/creating-artifacts/creating-endpoints">predefined <b>Endpoint</b></a> artifact in WSO2 Micro Integrator (WSO2 MI), provide the name of the artifact.</li>
        <li>If you have a predefined <b>Endpoint</b> artifact that is saved in the <a href="{{base_path}}/get-started/key-concepts/#registry">registry</a>, provide the link to the artifact.</li>
      </ul>
      See <a href="{{base_path}}/reference/synapse-properties/endpoint-properties">Endpoint Properties</a> for the complete list of properties you can define for the Endpoint artifact.
    </td>
  </tr>
</table>

### Service parameters

- See the list of transport parameters you can configure at the service level for a proxy service:

    - [JMS properties]({{base_path}}/reference/synapse-properties/transport-parameters/jms-transport-parameters)
    - [MailTo properties]({{base_path}}/reference/synapse-properties/transport-parameters/mailto-transport-parameters)
    - [MQTT properties]({{base_path}}/reference/synapse-properties/transport-parameters/mqtt-transport-parameters)
    - [RabbitMQ properties]({{base_path}}/reference/synapse-properties/transport-parameters/rabbitmq-transport-parameters)
    - [VFS properties]({{base_path}}/reference/synapse-properties/transport-parameters/vfs-transport-parameters)
    - [Fix properties]({{base_path}}/reference/synapse-properties/transport-parameters/fix-transport-parameters)
    - [HL7 properties]({{base_path}}/reference/synapse-properties/transport-parameters/hl7-transport-parameters)

- You can also configure the following service-level property to expose an [Inbound Endpoint]({{base_path}}/reference/synapse-properties/inbound-endpoints/about-inbound-endpoints) through a proxy service:
  <table>
     <tr>
        <th>Service Parameter</th>
        <th>Description</th>
     </tr>
     <tr>
        <td>inbound.only</td>
        <td>
              Whether the proxy service needs to be exposed only via inbound endpoints. If set to <code>true</code> all requests that the proxy service receives via normal transport will be rejected. The proxy service will process only the requests that are received via inbound endpoints.</br></br> The default setting is <code>false</code>.
        </td>
     </tr>
  </table>

- To publish a custom WSDL for a proxy service, select one of the WSDL types.
    <table>
    <thead>
    <tr class="header">
    <th>WSDL Type</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>INLINE</td>
    <td>Enter the WSDL definition in the <strong>WSDL XML</strong> field.</td>
    </tr>
    <tr class="even">
    <td>SOURCE_URL</td>
    <td><p>Enter the URI of the WSDL in the text box, and then click <strong>Test URI</strong> to ensure it is available. A URI consists of a URL and URN. The URL defines the host address of the network resource (can be omitted if resources are not network-homed), and the URN defines the resource name in local "namespaces."</p>
    <p>For example URI = <code>ftp://ftp.dlink.ru/pub/ADSL, w</code> here URL = <code>ftp://ftp.dlink.ru</code> and URN = <code>pub/ADSL</code></p></td>
    </tr>
    <tr class="odd">
    <td>REGISTRY_KEY</td>
    <td><div class="content-wrapper">
    <p>If the WSDL is saved as a registry entry, select this option and choose the reference key of that registry entry from the governance Registry or configuration Registry.</p>
    </div></td>
    </tr>
    <tr class="even">
    <td>ENDPOINT</td>
    <td>-</td>
    </tr>
    </tbody>
    </table>

    Following are additional service parameters you can use to configure the service WSDL.
    <table>
    <thead>
    <tr class="header">
    <th><p>Parameter</p></th>
    <th><p>Description</p></th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p>useOriginalwsdl</p></td>
    <td><div class="content-wrapper">
    <p>If this parameter is set to <code>true</code>, the original WSDL published via the <code>publishWSDL</code> parameter is used instead of the custom WSDL.</p>
    </div></td>
    </tr>
    <tr class="even">
    <td><p>modifyUserWSDLPortAddress</p></td>
    <td><p>If true (default), the port addresses will be modified to the current host. Effective only with <code>useOriginalwsdl=true</code> .</p></td>
    </tr>
    <tr class="odd">
    <td>ApplicationXMLBuilder.allowDTD</td>
    <td>If this parameter is set to true, it enables data type definition processing for the proxy service.<br />
    Data type definition processing is disabled in the Axis2 engine due to security vulnerability. This parameter enables it for individual proxy services.</td>
    </tr>
    <tr class="even">
    <td><p>enablePublishWSDLSafeMode</p></td>
    <td><div class="content-wrapper">
    <p>If this parameter is set to <code>true</code> when deploying a proxy service, even though the WSDL is not available, you can prevent the proxy service from being faulty. However, the deployed proxy service will be inaccessible since the WSDL is not available.</p>
        <p><b>Note</b> that this is only applicable when you publish the WSDL (i.e., via the <code>publishWSDL</code> property) either as a URI or as an endpoint.</p>

    </div></td>
    </tr>
    <tr class="odd">
    <td>showAbsoluteSchemaURL</td>
    <td>If this parameter is set to <code>true</code>, the absolute path of the referred schemas of the WSDL is shown instead of the relative paths.</td>
    </tr>
    <tr class="even">
    <td>showProxySchemaURL</td>
    <td>If this parameter is set to <code>true</code>, the full proxy URL will be set as the prefix to the schema location of the imports in proxy WSDL.</td>
    </tr>
    </tbody>
    </table>

    If your WSDL has dependencies with other resources (schemas or other WSDL documents), you can link them using the **Wsdl Resources** property. You can enter the registry key and the location of the dependent resource: The location is available in the WSDL. When you have the location, you can find the registry key corresponding to the location from the registry.

    In the following example, the WSDL imports a metadata schema from the metadata.xsd file. Therefore, the location is `metadata.xsd`.

    ```xml
    <xsd:import namespace=http://www.wso2.org/test/10 schemaLocation="metadata.xsd" />
    ```

    In the following example, the WSDL is retrieved from the registry using the key `my.wsdl`. This WSDL imports another WSDL from `http://www.standards.org/standard.wsdl`. This dependent WSDL is retrieved from the registry using the `standard.wsdl` registry key.

    ```xml 
    <publishWSDL key="my.wsdl">
        <resource location="http://www.standards.org/standard.wsdl" key="standard.wsdl"/>
    </publishWSDL>
    ```
