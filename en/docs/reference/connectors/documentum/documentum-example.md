# Documentum Connector Example

Documentum Connector can be used to perform operations on OpenText Documentum Enterprise content management system.

## What you'll build

This example explains how to use the Documentum Connector to create a folder and retrieve cabinet details from Documentum. The user sends a payload with the repository name, parent folder ID, and name of the folder to be created. Then the connector communicates with Documentum to create a folder under the parent folder in the specified cabinet.

The example consists of an API named `documentum` with three resources.

**Create folder**

`/createFolder`: The user sends a request which includes the repository, parent folder ID, and folder name. This request is sent to the integration runtime by invoking the Documentum API. It will create a new folder in Documentum under the given parent folder.

**Get cabinets**

`/getCabinets`: The user sends a request which includes the repository name to list cabinets present under that in Documentum. This request is sent to the integration runtime where the Documentum Connector API resides. Once the API is invoked, it returns the list of cabinets.

**Create document**

`/createDocument`: The user sends a request payload which includes the folder ID and document name. This request is sent to the integration runtime where the Documentum Connector API resides. Once the API is invoked, it will create a new document in Documentum under the given folder ID.

The following diagram shows the overall solution.

<img src="{{base_path}}/assets/img/integrate/connectors/documentum-example.png" title="Documentum connector example" width="400" alt="Documentum connector example"/>

