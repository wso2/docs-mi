# Changing the Endpoint of a Deployed Proxy Service

The below sections describe how you can change the endpoint reference of
a deployed proxy service without changing its own configuration. For
example, in this scenario, you have two endpoints to manage two
environments (i.e., Dev and QA). The endpoint URLs for the services
hosted in the Dev and QA environments respectively are as follows:

-   Dev environment: `http://localhost:8290/services/echo`

-   QA environment: `http://localhost:8291/services/echo`

## Creating the Endpoints

You need to create two Endpoint artifacts to represent the Dev and QA environments respectively. Follow the steps given below.

1.  Create two projects as given below.
    <table>
        <tr>
            <th>Project Name</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>HelloWorldDevResources</td>
            <td>The project will store the Endpoint artifact for the <b>Dev</b> environment.</td>
        </tr>
        <tr>
            <td>HelloWorldQAResources</td>
            <td>The project will store the Endpoint artifact for the <b>QA</b> environment.</td>
        </tr>
    </table>
2.  Create two Endpoint artifacts in two projects with the following configurations:

    -   `HelloWorldDevResources` project
        <table>
            <tr>
                <th>Endpoint Parameter</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Endpoint Name</td>
                <td><code>HelloWorldEP</code></td>
            </tr>
            <tr>
                <td>Endpoint Type</td>
                <td>Address Endpoint</td>
            </tr>
            <tr>
                <td>Address URL</td>
                <td><code>http://localhost:8290/services/echo</code></td>
            </tr>
        </table>

    -   `HelloWorldQAResources` project
        <table>
            <tr>
                <th>Endpoint Parameter</th>
                <th>Value</th>
            </tr>
            <tr>
                <td>Endpoint Name</td>
                <td><code>HelloWorldEP</code></td>
            </tr>
            <tr>
                <td>Endpoint Type</td>
                <td>Address Endpoint</td>
            </tr>
            <tr>
                <td>Address URL</td>
                <td><code>http://localhost:8291/services/echo</code></td>
            </tr>
        </table>

## Creating the Proxy Service

1.  Create a project named **HelloWorldServices**.
2.  Create a proxy service in the HelloWorldServices project with the following configurations:

    | Parameter             | Value                                                                                              |
    |--------------------|----------------------------------------------------------------------------------------------------|
    | Proxy Service Name | <code>HelloWorldProxy</code>                                                                                    |
    | Proxy Service Type | Select Pass Through Proxy                                                                          |
    | Endpoint           | Select HelloWorldEP (You need to select **Predefined Endpoint** from the endpoint options listed.) |

The project setup is now complete. 

## Creating the composite application projects

Create two composite application projects to package the QA artifacts and Dev artifacts separately. The proxy service and the Dev endpoint must go in its own CApp, and the proxy service and the QA endpoint should be in another CApp as shown below.

See the instructions on packaging artifacts into CApps.

<table>
        <tr>
            <th>Environment</th>
            <th>CApp Name</th>
            <th>Artifacts Included</th>
        </tr>
        <tr>
            <td>Dev</td>
            <td><code>HelloWorldDevCApp</code></td>
            <td>
                <code>HelloWorldServices</code> project and the
                <code>HelloWorldDevResources</code> project.
            </td>
        </tr>
        <tr>
            <td>QA</td>
            <td><code>HelloWorldQACApp</code></td>
            <td>
                <code>HelloWorldServices</code> project and the
                <code>HelloWorldQAResources</code> project.
            </td>
        </tr>
</table>

Your CApp projects are now ready to be deployed to the Micro Integrator.

## Deploying the Dev composite application

If you have an instance of WSO2 Micro Integrator setup as your Dev environment, deploy the <b>HelloWorldDevCApp</b> CApp in the server.

## Testing the Dev environment

Use the following request body when invoking the service:

``` 
<body>
        <p:echoInt xmlns:p="http://echo.services.core.carbon.wso2.org">
            <!--0 to 1 occurrence-->
            <in>50</in>
        </p:echoInt>
</body>
```

## Changing the endpoint reference

Follow the steps below to change the endpoint reference of the **HelloWorldProxy** you deployed, to point it to the QA environment, without changing its configuration.

1.  Set a port offset by changing the following configuration in the `MI_HOME/conf/deployment.toml` file.

    ```toml
    offset=2
    ```
2.  Undeploy the **HelloWorldDevCApp,** deploy the **HelloWorldQACApp** and re-start the Micro Integrator.

## Testing the QA environment

Use the following request body when invoking the service:

```xml 
<body>
    <p:echoInt xmlns:p="http://echo.services.core.carbon.wso2.org">
        <!--0 to 1 occurrence-->
        <in>100</in>
    </p:echoInt>
</body>
```

## Changing an endpoint reference

Once the endpoint has been created, you can update it using any one of the options listed below. The options below describe how you can update the endpoint value for QA environment.

### Option 1: Using WSO2 MI VS Code Extension

1. Open the `HelloWorldEP` endpoint form from the WSO2 MI VS Code extension **Project Overview** page and update the URL with the QA URL.

2. Click on the **Build** button on the top right corner of the **Project Overview** page to build the Carbon Application.
   <img src="{{base_path}}/assets/img/develop/build-car.png" alt="build car file" width="700">
   
3. The resulting CAR file will be stored in the `<Workspace>/HelloWorldQAResources/target` folder and it can be deployed in the MI server.

### Option 2: From Command Line

1. Open a Terminal window and navigate to
    `          <WORKSPACE>/HelloWorldQAResources/src/main/wso2mi/artifacts/endpoints/HelloWorldEP.xml         `
    file.
2. Edit the HelloWorldEP.xml (e.g. using gedit or vi) under
    HelloWorldResources/QA and replace the URL with the QA one.

    ``` 
    ...
    <address uri="http://192.168.1.110:9773/services/HelloService/"/>
    ...
    ```

3. Navigate to `<Workspace>/HelloWorldQAResources` and build the project using the following command:

    ``` 
    mvn clean install
    ```

4. The resulting CAR file will be stored in the `<Workspace>/HelloWorldQAResources/target` folder and it can be deployed in the MI server.

!!! Note
    -   To build the projects using the above commands, you need an active network connection.
    -   Creating a Maven Multi Module project that contains the above projects, allows you to projects in one go by simply building the parent Maven Multi Module project.

### Option 3: Using a Script

Alternatively you can have a CAR file with dummy values for the endpoint URLs and use a customized shell script or batch script. The script
created would need to do the following:

1.  Extract the CAR file.
2.  Edit the URL values.
3.  Re-create the CAR file with new values.

The resulting CAR file can be deployed in the QA MI server.
