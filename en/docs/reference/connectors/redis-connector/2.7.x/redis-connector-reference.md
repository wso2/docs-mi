# Redis Connector Reference

To use the Redis connector, add the <redis.init> element in your configuration before carrying out any other Redis operations. 

??? note "redis.init - Standalone mode" 
    The redis.init operation initializes the connector to interact with Redis.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisHost</td>
            <td>The Redis host name (default localhost).</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisPort</td>
            <td>The port on which the Redis server is running (the default port is 6379).</td>
            <td>Yes</td>
        </tr>
        <tr>
             <td>maxConnections</td>
             <td>The maximum number of connections that are supported by the pool (which should be less than the max client connection limit of Redis)</td>
             <td>Yes</td>
        </tr>
        <tr>
            <td>redisTimeout</td>
            <td>The server TTL (Time to Live) in milliseconds.</td>
            <td>Optional. The default is 2000ms. </td>
        </tr>
        <tr>
            <td>redisConnectionTimeout</td>
            <td>The connection TTL (Time to live) in milliseconds.</td>
            <td>Optional. The default equals to the redisTimeout. </td>
        </tr>
        <tr>
            <td>redisConnectionPoolId</td>
            <td>We are keeping separate pools for each artifact by using ARTIFACT_NAME as a unique name. If and only if the user wants to add 2 or more connectors to a single artifact (say 2 connectors per one API) then the user has to differentiate the Redis connectors within that artifact with-param.</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**
    ```xml
    <redis.init>
        <redisHost>{${properties.redisHost}}</redisHost>
        <redisPort>{${properties.redisPort}}</redisPort>
        <redisTimeout>{${properties.redisTimeout}}</redisTimeout>
        <redisConnectionTimeout>{${properties.redisConnectionTimeout}}</redisConnectionTimeout>
    </redis.init>
    ```

    If you are connecting using a cache key, use the following init configuration.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>cacheKey</td>
            <td>Key of the cache (password).</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>useSsl</td>
            <td>A flag to switch between SSL and non-SSL.</td>
            <td>Optional. Default is false.</td>
        </tr>
    </table>

    **Sample configuration**
    ```xml
    <redis.init>
        <redisHost>{${properties.redisHost}}</redisHost>
        <redisPort>{${properties.redisPort}}</redisPort>
        <redisTimeout>{${properties.redisTimeout}}</redisTimeout>
        <redisConnectionTimeout>{${properties.redisConnectionTimeout}}</redisConnectionTimeout>
        <cacheKey>{${properties.cacheKey}}</cacheKey>
        <useSsl>{${properties.useSsl}}</useSsl>
    </redis.init>
    ```

    If you prefer to use the connectionURI over above configuration, use the following init configuration.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisConnectionURI</td>
            <td>The Redis connection URI in the form of redis://[user:password@]host[:port]/[database] or rediss://[user:password@]host[:port]/[database] to connect over TLS/SSL</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisTimeout</td>
            <td>The server TTL (Time to Live) in milliseconds.</td>
            <td>Optional. The default is 2000ms. </td>
        </tr>
        <tr>
            <td>redisConnectionTimeout</td>
            <td>The connection TTL (Time to live) in milliseconds.</td>
            <td>Optional. The default equals to the redisTimeout. </td>
        </tr>
    </table>

    **Sample configuration**
    ```xml
    <redis.init>
        <redisConnectionURI>{${properties.redisConnectionURI}}</redisConnectionURI>
        <redisTimeout>{${properties.redisTimeout}}</redisTimeout>
        <redisConnectionTimeout>{${properties.redisConnectionTimeout}}</redisConnectionTimeout>
    </redis.init>
    ```

