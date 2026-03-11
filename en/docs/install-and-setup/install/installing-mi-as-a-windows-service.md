# Running the WSO2 Integrator: MI as a Windows Service

Follow the instructions given below to run the WSO2 Integrator: MI as a Windows service.

## Prerequisites

-	Go to the [WSO2 Integrator: MI Downloads page](https://wso2.com/products/downloads?product=wso2integrator&package=mi) and download the product distribution as a ZIP file.

-	Extract the downloaded ZIP file to a location on your computer. The <b>micro-integrator</b> folder inside the extracted ZIP file will be your <b>MI_HOME</b> directory.

-	Set up a [JDK that is compatible with the WSO2 Integrator: MI]({{base_path}}/install-and-setup/install/installation-prerequisites/#environment-compatibility) and point the `java_home` variable to your JDK instance. 
 
-	Point the `wso2mi_home` environment variable to the `MI_HOME` directory.

!!! Note 
    Be sure to use **lower case** letters when setting the `wso2mi_home` in the Windows OS. That is, you must not use `WSO2MI_HOME`.
  
## Setting up the YAJSW wrapper 

YASJW uses the configurations defined in the `<YAJSW_HOME>/conf/wrapper.conf` file to wrap Java applications. Replace the contents of this file with the configurations that are relevant to the WSO2 Integrator: MI instance that you want to run as a service. Use the **wrapper.conf** file available in `<MI_HOME>/bin/yajsw` folder to get the relevant configurations.

!!! Info
    If you are running on JDK 11 or later, WSO2 recommends using YAJSW 13.05 or above. Earlier versions of YAJSW are incompatible because they depend on internal JVM APIs that are no longer accessible in JDK 11 and later, due to the strong encapsulation enforced by the Java Module System.

!!! success "Verified"
    WSO2 Integrator: MI 4.6.0 has been tested with YAJSW current latest version 13.18, which is compatible with JDK 11, JDK 17, JDK 21, and JDK 25.

!!! tip
    You may encounter the following issue when starting Windows Services when the file "java" or a "dll" used by Java cannot be found by YAJSW. 

    ```bash 
    "Error 2: The system cannot find the file specified" 
    ```

    This can be resolved by providing the "complete java path" for the wrapper.java.command as follows.

    ```bash
    wrapper.java.command = ${JAVA_HOME}/bin/java
    ```

## Installing the service

Navigate to the `<YAJSW_HOME>/bat/` directory in the Windows command prompt with **administrative privileges**, and execute the following command: 

```bash
installService.bat
```

## Starting the service

Navigate to the `<YAJSW_HOME>/bat/` directory in the Windows command prompt with administrative privileges, and execute the following command: 

```bash
startService.bat
```

After starting the service, go to the Windows Services list and verify that WSO2 Integrator: MI 4.6.0 is listed and its status shows as **Running**.

<a href="{{base_path}}/assets/img/setup-and-install/Windows_service_List.png"><img src="{{base_path}}/assets/img/setup-and-install/Windows_service_List.png" alt="Windows Service List" width="80%"></a>

## Stopping the service

Navigate to the `<YAJSW_HOME>/bat/` directory in the Windows command prompt with administrative privileges, and execute the following command: 

```bash
stopService.bat
```

## Uninstalling the service

To uninstall the service, navigate to the `<YAJSW_HOME>/bat/` directory in the Windows command prompt with administrative privileges, and execute the following command: 
 
```bash
uninstallService.bat
```
