# File Processing

In many business domains, there are different use cases related to managing files. Also, there are file-based legacy systems that are tightly coupled with other systems. These files contain vast amounts of data, which require significant effort for manual processing. This approach is not scalable as system load increases. This leads us to the requirement of automating the processing of files. The WSO2 Micro Integrator enables the following file processing capabilities:

- Reading, Writing, and Updating files:

  	Files can be located in the local file system or a remote location which can be accessed over protocols such as FTP, FTPS, SFTP, and SMB. Therefore, the system used to process those files should be capable of communicating over those protocols.

- Process data

  	The system should be capable of extracting relevant information from the file. For example, if the system needs to process XML files, the system should be capable of executing an XPath on the file content to extract relevant information.

- Execute some business logic

  	The system should be capable of performing the necessary actions to construct a business use case. It should be capable of making decisions and sending processed information to other systems over different communication protocols.

<table>
	<tr>
		<td>
			<b>Tutorials</b></br>
			<ul>
				<li>
					Try the end-to-end use case on <a href="{{base_path}}/learn/integration-tutorials/file-processing">File Processing</a>.
				</li>
			</ul>
		</td>
		<td>
			<b>Examples</b>
			<ul>
				<li>
					<a href="{{base_path}}/learn/examples/file-processing/accessing-windows-share-using-vfs-transport">How to Access a Windows Share using VFS Transport</a>
				</li>
			</ul>
		</td>
	</tr>
</table>
