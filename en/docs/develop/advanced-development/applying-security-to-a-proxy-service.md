# Apply Security to a Proxy Service

Follow the instructions below to apply security to a proxy service via the WSO2 Integrator: MI for Visual Studio Code extension (MI for VS Code):

## Prerequisites

[configure a user store]({{base_path}}/install-and-setup/setup/user-stores/setting-up-a-userstore) for the WSO2 Integrator: MI and add the required users and roles.

## Step 1 - Create the security policy file

Follow the instructions below to create a **WS-Policy** resource in your integration project. This will be your security policy file.

1. Follow the steps in [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the Integration Project.  
2. Open the project overview and click on **+ Add Artifact**.  
    [![Add Artifact]({{base_path}}/assets/img/integrate/apply-security/add-ws-policy/add-artifact-option.png)]({{base_path}}/assets/img/integrate/apply-security/119130870/open-project-overview.png)  
3. Click on **+ View More** to expand the list of artifacts.  
    [![View More]({{base_path}}/assets/img/integrate/apply-security/add-ws-policy/view-more-option.png)]({{base_path}}/assets/img/integrate/apply-security/119130870/expand-artifacts-view.png)  
4. Select **Resource** under the **Other Artifacts** section.  
    [![Select Resource]({{base_path}}/assets/img/integrate/apply-security/add-ws-policy/resource-card.png)]({{base_path}}/assets/img/integrate/apply-security/119130870/select-registry-resource.png)  
5. Add the following details in the **Create New Resource** window that opens and click on **Create**.  
    - **Create Options**: Select `From existing template`.
    - **Resource Name**: Enter a name for the resource.
    - **Template Type**: Select `WS-Policy`.
    - **WS-Policy Type**: Select `Sign and Encrypt - X509 Authentication`.
    - **Resource Path**: Provide the resource path where the resource should be saved. 
    
    <a href="{{base_path}}/assets/img/integrate/apply-security/add-ws-policy/create-resource.png"><img src="{{base_path}}/assets/img/integrate/apply-security/add-ws-policy/create-resource.png" width="60%" alt="Create Resource"></a>

6. The created policy file will be listed in the project explorer.  
   [![Resource in Project Explorer]({{base_path}}/assets/img/integrate/apply-security/119130870/119130883.png)]({{base_path}}/assets/img/integrate/apply-security/119130870/119130883.png)  
   You can also find this security policy file under the **Registry Explorer** section in the sidebar. Double-click on the file to open it.  
   [![Registry Explorer]({{base_path}}/assets/img/integrate/apply-security/119130870/registry-explorer.png)]({{base_path}}/assets/img/integrate/apply-security/119130870/registry-explorer.png)

    !!! Note
        If you want to change any other properties, you can edit via the **Source View**.  

7. Edit the policy file in the **Source View** to enable the required security scenario.  
   For example, to enable the **Sign and Encrypt** security scenario, add the following encryption/signature properties to the policy file.
    - **Alias**: `wso2carbon`
    - **Privatestore**: `wso2carbon.jks`
    - **Tenant id**: `-1234`
    - **Truststores**: `wso2carbon.jks`
    - **User**: `wso2carbon`

    The following advanced rampart properties have been added to your policy file by default.

    - **User**: `wso2carbon`
    - **encryptionUser**: `useReqSigCert`
    - **timestampPrecisionInMilliseconds**: `true`
    - **timestampTTL**: `300`
    - **timestampMaxSkew**: `300`
    - **timestampStrict**: `false`
    - **tokenStoreClass**: `org.wso2.carbon.security.util.SecurityTokenStore`
    - **nonceLifeTime**: `300`

!!! Note
    Properties in RampartConfig can be externalized using the `$SYSTEM:PROPERTY_NAME` syntax. The `$SYSTEM:` prefix allows you to retrieve values from environment variables. 
    
    For example, you can use `$SYSTEM:encryptionUser` to retrieve the value of the `encryptionUser` property from the environment.
    ```xml
    <rampart:RampartConfig xmlns:rampart="http://ws.apache.org/rampart/policy">
		<rampart:encryptionUser>$SYSTEM:encryptionUser</rampart:encryptionUser>
		<rampart:timestampPrecisionInMilliseconds>true</rampart:timestampPrecisionInMilliseconds>
		<rampart:timestampTTL>300</rampart:timestampTTL>
		<rampart:timestampMaxSkew>300</rampart:timestampMaxSkew>
		<rampart:timestampStrict>false</rampart:timestampStrict>
		<rampart:tokenStoreClass>org.wso2.micro.integrator.security.extensions.SecurityTokenStore</rampart:tokenStoreClass>
		<rampart:nonceLifeTime>300</rampart:nonceLifeTime>
	</rampart:RampartConfig>
    ``` 

<!--
#### Specifying role-based access?

For certain scenarios, you can specify user roles. After you select the
scenario, scroll to the right to see the **User Roles** button.

![]({{base_path}}/assets/img/integrate/apply-security/119130870/119130874.jpg)

Either define the user roles inline or retrieve the user roles from the server.

-   **Define Inline**
    ![]({{base_path}}/assets/img/integrate/apply-security/119130870/119130872.jpg)

-   **Get from the server**
    ![]({{base_path}}/assets/img/integrate/apply-security/119130870/119130871.jpg)

!!! Info
    By default, the role names are not case sensitive. If you want to make them case sensitive, add the following property in the `<MI_HOME>/conf/deployment.yaml` file.        
     ```toml
     [authorization_manager]
     properties.CaseSensitiveAuthorizationRules = "true"
     ```
-->

## Step 2 - Add the security policy to the proxy service

1.  Add a proxy service to your workspace.

     You can do either one of the following actions for this purpose.

    - [Create a new proxy service]({{base_path}}/develop/creating-artifacts/creating-a-proxy-service)
    - [Import an existing proxy service]({{base_path}}/develop/importing-artifacts)

2.  Click the proxy service on the project explorer to open the design view and click on **Edit** to open the form view.

3. Click on **Advanced Options** and navigate to the **Security** section.

    [![Security tab]({{base_path}}/assets/img/integrate/apply-security/add-ws-policy/advanced-options.png)]({{base_path}}/assets/img/integrate/apply-security/119130870/edit-proxy-service-advanced-options.png)  

4. Select the **Security Enabled** checkbox and click on the **+ Add Policy** to select the security policy file you created in the previous step.

5. Select the security policy file from the drop-down list and click **Save**.

    [![Security Policy]({{base_path}}/assets/img/integrate/apply-security/add-ws-policy/security-section.png)]({{base_path}}/assets/img/integrate/apply-security/119130870/enable-security.png)

## Step 3 - Build and run the artifacts

To deploy and run the project, refer the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Step 4 - Test the service

Create a Soap UI project with the relevant security settings and then send the request to the hosted service.

### General guidelines on testing with SOAP UI

1.  Create a "SOAP Project" in SOAP UI using the WSDL URL of the proxy service.

    Example: `https://localhost:8253/services/SampleProxy?wsdl`

    <img src="{{base_path}}/assets/img/integrate/apply-security/soapui/create-soapui-project.png" width="600">

2.  Double-click on the created SOAP project, click on **WS-Security-Configuration**, **Keystores**, and add the WSO2 keystore.

    <img src="{{base_path}}/assets/img/integrate/apply-security/soapui/create-keystore.jpeg" width="600">
    
3.  Enter the keystore password for the keystore configuration.

4.  Click on **Outgoing WS-Security Configuration**, and add a new policy by specifying a name. 

     The name can be anything.

    <img src="{{base_path}}/assets/img/integrate/apply-security/soapui/create-outgoing-wss-configuration.jpg" width="600">
    
5.  Add the required WSS entries for the created configuration.
   
     What you need add will vary according to the policy you are using. The explanation about adding three main sections is given below.

    - **Adding a Signature**  
    
         <a href="{{base_path}}/assets/img/integrate/apply-security/soapui/adding-signature-entry.jpg"><img src="{{base_path}}/assets/img/integrate/apply-security/soapui/adding-signature-entry.jpg" width="60%" alt="Adding a Signature"></a>
    
    - **Adding a Timestamp**
    
         <a href="{{base_path}}/assets/img/integrate/apply-security/soapui/adding-timestamp-entry.jpg"><img src="{{base_path}}/assets/img/integrate/apply-security/soapui/adding-timestamp-entry.jpg" width="60%" alt="Adding a Timestamp"></a>
    
    - **Adding an Encryption**
    
         <a href="{{base_path}}/assets/img/integrate/apply-security/soapui/adding-encryption-entry.jpg"><img src="{{base_path}}/assets/img/integrate/apply-security/soapui/adding-encryption-entry.jpg" width="60%" alt="Adding an Encryption"></a>
    
    !!! Note
        The order of the WS entries matters. So always add the above one after the other. If you are adding only two sections, you need to maintain the order.
        
6.  Specify the created WS-policy under **Outgoing WSS** at the request **Authorization**.

    <a href="{{base_path}}/assets/img/integrate/apply-security/soapui/invoking-with-out-policy.jpg"><img src="{{base_path}}/assets/img/integrate/apply-security/soapui/invoking-with-out-policy.jpg" alt="Specify the created WS-policy"></a>
   
7.  Invoke the Proxy Service.

    !!! Info

        When defining the Outgoing WS-Security Configuration, you need to pick the WS entries based on your WS policy.

        Eg:

        - A Non Repudiation policy needs only Timestamp and Signature. 
        - A Confidentiality policy needs all three: Timestamp, Signature and Encryption.
        - You do not need to provide an Outgoing WS-Security Configuration for a Username Token policy. Providing the basic auth configuration is enough.
    
        <a href="{{base_path}}/assets/img/integrate/apply-security/soapui/invoking-username-token.jpg"><img src="{{base_path}}/assets/img/integrate/apply-security/soapui/invoking-username-token.jpg"></a>

8.  To decrypt the response, add the Incoming WSS configuration similar to the Outgoing WSS configuration.

    <a href="{{base_path}}/assets/img/integrate/apply-security/soapui/adding-decryption-entry.png"><img src="{{base_path}}/assets/img/integrate/apply-security/soapui/adding-decryption-entry.png" width="60%" alt="Adding Decryption"></a>

9.  Invoke the Proxy Service with Incoming & Outgoing WSS Configuration.

    <a href="{{base_path}}/assets/img/integrate/apply-security/soapui/invoking-with-out-in-policy.png"><img src="{{base_path}}/assets/img/integrate/apply-security/soapui/invoking-with-out-in-policy.png" width="60%" alt="In and Out Policy"></a>
