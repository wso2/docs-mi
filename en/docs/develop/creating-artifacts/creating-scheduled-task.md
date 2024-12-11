# Create a Scheduled Task

Follow the instructions below to create a Scheduled Task in the Micro Integrator for Visual Studio Code (MI for VS Code) extension.

## Create a scheduled task artifact

{!includes/creating-project.md!}

    Hereafter, this project will be referred to as `<PROJECT_NAME>`.

3. Go to **Micro Integrator Project Explorer** > **Tasks**.

4. Hover over **Tasks** and click the **+** icon that appears.

    This will open the below **Task Form**.

5. Specify values for the [required parameters]({{base_path}}/reference/synapse-properties/scheduled-task-properties) for the scheduled task.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-scheduled-tasks/create-new-scheduled-task.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-scheduled-tasks/create-new-scheduled-task.png" alt="create new scheduled task" width="80%"></a>

The created scheduled task will be available in the **MI Overview** under Tasks.

!!! info
    You can switch to the default Visual Studio Code Explorer to view the folder structure.

    The newly-created task will be stored in the `<PROJECT_NAME>/src/main/wso2mi/artifacts/tasks` folder of your integration project.

## Update configurations

You can later update the task configurations to specify the incoming message that should trigger the task and the destination where the message should be injected.

1. Go to **MI Overview**.

2. Under **Tasks**, select the task you want to edit.

3. This will open the **Task View**.

4. Click the pen icon next to the task name.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-scheduled-tasks/edit-scheduled-task.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-scheduled-tasks/edit-scheduled-task.png" alt="create new scheduled task" width="80%"></a>

5. Update task configurations.

6. Click **Update**.

!!! info
    See the [Scheduled Tasks Property Catalog]({{base_path}}/reference/synapse-properties/scheduled-task-properties/) documentation for a list of all available configurations for tasks.

!!! abstract "Learn more about scheduled tasks"

    Follow our examples on scheduled tasks:     

    - [Task Scheduling using a Simple Trigger]({{base_path}}/learn/examples/scheduled-tasks/task-scheduling-simple-trigger)
    - [Inject Messages to a RESTful Endpoint]({{base_path}}/learn/examples/scheduled-tasks/injecting-messages-to-rest-endpoint)

    Follow our tutorial on scheduled tasks:

    - [Periodically execute an integration process]({{base_path}}/learn/integration-tutorials/using-scheduled-tasks) using a scheduled task
