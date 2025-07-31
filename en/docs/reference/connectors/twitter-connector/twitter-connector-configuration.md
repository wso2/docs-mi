# Setting up the Twitter Connector in Integration Runtime

Before you start configuring the Twitter connector, you need to configure the integration runtime.

## Adding message builders

Consider the root of the Micro Integrator/ Enterprise Integrator as `<PRODUCT_HOME>`.

If you are using the **Micro Integrator 4.2.0**, you need to add the following message builder to **`<PRODUCT_HOME>`/conf/deployment.toml** file. For more information, refer to the [Working with Message Builders and Formatters]({{base_path}}/install-and-setup/setup/message-builders-formatters/message-builders-and-formatters) and [Product Configurations]({{base_path}}/reference/config-catalog-mi/) documentation.

```toml
[[custom_message_builders]]
class="org.wso2.micro.integrator.core.json.JsonStreamBuilder"
content_type = "application/problem+json"
```

If you are using **EI 6.x** version, you can enable this property by doing the following Axis2 configurations in the **`<PRODUCT_HOME>`/repository/conf/axis2/axis2.xml** and **`<PRODUCT_HOME>`/repository/conf/axis2/axis2_blocking_client.xml** files.

**messageBuilders**

```xml
<messageBuilder contentType="application/problem+json"
                class="org.wso2.carbon.integrator.core.json.JsonStreamBuilder"/>
```

## Enhanced Features in Version 4.0.0+

### Automatic Token Management
The connector now automatically handles OAuth 2.0 token refresh without manual intervention. When an access token expires, the connector uses the refresh token to obtain a new access token seamlessly.

### Improved Error Handling
Enhanced error handling with specific error codes for different failure scenarios, including rate limiting, authentication issues, and API errors.

### Performance Optimizations
- Reduced JavaScript overhead through Java-based URL building
- Centralized HTTP handling with built-in retry logic
- Automatic cleanup of Twitter-specific response headers
