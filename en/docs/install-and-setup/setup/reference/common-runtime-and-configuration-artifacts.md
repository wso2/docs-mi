# Common Runtime and Configuration Artifacts

The following are the artifacts used commonly in a WSO2 Micro Integrator deployment.

!!! info
        Persistent runtime artifacts could be updated at the runtime, and are expected to be available across instance restarts, VM re-creation or container re-spawning. Persistent file storage systems should be used to ensure this.

    Example: In a Kubernetes based container environment, its possible to use Persistent Volumes to persist these artifacts.

### Persistent Runtime Artifacts

These are directories in Micro Integrator that includes deployable files, which are valid from a specified date and time at runtime.

-   `<MI_HOME>/repository/deployment/server` -  Contains Synapse configurations and and other deployment artifacts.


### Persistent Configuration Artifacts

These are directories in Micro Integrator where the configuration files are stored.

-   `<MI_HOME>/repository/resources` - This folder/artifact contains keystores, templates, scripts, etc.

-   `<MI_HOME>/repository/conf` - This folder contains the configuration files related to servers, datasources, registry, user management, etc.

-   `<MI_HOME>/bin` - Contains files for JVM changes, profile changes, etc.
