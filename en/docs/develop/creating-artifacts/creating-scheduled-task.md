# Create Scheduled Tasks

Follow the instructions below to create a Scheduled Task in the Micro Integrator for Visual Studio Code extension (MI for VS Code).

## Instructions

### Create the scheduled task artifact

{!includes/creating-project.md!}

3. Go to **Micro Integrator Project Explorer** > **Tasks**.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-scheduled-tasks/create-tasks.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-scheduled-tasks/create-tasks.png" alt="create tasks" width="30%"></a>

4. Hover over **Tasks** and click the **+** icon that appears.

    <a href="{{base_path}}/assets/img/learn/tutorials/add-task.png"><img src="{{base_path}}/assets/img/learn/tutorials/add-task.png" alt="Add Task" width="30%"></a>

    This will open the below **Task Form**.

5. Specify values for the [required parameters]({{base_path}}/reference/synapse-properties/scheduled-task-properties) for the scheduled task.

    <a href="{{base_path}}/assets/img/develop/create-artifacts/create-scheduled-tasks/create-new-scheduled-task.png"><img src="{{base_path}}/assets/img/develop/create-artifacts/create-scheduled-tasks/create-new-scheduled-task.png" alt="create new scheduled task" width="80%"></a>

    The scheduled task is created in the `src/main/wso2mi/artifacts/tasks` folder under the project you created.

### Update properties

You can later update the task properties to specify the incoming message that should trigger the task and the destination where the message should be injected.

Open the above-created task artifact from the **MI Project Explorer**. You can use the **Form view** or the **Source view** to update task properties.

!!! info
    Refer to the [Scheduled Tasks Property Catalog]({{base_path}}/reference/synapse-properties/scheduled-task-properties/) documentation for a list of all available properties for tasks.

!!! abstract "Learn more about scheduled tasks"

    Follow our examples on scheduled tasks:     

    - [Task Scheduling using a Simple Trigger]({{base_path}}/learn/examples/scheduled-tasks/task-scheduling-simple-trigger)
    - [Injecting Messages to a RESTful Endpoint]({{base_path}}/learn/examples/scheduled-tasks/injecting-messages-to-rest-endpoint)

    Follow our tutorials on scheduled tasks:

    - See the tutorial on [periodically executing an integration process]({{base_path}}/learn/integration-tutorials/using-scheduled-tasks) using a scheduled task