If you do not want to configure this yourself, you can simply [get the project](#get-the-project) and run it.

## Set up the integration project

Follow the steps in the [create integration project]({{base_path}}/develop/create-integration-project/) guide to set up the integration project.

## Create the integration logic

Select Micro Integrator Extension and click on **+** in APIs to create a REST API. 

### Configure the connection and createFolder operation

1. Select the **Createfolder** operation under the **Documentum** connector in the **Connector** panel.

2. Click on the **Add new connection** text button and configure the connection parameters.

    <img src="{{base_path}}/assets/img/integrate/connectors/documentum/new-connection.png" title="Documentum connection" width="400" height="400" alt="Documentum connection"/>

2. Do the following configurations to set up the `createFolder` operation.
    <img src="{{base_path}}/assets/img/integrate/connectors/documentum/create-folder.png" title="Documentum create folder" width="800" alt="Documentum create folder"/>

### Configure the connection and GetCabinets operation

1. Select the **Getcabinets** operation under the **Documentum** connector in the **Connector** panel.

2. Select the connection that we created earlier.

2. Do the following configurations to set up the `getCabinets` operation.
    <img src="{{base_path}}/assets/img/integrate/connectors/documentum/get-cabinets.png" title="Documentum get cabinets" width="800" alt="Documentum get cabinets"/>

### Configure the connection and createDocument operation

1. Select the **Createdocument** operation under the **Documentum** connector in the **Connector** panel.

2. Select the connection that we created earlier.

2. Do the following configurations to set up the `createDocument` operation.
    <img src="{{base_path}}/assets/img/integrate/connectors/documentum/create-document.png" title="Documentum create document" width="800" alt="Documentum create document"/>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<api context="/documentum" name="documentum" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST" uri-template="/createFolder">
        <inSequence>
            <property expression="json-eval($.repo)" name="repo" scope="default" type="STRING" />
            <property expression="json-eval($.objectcodeID)" name="objectcode" scope="default"
				type="STRING" />
            <property expression="json-eval($.foldername)" name="foldername" scope="default"
				type="STRING" />
            <documentum.createfolder configKey="DocumentumConnection">
                <repo>{$ctx:repo}</repo>
                <folderID>{$ctx:objectcode}</folderID>
                <foldername>{$ctx:foldername}</foldername>
            </documentum.createfolder>
            <respond />
        </inSequence>
        <faultSequence>
	</faultSequence>
    </resource>
    <resource methods="POST" uri-template="/getCabinets">
        <inSequence>
            <property name="repo" scope="default" type="STRING" expression="json-eval($.repo)" />
            <documentum.getcabinets configKey="DocumentumConnection">
                <repo>{ctx:repo}</repo>
            </documentum.getcabinets>
            <respond />
        </inSequence>
        <faultSequence>
	</faultSequence>
    </resource>
    <resource methods="POST" uri-template="/createDocument">
        <inSequence>
            <property expression="json-eval($.repoName)" name="repoName" scope="default"
				type="STRING" />
            <property expression="json-eval($.folderID)" name="folderID" scope="default"
				type="STRING" />
            <property expression="json-eval($.docName)" name="docName" scope="default" type="STRING" />
            <property expression="json-eval($.docType)" name="docType" scope="default" type="STRING" />
            <documentum.createdocument configKey="DocumentumConnection">
                <repo>{ctx:repoName}</repo>
                <folderID>{ctx:folderID}</folderID>
                <documentname>{ctx:docName}</documentname>
                <doctype>{ctx:docType}</doctype>
            </documentum.createdocument>
            <respond />
        </inSequence>
        <faultSequence>
	</faultSequence>
    </resource>
</api>
```

## Export integration logic as a carbon application
To export the project, refer to the [build and export the carbon application]({{base_path}}/develop/deploy-artifacts/#build-and-export-the-carbon-application) guide. 

Now the exported CApp can be deployed in the integration runtime so that we can run it and test.

## Get the project

You can download the ZIP file and extract the contents to get the project code.

<a href="{{base_path}}/assets/attachments/connectors/documentum-connector.zip">
    <img src="{{base_path}}/assets/img/integrate/connectors/download-zip.png" width="200" alt="Download ZIP">
</a>

!!! tip
    You may need to update the simulator details and make other such changes before deploying and running this project.

## Deployment

To deploy and run the project, refer to the [build and run]({{base_path}}/develop/deploy-artifacts/#build-and-run) guide.

You can further refer to the application deployed through the CLI tool. See the instructions on [managing integrations from the CLI]({{base_path}}/observe-and-manage/managing-integrations-with-apictl).

## Test

**Create folder operation**

1. Open Postman and use a POST operation with the following sample request payload, then click on **Send**.
    ```json
    {
        "repos":"doctest",
        "objectcodeID":"0b0277b68004e7dd",
        "foldername":"demo"
    }
    ```

2. You will see the following sample response payload.

```json
    {
        "name":"folder",
        "type":"dm_folder",
        "definition":"http://183.28.254.179:8078/documentum-rest-web-16.7.0000.0076/repositories/doctest/types/dm_folder",
        "properties": {
            "object_name":"testchildfolder",
            "r_object_type":"dm_folder",
            "title":"",
            "subject":"",
            "authors": null,
            "keywords": null,
            "a_application_type": "",
            "a_status": "",
            "r_creation_date": "2020-07-17T04:30:56.000+00:00",
            "r_modify_date": "2020-07-17T04:30:56.000+00:00",
            "r_modifier": "appowner",
            "r_access_date": null,
            "a_is_hidden": false,
            "i_is_deleted": false,
            "a_retention_date": null,
            "a_archive": false,
            "a_compound_architecture": "",
            "a_link_resolved": false,
            "i_reference_cnt": 1,
            "i_has_folder": true,
            "i_folder_id": [
                "0b0277b68004e7dd"
            ],
            "r_composite_id": null,
            "r_composite_label": null,
            "r_component_label": null,
            "r_order_no": null,
            "r_link_cnt": 0,
            "r_link_high_cnt": 0,
            "r_assembled_from_id": "0000000000000000",
            "r_frzn_assembly_cnt": 0,
            "r_has_frzn_assembly": false,
            "resolution_label": "",
            "r_is_virtual_doc": 0,
            "i_contents_id": "0000000000000000",
            "a_content_type": "",
            "r_page_cnt": 0,
            "r_content_size": 0,
            "a_full_text": true,
            "a_storage_type": "",
            "i_cabinet_id": "0c0277b68002952c",
            "owner_name": "appowner",
            "owner_permit": 7,
            "group_name": "docu",
            "group_permit": 5,
            "world_permit": 4,
            "i_antecedent_id": "0000000000000000",
            "i_chronicle_id": "0b0277b6800584f7",
            "i_latest_flag": true,
            "r_lock_owner": "",
            "r_lock_date": null,
            "r_lock_machine": "",
            "log_entry": "",
            "r_version_label": [
                "1.0",
                "CURRENT"
            ],
            "i_branch_cnt": 0,
            "i_direct_dsc": false,
            "r_immutable_flag": false,
            "r_frozen_flag": false,
            "r_has_events": false,
            "acl_domain": "appowner",
            "acl_name": "dm_450277b680000101",
            "a_special_app": "",
            "i_is_reference": false,
            "r_creator_name": "appowner",
            "r_is_public": true,
            "r_policy_id": "0000000000000000",
            "r_resume_state": 0,
            "r_current_state": 0,
            "r_alias_set_id": "0000000000000000",
            "a_effective_date": null,
            "a_expiration_date": null,
            "a_publish_formats": null,
            "a_effective_label": null,
            "a_effective_flag": null,
            "a_category": "",
            "language_code": "",
            "a_is_template": false,
            "a_controlling_app": "",
            "r_full_content_size": 0.0,
            "a_extended_properties": null,
            "a_is_signed": false,
            "a_last_review_date": null,
            "i_retain_until": null,
            "r_aspect_name": null,
            "i_retainer_id": null,
            "i_partition": 0,
            "i_is_replica": false,
            "i_vstamp": 0,
            "r_folder_path": [
                "/WSO2 Connector/Sample/testchildfolder"
            ],
            "i_ancestor_id": [
                "0b0277b6800584f7",
                "0b0277b68004e7dd",
                "0c0277b68002952c"
            ],
            "r_object_id": "0b0277b6800584f7"
        }
    }
```
