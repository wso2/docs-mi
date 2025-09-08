# Validating Artifacts

Once you have developed an integration project, it is important to validate the artifacts before deployment. The **Synapse Static Code Analysis Plugin** enables you to analyze your Synapse artifacts, identify potential issues, and ensure compliance with best practices. The plugin can be integrated into your Maven build process, scanning your Synapse configuration files and generating reports in multiple formats, including **HTML**, **JSON**, and **SARIF**. You can also configure the plugin to **fail the build** if issues exceed a specified threshold, helping enforce code quality before deployment.

## Plugin Configuration

The following parameters can be configured in the Maven `pom.xml` file under the `<configuration>` section of the plugin.

| Parameter Name    | Property                           | Type      | Default Value                 | Description                                         |
| ----------------- | ---------------------------------- | --------- | ----------------------------- | --------------------------------------------------- |
| basedir           | synapse.analyzer.basedir           | File      | \$\{project.basedir}           | The base directory to analyze.                      |
| outputDirectory   | synapse.analyzer.outputDirectory   | String    | target/static-analysis-report | Directory where report files will be written.       |
| reportFormats     | synapse.analyzer.reportFormats     | String\[] | html                          | Report formats to generate (`html`, `json`, `sarif`).     |
| failBuildOnIssues | synapse.analyzer.failBuildOnIssues | boolean   | false                         | Fail the build if issues are found above threshold. |
| skip              | synapse.analyzer.skip              | boolean   | false                         | Skip running the analysis.                          |
| includeFiles      | synapse.analyzer.includeFiles      | String\[] |                               | Files to include in the analysis (glob patterns).   |
| excludeFiles      | synapse.analyzer.excludeFiles      | String\[] |                               | Files to exclude from the analysis (glob patterns). |
| verbose           | synapse.analyzer.verbose           | boolean   | false                         | Enable verbose logging.                             |

## Example Configuration

```
<plugin>
    <groupId>org.wso2.maven</groupId>
    <artifactId>synapse-static-code-analysis-plugin</artifactId>
    <version>5.4.7</version>
    <configuration>
        <outputDirectory>target/static-analysis-report</outputDirectory>
        <reportFormats>
            <reportFormat>html</reportFormat>
            <reportFormat>json</reportFormat>
        </reportFormats>
        <failBuildOnIssues>true</failBuildOnIssues>
        <skip>false</skip>
        <includeFiles>
            <includeFile>src/main/wso2mi/**/*.xml</includeFile>
        </includeFiles>
        <excludeFiles>
            <excludeFile>src/test/**</excludeFile>
        </excludeFiles>
        <verbose>true</verbose>
    </configuration>
    <executions>
        <execution>
            <phase>validate</phase>
            <goals>
                <goal>analyze</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```


!!!Note 
    - ReportFormats supports multiple formats: html, json, sarif.
    - Set failBuildOnIssues to true if you want the build to fail when validation issues are found.
    - Use verbose mode for detailed logs while analyzing your artifacts.