# File Connector Overview

The File Connector allows you to connect to different file systems and perform various operations. The File Connector uses the [Apache Commons VFS](https://commons.apache.org/proper/commons-vfs/) I/O functionalities to execute operations.

File Connector introduces the independent operations related to the file system and allows you to easily manipulate files based on your requirement. The file streaming functionality using Apache Commons I/O lets you copy large files and reduces the file transfer time between two file systems resulting in a significant improvement in performance that can be utilized in file operations.

Go to the <a target="_blank" href="https://store.wso2.com/connector/esb-connector-file">WSO2 Connector Store</a> to download the File connector.

<img src="{{base_path}}/assets/img/integrate/connectors/file-connector-store.png" title="File Connector Store" width="200" alt="File Connector Store"/>

## Compatibility

<table>
	<tr>
		<th>
			Connector version
		</th>
		<th>
			Supported product versions
		</th>
	</tr>
	<tr>
		<td>
			5.x
		</td>
		<td>
			MI 4.4.0
		</td>
	</tr>
	<tr>
		<td>
			4.x
		</td>
		<td>
			MI 4.x.x, APIM 4.0.0, EI 6.4.0, EI 6.5.0, EI 6.6.0, EI 7.0.x, EI 7.1.0
		</td>
	</tr>
	<tr>
		<td>
			3.x
		</td>
		<td>
			EI 6.4.0, EI 6.5.0, EI 6.6.0, EI 7.0.x, EI 7.1.0
		</td>
	</tr>
</table>

For older versions, see the details in the connector store.

## Prerequisites

For File Connector v4.0.41 or later and v5.0.3 or later, download [commons-compress-1.28.0.jar](https://mvnrepository.com/artifact/org.apache.commons/commons-compress/1.28.0) and copy it to the **<PRODUCT-HOME>/lib** folder.

## File Connector documentation (latest - 5.x version)

* **[File Connector Example]({{base_path}}/reference/connectors/file-connector/5.x/file-connector-example/)**: This example explains how to use File Connector to create a file in the local file system and read the particular file. 

* **[File Connector Reference]({{base_path}}/reference/connectors/file-connector/5.x/file-connector-config/)**: This documentation provides a reference guide for the File Connector.

For older versions, see the details in the relevant links.

## How to contribute

As an open source project, WSO2 extensions welcome contributions from the community. 

To contribute to the code for this connector, please create a pull request in the following repository. 

* [File Connector GitHub repository](https://github.com/wso2-extensions/esb-connector-file)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
