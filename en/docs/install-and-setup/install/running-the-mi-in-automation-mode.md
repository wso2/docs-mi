# Running the Micro Integrator in Automation Mode

The WSO2 Micro Integrator (MI) runtime has introduced a new automation mode that triggers, runs, and stops an integration job on demand. Paired with the latest capabilities of WSO2 Micro Integrator Visual Studio Code extension (MI for VS Code), this new mode provides developers with a more efficient way to handle integration tasks, especially in cloud-native environments. This documentation outlines how to utilize the automation mode in MI using the WSO2 Micro Integrator Visual Studio Code extension (MI for VS Code).

## Automation mode in MI runtime

WSO2 Micro Integrator runtime offers two operational modes:

- Server Mode: This is the standard operational mode where the WSO2 MI runs as an active integration server, processing incoming requests, and executing mediation sequences.
- Automation Mode: Introduced to cater to the demands of evolving cloud environments, this mode is geared toward short-lived processes, where the Micro Integrator performs tasks without functioning as a continuously running server.

In Automation mode, MI executes the specified automation sequence from start to finish, allowing for efficient task executions without the need for a persistent server process.

## Before you begin

Before you try out the steps in this guide, complete the following:

- [Download and install]({{base_path}}/install-and-setup/install/installing-mi) the latest Micro Integrator.
- Launch Visual Studio Code with the Micro Integrator extension installed.

    !!! info
        Follow the [Install Micro Integrator for VS Code]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode) documentation for a complete installation guide.


## Design the integration

The automation sequence is essential in the automation mode. It serves as the core of your task's integration logic, dictating its execution path. A well-constructed main sequence ensures a consistent and optimal flow for your tasks in the automation mode. Follow the steps below to design the main sequence:

1. [Create an Integration Project]({{base_path}}/develop/create-integration-project).
2. Create a sequence with your integration scenario.
3. Go to **MI Overview** using the Home icon.
4. Under **Sequences**, locate the sequence you defined.
5. Click More Actions (indicated by three dots).
6. Select **Set as automation sequence**.
      
    <a href="{{base_path}}/assets/img/setup-and-install/configure-main-sequence.png"><img src="{{base_path}}/assets/img/setup-and-install/configure-main-sequence.png" alt="Add automation sequence"></a>

    This sequence, designated as the automation sequence, plays a crucial role in guiding the task's operational flow. While Micro Integrator Visual Studio Code extension provides various mediators for assistance, prioritize clarity and efficiency in your logic.

4. [Deploy the artifacts]({{base_path}}/develop/deploy-artifacts) in your Micro Integrator.

## Starting the MI in automation mode

Follow the steps given below to start the server.

1. Open a command prompt as explained below.

      <table>
            <tr>
                  <th>On <b>Linux/macOS</b></td>
                  <td>Establish an SSH connection to the server, log on to the text Linux console, or open a terminal window.</td>
            </tr>
            <tr>
                  <th>On <b>Windows</b></td>
                  <td>Click <b>Start &gt;Run</b>, type <b>cmd</b> at the prompt, and then press <b>Enter</b>.</td>
            </tr>
      </table>     

2. Navigate to the `<MI_HOME>/bin` folder from your command line.
3. Execute one of the commands given below.

    - To start in automation Mode:
        
        === "On macOS/Linux"
            ```bash  
            sh micro-integrator.sh --car <composite_application_name>
            ```
        === "On Windows"
            ```bash 
            micro-integrator.bat --car <composite_application_name>
            ```
        
    - For example:
         
        === "On macOS/Linux"
            ```bash 
            sh micro-integrator.sh --car TaskExecutingServiceCompositeExporter
            ```
        === "On Windows" 
            ```bash 
            micro-integrator.bat --car TaskExecutingServiceCompositeExporter
            ```
        
