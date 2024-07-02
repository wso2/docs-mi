# WSO2 Micro Integrator Documentation

This repository contains the source code for WSO2 Micro Integrator documentation.

This repository is open and we welcome your contributions!

To access the WSO2 Micro Integrator documentation site, visit https://mi.docs.wso2.com/.

Follow the below topics to learn more:

- [Contributing to WSO2 Micro Integrator documentation](#contribute)
   - [For minor modifications](#minor-modification)
   - [For major modifications](#major-modification)
- [Running the project locally](#run-locally)
- [Signing the CLA](#cla)

## <a name="contribute"></a> Contributing to WSO2 Micro Integrator documentation

As an open-source project, WSO2 Micro Integrator documentation welcomes contributions from the community. Before you contribute, read the following guidelines to understand how you can contribute:

### <a name="minor-modification"></a> For minor modifications

Follow the steps below if you need to perform a minor modification (For example: changing a term, fixing a link, adding another bullet point, etc.):

1. Go to the page you want to edit. 
2. Click the edit (pen) icon in the top right corner.
3. Edit the `.md` file.
4. Add a commit message and commit. This will open a Pull Request (PR). 
5. Fill in the relevant details and submit the PR.
6. Get the PR reviewed and merged by a maintainer.

### <a name="major-modification"></a> For major modifications

Follow the steps below if you need to perform a major modification (For example: adding a new page, replacing an image, etc.):

>**Prerequisites:**
>
>Set up the machine and run the project locally by following the [Running the project locally](#local) documentation.
>

1. When working, always start by getting a pull from upstream so that you are in sync with the upstream.

2. In your forked repository, make your changes in a new git branch.

3. The `docs-mi/en/docs/` directory contains all the `.md` files with content. Find the relevant location and do the modification. 

   > **NOTE:**
   >
   > Refer to the [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/) for styling and formatting.
   >

4. Navigate to the `docs-mi/en/` directory in the terminal and build the repository with the following command:

    ```shell
    mkdocs serve
    ```

    > **NOTE:**
    >
    >Refer to [Run MkDocs](#run) for more information.
    >

5. If the styling and formatting are fine, you can commit the changes, push them and send in a pull request.

## <a name="run-locally"></a> Running the project locally

To locally execute the project, ensure that both [Python](https://www.python.org/) and [pip](https://pypi.org/project/pip/) are installed on your machine.

### Step 1 - Install Python

#### MacOS

1. If you are using MacOS, it is likely that a version of Python is pre-installed on your machine. To confirm this, execute the following command in your terminal:

   ```shell
   python --version
   ```

      Upon running the command, you should observe an output similar to the following example which is the default version of Python on your machine:

      ```shell
      Python 2.7.2
      ```

2. You also need to install python3. Check if you have python3 installed by running the following command:

   ```shell
   python3 --version
   ```

   > **NOTE:**
   >
   > For a seamless experience and compatibility with the versions of MkDocs and other plugins we utilize, it is recommended to use Python 3.8.x, 3.9.x, or 3.10.x.

3. If you don't have Python installed, download Python from the [official downloads page](https://www.python.org/downloads/) and install.

4. Verify the python3 version by running the following command:

   ```shell
   python3 --version
   ```

     Upon running the command, you should observe an output similar to the following:

      ```shell
      Python 3.9.6
      ```
     
- Once you are done, you will have two versions of Python on your machine; python2 and python3.
  
#### Ubuntu and other versions of Debian Linux

- python3 is pre-installed in these versions, which you can verify with `python3 -V`.

- Run `sudo apt install -y python3-pip` to install `pip` and verify with `pip3 -V`.

### Step 2 - Install Pip

pip is already installed if you are using Python 3 >=3.4 downloaded from [python.org](https://www.python.org/).

- Verify the pip3 version by running the following command:

   ```shell
   pip3 --version
   ```

   Upon running the command, you should observe an output similar to the following:

   ```shell
   pip 21.2.4
   ```

- If pip is not already installed on your machine, download `get-pip.py` to install pip by clicking [here](https://bootstrap.pypa.io/get-pip.py). Then run the following command to install it:

   ```shell
   python3 get-pip.py
   ```
   
### Step 3 - Fork the repository

Fork the GitHub repository: https://github.com/wso2/docs-mi.git

### Step 4 - Clone the repository

Navigate to the location where you want to clone the repository and clone the forked repository.

   ```shell
   git clone https://github.com/<git-username>/docs-mi.git
   ```
    
### Step 5 - Install the dependencies

1. Navigate to the `<language-folder>` inside the folder containing the repository that you cloned.

    ```shell
    cd docs-mi/en/
    ```

2. Install the required pip packages.

    This will install MkDocs and the required theme, extensions, and plugins.

    For python3, use the following command:

      ```shell
      pip3 install -r requirements.txt
      ```

### Step 6 - Run MkDocs

1. Run the following command to start the server and view the site on your local server.

    ```shell
    mkdocs serve
    ```

    > **NOTE:**
    > 
    > If you get any error saying that MkDocs command is not found, try the following command:
    > 
    >```
    >python3 -m mkdocs serve
    >```
    >
  
2. Open the following URL on a new browser window to view the Micro Integrator documentation site locally:

    http://localhost:8000

    > **INFO:**
    >
    > If you are making changes and want to see them on the fly, run the following command to start the server and view the site on your local server.
    > 
    > 1. Navigate to the `mkdocs.yml` file.
    >    
    > 2. Change the following configuration to `false` as shown below:
    >    
    >     ```
    >     #Breaks build if there's a warning
    >     strict: false
    >     ```
    >     
    > 3. Run the following command to start the server and to make the server load only the changed items and display the changes faster. 
    >
    >     `mkdocs serve --dirtyreload`
    >    
    > 4. If you are running the `mkdocs serve --dirtyreload` command to run the MkDocs server, make sure to change the configuration in the `mkdocs.yml` file as follows before sending a pull request.
    >
    >     `strict: true`
    > 

    > **NOTE**:
    >
    > If you are adding new images or new pages to the doc space, update the base path when locally running the project. 
    >  
    > 1. Open the `mkdocs.yml` file located in the `docs-mi/en/docs/` directory.
    >
    > 2. Update the `base_path` to `http://localhost:8000/en/latest`.
    >
    > 3. Make sure to undo this change before submitting the pull request.
    >    
   
## Signing the CLA

- Accept and sign the Contributor License Agreement (CLA) before sending pull requests. For any changes to be accepted, the CLA must be signed.

- You need to accept the CLA when you are prompted via a GitHub email notification on sending your first PR. Subsequent PRs will not require CLA acceptance.

- If the CLA gets changed for some (unlikely) reason, you will be presented with the new CLA text after sending your first PR after the change.

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)). You may not use this file except in compliance with the License.
