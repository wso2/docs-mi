# WSO2 Integrator: MI Installation Prerequisites

Prior to installing WSO2 Integrator: MI, make sure that the appropriate prerequisites are fulfilled.

## System requirements

<table>
  <tr>
    <td>
      <b>Centralized (ESB Style) Deployment</b>
    </td>
    <td>
      <ul>
        <li>
          Minimum 2 core (compute units) (1.0-1.2 GHz Opteron/Xeon processor).
        </li>
        <li>
          2 GB RAM.
        </li>
        <li>
          <code>~512</code> MB heap size. This is generally sufficient for processing smaller messages. However, the requirements vary with larger message sizes and the number of messages processed concurrently.
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <b>Decentralized (Microservices Style) Deployment</b>
    </td>
    <td>
      <ul>
      <li>
          Minimum 0.5 core (compute units) per WSO2 Integrator: MI instance.
          <div class="admonition note">
          <p class="admonition-title">Note</p>
          <p>WSO2 Integrator: MI can run on a minimum of 0.5 cores per instance, suitable for lightweight integrations. For more complex integrations, it is recommended to allocate a minimum of 2 cores per instance.</p>
          </div>  
        </li>
        <li>
          1 GB memory for the container/pod.
        </li>
        <li>
          <code>~512</code> MB heap size for one WSO2 Integrator: MI instance. This is generally sufficient for processing smaller messages. However, the requirements vary with larger message sizes and the number of messages processed concurrently.
        </li>
      </ul>
    </td>
  </tr>
</table>

!!! Tip
    See [Resource Allocation and Performance]({{base_path}}/install-and-setup/setup/deployment-best-practices/resource-allocation-and-performance/) for guidance on allocating resources for your integrations to achieve the desired throughput (requests per second) and average response times.

## Environment compatibility

- Install a JDK version that is compatible with this product version. See [Tested JDKs](#tested-jdks).
- It is not recommended to use Apache DS in a production environment due to scalability issues. Instead, use an LDAP like OpenLDAP as your user store.
- If you have difficulty in setting up the WSO2 Integrator: MI in a specific platform or database, [contact us](https://wso2.com/contact/).

## Tested environments

The details of the tested environments for the WSO2 Integrator: MI 4.6.0 runtimes are given below.

### Tested operating systems

The WSO2 Integrator: MI runtime is tested with the following operating systems:

| Operating System         | Versions   |
|--------------------------|------------|
| Windows                  | 2025       |
| Ubuntu                   | 24.04      |
| Red Hat Enterprise Linux | 10         |
| Rocky Linux              | 10         |
| MacOS                    | 15.7      |
| SUSE Linux               | 15         |

### Tested JDKs

The WSO2 Integrator: MI runtime is tested with the following JDKs:

| JDK          | Versions |
|--------------|----------|
| CorrettoJDK  | 21, 25   |
| AdoptOpenJDK | 21, 25   |
| OpenJDK      | 21, 25   |
| Oracle JDK   | 21, 25   |

### Tested DBMSs

The WSO2 Integrator: MI runtime is tested with the following databases:

| DBMS                 | Versions           |
|----------------------|--------------------|
| MySQL                | 9             |
| Oracle               | 12c release 2, 19c |
| Microsoft SQL Server | 2022               |
| PostgreSQL           | 17.2         |
| MariaDB              | 10.5               |
| DB2                  | 11.5               |

### ARM compatibility

WSO2 Integrator: MI is compatible with ARM processors. It can run on ARM-based systems, such as those with Apple Silicon or ARM-based Linux distributions.
