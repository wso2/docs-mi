# File Transfer Sample

This sample demonstrates some file handling capabilities of the Micro Integrator.

This sample contains an Inbound Endpoint called `StudentDataFileProcessInboundEP` which polls a particular location for available files. Also, it contains two sequences called `StudentDataFileProcessSeq` and `StudentDataFileErrorSeq`.

The file inbound endpoint is listening on file path specified in the `File URI` parameter. The `transport.vfs.FileNamePattern` represent the file pattern to process. Once the inbound endpoint read a file successfully, its content is injected to the sequence for further mediation. In this sample, `StudentDataFileProcessSeq` logs the content of the received message.

Once file reading is successful, the file will be moved to a location defined in the `Move After Process` parameter. If an error occurred while reading, then the file will be moved to the location specified in the `transport.vfs.MoveAfterFailure` parameter.

## Deploying the sample

1. Open the sample by clicking on the **File Transfer** card.
2. Give a folder location to save the sample.
3. Open the ‘StudentDataFileProcessInboundEP‘ Inbound EP artifact and edit its absolute folder paths of the following fields to match the folder names of your local machine.
    - File URI
    - Move After Process
    - Move After Failure
4. [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Running the sample

Copy any .csv file to the directory given in the `File URI` parameter and the content of that csv file will be logged in the MI server console.

After processing the csv files, those will be moved to the directory specified in `Move After Process` parameter.
