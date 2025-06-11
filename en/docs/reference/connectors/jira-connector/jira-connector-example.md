# Jira Connector Example

The Jira REST API enables you to interact with Jira programmatically. The WSO2 JIRA Connector allows you to access the REST resources available in Jira Cloud [API Version v2](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/) from an integration sequence.

## What you'll build

This example explains how to use the JIRA Connector to create an issue and read it.

You will use two HTTP API resources, which are `createIssue` and `getIssue`.

<img src="{{base_path}}/assets/img/integrate/connectors/jira.png" title="Calling insert operation" width="800" alt="Calling insert operation"/>

* `/createIssue `: The user sends the request payload with the issue details (the project info, summary, description and the issue type).  This request is sent to the integration runtime by invoking the Jira API. It creates the issue in the corresponding Jira account.

* `/getIssue `: The user sends the request payload, which includes the issue id or key (that should be obtained from the `createIssue` API resource) and other parameters (**fields** and **expand**).

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Follow the steps below to set up the integration project using the WSO2 Micro Integrator Visual Studio Code extension.

### Create a new project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up WSO2 MI and create a new integration project. Use a suitable Project Name for your integration.

<img src="{{base_path}}/assets/img/integrate/connectors/jira/create-new-project.png" title="Creating a new Project" width="500" alt="Creating a new Project"/>

### Create a connection

1. In the Design View, click the **+** button and select **Connection**.

2. In the search bar, type `Jira` and select the `Jira connector` from the list.
   
    <img src="{{base_path}}/assets/img/integrate/connectors/jira/create_connection.png" title="Creating a new Connection" width="600" alt="Creating a new Connection"/>

3. In the connection configuration pane, set the **Connection Name** to `JIRA_CONNECTION` and fill in the required details:
     - **Username**: Your Jira username. 
     - **Password**: Jira API token. 
     - **API URL**: Base URL of your Jira instance (e.g., `https://<site-url>`).

     <img src="{{base_path}}/assets/img/integrate/connectors/jira/add_connection.png" title="Creating a new Connection" width="600" alt="Creating a new Connection"/>

### Create an API

1. Click on the **API** button in create an integration project pane.

    <img src="{{base_path}}/assets/img/integrate/connectors/jira/create-api1.png" title="Creating a new API" width="600" alt="Creating a new API"/>

2. Enter the API Name as `jiraAPI` and the Context as `jira`, then click **Create**.

    <img src="{{base_path}}/assets/img/integrate/connectors/jira/create-api2.png" title="Creating a new API" width="600" alt="Creating a new API"/>

3. To add the Jira connector:
    - In the **Design View**, click the **+** button.
    - In the **Mediator** section, search for `Jira`.
    - Select the **Jira** connector and click **Download**

    <img src="{{base_path}}/assets/img/integrate/connectors/jira/add-jira-connector.png" title="Adding Jira Connector" width="600" alt="Adding Jira Connector"/>

### Implement the API

1. Go to the **Source View** of the API by clicking on the **<>** icon in the top right corner of the **Design View**.
   <img src="{{base_path}}/assets/img/integrate/connectors/jira/source_view.png" title="Source view of the implemented resource" width="600" alt="Source view of the implemented resource"/>

2. Copy and paste the following code in the **Source View** of the API.

