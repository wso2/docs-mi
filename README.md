# WSO2 Integrator: MI Documentation

[![Documentation Site](https://img.shields.io/badge/Visit%20Docs-mi.docs.wso2.com-blue)](https://mi.docs.wso2.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](LICENSE)

This repository contains the source code for WSO2 Integrator: MI documentation. We welcome your contributions!

## 📚 Table of Contents

- [Getting Started](#getting-started)
- [How to contribute](#contributing)
  - [Quick Edits (Minor Changes)](#quick-edits-minor-changes)
  - [Major Changes](#major-changes)
- [Setting Up Your Development Environment](#setting-up-your-development-environment)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
- [Running the Project Locally](#running-the-project-locally)
- [Troubleshooting](#troubleshooting)
  - [MkDocs Command Issues](#mkdocs-command-not-found)
  - [Image and Page Updates](#when-adding-new-images-or-pages)
  - [Markdown Formatting](#formatting-help)
- [Legal](#legal)
  - [Contributor License Agreement (CLA)](#contributor-license-agreement-cla)
  - [License](#license)

## Getting Started

The WSO2 Integrator: MI documentation provides comprehensive guides, tutorials, and reference materials for working with the **WSO2 Integrator: MI** platform.

- **Documentation Website**: [https://mi.docs.wso2.com/](https://mi.docs.wso2.com/)
- **Repository Structure**:

  - `docs-mi/en/docs/` : Contains all the `.md` files with content.

    > **Tip**:
    > `docs-mi/en/docs/` directory is referred to by {{base_path}} throughout the documentation.

    ```html
    e.g.
    <a
      href="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"
      ><img
        src="{{base_path}}/assets/img/develop/mi-for-vscode/mi-vscode-extension.png"
        alt="Mi VS Code Extension"
        width="80%"
    /></a>
    ```

  - `docs-mi/en/docs/assets` : Contains all the resources (images/attachments/videos) used throughout the documentation

  - `docs-mi/en/docs/mkdocs.yaml` : The configuration file used by MkDocs, a static site generator that's geared towards project documentation. It defines the structure, theme, plugins, and other settings for building and deploying the documentation site.

    > **Tip** : You have to update `nav` section in `mkdocs.yaml` for new pages you add.

    ```yml
    nav:
      - Home: index.md
      - Get Started:
          - Introduction: get-started/introduction.md
          - Key Concepts: get-started/key-concepts.md
          - Quick Start Guide: get-started/quick-start-guide.md
    ```

  - `docs-mi/en/docs/requirements.txt` : This file lists all the Python dependencies required to build and run the documentation site locally. These dependencies include MkDocs and its plugins, which are essential for generating and serving the static site.

## How to contribute

### Quick Edits (Minor Changes)

For small changes like fixing typos, updating links, or adding short sections:

1. Navigate to the page you want to edit on GitHub
2. Click the edit (pen) icon in the top right corner
   <br/><image src="en/docs/assets/img/edit-button.png" />
3. Make your changes to the `.md` file
4. Add a descriptive commit message
5. Click "Commit changes" to open a Pull Request (PR)
6. Fill in the PR details and submit

### Major Changes

For significant modifications like adding new pages or replacing images:

1. Fork and clone the repository
2. Create a new branch for your changes
3. Make your modifications in the `docs-mi/en/docs/` directory
4. Test your changes locally (see [Running the Project Locally](#running-the-project-locally))
5. Commit and push your changes
6. Open a Pull Request

If you encounter any issues, check the [Troubleshooting](#troubleshooting) section.

## 🖥️ Setting Up Your Development Environment

### Prerequisites

You'll need:

- Python 3.x.x (Recommended : 3.8.x, 3.9.x, or 3.10.x )
- pip (Python package manager)

### Installation Steps

#### Installing Python

**macOS**:

```bash
# Check if Python is installed
python3 --version

# If not installed, download from python.org or use Homebrew
brew install python3
```

**Ubuntu/Debian**:

```bash
# Python3 is usually pre-installed
python3 --version

# Install pip if needed
sudo apt install -y python3-pip
```

**Windows**:

1. Download Python from [python.org](https://www.python.org/downloads/)
2. During installation, check "Add Python to PATH"
3. Verify installation: `python --version` or `python3 --version`

#### Setting Up the Project

1. **Fork the repository**

   Go to [https://github.com/wso2/docs-mi](https://github.com/wso2/docs-mi) and click the "Fork" button.

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR-USERNAME/docs-mi.git
   cd docs-mi
   ```

3. **Install dependencies**
   ```bash
   cd en/
   pip3 install -r requirements.txt
   ```

If you face any installation issues, see [Troubleshooting](#troubleshooting).

## Running the Project Locally

1. **Start the local server**

   ```bash
   # From the docs-mi/en/ directory
   mkdocs serve
   ```

   If this command fails, see [MkDocs Command Issues](#mkdocs-command-not-found).

2. **View the site**

   Open [http://localhost:8000](http://localhost:8000) in your browser

3. **For faster development** (to see changes immediately):

   ```bash
   # Edit mkdocs.yml and set strict: false
   mkdocs serve --dirtyreload

   # Remember to set strict: true before submitting PR
   ```

When adding new content, check [Image and Page Updates](#when-adding-new-images-or-pages) for important configuration steps.

## 🛠️ Troubleshooting

- <a id="mkdocs-command-not-found"></a>**MkDocs Command Not Found**

  If you get an error that MkDocs is not found, try:

  ```bash
  python3 -m mkdocs serve
  ```

- <a id="when-adding-new-images-or-pages"></a>**When Adding New Images or Pages**

  1. Open `mkdocs.yml`
  2. Update `base_path` to `http://localhost:8000/en/latest`

      ```yml
      base_path: http://localhost:8000/en/latest
      #base_path: https://mi.docs.wso2.com/en/4.6.0
      ```

  3. Revert this change before submitting your PR

- <a id="formatting-help"></a>**Formatting Help**
  - Refer to the [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/) for styling your content.

## Legal

### **Contributor License Agreement (CLA)**

You'll be prompted to sign the CLA via GitHub when submitting your first PR. For any changes to be accepted, the CLA must be signed.

### **License**

This project is licensed under the [Apache License, Version 2.0](LICENSE).
