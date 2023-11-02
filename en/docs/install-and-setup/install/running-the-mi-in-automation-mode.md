# Running the Micro Integrator in Automation Mode

Micro Integrator can run on automation mode where it triggers, runs and stops an integration job on demand.

## Before you begin

- [Download and install]({{base_path}}/install-and-setup/install/installing-mi) the Micro Integrator.
- Download the relevant [WSO2 Integration Studio](https://wso2.com/integration/integration-studio/) based on your operating system.


## Design the integration

1. Open WSO2 Integration Studio.

2. [Create an Integration Project]({{base_path}}/develop/create-integration-project)
3. Create a sequence with your integration scenario.
4. Define the configured sequence as a main sequence for the composite application.
   <img src="{{base_path}}/assets/img/setup-and-install/select-main-sequence.png" title="Select Main Sequence" width="700" alt="Select Main Sequence"/>

   <img src="{{base_path}}/assets/img/setup-and-install/configure-main-sequence.png" title="Add Main Sequence" width="700" alt="Add Main Sequence"/>
5. Deploy the composite application.

## Starting the MI in Automation Mode

Follow the steps given below to start the server.

1.    Open a command prompt as explained below.

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

2.    Navigate to the `<MI_HOME>/bin` folder from your command line.
3.    Execute one of the commands given below.

   -   To start in autimation Mode:

       ```bash tab="On macOS/Linux"
       sh micro-integrator.sh --car <composite_application_name>
       ```

       ```bash tab="On Windows"
       micro-integrator.bat --car <composite_application_name>
       ```
       For example:

       ```bash tab="On macOS/Linux"
       sh micro-integrator.sh --car TaskExecutingServiceCompositeExporter
       ```

       ```bash tab="On Windows"
       micro-integrator.bat --car TaskExecutingServiceCompositeExporter
       ```
