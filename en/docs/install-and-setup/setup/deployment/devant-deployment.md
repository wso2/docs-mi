# Deploy WSO2 Integrator: MI on Devant

This guide walks you through deploying WSO2 Integrator: MI on Devant. For this guide, a simple API integration will be deployed on Devant using the WSO2 Integrator: MI VS Code extension.

## Before you begin

- Ensure you are logged in to [Devant](https://wso2.com/devant/) with an [organization created](https://wso2.com/devant/docs/references/create-an-organization/).
- [Install WSO2 Integrator: MI]({{base_path}}/develop/mi-for-vscode/install-wso2-mi-for-vscode/) extension on VS Code.

## Deployment steps

1. Create an MI Project and create the integration. For this tutorial, the first step of [Build your first Integration]({{base_path}}/get-started/build-first-integration/first-integration-api-service/) is followed.
2. Once you have created the integration, commit and push the changes, then navigate to the **Project Home**.
3. Click on the **Deploy** button to deploy the integration on Devant.
4. If you are not logged in to Devant, you will be prompted to log in. Once you log in, if you have only one organization, it will be selected automatically. If not, the VS Code extension will prompt you to select an organization.
5. Once you select the organization, you will be prompted to select a Project. 

    !!!note
        If the repository has been previously deployed, the VS Code extension will automatically select the existing Project. If you want to deploy to a different Project, you can select it by opening the **Command Palette** by selecting **View** > **Command Palette** from the menu and selecting the **WSO2: Manage Project** command.

6. Once you select the Project, the **Create Integration** page will open. The integration type will be automatically chosen for you based on your MI Project, in this case, the **Integration as API** type will be selected.
7. The name of the integration will be populated automatically. Wait for the GitHub authorization to complete, then click **Next**.
8. The **Build Details** would have the **Technology** already selected. Hence, you can click **Next** again to proceed.
9. You can confirm the details in the **Summary** and click **Create** to create the integration and deploy on Devant.
10. Once the integration is deployed, a notification would pop up in the bottom right corner to **Open in Devant**. It will be needed to confirm this again.
11. Once opened, you will be able to view the integration in the Devant console. 

    <a href="{{base_path}}/assets/img/deploy/devant-deploy.gif"><img src="{{base_path}}/assets/img/deploy/devant-deploy.gif" alt="Deploy on Devant" width="900"></a>

## Test the API on Devant

1. In the Devant console, once the **Build Status** shows as `Build completed`, click **Test** on the development environment card. This will bring you to the **Console** page.
2. Click **Get Test Key** to get a key for testing.
3. You will have a single resource available **GET /**. Click to expand the resource.
4. Click **Try it out**.
5. Click **Execute**. You will see the response from the backend service as JSON.
6. After successfully testing, you can promote your API integration to production by clicking the **Promote** button.