??? note "redis.init - Cluster mode"
    The redis.init operation initializes the connector to interact with Redis cluster.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>isJmxEnabled</td>
            <td>A flag to enable JMX if required (Default is false).</td>
            <td>No</td>
        </tr>
        <tr>
            <td>redisClusterEnabled</td>
            <td>A flag to enable the redis cluster mode (Default is false).</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>clusterNodes</td>
            <td>Comma separated list of the cluster nodes as Node1_hostname:Port,Node2_hostname:Port, etc. Example: 127.0.0.1:40001,127.0.0.1:40002</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisTimeout</td>
            <td>The server TTL (Time to Live) in milliseconds.</td>
            <td>Optional. The default is 2000ms. </td>
        </tr>
        <tr>
            <td>redisConnectionTimeout</td>
            <td>The connection TTL (Time to live) in milliseconds.</td>
            <td>Optional. The default equals to the redisTimeout. </td>
        </tr>
        <tr>
            <td>maxAttempts</td>
            <td>The number of retries.</td>
            <td>Optional. The default is 5. </td>
        </tr>
        <tr>
            <td>clientName</td>
            <td>Name of the client.</td>
            <td>Optional. Default is empty</td>
        </tr>
        <tr>
            <td>cacheKey</td>
            <td>Key of the cache (password).</td>
            <td>Optional. </td>
        </tr>
        <tr>
            <td>useSsl</td>
            <td>A flag to switch between SSL and non-SSL.</td>
            <td>Optional. Default is false.</td>
        </tr>
    </table>

    **Sample configuration**
    ```xml
    <redis.init>
        <redisHost>{${properties.redisHost}}</redisHost>
        <redisPort>{${properties.redisPort}}</redisPort>
        <redisTimeout>{${properties.redisTimeout}}</redisTimeout>
        <redisConnectionTimeout>{${properties.redisConnectionTimeout}}</redisConnectionTimeout>
        <maxAttempts>5</maxAttempts>   
        <clientName>WSO2EI</clientName>
    </redis.init>
    ```

    If you are connecting using a cache key, use the following init configuration.

    **Sample configuration**
    ```xml
    <redis.init>
        <redisHost>{${properties.redisHost}}</redisHost>
        <redisPort>{${properties.redisPort}}</redisPort>
        <redisTimeout>{${properties.redisTimeout}}</redisTimeout>
        <redisConnectionTimeout>{${properties.redisConnectionTimeout}}</redisConnectionTimeout>
        <maxAttempts>5</maxAttempts>   
        <clientName>WSO2EI</clientName>
        <cacheKey>{${properties.cacheKey}}</cacheKey>
        <useSsl>{${properties.useSsl}}</useSsl>
    </redis.init>
    ```

??? note "redis.init - sentinel mode"
    The redis.init operation initializes the connector to interact with the Redis cluster.
    Sentinel password configuration is available from version 2.5.0 
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>sentinelEnabled</td>
            <td>A flag to enable the sentinel cluster mode (this is false by default).</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>sentinels</td>
            <td>Comma separated list of the sentinel nodes in the following format: Node1_hostname:Port,Node2_hostname:Port, etc. For example: 172.18.0.4:26379,172.18.0.5:26379</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>sentinelSoTimeout</td>
            <td>The server TTL (Time to Live) in milliseconds.</td>
            <td>Optional. The default is 2000ms. </td>
        </tr>
        <tr>
            <td>sentinelConnectionTimeout</td>
            <td>The connection TTL (Time to live) in milliseconds.</td>
            <td>Optional. The default equals to the redisTimeout. </td>
        </tr>
        <tr>
            <td>sentinelPassword</td>
            <td>The password of the sentinel node (if configured only)</td>
            <td>Optional</td>
        </tr>
    </table>

    **Sample configuration**
    ```xml
    <redis.init>
        <sentinelUser>{${properties.sentinelUser}}</sentinelUser>
        <sentinelPassword>{${properties.sentinelPassword}}</sentinelPassword>
        <masterName>{${properties.masterName}}</masterName>
        <masterUser>{${properties.masterName}}</masterUser>
        <masterPassword>{${properties.masterPassword}}</masterPassword>
        <sentinelEnabled>true</sentinelEnabled>
        <dbNumber>0</dbNumber>
        <sentinels>172.18.0.4:26379,172.18.0.5:26379,172.18.0.6:26379</sentinels>
        <sentinelClientName>{${properties.sentinelClientName}}</sentinelClientName>
        <sentinelConnectionTimeout>{${properties.sentinelConnectionTimeout}}</sentinelConnectionTimeout>
        <sentinelSoTimeout>{${properties.sentinelSoTimeout}}</sentinelSoTimeout>
    </redis.init>
    ```
---

### Connection Commands

