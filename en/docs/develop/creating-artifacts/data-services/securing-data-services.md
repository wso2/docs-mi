# Applying Security to a Data Service

WSO2 supports WS-Security, WS-Policy, and WS-Security Policy
specifications. These specifications define a behavioral model for Web
services. To enable a security policy for a data service, you need to
first create a security policy file, and then add it to the data
service.

## Prerequisites

Be sure to [configure a user store]({{base_path}}/install-and-setup/setup/user-stores/setting-up-a-userstore/) for the Micro Integrator and add the required users and roles.

## Step 1: Create a registry resource module and a security policy as a registry resource

Registry artifacts (such as security policy files) should be stored in a
**Registry Resource** module. Follow the steps given below to create a
module:

1.  Open **MI for VS Code** and create a new project.

2.  Open the MI project view and click the `+` button next to the **Registry**. A form will open to create a new registry resource.

3. Select the **From existing template** option and enter the following details, as shown in the image below.

    | Property          | Value           |
    |-------------------|-----------------|
    | **Resource Name** | `Sample_Policy` |
    | **Artifact Name** | `Sample_Policy` |
    | **Template**      | `WS-Policy`     |
    | **Registry**      | `gov`           |
    | **Registry path** | `ws-policy/`    |

    ![]({{base_path}}/assets/img/integrate/tutorials/data_services/119130577/create-new-registry-resource.png)

4.  Click **Create** and the policy file will be listed in the MI project view.
    1.  You can enable the required security scenario via the source view of the policy file. For example, enable the **Sign and Encrypt** security
        scenario.

    2.  You can also provide encryption properties, signature
        properties, and advanced rampart configurations.

        !!! Info
            **Using role-based permissions?**
        
            For certain scenarios, you can specify user roles. After you select the scenario, scroll to the right to see the **User Roles** button. Either define the user roles inline or retrieve the user roles from the server.
                
        !!! Info
            Make sure the `tokenStoreClass` in the source view of the policy file is `org.wso2.micro.integrator.security.extensions.SecurityTokenStore`.
            In addition, replace the `ServerCrypto` class with `org.wso2.micro.integrator.security.util.ServerCrypto` if present.
        
5.  Save the policy file.

## Step 2: Add the security policy to the data service

Once you have configured the policy file, you can add the security
policy to the data service as explained below.

1.  If you have already created a data service, Open the file using WSO2 Micro Integrator Visual Studio Code extension.

    !!! Tip
        Be sure to update your database credentials in the dataservice file.
    
2.  Once you have opened the data service file, switch to the **Source View** to see 
the source of the data service.

3.  Add the following elements inside the `<data>` element and save the file.
    ```xml
     <policy key="gov:ws-policy/Sample_Policy.xml" />
     <enableSec />
    ```

## Step 3: Package the artifacts

See the instructions on [packaging the artifacts]({{base_path}}/develop/packaging-artifacts) into a composite exporter.

## Step 4: Build and run the artifacts

See the instructions [deploying the artifacts]({{base_path}}/develop/deploy-artifacts).

## Step 5: Test the service

Create a Soap UI project with the relevant security settings and then send the request to the hosted service.

For guidelines on using SoapUI, see [general guidelines on testing with SOAP UI]({{base_path}}/develop/advanced-development/applying-security-to-a-proxy-service/#general-guidelines-on-testing-with-soap-ui).

## Use an encrypted datasource password

When you create a data service for an RDBMS datasource, you have the
option of encrypting the datasource connection password. This ensures
that the password is encrypted in the configuration file (.dbs file) of
the data service.

See the instructions on [encrypting plain-text passwords]({{base_path}}/install-and-setup/setup/security/encrypting-plain-text)

Once you have encrypted the datasource password, you can update the data
service as explained below.

1.  Open the data service and click **Add Datasource** to create a new data source.
    ![]({{base_path}}/assets/img/integrate/tutorials/data_services/add-data-source.png)
2.  Select RDBMS as datasource type and MySQL as database engine. Enter values for datasource identifier, driver class, URL and username as shown in the image below.  
    ![]({{base_path}}/assets/img/integrate/tutorials/data_services/data-source-form.png)
3.  Add the datasource to the data service.
4.  Switch to the source view and add the following element to the datasource `<config>` to use a secret alias for the password.
    ```xml
    <property xmlns:svns="http://org.wso2.securevault/configuration" name="password" svns:secretAlias="Datasource.Password"/>
    ```
