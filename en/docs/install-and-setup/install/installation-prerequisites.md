# Installation Prerequisites

Prior to installing WSO2 Micro Integrator, make sure that the appropriate prerequisites are fulfilled.

## System requirements

<table>
  <tr>
    <td>
      <b>Docker</b>
    </td>
    <td>
      <ul>
        <li>
          <code>~512</code> MB heap size for one Micro Integrator instance. This is generally sufficient for processing typical SOAP messages. However, the requirements vary with larger message sizes and the number of messages processed concurrently.
        </li>
        <li>
          1 GB memory for a Docker container.
        </li>
        <li>
          Minimum 0.5 core per Micro Integrator Docker instance.
          <div class="admonition note">
          <p class="admonition-title">Note</p>
          <p>Micro Integrator can run on a minimum of 0.5 cores per instance, suitable for lightweight integration microservices. For more complex deployments, such as monolithic or modular monolithic setups, it is recommended to allocate a minimum of 2 cores per instance.</p>
          </div>          
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <b>Virtual Machine (VM)/Physical</b>
    </td>
    <td>
      <ul>
        <li>
          Minimum 0.5 core (1.0-1.2 GHz Opteron/Xeon processor).
        </li>
        <li>
          1 GB RAM for JVM.
        </li>
        <li>
          <code>~512</code> MB heap size. This is generally sufficient for processing typical SOAP messages. However, the requirements vary with larger message sizes and the number of messages processed concurrently.
        </li>
      </ul>
    </td>
  </tr>
</table>

## Environment compatibility

- Install a JDK version that is [compatible with this product version]({{base_path}}/install-and-setup/setup/reference/product-compatibility/).
- It is not recommended to use Apache DS in a production environment due to scalability issues. Instead, use an LDAP like OpenLDAP as your user store.
- If you have difficulty in setting up the Micro Integrator in a specific platform or database, [contact us](https://wso2.com/contact/).

## Tested Environments

<table>
    <tr>
        <th>JDK</th>
        <th>Operating Systems</th>
        <th>RDBMS</th>
    </tr>
    <tr>
        <td>
            <ul>
                <li>
                CorrettoJDK 11, 17
                </li>
                <li>
                AdoptOpenJDK 11, 17
                </li>
                <li>
                OpenJDK 11, 17
                </li>
                <li>
                Oracle JDK 11, 17
                </li>
            </ul>
        </td>
        <td>
            <ul>
                <li>
         Ubuntu 18.04
                </li>
                <li>
         SUSE Linux 12
                </li>
                <li>
         Windows 2019
                </li>
                <li>
         MacOS 10.15
                </li>
                <li>
         CentOS 7.5
                </li>
                <li>
         RHEL 7.4, 8.2
                </li>
            </ul>
        </td>
        <td>
            <ul>
                <li>
           Microsoft SQL Server 2017
                </li>
                <li>
           MySql 8.0
                </li>
                <li>
           MariaDB 10.5
                </li>
                <li>
           PostgreSQL 12.2, 13.2 
                </li>
                <li>
           DB2 11.5
                </li>
                <li>
           Oracle 19c
                </li>
                <li>
           Oracle 12c
                </li>
            </ul>
        </td>
    </tr>
</table>
