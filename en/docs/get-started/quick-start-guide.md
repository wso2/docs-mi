# Quick Start Guide

Let's get started with WSO2 Micro Integrator by running a simple integration use case in your local environment. 

## Prerequisites

1. Install Java SE Development Kit (JDK) version 11 or 17.
2. In the environment variables, set the `JAVA_HOME` environment variable.

    !!! Info
        For more information on setting the `JAVA_HOME` environment variable for different operating systems, see the [Install and Setup]({{base_path}}/install-and-setup/install/installing-mi) documentation.

3. Go to the [WSO2 Micro Integrator web page](https://wso2.com/integration/micro-integrator/#), click **Download**, and then click **Zip Archive** under the 'Latest Release' section to download the Micro Integrator distribution as a ZIP file.
4. Extract the ZIP file. The extracted folder will be referred as the `<MI_HOME>` folder.
5. In the Visual Studio Code install the Micro Integrator extension.
6. Download the [sample files]({{base_path}}/assets/attachments/quick-start-guide/mi-qsg-home.zip). From this point onwards, let's refer to this directory as `<MI_QSG_HOME>`.
7. Download [curl](https://curl.haxx.se/) or a similar tool that can call an HTTP endpoint.

## What you'll build

This is a simple service orchestration scenario. The scenario is about a basic healthcare system where the Micro Integrator is used to integrate two back-end hospital services to provide information to the client.

Most healthcare centers have a system that is used to make doctor appointments. To check the availability of the doctors for a particular time, users typically need to visit the hospitals or use each and every online system that is dedicated to a particular healthcare center. Here, we are making it easier for patients by orchestrating those isolated systems for each healthcare provider and exposing a single interface to the users.

<a href="{{base_path}}/assets/img/integrate/quick-start-guide/mi-quick-start-guide.png"><img src="{{base_path}}/assets/img/integrate/quick-start-guide/mi-quick-start-guide.png"></a>

!!! Tip
    You may open the` <MI_QSG_HOME>/HealthcareIntegrationProject` in Visual Studio Code to view the project structure.

In the above scenario, the following takes place:

1. The client makes a call to the Healthcare API created using Micro Integrator.

2. The Healthcare API calls the Pine Valley Hospital back-end service and gets the queried information.

3. The Healthcare API calls the Grand Oak Hospital back-end service and gets the queried information.

4. The response is returned to the client with the required information.

Both Grand Oak Hospital and Pine Valley Hospital have services exposed over the HTTP protocol.

The Pine Valley Hospital service accepts a POST request in the following service endpoint URL.

```bash
http://<HOST_NAME>:<PORT>/pineValley/doctors
```

The Grand Oak Hospital service accepts a GET request in the following service endpoint URL.

```bash
http://<HOST_NAME>:<PORT>/grandOak/doctors/<DOCTOR_TYPE>
```

The expected payload should be in the following JSON format:

```bash
{
        "doctorType": "<DOCTOR_TYPE>"
}
```

Let’s implement a simple integration solution that can be used to query the availability of doctors for a particular category from all the available healthcare centers.


### Step 1 - Set up the workspace

The following software and configurations are required to proceed with this tutorial:

1. Navigate to the `<MI_QSG_HOME>` directory. 
The following project files and executable back-end services are available in the `<MI_QSG_HOME>`.

    - **HealthcareIntegrationProject**: This folder contains the integration artifacts for the healthcare service. This service consists of the following REST API:

        <img src="{{base_path}}/assets/img/integrate/quick-start-guide/qsg-api.png">

        <details>
                    <summary>HealthcareAPI.xml</summary>
                ```xml
                <?xml version="1.0" encoding="UTF-8"?>
                    <api context="/healthcare" name="HealthcareAPI" xmlns="http://ws.apache.org/ns/synapse">
                    <resource methods="GET" uri-template="/doctor/{doctorType}">
                        <inSequence>
                            <clone>
                                <target>
                                <sequence>
                                    <call>
                                        <endpoint key="GrandOakEndpoint"/>
                                    </call>
                                </sequence>
                                </target>
                                <target>
                                <sequence>
                                    <payloadFactory media-type="json" template-type="default">
                                        <format>{ "doctorType": "$1" }</format>
                                        <args>
                                            <arg expression="$ctx:uri.var.doctorType" evaluator="xml"/>
                                        </args>
                                    </payloadFactory>
                                    <call>
                                        <endpoint key="PineValleyEndpoint"/>
                                    </call>
                                </sequence>
                                </target>
                            </clone>
                            <aggregate id="">
                                <completeCondition timeout="0">
                                <messageCount max="{-1}" min="{-1}"/>
                                </completeCondition>
                                <onComplete aggregateElementType="root" expression="json-eval($.doctors.doctor)"></onComplete>
                            </aggregate>
                            <respond/>
                        </inSequence>
                        <faultSequence>
                        </faultSequence>
                    </resource>
                    </api>
                ```    
        </details>

    - **Backend**: This contains an executable .jar file that contains mock back-end service implementations for the Pine Valley Hospital and Grand Oak Hospital.


### Step 2 - Running the integration artifacts

First you need to open the `<MI_QSG_HOME>/HealthcareIntegrationProject` folder in VS Code. There are two main options to build and run the integration scenario.

#### Option 1: Using the Visual Studio Code


1. Click on the Command Palette on the top of the VS Code.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/command-palette.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/command-palette.png" alt="Command palette" width="70%"></a>

2. Type `>` to show the available commands.

3. Select **MI: Add MI server**.

4. Select **Add MI server**.

5. Select the folder where `<MI_HOME>` is located. This wll be set as the **current server path**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/current-server-path.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/current-server-path.png" alt="Current server path" width="50%"></a>

6. Run the project.

    !!! tip "Use one of the following two options to build and run the project:"
        **Option 1**
    
        1. Click on the Command Palette on the top of the VS Code.
        2. Type `>` to show the available commands.
        3. Select **MI: Build and Run**.
    
        **Option 2**
    
        Click the **Build and Run** icon located on the top right corner of the VS Code.

        <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-run.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-run.png" alt="Build and run" width="25%"></a>

#### Option 2: Using a local Micro Integrator instance

1. Export the artifacts as a deployable CAR file:

    a. Go to the MI Overview pane using the **Home** icon.
    
    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/home-icon.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/home-icon.png" alt="Home icon" width="25%"></a>
    
    b. Click the **Build** icon located in the top right corner of VS Code.
    
    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-export.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-export.png" alt="Build and export" width="25%"></a>
    
    c. Click the **Export** icon next to the **Build** icon.
    
    d. Select a destination to export the `.car` file.
    
    e. Once you select a folder, the artifacts will be exported as a deployable CAR file to that location.

2. Deploy the Healthcare service: Copy the exported CAR file of the Healthcare service to the `<MI_HOME>/repository/deployment/server/carbonapps` directory.

3. Start the Micro Integrator:

    a. Open a terminal and navigate to the `<MI_HOME>/bin` folder.  
    b. Execute one of the commands given below.   

    === "On MacOS/Linux"
        ```bash 
        ./micro-integrator.sh
        ```         
    === "On Windows"
        ```bash 
        micro-integrator.bat
        ```

### Step 4 - Observe deployed artifacts

Once you have deployed the artifacts and started the Micro Integrator server, you can [install]({{base_path}}/install-and-setup/install/installing-mi-dashboard) and [start the Micro Integrator Dashboard]({{base_path}}/install-and-setup/install/running-the-mi-dashboard) to observe details of the deployed artifacts.

Once you have started the dashboard server, access the dashboard using the following sign in details.

| Username | Password |
|----------|----------|
| admin    | admin    |

Once you sign in, click the required artifact type to view details.

### Step 5 - Testing the integration service

Now, let's test the integration service.

#### Start back-end services

Let's start the mock back-end services for this use case:
 
1. Open a terminal, navigate to the `<MI_QSG_HOME>/Backend`, and execute the following command to start the services:

    ```bash
    java -jar DoctorInfo.jar
    ```

#### Invoke the Healthcare service

1. Invoke the healthcare service.

    Open a terminal and execute the following curl command to invoke the service:

    ```bash
    curl -v http://localhost:8290/healthcare/doctor/Ophthalmologist
    ```

    Upon invocation, you should be able to observe the following response:

    ```bash
    {
        "doctors": {
            "doctor": [
                {
                    "name": "John Mathew",
                    "time": "03:30 PM",
                    "hospital": "Grand Oak"
                },
                {
                    "name": "Allan Silvester",
                    "time": "04:30 PM",
                    "hospital": "Grand Oak"
                }
            ]
        }
    }
    ```
    **Congratulations!**
    Now you have created your first integration service. Optionally, you can follow the steps given below to expose the service as a Managed API in API Manager.

   
## What's next?

- [Develop your first integration solution]({{base_path}}/get-started/development-kickstart/).
- [Learn more]({{base_path}}/learn/learn-overview/).
