# SAP JCo Connector Reference

The following operations allow you to work with the SAP JCo Connector. Click an operation name to see parameter details and samples on how to use it.

## Connection configuration

The SAP JCo connection represents an SAP JCo client used to call RFC-enabled function modules and to send IDocs. In the 'Properties' section of each operation, you can configure the connection. Once a connection is created, it can be reused across operations.

??? note "Connection configuration"
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>Connection Name</td>
            <td>A unique name used to identify the connection.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>configDataType</td>
            <td>How the connection is configured. <code>DestinationConfig</code> exposes the common SAP logon parameters as individual fields. <code>map</code> lets you supply raw JCo property keys as a JSON object. Accepted values: <code>DestinationConfig</code>, <code>map</code>. The default value is <code>DestinationConfig</code>.</td>
            <td>Yes</td>
        </tr>
    </table>

    **When `configDataType` is `DestinationConfig`:**

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>ashost</td>
            <td>The SAP application server host name.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>sysnr</td>
            <td>The SAP system number.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>jcoClient</td>
            <td>The SAP client number.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>user</td>
            <td>The SAP logon user name.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>passwd</td>
            <td>The SAP logon password.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>lang</td>
            <td>The SAP logon language (for example, <code>EN</code>).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>group</td>
            <td>The SAP logon group for load balancing.</td>
            <td>No</td>
        </tr>
    </table>

    **When `configDataType` is `map`:**

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>configMap</td>
            <td>A JSON object of raw JCo property key-value pairs. Use this to supply settings not covered by the <code>DestinationConfig</code> fields (for example, <code>jco.client.ashost</code>, <code>jco.client.sysnr</code>, <code>jco.client.client</code>, <code>jco.client.user</code>, <code>jco.client.passwd</code>).</td>
            <td>Yes</td>
        </tr>
    </table>

    **Advanced:**

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>destinationId</td>
            <td>A unique identifier for the JCo destination registered for this client. If not provided, a value is generated automatically.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sap_jco.init>
        <connectionType>sap_jco_Client</connectionType>
        <configDataType>DestinationConfig</configDataType>
        <config_ashost>10.128.0.1</config_ashost>
        <config_sysnr>00</config_sysnr>
        <config_jcoClient>100</config_jcoClient>
        <config_user>JCOTESTER</config_user>
        <config_passwd>SECRET</config_passwd>
        <config_lang>EN</config_lang>
    </sap_jco.init>
    ```

---

## Operations

### execute

??? note "execute"
    The `execute` operation calls an RFC-enabled function module (including BAPIs) on the SAP system and returns the response.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>functionName</td>
            <td>The name of the RFC-enabled function module to call.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>importParameters</td>
            <td>Scalar values and structures sent to SAP as import parameters.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>tableParameters</td>
            <td>Named tables sent to SAP as table parameters, where each entry maps a table parameter name to its rows. Provided as JSON.</td>
            <td>No</td>
        </tr>
        <tr>
            <td>returnType</td>
            <td>The data type of the operation response. Accepted values: <code>RfcRecord</code>, <code>xml</code>, <code>json</code>. The default value is <code>RfcRecord</code>.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sap_jco.execute configKey="SAP_CONNECTION">
        <functionName>TEST_FUNCTION</functionName>
        <importParameters>{"importParam1": "Hello", "importParam2": 123}</importParameters>
        <returnTypeDataType>json</returnTypeDataType>
        <responseVariable>sapExecuteResult</responseVariable>
        <overwriteBody>false</overwriteBody>
    </sap_jco.execute>
    ```

---

### sendIDoc

??? note "sendIDoc"
    The `sendIDoc` operation sends an IDoc to the SAP system over tRFC, including TID creation and confirmation.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>iDoc</td>
            <td>The IDoc to send, in XML format.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>iDocType</td>
            <td>The IDoc version/type indicator passed to JCo. Accepted values: <code>I</code>, <code>Q</code>, <code>3</code>, <code>2</code>, <code>0</code>. The default value is <code>0</code>.</td>
            <td>No</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <sap_jco.sendIDoc configKey="SAP_CONNECTION">
        <iDoc>{${payload}}</iDoc>
        <iDocType>0</iDocType>
        <responseVariable>sapSendIDocResult</responseVariable>
        <overwriteBody>false</overwriteBody>
    </sap_jco.sendIDoc>
    ```

---

### close

??? note "close"
    The `close` operation releases the JCo destination registered for this client. Call it when the client is no longer needed, to free the destination ID for reuse. Calling this operation more than once is safe.

    This operation takes no input parameters other than the connection.

    **Sample configuration**

    ```xml
    <sap_jco.close configKey="SAP_CONNECTION">
        <responseVariable>sapCloseResult</responseVariable>
        <overwriteBody>false</overwriteBody>
    </sap_jco.close>
    ```