??? note "echo"
    The echo operation returns a specified string. See the [related documentation](https://redis.io/commands/echo) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisMessage</td>
            <td>The message that you want to echo.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.echo>
        <redisMessage>{${properties.redisMessage}}</redisMessage>
    </redis.echo>
    ```
    
    **Sample request**

    ```json
    {
        "redisMessage":"sampleMessage"
    }
    ```

??? note "ping"
    The ping operation pings the server to verify whether the connection is still alive. See the [related documentation](https://redis.io/commands/ping) for more information.

    **Sample configuration**

    ```xml
    <redis.ping/>
    ```
    
    **Sample request**

    An empty request can be handled by the ping operation.

??? note "quit"
    The quit operation closes the connection to the server. See the [related documentation](https://redis.io/commands/quit) for more information.

    **Sample configuration**

    ```xml
    <redis.quit/>
    ```
    
    **Sample request**

    An empty request can be handled by the quit operation.

### Hashes

??? note "hDel"
    The hDel operation deletes one or more specified hash fields. See the [related documentation](https://redis.io/commands/hdel) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the hash is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisFields</td>
            <td>The fields that you want to delete.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.hDel>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisFields>{${properties.redisFields}}</redisFields>
    </redis.hDel>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisFields":"sampleField1 sampleField2"
    }
    ```

??? note "hExists"
    The hExists operation determines whether a specified hash field exists. See the [related documentation](https://redis.io/commands/hexists) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the hash is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisFields</td>
            <td>The fields that determine existence.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.hExists>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisFields>{${properties.redisFields}}</redisFields>
    </redis.hExists>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisFields":"sampleField"
    }
    ```

??? note "hGet"
    The hGet operation retrieves the value of a particular field in a hash stored in a specified key. See the [related documentation](https://redis.io/commands/hget) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the hash is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisFields</td>
            <td>The field for which you want to retrieve the value.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.hGet>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisFields>{${properties.redisFields}}</redisFields>
    </redis.hGet>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisFields":"sampleField"
    }
    ```

??? note "hGetAll"
    The hGetAll operation retrieves all the fields and values of a hash stored in a specified key. See the [related documentation](https://redis.io/commands/hgetall) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the hash is stored.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.hGetAll>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.hGetAll>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
    }
    ```

??? note "hIncrBy"
    The hIncrBy operation increments the integer value of a hash field by the specified amount. See the [related documentation](https://redis.io/commands/hincrby) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the hash is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisFields</td>
            <td>The hash field for which you want to increment the value.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisValue</td>
            <td>The amount by which you want to increment the hash field value.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.hIncrBy>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisField>{${properties.redisField}}</redisField>
        <redisValue>{${properties.redisValue}}</redisValue>
    </redis.hIncrBy>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisField":"sampleField",
        "redisValue":"1"
    }
    ```

??? note "hKeys"
    The hKeys operation retrieves all the fields in a hash. See the [related documentation](https://redis.io/commands/hkeys) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the hash is stored.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.hKeys>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.hKeys>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
    }
    ```

??? note "hLen"
    The hLen operation retrieves the number of fields in a hash. See the [related documentation](https://redis.io/commands/hlen) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the hash is stored.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.hKeys>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.hKeys>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
    }
    ```

??? note "hMGet"
    The hMGet operation retrieves values associated with each of the specified fields in a hash that is stored in a particular key. See the [related documentation](https://redis.io/commands/hmget) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the hash is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisFields</td>
            <td>The hash field for which you want to retrieve values.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.hMGet>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisFields>{${properties.redisFields}}</redisFields>
    </redis.hMGet>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisFields":"sampleField1 sampleField2"
    }
    ```

??? note "hMSet"
    The hMSet operation sets specified fields to their respective values in the hash stored in a particular key. See the [related documentation](https://redis.io/commands/hmset) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the hash is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisFieldsValues</td>
            <td>The fields you want to set and their respective values.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.hMSet>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisFieldsValues>{${properties.redisFieldsValues}}</redisFieldsValues>
    </redis.hMSet>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisFieldsValues":"sampleField1 sampleValue1 sampleField2 sampleValue2"
    }
    ```

??? note "hSet"
    The hSet operation sets a specific field in a hash to a specified value. See the [related documentation](https://redis.io/commands/hset) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the hash is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisFields</td>
            <td>The field for which you want to set a value.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisValue</td>
            <td>The amount by which you want to increment the hash field value.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.hSet>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisField>{${properties.redisField}}</redisField>
        <redisValue>{${properties.redisValue}}</redisValue>
    </redis.hSet>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisField":"sampleField",
        "redisValue":"1"
    }
    ```

??? note "hSetnX"
    The hSetnX operation sets a specified field to a value, only if the field does not already exist in the hash. If field already exists, this operation has no effect. See the [related documentation](https://redis.io/commands/hsetnx) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the hash is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisFields</td>
            <td>The field for which you want to set a value.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisValue</td>
            <td>The amount by which you want to increment the hash field value.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.hSetnX>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisField>{${properties.redisField}}</redisField>
        <redisValue>{${properties.redisValue}}</redisValue>
    </redis.hSetnX>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisField":"sampleField",
        "redisValue":"1"
    }
    ```

??? note "hVals"
    The hVals operation retrieves all values in a hash that is stored in a particular key. See the [related documentation](https://redis.io/commands/hvals) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the hash is stored.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.hVals>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.hVals>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
    }
    ```

### Keys

??? note "del"
    The del operation deletes a specified key if it exists. See the [related documentation](https://redis.io/commands/del) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key that you want to delete.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.del>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.del>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
    }
    ```

??? note "exists"
    The exists operation determines whether a specified key exists. See the [related documentation](https://redis.io/commands/exists) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key that you want to determine existence.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.exists>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.exists>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
    }
    ```

??? note "expire"
    The expire operation sets a TTL(Time to live) for a key so that the key will automatically delete once it reaches the TTL. The TTL should be specified in seconds. See the [related documentation](https://redis.io/commands/expire) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key that you want to specify a TTL.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisSeconds</td>
            <td>The number of seconds representing the TTL that you want to set for the key.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.expire>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisSeconds>{${properties.redisSeconds}}</redisSeconds>
    </redis.expire>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisSeconds":"10"
    }
    ```

??? note "expireAt"
    The expireAt operation sets the time after which an existing key should expire. Here the time should be specified as a UNIX timestamp. See the [related documentation](https://redis.io/commands/expireat) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key that you want to set an expiration.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisUnixTime</td>
            <td>The time to expire specified in the UNIX timestamp format.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.expire>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisUnixTime>{${properties.redisUnixTime}}</redisUnixTime>
    </redis.expire>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisUnixTime":"1293840000"
    }
    ```

??? note "keys"
    The keys operation retrieves all keys that match a specified pattern. See the [related documentation](https://redis.io/commands/keys) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisPattern</td>
            <td>The pattern that you want to match when retrieving keys.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.keys>
        <redisPattern>{${properties.redisPattern}}</redisPattern>
    </redis.keys>
    ```
    
    **Sample request**

    ```json
    {
        "redisPattern":"*"
    }
    ```

??? note "randomKey"
    A sample request with an empty body can be handled by the randomKey operation. See the [related documentation](https://redis.io/commands/randomkey) for more information.
    
    **Sample configuration**

    ```xml
    <redis.randomKey/>
    ```
    
    **Sample request**

    ```json
    {
        "redisPattern":"*"
    }
    ```

??? note "rename"
    The rename operation renames an existing key to a new name that is specified. See the [related documentation](https://redis.io/commands/rename) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisOldKey</td>
            <td>The name of an existing key that you want to rename.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisNewKey</td>
            <td>The new name that you want the key to have.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.rename>
        <redisOldKey>{${properties.redisOldKey}}</redisOldKey>
        <redisNewKey>{${properties.redisNewKey}}</redisNewKey>
    </redis.rename>
    ```
    
    **Sample request**

    ```json
    {
        "redisOldKey":"sampleOldKey",
        "redisNewKey":"sampleNewKey"
    }
    ```

??? note "renamenX"
    The renamenX operation renames a key to a new key, only if the new key does not already exist. See the [related documentation](https://redis.io/commands/renamenx) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisOldKey</td>
            <td>The name of an existing key that you want to rename.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisNewKey</td>
            <td>The new name that you want the key to have.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.renamenX>
        <redisOldKey>{${properties.redisOldKey}}</redisOldKey>
        <redisNewKey>{${properties.redisNewKey}}</redisNewKey>
    </redis.renamenX>
    ```
    
    **Sample request**

    ```json
    {
        "redisOldKey":"sampleOldKey",
        "redisNewKey":"sampleNewKey"
    }
    ```

??? note "ttl"
    The ttl operation retrieves the TTL (Time to Live) value of a specified key. See the [related documentation](https://redis.io/commands/ttl) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key for which you want to retrieve the TTL.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.ttl>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.ttl>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
    }
    ```

??? note "type"
    The type operation retrieves the data type of a value stored in a specified key. See the [related documentation](https://redis.io/commands/type) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key that the value is stored.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.type>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.type>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
    }
    ```

### Lists

??? note "blPop"
    The blPop operation retrieves the first element in a list, if available, or blocks the connection for a specified amount of time until an element is available. See the [related documentation](https://redis.io/commands/blpop) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the list is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisBrPopTimeout</td>
            <td>The amount of time to keep the connection blocked, waiting for an element to be available in the tail of the list.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.brPop>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisBrPopTimeout>{${properties.redisBrPopTimeout}}</redisBrPopTimeout>
    </redis.brPop>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
        "redisBrPopTimeout":"0"
    }
    ```

??? note "brPop"
    The brPop operation retrieves the last element in a list, if available, or blocks the connection for a specified amount of time until an element is available. See the [related documentation](https://redis.io/commands/brpop) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the list is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisBlPopTimeout</td>
            <td>The amount of time to keep the connection blocked, waiting for an element to be available in the head of the list.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.blPop>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisBlPopTimeout>{${properties.redisBlPopTimeout}}</redisBlPopTimeout>
    </redis.blPop>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
        "redisBlPopTimeout":"0"
    }
    ```

??? note "lInsert"
    The lInsert operation inserts a specified element before or after an existing element in a list that is stored in a specified key. See the [related documentation](https://redis.io/commands/linsert) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the list is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisWhere</td>
            <td>The place where you want to add an element. Possible values are BEFORE or AFTER. For example, whether you want to add an element before a particular element that exists in the list.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisPivot</td>
            <td>An existing element in the list that is used as the pivot element.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisValue</td>
            <td>The element that you want to insert to the list.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.lInsert>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisWhere>{${properties.redisWhere}}</redisWhere>
        <redisPivot>{${properties.redisPivot}}</redisPivot>
        <redisValue>{${properties.redisValue}}</redisValue>
    </redis.lInsert>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisWhere":"BEFORE",
        "redisPivot":"samplePivotElement",
        "redisValue":"sampleInsertElement"
    }
    ```

??? note "lLen"
    The lLen operation retrieves the length of a list that is stored in a specified key. See the [related documentation](https://redis.io/commands/llen) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the list is stored.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.lLen>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.lLen>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
    }
    ```

??? note "lPop"
    The lPop operation retrieves the first element in a list that is stored in a specified key. See the [related documentation](https://redis.io/commands/lpop) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the list is stored.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.lLen>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.lLen>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
    }
    ```

??? note "lPush"
    The lPush operation inserts one or more elements to the head of a list that is stored in a specified key. See the [related documentation](https://redis.io/commands/lpush) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the list is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisStrings</td>
            <td>One or more elements that you want to add to the head of the list.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.lPush>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisStrings>{${properties.redisStrings}}</redisStrings>
    </redis.lPush>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisStrings":"sampleValues"
    }
    ```

??? note "lPushX"
    The lPushX operation inserts one or more elements to the head of a list stored in a specified key, only if the key already exists and holds a list. See the [related documentation](https://redis.io/commands/lpushx) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the list is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisStrings</td>
            <td>One or more elements that you want to add to the head of the list.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.lPushX>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisStrings>{${properties.redisStrings}}</redisStrings>
    </redis.lPushX>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisStrings":"sampleValues"
    }
    ```

??? note "lRange"
    The lRange operation retrieves a range of elements from a list. See the [related documentation](https://redis.io/commands/lrange) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the list is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisStart</td>
            <td>The starting index.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisEnd</td>
            <td>The ending index.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.lRange>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisStart>{${properties.redisStart}}</redisStart>
        <redisEnd>{${properties.redisEnd}}</redisEnd>
    </redis.lRange>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisStart":"0",
        "redisEnd":"-1"
    }
    ```

??? note "lRem"
    The lRem operation removes elements from a list. See the [related documentation](https://redis.io/commands/lrem) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the list is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisCount</td>
            <td>The number of occurrences of the element that you want to remove.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisValue</td>
            <td>The element that you want to remove.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.lRem>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisCount>{${properties.redisCount}}</redisCount>
        <redisValue>{${properties.redisValue}}</redisValue>
    </redis.lRem>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisCount":"1",
        "redisValue":"sampleValue"
    }
    ```

??? note "lSet"
    The lSet operation sets the value of an element in a list by its index. See the [related documentation](https://redis.io/commands/lset) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the list is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisIndex</td>
            <td>The starting index.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisValue</td>
            <td>The value of the key</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.lSet>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisIndex>{${properties.redisIndex}}</redisIndex>
        <redisValue>{${properties.redisValue}}</redisValue>
    </redis.lSet>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisIndex":"0",
        "redisValue":"sampleValue"
    }
    ```

??? note "lTrim"
    The lTrim operation trims a list to a specified range. See the [related documentation](https://redis.io/commands/ltrim) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the list is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisStart</td>
            <td>The starting index.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisEnd</td>
            <td>The ending index.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.lTrim>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisStart>{${properties.redisStart}}</redisStart>
        <redisEnd>{${properties.redisEnd}}</redisEnd>
    </redis.lTrim>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisStart":"0",
        "redisEnd":"-1"
    }
    ```

??? note "rPopLPush"
    The rPopLPush operation removes the last element in a list, then inserts it to another list, and then returns it. See the [related documentation](https://redis.io/commands/rpoplpush) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisSrckey</td>
            <td>The name of the source key from where the last element is retrieved.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisDstkey</td>
            <td>The name of destination key.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.rPopLPush>
        <redisSrckey>{${properties.redisSrckey}}</redisSrckey>
        <redisDstkey>{${properties.redisDstkey}}</redisDstkey>
    </redis.rPopLPush>
    ```
    
    **Sample request**

    ```json
    {
        "redisSrckey":"sampleSourceKey",
        "redisDstkey":"sampleDestinationKey"
    }
    ```

??? note "rPush"
    The rPush operation inserts one or more elements to the tail of a list that is stored in a specified key. See the [related documentation](https://redis.io/commands/rpush) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the list is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisStrings</td>
            <td>One or more elements that you want to add to the tail of the list.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.rPush>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisStrings>{${properties.redisStrings}}</redisStrings>
    </redis.rPush>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisStrings":"sampleValues"
    }
    ```

??? note "rPushX"
    The rPushX operation inserts one or more elements to the tail of a list stored in a specified key, only if the key already exists and holds a list. See the [related documentation](https://redis.io/commands/rpushx) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key where the list is stored.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisValue</td>
            <td>One or more elements that you want to add to the tail of the list.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.rPushX>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisValue>{${properties.redisValue}}</redisValue>
    </redis.rPushX>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisValue":"sampleValue"
    }
    ```

### Server Commands

??? note "flushAll"
    The flushAll operation deletes all the keys from all existing databases. See the [related documentation](https://redis.io/commands/flushall) for more information.

    **Sample configuration**

    ```xml
    <redis.flushAll/>
    ```
    
    **Sample request**

    A sample request with an empty body can be handled by the flushAll operation.

??? note "flushDB"
    The flushDB operation deletes all the keys from the currently selected database. See the [related documentation](https://redis.io/commands/flushdb) for more information.

    **Sample configuration**

    ```xml
    <redis.flushDB/>
    ```
    
    **Sample request**

    A sample request with an empty body can be handled by the flushDB operation.

### Sets

??? note "sadd"
    The sadd operation is used to add one or more members to a set. See the [related documentation](https://redis.io/commands/sadd) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisMembers</td>
            <td>The value to be added to the key.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.sadd>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisMembers>{${properties.redisMembers}}</redisMembers>
    </redis.sadd>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisMembers":"sampleValue"
    }
    ```

??? note "sDiffStore"
    The sDiffStore operation is used to subtract multiple sets and store the resulting set in a key. See the [related documentation](https://redis.io/commands/sdiffstore) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisDstkey</td>
            <td>The name of the destination key.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.sDiffStore>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisDstkey>{${properties.redisDstkey}}</redisDstkey>
    </redis.sDiffStore>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisDstkey":"sampleDestinationKey"
    }
    ```

??? note "sInter"
    The sInter operation is used to intersect multiple sets. See the [related documentation](https://redis.io/commands/sinter) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.sInter>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.sInter>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
    }
    ```

??? note "sInterStore"
    The sInterStore operation is used to intersect multiple sets and store the resulting set in a key. See the [related documentation](https://redis.io/commands/sinterstore) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisDstkey</td>
            <td>The name of the destination key.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.sDiffStore>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisDstkey>{${properties.redisDstkey}}</redisDstkey>
    </redis.sDiffStore>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisDstkey":"sampleDestinationKey"
    }
    ```

??? note "sIsMember"
    The sIsMember operation is used to determine if a given value is a member of a set. See the [related documentation](https://redis.io/commands/sismember) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisMembers</td>
            <td>The name of a member in a key.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.sIsMember>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisMembers>{${properties.redisMembers}}</redisMembers>
    </redis.sIsMember>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisMembers":"sampleValue"
    }
    ```

??? note "sMembers"
    The sMembers operation is used to get the all members in a set. See the [related documentation](https://redis.io/commands/smembers) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.sMembers>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.sMembers>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
    }
    ```

??? note "sMove"
    The sMove operation is used to move a member from one set to another. See the [related documentation](https://redis.io/commands/smove) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisSrckey</td>
            <td>The name of the source key.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisDstkey</td>
            <td>The name of the destination key.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisMember</td>
            <td>The name of the member.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.sMove>
        <redisSrckey>{${properties.redisSrckey}}</redisSrckey>
        <redisDstkey>{${properties.redisDstkey}}</redisDstkey>
        <redisMember>{${properties.redisMember}}</redisMember>
    </redis.sMove>
    ```
    
    **Sample request**

    ```json
    {
        "redisSrckey":"sampleSourceKey",
        "redisDstkey":"sampleDestinationKey",
        "redisMember":"sampleMember"
    }
    ```

??? note "sPop"
    The sPop operation is used to remove and return one or multiple random members from a set. See the [related documentation](https://redis.io/commands/spop) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.sPop>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.sPop>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
    }
    ```

??? note "sRandMember"
    The sRandMember operation is used to get one or multiple random members from a set. See the [related documentation](https://redis.io/commands/srandmember) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.sRandMember>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.sRandMember>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
    }
    ```

??? note "sRem"
    The sRem operation is used to remove one or more members from a set. See the [related documentation](https://redis.io/commands/srem) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisMembers</td>
            <td>The name of a member in a key.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.sRem>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisMembers>{${properties.redisMembers}}</redisMembers>
    </redis.sRem>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisMembers":"sampleValue"
    }
    ```

??? note "sUnion"
    The sUnion operation is used to add multiple sets. See the [related documentation](https://redis.io/commands/sunion) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.sUnion>
        <redisKey>{${properties.redisKey}}</redisKey>
    </redis.sUnion>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey"
    }
    ```

??? note "sUnionStore"
    The sUnionStore operation is used to add multiple sets and store the resulting set in a key. See the [related documentation](https://redis.io/commands/sunionstore) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisDstkey</td>
            <td>The name of the destination key.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.sUnionStore>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisDstkey>{${properties.redisDstkey}}</redisDstkey>
    </redis.sUnionStore>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisDstkey":"sampleValue"
    }
    ```

### Sorted Sets

??? note "zadd"
    The zadd operation adds one or more members to a sorted set, or update its score if a specified member already exists. See the [related documentation](https://redis.io/commands/zadd) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisScore</td>
            <td>The score of the sorted set.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisMembers</td>
            <td>The name of a member you want to add.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.zadd>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisScore>{${properties.redisScore}}</redisScore>
        <redisMember>{${properties.redisMember}}</redisMember>
    </redis.zadd>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisScore":"1.1",
        "redisMembers":"sampleMember"
    }
    ```

??? note "zCount"
    The zCount operation retrieves a count of members in a sorted set, with scores that are within the min and max values specified. See the [related documentation](https://redis.io/commands/zcount) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>redisKey</td>
            <td>The name of the key.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisMin</td>
            <td>The minimum score value.</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>redisMax</td>
            <td>The maximum score value.</td>
            <td>Yes</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <redis.zCount>
        <redisKey>{${properties.redisKey}}</redisKey>
        <redisMin>{${properties.redisMin}}</redisMin>
        <redisMax>{${properties.redisMax}}</redisMax>
    </redis.zCount>
    ```
    
    **Sample request**

    ```json
    {
        "redisKey":"sampleKey",
        "redisMin":"1.1",
        "redisMax":"2.2"
    }
    ```