??? note "Source view of the implemented resource"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/jira" name="jiraAPI" xmlns="http://ws.apache.org/ns/synapse">
       <resource methods="POST" uri-template="/createIssue">
          <inSequence>
             <jira.createIssue configKey="JIRA_CONNECTION">
                <issueFields>{${payload}}</issueFields>
                <responseVariable>jira_createIssue_1</responseVariable>
                <overwriteBody>true</overwriteBody>
             </jira.createIssue>
             <respond/>
          </inSequence>
          <faultSequence>
          </faultSequence>
       </resource>
       <resource methods="POST" uri-template="/getIssue">
          <inSequence>
             <jira.getIssue configKey="JIRA_CONNECTION">
                <issueIdOrKey>{${payload.id}}</issueIdOrKey>
                <fields></fields>
                <expand></expand>
                <responseVariable>jira_createIssue_1</responseVariable>
                <overwriteBody>true</overwriteBody>
             </jira.getIssue>
             <respond/>
          </inSequence>
          <faultSequence>
          </faultSequence>
       </resource>
    </api>
    ```

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/jira-connector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

## Deployment

To deploy and run the project, refer to the [Build and Run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

## Test

Invoke the API as shown below using the MI VSCode Extension.

<img src="{{base_path}}/assets/img/integrate/connectors/common/runtime-services.png" title="Runtime services" width="600" alt="Runtime services"/>

### Create issue operation

**Sample request**:

- Content-Type: `application/json`
- Request body:
  ```json
  {
       "fields": {
           "project": {
               "key": "<project-key>"
           },
           "summary": "For Testing1",
           "description": "Test issue",
           "issuetype": {
               "id": "<issue_type>"
           }
       }
  }
  ```

**Expected Response** : You should get a response as given below and the data will be added to the database.
    ```json
    {
        "id": "<issue-id>",
        "key": "<issue-key>",
        "self": "https://<site-url>/jira/rest/api/2/issue/340135"
    }
    ```

### Read issue operation

**Sample request**:

- Content-Type: `application/json`
- Request body:
  ```json
  {
     "id": "<issue-id> or <issue-key>"
  }
  ```
**Expected Response** : You should get a response similar to the one given below.
    ```json
    {
        "expand": "renderedFields,names,schema,operations,editmeta,changelog,versionedRepresentations",
        "id": "<issue-id>",
        "self": "https://<site-url>/jira/rest/api/2/issue/340135",
        "key": "<issue-key>",
        "fields": {
            "issuetype": {
                "self": "https://<site-url>/jira/rest/api/2/issuetype/6",
                "id": "6",
                "description": "A request for more information from ***",
                "iconUrl": "https://<site-url>/jira/images/icons/issuetypes/undefined.png",
                "name": "Query",
                "subtask": false
            },
            "timespent": null,
            "project": {
                "self": "https://<site-url>/jira/rest/api/2/project/11395",
                "id": "11395",
                "key": "<project-key>",
                "name": "Project Name",
                "avatarUrls": {
                    "48x48": "https://<site-url>/jira/secure/projectavatar?pid=11395&avatarId=10000",
                    "24x24": "https://<site-url>/jira/secure/projectavatar?size=small&pid=11395&avatarId=10000",
                    "16x16": "https://<site-url>/jira/secure/projectavatar?size=xsmall&pid=11395&avatarId=10000",
                    "32x32": "https://<site-url>/jira/secure/projectavatar?size=medium&pid=11395&avatarId=10000"
                },
                "projectCategory": {
                    "self": "https://<site-url>/jira/rest/api/2/projectCategory/10021",
                    "id": "10021",
                    "description": "Project Category Description",
                    "name": "Internal"
                }
            },
            "aggregatetimespent": null,
            "resolution": null,
            "customfield_10467": null,
            "resolutiondate": null,
            "workratio": -1,
            "lastViewed": "2021-02-18T20:48:28.596-0800",
            "watches": {
                "self": "https://<site-url>/jira/rest/api/2/issue/<project-key>-3400/watchers",
                "watchCount": 1,
                "isWatching": true
            },
            "created": "2021-02-18T20:46:03.000-0800",
            "customfield_10260": "2021-02-18 20:46:03.0",
            "customfield_10460": null,
            "customfield_10660": "{summaryBean=com.atlassian.jira.plugin.devstatus.rest.SummaryBean@6f87a945[summary={pullrequest=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@5f248a01[overall=PullRequestOverallBean{stateCount=0, state='OPEN', details=PullRequestOverallDetails{openCount=0, mergedCount=0, declinedCount=0}},byInstanceType={}], build=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@71ad9d41[overall=com.atlassian.jira.plugin.devstatus.summary.beans.BuildOverallBean@aa275f7[failedBuildCount=0,successfulBuildCount=0,unknownBuildCount=0,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], review=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@2498a36c[overall=com.atlassian.jira.plugin.devstatus.summary.beans.ReviewsOverallBean@1130f741[stateCount=0,state=<null>,dueDate=<null>,overDue=false,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], deployment-environment=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@cea37b3[overall=com.atlassian.jira.plugin.devstatus.summary.beans.DeploymentOverallBean@157ef614[topEnvironments=[],showProjects=false,successfulCount=0,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], repository=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@741ca414[overall=com.atlassian.jira.plugin.devstatus.summary.beans.CommitOverallBean@6280df29[count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], branch=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@3f8a2b65[overall=com.atlassian.jira.plugin.devstatus.summary.beans.BranchOverallBean@5d26b4d6[count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}]},errors=[],configErrors=[]], devSummaryJson={\"cachedValue\":{\"errors\":[],\"configErrors\":[],\"summary\":{\"pullrequest\":{\"overall\":{\"count\":0,\"lastUpdated\":null,\"stateCount\":0,\"state\":\"OPEN\",\"details\":{\"openCount\":0,\"mergedCount\":0,\"declinedCount\":0,\"total\":0},\"open\":true},\"byInstanceType\":{}},\"build\":{\"overall\":{\"count\":0,\"lastUpdated\":null,\"failedBuildCount\":0,\"successfulBuildCount\":0,\"unknownBuildCount\":0},\"byInstanceType\":{}},\"review\":{\"overall\":{\"count\":0,\"lastUpdated\":null,\"stateCount\":0,\"state\":null,\"dueDate\":null,\"overDue\":false,\"completed\":false},\"byInstanceType\":{}},\"deployment-environment\":{\"overall\":{\"count\":0,\"lastUpdated\":null,\"topEnvironments\":[],\"showProjects\":false,\"successfulCount\":0},\"byInstanceType\":{}},\"repository\":{\"overall\":{\"count\":0,\"lastUpdated\":null},\"byInstanceType\":{}},\"branch\":{\"overall\":{\"count\":0,\"lastUpdated\":null},\"byInstanceType\":{}}}},\"isStale\":false}}",
            "customfield_10980": null,
            "customfield_10464": null,
            "customfield_10860": "<div>\r\n\t<div class=\"aui-message aui-message-generic generic draft-message\">\r\n\t\t<div class=\"message-content\">\r\n\t\t\t<div class=\"message-container\">\r\n\t\t\t<p>Closing an issue indicates that there is no more work to be done on it, if you have any questions regarding this announcement, you can raise a query ticket and team will attend</p>\r\n\t\t\t</div>\r\n\t\t\t<ul class=\"actions-list\"></ul>\r\n\t\t</div>\r\n\t</div>\r\n</div>",
            "customfield_10981": null,
            "customfield_10465": "0|i0suzb:",
            "customfield_10982": null,
            "labels": [],
            "customfield_10466": null,
            "customfield_10973": null,
            "customfield_10974": null,
            "customfield_10975": null,
            "customfield_10976": null,
            "customfield_10977": null,
            "timeestimate": null,
            "aggregatetimeoriginalestimate": null,
            "customfield_10978": null,
            "customfield_10979": null,
            "issuelinks": [],
            "assignee": {
                "self": "https://<site-url>/jira/rest/api/2/user?username=portal-admin%40***.com",
                "name": "portal-admin@***.com",
                "key": "portal-admin@***.com",
                "emailAddress": "portal-admin@***.com",
                "avatarUrls": {
                    "48x48": "https://<site-url>/jira/secure/useravatar?avatarId=10432",
                    "24x24": "https://<site-url>/jira/secure/useravatar?size=small&avatarId=10432",
                    "16x16": "https://<site-url>/jira/secure/useravatar?size=xsmall&avatarId=10432",
                    "32x32": "https://<site-url>/jira/secure/useravatar?size=medium&avatarId=10432"
                },
                "displayName": "Portal Admin",
                "active": true,
                "timeZone": "PST"
            },
            "updated": "2021-02-18T20:46:03.000-0800",
            "status": {
                "self": "https://<site-url>/jira/rest/api/2/status/1",
                "description": "The issue is open and ready for the assignee to start work on it.",
                "iconUrl": "https://<site-url>/jira/images/icons/statuses/open.png",
                "name": "Open",
                "id": "1",
                "statusCategory": {
                    "self": "https://<site-url>/jira/rest/api/2/statuscategory/2",
                    "id": 2,
                    "key": "new",
                    "colorName": "blue-gray",
                    "name": "To Do"
                }
            },
            "components": [],
            "customfield_10051": [
                "portal-admin@***.com(portal-admin@***.com)",
                "****(****)"
            ],
            "timeoriginalestimate": null,
            "customfield_10052": null,
            "description": "Test issue",
            "customfield_10053": "****(****)",
            "customfield_10054": "true",
            "customfield_10011": null,
            "customfield_10055": "8126",
            "customfield_10012": null,
            "customfield_10970": null,
            "customfield_10971": null,
            "timetracking": {},
            "customfield_10972": null,
            "customfield_10962": "2021-02-18",
            "customfield_10963": null,
            "customfield_10964": null,
            "customfield_10965": null,
            "attachment": [],
            "customfield_10966": null,
            "aggregatetimeestimate": null,
            "customfield_10967": null,
            "customfield_10968": null,
            "customfield_10969": null,
            "summary": "For Testing",
            "creator": {
                "self": "https://<site-url>/jira/rest/api/2/user?username=****",
                "name": "****",
                "key": "****",
                "emailAddress": "****@***.com",
                "avatarUrls": {
                    "48x48": "https://<site-url>/jira/secure/useravatar?avatarId=10432",
                    "24x24": "https://<site-url>/jira/secure/useravatar?size=small&avatarId=10432",
                    "16x16": "https://<site-url>/jira/secure/useravatar?size=xsmall&avatarId=10432",
                    "32x32": "https://<site-url>/jira/secure/useravatar?size=medium&avatarId=10432"
                },
                "displayName": "****",
                "active": true,
                "timeZone": "PST"
            },
            "subtasks": [],
            "customfield_10360": null,
            "customfield_10361": null,
            "reporter": {
                "self": "https://<site-url>/jira/rest/api/2/user?username=****",
                "name": "****",
                "key": "****",
                "emailAddress": "****@***.com",
                "avatarUrls": {
                    "48x48": "https://<site-url>/jira/secure/useravatar?avatarId=10432",
                    "24x24": "https://<site-url>/jira/secure/useravatar?size=small&avatarId=10432",
                    "16x16": "https://<site-url>/jira/secure/useravatar?size=xsmall&avatarId=10432",
                    "32x32": "https://<site-url>/jira/secure/useravatar?size=medium&avatarId=10432"
                },
                "displayName": "****",
                "active": true,
                "timeZone": "PST"
            },
            "customfield_10363": null,
            "aggregateprogress": {
                "progress": 0,
                "total": 0
            },
            "customfield_10364": null,
            "customfield_10365": null,
            "customfield_10366": null,
            "customfield_10960": null,
            "environment": null,
            "progress": {
                "progress": 0,
                "total": 0
            },
            "comment": {
                "comments": [],
                "maxResults": 0,
                "total": 0,
                "startAt": 0
            },
            "votes": {
                "self": "https://<site-url>/jira/rest/api/2/issue/<project-key>-3400/votes",
                "votes": 0,
                "hasVoted": false
            },
            "worklog": {
                "startAt": 0,
                "maxResults": 20,
                "total": 0,
                "worklogs": []
            }
        }
    }
    ```

## What's next

* You can deploy and run your project on Docker or Kubernetes. See the instructions in [Deploying your Integrations on Containers]({{base_path}}/install-and-setup/setup/kubernetes-operators/k8s-api-operator/manage-integrations/integration-deployments/).
* To customize this example for your own scenario, see [Jira Connector Configuration]({{base_path}}/reference/connectors/jira-connector/jira-connector-config) documentation for all operation details of the connector.
