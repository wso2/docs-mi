# Managing Integrations with apictl

WSO2 API Controller, **apictl** allows you to monitor the Synapse artifacts (deployed in a specified Micro Integrator server) and perform various management and administration tasks from the command line.

## Download and initialize the apictl

1.  Download **apictl** based on your preferred platform (i.e., Mac, Windows, Linux).

    - [For Mac with Intel Chip](https://github.com/wso2/product-apim-tooling/releases/download/v4.2.2/apictl-4.2.2-darwin-amd64.tar.gz)
    - [For Mac with Apple Silicon](https://github.com/wso2/product-apim-tooling/releases/download/v4.2.2/apictl-4.2.2-darwin-arm64.tar.gz)
    - [For Linux 32-bit](https://github.com/wso2/product-apim-tooling/releases/download/v4.2.2/apictl-4.2.2-linux-i586.tar.gz)
    - [For Linux 64-bit with AMD processor](https://github.com/wso2/product-apim-tooling/releases/download/v4.2.2/apictl-4.2.2-linux-amd64.tar.gz)
    - [For Linux 64-bit with ARM processor](https://github.com/wso2/product-apim-tooling/releases/download/v4.2.2/apictl-4.2.2-linux-arm64.tar.gz)
    - [For Windows 32-bit](https://github.com/wso2/product-apim-tooling/releases/download/v4.2.2/apictl-4.2.2-windows-i586.zip)
    - [For Windows 64-bit](https://github.com/wso2/product-apim-tooling/releases/download/v4.2.2/apictl-4.2.2-windows-x64.zip)

2.  Extract the downloaded archive of the apictl to the desired location.
3.  Navigate to the working directory where the executable apictl resides.
4.  Add the current working directory to your system's `$PATH` variable to be able to access the executable from anywhere.
5.  Execute the following command to start the apictl.

    !!! Warn
        If you have previously used an apictl old version, backup and remove `/home/<user>/.wso2apictl` directory and reconfigure the environments using the commands as explained below in [Add an environment](#add-an-environment) section.

    ``` go
    apictl
    ```

    The directory structure for the configuration files (`<USER_HOME>/.wso2apictl`) will be created upon the execution of the `apictl` command.

    !!! Tip
        If you want to change the default location for the .wso2apictl directory, set an environment variable (**APICTL_CONFIG_DIR**) as follows with the path for the desired location.

        ```go tab="Linux/Mac"
        export APICTL_CONFIG_DIR="/home/wso2user/CLI"
        ```

        ```go tab="Windows"
        set APICTL_CONFIG_DIR=C:\Users\wso2user\CLI
        ```


    !!! Tip    
        For further instructions, execute the following command.
        
        ``` go
        apictl --help
        ```

## Global flags for apictl

The following are some global flags that you can use with any apictl command.

``` go
--verbose
    Enable verbose logs (Provides more information on execution)
--insecure, -k
    Allow connections to SSL sites without certs
--help, -h
    Display information and example usage of a command
```

## Check the version of the apictl

Run the following apictl command to check the version.

-   **Command**
    ```bash
    apictl version
    ```
-   **Response**

    ```bash
    Version: 4.2.2
    Build Date: 2023-09-12 06:59:52 UTC
    ```
## Set proxy environment variables for apictl

You can set proxy related `HTTP_PROXY`, `HTTPS_PROXY`, `http_proxy`, and `https_proxy` standard environment variables, with or without basic authentication as shown below to send the requests initiated from CTL via a proxy server. After one of the following environment variables is set in your environment where CTL is used, all the requests will go through the proxy server specified.

-   **Formats**

    ``` bash tab="Without Basic Authentication"
    export HTTP_PROXY="http://<host-name>:<port>"

    export HTTPS_PROXY="https://<host-name>:<port>"

    export http_proxy="http://<host-name>:<port>"

    export https_proxy="https://<host-name>:<port>"
    ```

    ``` bash tab="With Basic Authentication"
    export HTTP_PROXY="http://<username>:<password>@<host-name>:<port>"

    export HTTPS_PROXY="https://<username>:<password>@<host-name>:<port>"

    export http_proxy="http://<username>:<password>@<host-name>:<port>"

    export https_proxy="https://<username>:<password>@<host-name>:<port>"
    ```

-   **Examples**

    ``` bash tab="Without Basic Authentication"
    export HTTP_PROXY="http://localhost:3128"

    export HTTPS_PROXY="https://localhost:3128"

    export http_proxy="http://localhost:3128"

    export https_proxy="https://localhost:3128"
    ```

    ``` bash tab="With Basic Authentication"
    export HTTP_PROXY="http://testuser:password@localhost:3128"

    export HTTPS_PROXY="https://testuser:password@localhost:3128"

    export http_proxy="http://testuser:password@localhost:3128"

    export https_proxy="https://testuser:password@localhost:3128"
    ```

## Add an environment
        
You can add environments by either manually editing the `<USER_HOME>/.wso2apictl/main_config.yaml` file or by running the following apictl command.

``` go
apictl add env <environment-name>
```

1.  Make sure that the WSO2 Micro Integrator (WSO2 MI) 4.2.0 version is started and that the 4.2.0 version of apictl is set up.     
For more information, see [Download and Initialize the apictl](#download-and-initialize-the-apictl).
2.  Run the following apictl command to add an environment.

    -   **Command**

        ``` bash
        apictl add env <environment-name> --mi <mi-management-endpoint>
        ```

        !!! info
            **Flags:**
            -    Required :     
                `--mi` : Management endpoint of the Micro Integrator

    -   Adding a WSO2 MI to an environment using `--mi` flag

        !!! example

            ``` bash
            apictl add env dev --mi https://localhost:9164
            ```

    -   **Response**
    
        ``` bash tab="Response Format"
        Successfully added environment '<environment-name>'
        ```

        ``` bash tab="Example Response"
        Successfully added environment 'production'
        ```

## Remove an environment

1.  Make sure that the WSO2 Micro Integrator (WSO2 MI) 4.2.0 version is started and that the 4.2.0 version of apictl is set up.  
For more information, see [Download and Initialize the apictl](#download-and-initialize-the-apictl).
2.  Run the following apictl command to remove an environment.

    -   **Command**

        ```bash
        apictl remove env <environment-name> 
        ``` 
  
        !!! example
            ```bash
            apictl remove env production
            ```

    -   **Response**

        ``` bash tab="Response Format"
        Successfully removed environment '<environment-name>'
        Execute 'apictl add env --help' to see how to add a new environment
        ```

        ``` bash tab="Example Response"
        Successfully removed environment 'production'
        Execute 'apictl add env --help' to see how to add a new environment
        ```

## Get environments

1.  Make sure that the WSO2 Micro Integrator (WSO2 MI) 4.2.0 version is started and that the 4.2.0 version of apictl is set up.    
For more information, see [Download and Initialize the apictl](#download-and-initialize-the-apictl).
2.  Run the following apictl command to list the environments.  

    -   **Command**

        ```bash
        apictl get envs
        ``` 

        !!! info
            **Flags:**  
            
            -    Optional :
                `--format` : pretty-print environments using Go templates 

    -   **Response**

        ``` bash tab="Response Format"
        NAME                  API MANAGER ENDPOINT      REGISTRATION ENDPOINT      TOKEN ENDPOINT     PUBLISHER ENDPOINT       DEVPORTAL ENDPOINT       ADMIN ENDPOINT          MI MANAGEMENT ENDPOINT
        <environment-name>    <APIM-endpoint>           <registration-endpoint>    <token-endpoint>   <Publisher-endpoint>     <DevPortal-endpoint>     <admmin-endpoint>       <mi-management-endpoint>
        ```

        ```bash tab="Example Response"
        NAME         API MANAGER ENDPOINT     REGISTRATION ENDPOINT    TOKEN ENDPOINT                  PUBLISHER ENDPOINT       DEVPORTAL ENDPOINT       ADMIN ENDPOINT             MI MANAGEMENT ENDPOINT
        dev-mi                                                                                                                                                                      https://localhost:9164
        ```

!!! info
    **Before you begin** 

    -  Ensure that WSO2 Micro Integrator is started. See the instructions on [installing the Micro Integrator]({{base_path}}/install-and-setup/install/installing-mi).

    -  Make sure the apictl is downloaded and initialized, if not follow the steps in [Download and Initialize the apictl](#download-and-initialize-the-apictl).

    -  Ensure that the Micro Integrator management endpoint is added to the environment configurations of CTL, before you start working with the following CTL commands. For more information, see [Add an environment](#add-an-environment) section.

## Login to a Micro Integrator

After adding an environment, you can login to the Micro Integrator instance of that environment using credentials.

1.  Run any of the following CTL commands to login to a Micro Integrator.

    -   **Command**

        ```go
        apictl mi login <environment-name> -k
        ```

        ```go
        apictl mi login <environment-name> -u <username> -k
        ```

        ```go
        apictl mi login <environment-name> -u <username> -p <password> -k
        ``` 

        !!! tip
            If you run `apictl mi login <environment-name>` you are prompted to provide both the username and the password.
            If you run `apictl mi login <environment-name> --username <username>`, you are prompted to provide the password.

        !!! info
            **Flags:**
            
            -    Optional :     
                `--username` or `-u` : Username for login  
                `--password` or `-p` : Password for login     
                `--password-stdin` : Get password from stdin  

        !!! example
            ```bash
            apictl mi login dev -k
            ```
            ```bash
            apictl mi login dev -u admin -p admin -k
            ```
            
            ```bash
            apictl mi login dev --username admin --password admin -k
            ```
                 
    -   **Response**

        ``` bash tab="Response Format"
        Logged into MI in '<environment-name>' environment 
        ```

        ```bash tab="Example Response"
        Logged into MI in dev environment
        ```

    !!! warning
        Using `--password` in CTL is not secure. You can use `--password-stdin` instead. For example,
        ```bash
        cat ~/.mypassword | ./apictl mi login dev --username admin --password-stdin -k
        ```          

## Logout from a Micro Integrator

1.  Run the following command to logout from the current session of the Micro Integrator.

    -   **Command** 

        ```go
        apictl mi logout <environment-name>
        ```

        !!! example
            ```go
            apictl mi logout dev
            ```
    
    -   **Response**

        ``` bash tab="Response Format"
        Logged out from MI in '<environment-name>' environment 
        ```

        ```bash tab="Example Response"
        Logged out from MI in dev environment
        ```

## Manage Users

You can view details of users stored in the [external user store]({{base_path}}/install-and-setup/setup/user-stores/managing-users). If you are logged in to the apictl with administrator credentials, you can also add new users, and remove users from the user store.

### Get information about users

1.  List users of the Micro Integrator.

    -   **Command**
        ``` bash
        apictl mi get users -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates  
                `--pattern` or `-p` : Filter users by regex  
                `--role` or `-r` : Filter users by role

        !!! example
            ```bash
            apictl mi get users -e dev
            ```
            ```bash
            apictl mi get users -r admin -e dev
            ```
            ```bash
            apictl mi get users -p *tester* -e dev
            ```

    -   **Response**

        ```go
        USER ID
        admin
        capp-tester
        ```

2.  Get information on a specific user.

    - **Command**
        ``` bash
        apictl mi get users [user-name] -d [domain] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--domain` or `-d` : Domain name of the secondary user store to be searched  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get users capp-tester -d testing.com -e dev
            ```

    - **Response**

        ```go
        Name - TESTING.COM/capp-tester
        Is Admin - false
        Roles - TESTING.COM/tester, Application/applicationRole1
        ```

### Add a new user

You can use the command below to add a new user to a Micro Integrator.

-   **Command**
    ``` bash
    apictl mi add user [user-name] -e <environment>
    ```

    !!! info
        **Flags:**

        -   Required :  
            `--environment` or `-e` : Environment of the Micro Integrator to be searched

    !!! example
        ```bash
        apictl mi add user capp-tester -e dev
        ```

-   **Response**

    ```go
    Adding new user [ capp-tester ] status: Added
    ```
    
!!! note
    To add a new user to a secondary user store, provide the corresponding user store domain when prompted.

### Delete a user

You can use the command below to remove a user from the Micro Integrator.

-   **Command**
    ``` bash
    apictl mi delete user [user-name] -e <environment>
    ```

    !!! info
        **Flags:**

        -   Required :  
            `--environment` or `-e` : Environment of the Micro Integrator
        -   Optional :  
            `--domain` or `-d` : The domain of the secondary user store from which the user should be deleted 

    !!! example
        ```bash
        apictl mi delete user capp-tester -d testing.com -e dev
        ```

-   **Response**

    ```go
    Deleting user [ capp-tester ] status: Deleted
    ```
    
## Manage Roles

The Micro Integrator has limited role support without fine-grained permission tree support as in the Enterprise Integrator.

In Micro Integrator, we have one admin role and all the other roles from primary and secondary user stores are considered non-admin roles.

### Get information about roles

1. List roles of the Micro Integrator.
    - **Command**
        ``` bash
        apictl mi get roles -e <environment>
        ```

        !!! info
            **Flags:**
    
            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched

        !!! example
            ```bash
            apictl mi get roles -e dev
            ```
    
    - **Response**

        ```go
        ROLE
        admin
        primaryRole1
        Application/applicationRole1
        Internal/everyone
        Internal/internalRole1
        TEST.COM/testRole1
        ```
      
2.  Get information on a specific role.
    - **Command**
        ``` bash
        apictl mi get roles [role-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--domain` or `-d` : Domain of the secondary user store to be searched

        !!! example
            ```bash
            apictl mi get roles tester -d testing.com -e dev
            ```
    
    - **Response**

        ```go
        Role Name - TESTING.COM/tester
        Users  - TESTING.COM/capp-tester
        ```
      
!!! note
    To get hybrid roles (application/internal) specify the role type as the domain.

    ```go
    apictl mi get roles tester -d application -e dev
    ```

### Add a new role

- **Command**
    ``` bash
    apictl mi add role [role-name] -e <environment>
    ```

    !!! info
        **Flags:**

        -   Required :  
            `--environment` or `-e` : Environment of the Micro Integrator

    !!! example
        ```bash
        apictl mi add role tester -e dev
        ```
- **Response**

    ```go
    Adding new role [ tester ] status: Added
    ```
  
!!! note
    To add a new role to a secondary user store, provide the corresponding user store domain when prompted.

!!! note
    To add hybrid roles (application/internal) specify the type in the role name.

    ```go
    apictl mi add role internal/InternalRole -e dev
    ```

### Delete a role

- **Command**

    ``` bash
    apictl mi delete role [role-name] -e <environment>
    ```

    !!! info
        **Flags:**

           -   Required :  
               `--environment` or `-e` : Environment of the Micro Integrator
           -   Optional :  
               `--domain` or `-d` : The domain of the secondary user store from which the role should be deleted 

    !!! example
        ```bash
        apictl mi delete role tester -d testing.com -e dev
        ```
- **Response**

    ```go
    Deleting new role [ tester ] status: Deleted
    ```
    
!!! note
    To delete hybrid roles (application/internal) specify the role type as domain.
    ```go
    apictl mi delete role InternalRole -d internal -e dev
    ```

### Assign/revoke roles to/from users

- **Command**

    ``` bash
    apictl mi update user [user-name] -e <environment>
    ```

    !!! info
        **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator

    !!! example
        ```bash
        apictl mi update user capp-tester -e dev
        ```

- **Response**

    ```go
    Added/removed the roles
    ```

!!! note
    Use a space-separated list of role names when entering the added/removed roles 

## Monitor Integration Artifacts

Follow the instructions below to display a list of artifacts or get information about a specific artifact in an environment using CTL:

### Composite Applications (CApps)

1.  List composite applications (CApps) in an environment.

    -   **Command**
        ``` bash
        apictl mi get composite-apps -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get composite-apps -e dev
            ```

    -   **Response**

        ```go
        NAME                            VERSION
        HealthCareCompositeExporter     1.0.0
        FoodServiceCApp                 2.0.0
        ```

2.  Get information on a specific composite application in an environment.

    -   **Command**
        ``` bash
        apictl mi get composite-apps [capp-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get composite-apps HealthCareCompositeExporter -e dev
            ```

    -   **Response**

        ```go
        Name - HealthCareCompositeExporter
        Version - 1.0.0
        Artifacts :
        NAME                      TYPE
        sample-local-entry        local-entry
        email-connector           lib
        in-memory-message-store   message-store
        GrandOakEndpoint          endpoint
        sample_seq_template       template
        scheduled-msg-processor   message-processors
        sample_template           template
        HealthcareAPI             api
        sample-sequence           sequence
        PineValleyEndpoint        endpoint
        StockQuoteProxy           proxy-service
        sample-cron-task          task
        httpInboundEP             inbound-endpoint
        ```

### Integration APIs

1.  List integration APIs in an environment.

    -   **Command**
        ``` bash
        apictl mi get apis -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get apis -e dev
            ```

    -   **Response**

        ```go
        NAME              URL
        HealthcareAPI     http://localhost:8290/healthcare
        FoodService       http://localhost:8480/foodservice
        ```

2.  Get information on a specific integration API in an environment.

    -   **Command**
        ``` bash
        apictl mi get apis [api-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get apis HealthcareAPI -e dev
            ```

    -   **Response**

        ```go
        Name - HealthcareAPI
        Version - N/A
        Url - http://localhost:8290/healthcare
        Stats - disabled
        Tracing - disabled
        Resources :
        URL                    METHOD
        /doctor/{doctorType}   [GET]
        /report                [GET]
        ```

### Connectors

1.  List connectors in an environment.

    -   **Command**
        ``` bash
        apictl mi get connectors -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get connectors -e dev
            ```

    -   **Response**

        ```go
        NAME        STATS         PACKAGE                       DESCRIPTION
        email       enabled       org.wso2.carbon.connector     WSO2 email connector library
        ```

### Data Services

1.  List data services in an environment.

    -   **Command**
        ``` bash
        apictl mi get data-services -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get data-services -e dev
            ```

    -   **Response**

        ```go
        NAME                WSDL 1.1                                                WSDL 2.0
        RESTDataService     http://localhost:8290/services/RESTDataService?wsdl     http://localhost:8290/services/RESTDataService?wsdl2
        ```

2.  Get information on a specific data service in an environment.

    -   **Command**
        ``` bash
        apictl mi get data-services [data-service-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get data-services RESTDataService -e dev
            ```

    -   **Response**

        ```go
        Name - RESTDataService
        Group Name - RESTDataService
        Description - Exposing the data service as a REST service.
        WSDL 1.1 - http://localhost:8290/services/RESTDataService?wsdl
        WSDL 2.0 - http://localhost:8290/services/RESTDataService?wsdl2
        Queries :
        ID                  NAMESPACE
        ReadStudents        http://ws.wso2.org/dataservice/ReadStudents
        DeleteStudent       http://ws.wso2.org/dataservice
        ```

### Endpoints

1.  List endpoints in an environment.

    -   **Command**
        ``` bash
        apictl mi get endpoints -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get endpoints -e dev
            ```

    -   **Response**

        ```go
        NAME                    TYPE      ACTIVE
        GrandOakEndpoint        http      true
        PineValleyEndpoint      http      true
        ```

2.  Get information on a specific endpoint in an environment.

    -   **Command**
        ``` bash
        apictl mi get endpoints [endpoint-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get endpoints GrandOakEndpoint -e dev
            ```

    -   **Response**

        ```go
        Name - GrandOakEndpoint
        Type - HTTP Endpoint
        Active - true
        Method - GET
        URI Template - http://localhost:9091/grand/doctors
        ```

### Inbound Endpoints

1.  List inbound endpoints in an environment.

    -   **Command**
        ``` bash
        apictl mi get inbound-endpoints -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get inbound-endpoints -e dev
            ```

    -   **Response**

        ```go
        NAME                 TYPE
        httpInboundEP        http
        ```

2.  Get information on a specific inbound endpoint in an environment.

    -   **Command**
        ``` bash
        apictl mi get inbound-endpoints [inbound-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get inbound-endpoints httpInboundEP -e dev
            ```

    -   **Response**

        ```go
        Name - httpInboundEP
        Type - http
        Stats - enabled
        Tracing - enabled
        Parameters :
        NAME                                   VALUE
        inbound.http.port                      8697
        inbound.worker.pool.size.core          400
        inbound.worker.pool.size.max           500
        inbound.worker.thread.keep.alive.sec   60
        inbound.worker.pool.queue.length       -1
        inbound.thread.id                      PassThroughInboundWorkerPool
        ```

### Local Entries

1.  List local entries in an environment.

    -   **Command**
        ``` bash
        apictl mi get local-entries -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get local-entries -e dev
            ```

    -   **Response**

        ```go
        NAME                    TYPE
        sample-local-entry      Inline Text
        ```

2.  Get information on a specific local entry in an environment.

    -   **Command**
        ``` bash
        apictl mi get local-entries [local-entry-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get local-entries sample-local-entry -e dev
            ```

    -   **Response**

        ```go
        Name - sample-local-entry
        Type - Inline Text
        Value - 0, 1
        ```

### Message Processors

1.  List message processors in an environment.

    -   **Command**
        ``` bash
        apictl mi get message-processors -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get message-processors -e dev
            ```

    -   **Response**

        ```go
        NAME                      TYPE                                     STATUS
        scheduled-msg-processor   Scheduled-message-forwarding-processor   active
        ```

2.  Get information on a specific message processor in an environment.

    -   **Command**
        ``` bash
        apictl mi get message-processors [message-processor-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get message-processors scheduled-msg-processor -e dev
            ```

    -   **Response**

        ```go
        Name - scheduled-msg-processor
        Type - Scheduled-message-forwarding-processor
        File Name - scheduled-msg-processor-1.0.0.xml
        Message Store - in-memory-message-store
        Artifact Container - [ Deployed From Artifact Container: HealthCareCompositeExporter ]
        Status - active
        Parameters :
         client.retry.interval = 1000
         interval = 1000
         is.active = true
         max.delivery.attempts = 4
         max.delivery.drop = Disabled
         max.store.connection.attempts = -1
         member.count = 1
         store.connection.retry.interval = 1000
         target.endpoint = PineValleyEndpoint
         throttle = false
        ```

### Message Stores

1.  List message stores in an environment.

    -   **Command**
        ``` bash
        apictl mi get message-stores -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get message-stores -e dev
            ```

    -   **Response**

        ```go
        NAME                      TYPE                      SIZE
        in-memory-message-store   in-memory-message-store   0
        ```

2.  Get information on a specific message store in an environment.

    -   **Command**
        ``` bash
        apictl mi get message-stores [message-store-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get message-stores in-memory-message-store -e dev
            ```

    -   **Response**

        ```go
        Name - in-memory-message-store
        File Name - in-memory-message-store-1.0.0.xml
        Container - [ Deployed From Artifact Container: HealthCareCompositeExporter ]
        Producer - org.apache.synapse.message.store.impl.memory.InMemoryProducer@3d288f9e
        Consumer - org.apache.synapse.message.store.impl.memory.InMemoryConsumer@5e6443d6
        Size - 0
        Properties :
        No Properties found
        ```

### Proxy Services

1.  List proxy services in an environment.

    -   **Command**
        ``` bash
        apictl mi get proxy-services -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get proxy-services -e dev
            ```

    -   **Response**

        ```go
        NAME                WSDL 1.1                                                WSDL 2.0
        StockQuoteProxy     http://localhost:8290/services/StockQuoteProxy?wsdl     http://localhost:8290/services/StockQuoteProxy?wsdl2
        ```

2.  Get information on a specific proxy service in an environment.

    -   **Command**
        ``` bash
        apictl mi get proxy-services [proxy-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get proxy-services StockQuoteProxy -e dev
            ```

    -   **Response**

        ```go
        Name - StockQuoteProxy
        WSDL 1.1 - http://localhost:8290/services/StockQuoteProxy?wsdl
        WSDL 2.0 - http://localhost:8290/services/StockQuoteProxy?wsdl2
        Stats - disabled
        Tracing - disabled
        ```

### Sequences

1.  List sequences in an environment.

    -   **Command**
        ``` bash
        apictl mi get sequences -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get sequences -e dev
            ```

    -   **Response**

        ```go
        NAME                STATS               TRACING
        fault               disabled            disabled
        main                disabled            disabled
        sample-sequence     disabled            disabled
        ```

2.  Get information on a specific sequence in an environment.

    -   **Command**
        ``` bash
        apictl mi get sequences [sequence-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get sequences sample-sequence -e dev
            ```

    -   **Response**

        ```go
        Name - sample-sequence
        Container - [ Deployed From Artifact Container: HealthCareCompositeExporter ]
        Stats - disabled
        Tracing - disabled
        Mediators - LogMediator, STRING
        ```

### Scheduled Tasks

1.  List scheduled tasks in an environment.

    -   **Command**
        ``` bash
        apictl mi get tasks -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get tasks -e dev
            ```

    -   **Response**

        ```go
        NAME
        sample-cron-task
        CheckPriceTask
        ```

2.  Get information on a specific scheduled task in an environment.

    -   **Command**
        ``` bash
        apictl mi get tasks [task-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get tasks sample-cron-task -e dev
            ```

    -   **Response**

        ```go
        Name - sample-cron-task
        Trigger Type - cron
        Cron Expression - 0 30 1 * * ?
        ```

### Templates

1.  List all templates in an environment.

    -   **Command**
        ``` bash
        apictl mi get templates -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get templates -e dev
            ```

    -   **Response**

        ```go
        NAME                  TYPE
        sample_seq_template   Sequence
        sample_template       Endpoint
        ```

2.  List a specific type of template in an environment.

    -   **Command**
        ``` bash
        apictl mi get templates [template-type] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get templates endpoint -e dev
            ```
            ```bash
            apictl mi get templates sequence -e dev
            ```

    -   **Response**

        ```go
        NAME
        sample_seq_template
        ```

3.  Get information on a specific template in an environment.

    -   **Command**
        ``` bash
        apictl mi get templates [template-type] [template-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched
            -   Optional :  
                `--format` : pretty-print using templates

        !!! example
            ```bash
            apictl mi get templates endpoint sample_template -e dev
            ```

    -   **Response**

        ```go
        Name - sample_template
        Parameters : name, uri
        ```

## Change status of an Artifact

You can use the commands below to activate or deactivate endpoints, message processors or proxy services deployed in a Micro Integrator.

### Endpoint

1.  Activate an endpoint deployed in a Micro Integrator.

    -   **Command**
        ``` bash
        apictl mi activate endpoint [endpoint-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched

        !!! example
            ```bash
            apictl mi activate endpoint GrandOakEndpoint -e dev
            ```

    -   **Response**

        ```go
        GrandOakEndpoint is switched On
        ```

2.  Deactivate an endpoint deployed in a Micro Integrator.

    -   **Command**
        ``` bash
        apictl mi deactivate endpoint [endpoint-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched

        !!! example
            ```bash
            apictl mi deactivate endpoint GrandOakEndpoint -e dev
            ```

    -   **Response**

        ```go
        GrandOakEndpoint is switched Off
        ```

### Message Processor

1.  Activate a message processor deployed in a Micro Integrator.

    -   **Command**
        ``` bash
        apictl mi activate message-processor [message-processor-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched

        !!! example
            ```bash
            apictl mi activate message-processor scheduled-msg-processor -e dev
            ```

    -   **Response**

        ```go
        scheduled-msg-processor : is activated
        ```

2.  Deactivate a message processor deployed in a Micro Integrator.

    -   **Command**
        ``` bash
        apictl mi deactivate message-processor [message-processor-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched

        !!! example
            ```bash
            apictl mi deactivate message-processor scheduled-msg-processor -e dev
            ```

    -   **Response**

        ```go
        scheduled-msg-processor : is deactivated
        ```

### Proxy Service

1.  Activate a proxy service deployed in a Micro Integrator.

    -   **Command**
        ``` bash
        apictl mi activate proxy-service [proxy-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched

        !!! example
            ```bash
            apictl mi activate proxy-service StockQuoteProxy -e dev
            ```

    -   **Response**

        ```go
        Proxy service StockQuoteProxy started successfully
        ```

2.  Deactivate a proxy service deployed in a Micro Integrator.

    -   **Command**
        ``` bash
        apictl mi deactivate proxy-service [proxy-name] -e <environment>
        ```

        !!! info
            **Flags:**

            -   Required :  
                `--environment` or `-e` : Environment of the Micro Integrator to be searched

        !!! example
            ```bash
            apictl mi deactivate proxy-service StockQuoteProxy -e dev
            ```

    -   **Response**

        ```go
        Proxy service StockQuoteProxy stopped successfully
        ```

## Manage Loggers used in Micro Integrator

### Get information on a specific logger

-   **Command**
    ``` bash
    apictl mi get log-levels [logger-name] -e <environment>
    ```

    !!! info
        **Flags:**

        -   Required :  
            `--environment` or `-e` : Environment of the Micro Integrator to be searched
        -   Optional :  
            `--format` : pretty-print using templates

    !!! example
        ```bash
        apictl mi get log-levels org-apache-coyote -e dev
        ```

-   **Response**

    ```go
    NAME                    LOG LEVEL           COMPONENT
    org-apache-coyote       WARN                org.apache.coyote
    ```

### Add a new logger

You can use the command below to add a new logger to a Micro Integrator.

-   **Command**
    ``` bash
    apictl mi add log-level [logger-name] [class-name] [log-level] -e <environment>
    ```

    !!! info
        **Flags:**

        -   Required :  
            `--environment` or `-e` : Environment of the Micro Integrator to be searched

    !!! example
        ```bash
        apictl mi add log-level synapse-api org.apache.synapse.rest.API DEBUG -e dev
        ```

-   **Response**

    ```go
    Successfully added logger for ('synapse-api') with level DEBUG for class org.apache.synapse.rest.API
    ```

### Update a logger

You can use the command below to update the log level of an existing logger.

-   **Command**
    ``` bash
    apictl mi update log-level [logger-name] [log-level] -e <environment>
    ```

    !!! info
        **Flags:**

        -   Required :  
            `--environment` or `-e` : Environment of the Micro Integrator to be searched

    !!! example
        ```bash
        apictl mi update log-level org-apache-coyote DEBUG -e dev
        ```

-   **Response**

    ```go
    Successfully added logger for ('org-apache-coyote') with level DEBUG
    ```

## Download log files

### List available log files

-   **Command**
    ``` bash
    apictl mi get logs -e <environment>
    ```

    !!! info
        **Flags:**

        -   Required :  
            `--environment` or `-e` : Environment of the Micro Integrator to be searched
        -   Optional :  
            `--format` : pretty-print using templates

    !!! example
        ```bash
        apictl mi get logs -e dev
        ```

-   **Response**

    ```go
    NAME                            SIZE
    wso2carbon.log                  429.5 KB
    correlation.log                 0 B
    wso2carbon-trace-messages.log   0 B
    wso2-mi-api.log                 11.9 KB
    patches.log                     15.7 KB
    audit.log                       0 B
    wso2-mi-service.log             10.3 KB
    http_access_.log                35.8 KB
    wso2error.log                   156.2 KB
    ```

### Download a specific log file

-   **Command**
    ``` bash
    apictl mi get logs [file-name] -p [download-location] -e <environment>
    ```

    !!! info
        **Flags:**

        -   Required :  
            `--environment` or `-e` : Environment of the Micro Integrator to be searched

        -   Optional :  
            `--path` or `-p`        : Path the file should be downloaded (default is current executable directory)

    !!! example
        ```bash
        apictl mi get logs wso2carbon.log -p log-files -e dev
        ```

-   **Response**

    ```go
    Log file downloaded to log-files/wso2carbon.log
    ```

## Encrypting Secrets with apictl

**WSO2 API Controller (apictl)** allows you to encrypt a plain-text secret. You can use this feature to export secrets as environment variables, system properties, Docker secrets, or Kubernetes secrets. For more information on using dynamic secrets refer [Dynamic secrets]({{base_path}}/install-and-setup/setup/security/encrypting-plain-text/#dynamic-secrets).


### Initialize apictl with a key store

!!! Note    
    Secret encryption supports only JKS Key Stores.

!!! Note    
    Key Store used in this step needs to be the same Key Store which is used by the WSO2 Micro Integrator (WSO2 MI) to decrypt secrets.

Run the following command to initialize the apictl with the Key Store used to encrypt the secrets. It will prompt you to input the following,

<table>
    <tr>
        <td>Key Store location</td>
        <td>Path to the Key Store used by the WSO2 API-M or WSO2 MI to decrypt secrets</td>
    </tr>
    <tr>
        <td>Key Store password</td>
        <td>The password of the Key Store</td>
    </tr>
    <tr>
        <td>Key alias</td>
        <td>The alias of the key used to encrypt the secrets</td>
    </tr>
    <tr>
        <td>Key password</td>
        <td>The password of the key used to encrypt the secrets</td>
    </tr>
</table>

-   **Command**

    ```go
    apictl secret init
    ```

    !!! example
        ```go
        apictl secret init
        Enter Key Store location: /home/wso2mi-4.2.0/repository/resources/security/wso2carbon.jks
        Enter Key Store password:
        Enter Key alias: wso2carbon
        Enter Key password:
        ```

-   **Response**

    ``` bash
    Key Store initialization completed
    ```

### Encrypt secrets

!!! Note    
    Secret encryption supports only **RSA/ECB/OAEPWithSHA1AndMGF1Padding** (default) or **RSA/ECB/PKCS1Padding** as encryption algorithm.

!!! Note    
    Encrypting algorithm used in this step needs to be the same algorithm used by the WSO2 API-M or WSO2 MI to decrypt secrets.

Run the following command to encrypt secrets with the apictl,

-   **Command**
    ``` bash
    apictl secret create
    ```

    !!! info
        **Flags:**
    
        -   Optional :  
            `--cipher` or `-c`        : Encryption algorithm (default is RSA/ECB/OAEPWithSHA1AndMGF1Padding)    
            `--output` or `-o`        : Get the output in yaml (k8) or properties (file) format. By default the output is printed to the console    
            `--from-file` or `-f`     : Path to the properties file which contains secrets to be encrypted

    -   Encrypt a secret and get output on console

    !!! example

        ``` bash
        apictl secret create
        Enter plain alias for secret:db_password
        Enter plain text secret:
        Repeat plain text secret:
        ```

    -   Response

        ```go
        db_password : eKALmLVA+HFVl7vqLUUhm6o0Vwsap+L6czwyEKWKomX+AcRmOCAHmiujPXPAZUboWJlZi4k0CwZYAvwD4BflbU8j5CCrtESzOlOrkJaJPormf/ViixRbftae2RqaDozPSEp9zSnfDKlKDXRq==
        ```

    -   Encrypt secrets defined in a properties file

        !!! example

            ``` bash
            apictl secret create -f ./keys/secrets.properties
            ```

    -   Response

        ```go
        db_password : JVlyw8j9TQqoPFTQUnKxNoGJn9p4+gGCHkkyHt2jXGVZoe60xndi2GjBJ1roR6667dlynhABXbcv434DFjz3ZI0iRjg1QhJLoXNtttSFl7KtyNDk5VtRMPDqAckheJAJe02KjWgdZXszEzjtBd6o2mY1nipsWBat3cOq0kt==
        admin_password : gPImOAX1zwHu3malMHm0+Zy5WEcfKpUSmxJ2ZXfI3bi1yIZbHjrHUxiY+MKurTWRN8GJ6+EVL==
        ```

    -   Encrypt secrets defined in a properties file and get a .yaml file

        !!! example

            ``` bash
            apictl secret create -o k8 -f ./keys/secrets.properties
            ```

    -   Response

        ```go
        Kubernetes secret file created in apictl/security/wso2-secrets.yaml with default name and namespace
        You can change the default values as required before applying.
        ```


## Monitor transactions

### Transaction Counts

You can use the command below to get information about the inbound transactions received by the Micro Integrator.

-   **Command**
    ``` bash
    apictl mi get transaction-counts -e <environment>
    ```
    ``` bash
    apictl mi get transaction-counts [year] [month] -e <environment>
    ```

    !!! info
        **Flags:**

        -   Required :  
            `--environment` or `-e` : Environment of the Micro Integrator to be searched
        -   Optional :  
            `--format` : pretty-print using templates

    !!! example
        ```bash
        apictl mi get transaction-counts -e dev
        ```
        ```bash
        apictl mi get transaction-counts 2021 01 -e dev
        ```

-   **Response**

    ```go
    YEAR        MONTH       TRANSACTION COUNT
    2021        1           126
    ```

### Transaction Reports

You can use the command below to generate the transaction count summary report based on the inbound transactions received by the Micro Integrator.

-   **Command**
    ``` bash
    apictl mi get transaction-reports [start] [end] -e <environment>
    ```

    !!! info
        **Flags:**

        -   Required :  
            `--environment` or `-e` : Environment of the Micro Integrator to be searched
        -   Optional :  
            `--path` or `-p`        : Path the file should be downloaded (default is current executable directory)

    !!! example
        ```bash
        apictl mi get transaction-reports 2020-05 2020-06 -e dev
        ```
        ```bash
        apictl mi get transaction-reports 2020-05 -e dev -p reports/mi
        ```

-   **Response**

    ```go
    Transaction Count Report created in reports/mi/transaction-count-summary-1610597725520763836.csv
    ```

## Update HashiCorp AppRole Pull secret ID

You can use the command below to update the HashiCorp AppRole Pull secret ID that is used by the Micro Integrator to connect with HashiCorp.

!!! note
    - The HashiCorp secret ID is only applicable when **AppRole Pull** authentication is used between the Micro Integrator and HashiCorp.
    - This command only updates the SecretId for the current session of the Micro Integrator. To persist the Secret Id, you need to update the `deployment.toml` file and restart the Micro Integrator.
    
    See [Using HashiCorp Secrets]({{base_path}}/install-and-setup/setup/security/using-hashicorp-secrets) for details.

-   **Command**
    ``` bash
    apictl mi update hashicorp-secret [secret_id] -e <environment>
    ```

    !!! info
        **Flags:**

        -   Required :  
            `--environment` or `-e` : Environment of the Micro Integrator for which the HashiCorp secret ID should be updated.

    !!! example
        ```bash
        apictl mi update hashicorp-secret 47c39b09-c0a9-6ebf-196e-038eb7aad336 -e dev
        ```

-   **Response**

    ```go
    SecretId value is updated in HashiCorp vault runtime configurations. To persist the new SecretId in the next server startup, please update the deployment.toml file
    ```
