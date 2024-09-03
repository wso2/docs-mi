# Quick Start Guide

Let's get started with WSO2 Micro Integrator by running a simple integration use case in your local environment. 

## Prerequisites

The following software and configurations are required to proceed with this tutorial:

- **Visual Studio Code (VS Code):** with the [Micro Integrator for VS Code](https://marketplace.visualstudio.com/items?itemName=WSO2.micro-integrator) extension installed.
- **Java Development Kit (JDK):** Version 11 or 17 is required. Ensure the JDK is properly configured in your system's PATH environment variable.

    !!! Info
        For more information on setting the `JAVA_HOME` environment variable for different operating systems, see the [Install and Setup]({{base_path}}/install-and-setup/install/installing-mi) documentation.

- **Apache Maven:** Ensure Apache Maven is installed and its path is correctly set within the system's PATH environment variable.
- **WSO2 Micro Integrator 4.3.0 Runtime:** Set up WSO2 Micro Integrator 4.3.0 runtime on your machine.
    1. Download the Micro Integrator 4.3.0 distribution as a ZIP file from [here](https://github.com/wso2/micro-integrator/releases/download/v4.3.0/wso2mi-4.3.0.zip).
    2. Extract the ZIP file. Hereafter, this extracted folder will be referred to as the `<MI_HOME>` folder.

After completing the steps above, follow the instructions below to set up the workspace:

1. Launch VS Code with the Micro Integrator extension installed.

2. Click on the Micro Integrator icon on the Activity Bar of the VS Code editor.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png" alt="Mi VS Code Extension" width="80%"></a>

3. Click on the **Command Palette** on the top of the VS Code.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/command-palette.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/command-palette.png" alt="Command palette" width="70%"></a>

4. Type `>` to show the available commands. Alternatively, you can open the command palette in VS Code by entering `Command`+`Shift`+`P` on macOS and `Ctrl`+`Shift`+`P` on Windows.

5. Select **MI: Add MI server** from the list of available commands.

6. Click **Add MI server** to add a Micro Integrator server.

7. Select the folder where `<MI_HOME>` is located. This will be set as the **current server path**.

    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/current-server-path.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/current-server-path.png" alt="Current server path" width="50%"></a>

8. Download the [sample files]({{base_path}}/assets/attachments/quick-start-guide/mi-qsg-home.zip). From this point onwards, let's refer to this directory as `<MI_QSG_HOME>`.

9. Download [curl](https://curl.haxx.se/) or a similar tool that can call an HTTP endpoint.

## What you'll build

This is a simple service orchestration scenario. The scenario is about a basic healthcare system where the Micro Integrator is used to integrate two back-end hospital services to provide information to the client.

Most healthcare centers have a system that is used to make doctor appointments. To check the availability of the doctors for a particular time, users typically need to visit the hospitals or use each and every online system that is dedicated to a particular healthcare center. Here, we are making it easier for patients by orchestrating those isolated systems for each healthcare provider and exposing a single interface to the users.

<a href="{{base_path}}/assets/img/integrate/quick-start-guide/mi-quick-start-guide.png"><img src="{{base_path}}/assets/img/integrate/quick-start-guide/mi-quick-start-guide.png"></a>

!!! Tip
    You may open the` <MI_QSG_HOME>/HealthcareIntegrationProject` in Visual Studio Code to view the project structure.

In the above scenario, the following takes place:

1. The client makes a call to the Healthcare API created using Micro Integrator.

2. The Healthcare API calls the Pine Valley Hospital back-end service to retrieve the requested information.

3. The Healthcare API calls the Grand Oak Hospital back-end service to retrieve the requested information.

4. The response is returned to the client with the required information.

Both Grand Oak Hospital and Pine Valley Hospital have services exposed over the HTTP protocol.

The Pine Valley Hospital service accepts a POST request using the following service endpoint URL.

```bash
http://<HOST_NAME>:<PORT>/pineValley/doctors
```

The Grand Oak Hospital service accepts a GET request using the following service endpoint URL.

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

## Step 1 - Set up the workspace

The following software and configurations are required to proceed with this tutorial:

1. Navigate to the `<MI_QSG_HOME>` directory. 
The following project files and executable back-end services are available in the `<MI_QSG_HOME>`.

    - **HealthcareIntegrationProject**: This folder contains the integration artifacts for the healthcare service. You may open `<MI_QSG_HOME>/HealthcareIntegrationProject` in Visual Studio Code and expand the folders `APIs/HealthcareAPI` and click on the API listed there. This service consists of the following REST API:

        <img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/final-resource-view.png" alt="Final resource view"></a>

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
                            <endpoint key="GrandOakEndpoint" />
                            </call>
                        </sequence>
                        </target>
                        <target>
                        <sequence>
                            <payloadFactory media-type="json">
                            <format>{ "doctorType": "$1" } </format>
                            <args>
                                <arg evaluator="xml" expression="$ctx:uri.var.doctorType" />
                            </args>
                            </payloadFactory>
                            <call>
                            <endpoint key="PineValleyEndpoint" />
                            </call>
                        </sequence>
                        </target>
                    </clone>
                    <aggregate>
                        <completeCondition>
                            <messageCount max="-1" min="-1" />
                        </completeCondition>
                        <onComplete expression="json-eval($.doctors.doctor)">
                            <respond />
                        </onComplete>
                    </aggregate>
                    </inSequence>
                    <faultSequence />
                </resource>
                </api>
                ```
        </details>

    - **Backend**: This contains an executable `.jar` file named `DoctorInfo.jar` that contains mock back-end service implementations for the Pine Valley Hospital and Grand Oak Hospital.

## Step 2 - Run the integration artifacts

First, you need to open the `<MI_QSG_HOME>/HealthcareIntegrationProject` folder in VS Code. There are two main options to build and run the integration scenario.

### Option 1: Use the Visual Studio Code

Click the **Build and Run** icon located in the top right corner of VS Code.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-run.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-run.png" alt="Build and run" width="25%"></a>

### Option 2: Use a local Micro Integrator instance

1. Export the artifacts as a deployable CAR file:

    a. Go to **MI Overview** using the **Home** icon.
    
    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/home-icon.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/home-icon.png" alt="Home icon" width="25%"></a>
    
    b. Click the **Build** icon located in the top right corner of VS Code.
    
    <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-export.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-export.png" alt="Build and export" width="25%"></a>

    c. Select the **Build CAPP** option.

   <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-and-export.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/build-capp-option.png" alt="Build the CAPP" width="25%"></a>

    d. Click the **Export** icon next to the **Build** icon once the build is successful.
    
    e. Select a destination to export the `.car` file.
    
    f. Once you select a folder, the artifacts will be exported as a deployable CAR file to that location.

2. Deploy the Healthcare service: Copy the exported CAR file of the Healthcare service to the `<MI_HOME>/repository/deployment/server/carbonapps` directory.

3. Start the Micro Integrator:

    a. Open a terminal and navigate to the `<MI_HOME>/bin` folder.  
    b. Execute one of the commands given below.   

    === "On MacOS/Linux"
        ```bash 
        sh micro-integrator.sh
        ```         
    === "On Windows"
        ```bash 
        micro-integrator.bat
        ```

## Step 3 - Observe deployed artifacts (Optional)

You can install and start the Integration Control Plane (ICP) to observe details of the deployed artifacts by following the steps below:

1. After deploying the artifacts and starting the Micro Integrator server, stop it before starting the ICP server.

    - If you are running the Micro Integrator runtime [using the Visual Studio Code](#option-1-using-the-visual-studio-code), stop the server using the **Stop** icon.
    
          <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/stop-mi-runtime.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/stop-mi-runtime.png" alt="Build and run" width="25%"></a>
    
    - If you are [using a local Micro Integrator instance](#option-2-using-a-local-micro-integrator-instance), use the below command:


        === "On macOS/Linux"              
            ```bash 
            sh micro-integrator.sh stop
            ```
        === "On Windows"             
            ```bash 
            micro-integrator.bat --stop
            ```

2. Install the Integration Control Plane (ICP) by following the steps below:

     1. Download the [Integration Control Plane]({{base_path}}/install-and-setup/install/installing-integration-control-plane/#installing-the-integration-control-plane_1).

     2. Set up the Micro Integrator: 
   
         1. Open the `deployment.toml` file (stored in the `<MI_HOME>/conf/` directory) of the Micro Integrator. 
         2. Add the following configuration:
      
             ```
             [dashboard_config]
             dashboard_url = "https://localhost:9743/dashboard/api/"
             heartbeat_interval = 5
             group_id = "mi_dev"
             node_id = "dev_node_2"
             ```

3. Start the Integration Control Plane:

     1. Open a command prompt as explained below.

          <table>
                <tr>
                      <th>On <b>Linux/macOS</b></td>
                      <td>Establish an SSH connection to the server, log on to the text Linux console, or open a terminal.</td>
                </tr>
                <tr>
                      <th>On <b>Windows</b></td>
                      <td>Click <b>Start &gt;Run</b>, type <b>cmd</b> at the prompt, and then press <b>Enter</b>.</td>
                </tr>
          </table> 
    
     2. Navigate to the `<ICP_HOME>/bin` folder from your command line.
   
     3. Execute one of the commands given below:

        === "On macOS/Linux"
            ```bash
            sh dashboard.sh
            ```
        === "On Windows"
            ```bash
            dashboard.bat
            ```

4. Next, restart the Micro Integrator server to register itself with the ICP. Follow the same steps you performed in [Step 2](#step-2-running-the-integration-artifacts).

5. Access the Integration Control Plane:

     1. Once you have started the ICP server, access the ICP server using the following URL:

         ```bash
         https://localhost:9743/login
         ```

         <a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/icp-login.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/icp-login.png" alt="ICP login" width="80%"></a>

     2. Use the following sign in details.

        | Username  | Password |
        |-----------|----------|
        | `admin`   | `admin`  |

Once you sign in, click on the required artifact type to view its details.

<a href="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/icp-api-artifacts.png"><img src="{{base_path}}/assets/img/develop/mi-for-vscode/qsg/icp-api-artifacts.png" alt="View API artifacts" width="80%"></a>

## Step 4 - Test the integration service

Now, let's test the integration service.

### Start back-end services

Let's start the mock back-end services for this use case:
 
1. Open a terminal, navigate to the `<MI_QSG_HOME>/Backend`, and execute the following command to start the services:

    ```bash
    java -jar DoctorInfo.jar
    ```

### Invoke the Healthcare service

1. Invoke the healthcare service.

    Open a terminal and execute the following curl command to invoke the service:

    ```bash
    curl -v http://localhost:8290/healthcare/doctor/Ophthalmologist
    ```

    Upon invocation, you should be able to observe the following response:

    ```bash
    [
        [
            {
                "name":"John Mathew",
                "time":"03:30 PM",
                "hospital":"Grand Oak"
            },
            {
                "name":"Allan Silvester",
                "time":"04:30 PM",
                "hospital":"Grand Oak"
            }
        ],
        [
            {
                "name":"John Mathew",
                "time":"07:30 AM",
                "hospital":"pineValley"
            },
            {
                "name":"Roma Katherine",
                "time":"04:30 PM",
                "hospital":"pineValley"
            }
        ]
    ]
    ```
    **Congratulations!**
    Now, you have created your first integration service.

## What's next?

- [Develop your first integration solution]({{base_path}}/get-started/development-kickstart/).
- [Learn more]({{base_path}}/learn/learn-overview/).
