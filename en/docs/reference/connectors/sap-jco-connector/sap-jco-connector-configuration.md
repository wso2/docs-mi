# Setting up the SAP JCo Connector

To use the SAP JCo connector, you must first obtain the proprietary SAP middleware libraries from SAP, install the native SAP JCo library on the Micro Integrator host, and then configure a connection to your SAP system.

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Java        | 21+     |
| WSO2 Micro Integrator | 4.6.0 and above |
| SAP JCo library and native library | 3.1.x |

## Obtain the SAP middleware libraries

The SAP JCo (`sapjco3.jar`) and SAP IDoc (`sapidoc3.jar`) libraries are proprietary software owned by SAP SE. They **cannot be distributed publicly** and are therefore **not** bundled with this connector. You must obtain them yourself from the [SAP Support Portal](https://support.sap.com/en/product/connectors/jco.html).

| File | Version |
|------|---------|
| `sapjco3.jar` | 3.1.9 |
| `sapidoc3.jar` | 3.1.3 |

Download the SAP JCo package for your operating system. In addition to the JAR files, the package includes the platform-specific **native** library that the JAR requires at runtime:

| Operating System | Native SAP JCo library |
|------------------|------------------------|
| Linux            | `libsapjco3.so`        |
| Windows          | `sapjco3.dll`          |
| macOS            | `libsapjco3.dylib`     |

## Install the libraries in the Micro Integrator

### Step 1: Add the JAR files to the classpath

Copy `sapjco3.jar` and `sapidoc3.jar` into the `<MI_HOME>/lib` directory. This folder is on the Micro Integrator classpath, so the SAP JCo Java classes are picked up automatically.

### Step 2: Install the native library

SAP JCo ships in two parts that are resolved by two different mechanisms:

- `sapjco3.jar` — Java classes, resolved via the **classpath** (Step 1 above).
- `libsapjco3.so` / `sapjco3.dll` / `libsapjco3.dylib` — the **native** library, resolved via the JVM's **`java.library.path`**, *not* the classpath.

Placing the native library in `<MI_HOME>/lib` is **not** sufficient — that folder is on the classpath but not on `java.library.path`. If the native library is missing from `java.library.path`, initialization fails with:

```
java.lang.UnsatisfiedLinkError: no sapjco3 in java.library.path: ...
```

In the instructions below, `<NATIVE_LIB_DIR>` is the directory where you extracted the downloaded native library. The native library architecture (for example, arm64 vs x86_64) must match the JVM's architecture. Pick **one** option per OS, then **fully restart** the Micro Integrator — native libraries load only once at JVM startup.

#### Linux — `libsapjco3.so`

| Option | How |
|--------|-----|
| Environment variable (no root) | `export LD_LIBRARY_PATH=<NATIVE_LIB_DIR>:$LD_LIBRARY_PATH` before starting MI. |
| System directory (root) | `sudo cp <NATIVE_LIB_DIR>/libsapjco3.so /usr/lib/` then `sudo ldconfig`. |

#### macOS — `libsapjco3.dylib`

| Option | How |
|--------|-----|
| User extensions directory (recommended) | `ln -sf <NATIVE_LIB_DIR>/libsapjco3.dylib ~/Library/Java/Extensions/libsapjco3.dylib` — this folder is on the default `java.library.path` and is user-writable (no root). |

!!! note
    `DYLD_LIBRARY_PATH` is unreliable on macOS — it is stripped for many system-launched processes under System Integrity Protection (SIP). Prefer the symlink above.

    If the `.dylib` was downloaded, macOS Gatekeeper may quarantine it, producing a *different* error ("cannot be opened because the developer cannot be verified"). Clear it with:
    ```bash
    xattr -d com.apple.quarantine <NATIVE_LIB_DIR>/libsapjco3.dylib
    ```

#### Windows — `sapjco3.dll`

| Option | How |
|--------|-----|
| Folder on `PATH` | Copy `<NATIVE_LIB_DIR>\sapjco3.dll` into any directory listed in the `PATH` environment variable (for example, `%JAVA_HOME%\bin`). |

#### Portable option (all operating systems) — JVM flag

Setting `java.library.path` directly avoids the per-OS environment-variable differences. The Micro Integrator launch script passes `$JAVA_OPTS` to the JVM, so you can set it without editing the script:

```bash
# macOS / Linux
export JAVA_OPTS="-Djava.library.path=<NATIVE_LIB_DIR>"
# Windows (cmd):  set JAVA_OPTS=-Djava.library.path=<NATIVE_LIB_DIR>
```

!!! note
    `-Djava.library.path` **replaces** the default native path rather than appending to it, so include every folder you need. Use `:` as the separator on Unix and `;` on Windows.

## Obtain the SAP connection parameters

To connect to an SAP system, obtain the following connection parameters from your SAP administrator:

- **Host** — the hostname or IP address of the SAP application server.
- **System Number** — identifies the system within the landscape.
- **Client** — the client ID of the SAP system, used for logon.
- **User Name** — your SAP user account name.
- **Password** — your account password.

Depending on your organization's SAP configuration, additional parameters (such as the logon language or logon group) may be required. Consult your SAP administrator for the complete list.

Once the libraries are installed and the connection parameters are available, you can configure the connection and use the connector operations described in the [SAP JCo Connector Reference]({{base_path}}/reference/connectors/sap-jco-connector/sap-jco-connector-reference/).
