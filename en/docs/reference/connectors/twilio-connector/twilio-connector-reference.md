# Twilio Connector Reference

The following operations allow you to work with the Twilio Connector. Click an operation name to see parameter details and samples on how to use it.

---

## Initialize the connector

To use the Twilio connector, add the `<twilio.init>` element in your configuration before any other Twilio operations. This Twilio configuration authenticates with Twilio by specifying the SID and authentication token of your master Twilio account. You can find your SID and token by logging into your Twilio account and going to the API Credentials section on the dashboard.

??? note "twilio.init"
    The twilio.init operation initializes the connector to interact with the Twilio.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>accountSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The unique identifier for your Twilio account. It is used to authenticate requests and identify the account making the API call.</td>
            </tr>
        <tr>
            <td>authToken</td>
            <td>String</td>
            <td>Yes</td>
            <td>The secret authentication token associated with your Twilio account. It is used together with the Account SID to authenticate API requests.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.init>
        <accountSid>{$ctx:accountSid}</accountSid>
        <authToken>{$ctx:accessToken}</authToken>
    </twilio.init>
    ```

    **Sample request**

    ```xml
    <twilio.init>
        <accountSid>TheAccountSIDae398e642c9cc32d</accountSid>
        <authToken>AC5ef8732aThisIsATokenAbc123:{AuthToken}</authToken>
    </twilio.init>
    ```

### Re-use Twilio configurations

As a best practice, save the Twilio configuration as a [local entry]({{base_path}}/develop/creating-artifacts/registry/creating-local-registry-entries/). You can then easily reference it with the `configKey` attribute in your Twilio operations. For example, if you saved the above `<twilio.init>` entry as a local entry named `MyTwilioConfig`, you could reference it from an operation like `getTranscriptionList` as follows:
    ```xml
    <twilio.getTranscriptionList configKey="MyTwilioConfig"/>
    ```
---

## Work with accounts

The following operations are available for working with [accounts](https://www.twilio.com/docs/iam/api/account):

### Create a sub-account 

??? note "createSubAccount"
    To create a sub-account as a resource of the master account, use `twilio.createSubAccount` and specify the following properties. If successful, Twilio responds with information about the sub-account, including its SID, a 34-character string that uniquely identifies this sub-account. See the [related API documentation](http://www.twilio.com/docs/api/rest/subaccounts) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>Yes</td>
            <td>A human-readable description of the new sub-account, up to 64 characters. Defaults to `SubAccount` Created at {`YYYY-MM-DD HH:MM meridian`}`</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <twilio.createSubAccount configKey="MyTwilioConfig">
        <friendlyName>{$ctx:friendlyName}</friendlyName>
    </twilio.createSubAccount>
    ```

    **Sample request**
    
    Given below is a sample request that can be handled by the createSubAccount operation.
    
    ```xml
     <twilio.createSubAccount configKey="MyTwilioConfig">
        <friendlyName>My New Account</friendlyName>
     </twilio.createSubAccount>
    ``` 

### Get a list of accounts

??? note "getAccountsList"
    To get a list of existing accounts that belong to the master account, use `twilio.getAccountsList` and optionally specify the following properties. If you do not specify these properties, all accounts belong to the master account are returned. The master account is included in the list. See the [related API documentation](http://www.twilio.com/docs/api/rest/account#list) for more information.
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>No</td>
            <td>The human-readable account name. Only accounts whose name exactly match this string are returned.</td>
        </tr>
        <tr>
            <td>status</td>
            <td>String</td>
            <td>No</td>
            <td>The status of accounts to return: active, suspended, or closed. Only accounts with this status are returned.</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <twilio.getAccountsList configKey="MyTwilioConfig">
        <friendlyName>{$ctx:friendlyName}</friendlyName>
        <status>{$ctx:status}</status>
    </twilio.getAccountsList>
    ```

    **Sample request**
    
    Given below is a sample request that can be handled by the getAccountsList operation.
    
    ```xml
     <twilio.getAccountsList configKey="MyTwilioConfig">
        <friendlyName>My SubAccount</friendlyName>
        <status>active</status>
     </twilio.getAccountsList>
    ``` 

### Get a specific account

??? note "getAccount"
    To get information about an account, such as its friendly name, date created, and status, use `twilio.getAccount` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/account) for more information.
    
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>subAccountSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The ID of the account you want to retrieve.</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <twilio.getAccount configKey="MyTwilioConfig">
        <subAccountSid>{$ctx:subAccountSid}</subAccountSid>
    </twilio.getAccount>
    ```

    **Sample request**
    
    Given below is a sample request that can be handled by the getAccount operation.
    
    ```xml
     <twilio.getAccount configKey="MyTwilioConfig">
        <subAccountSid>TheAccountSID8e642c9cc32d</subAccountSid>
     </twilio.getAccount>

    ``` 

### Update an account

??? note "updateAccount"
    To update an account's friendly name and/or status, use `twilio.updateAccount` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/account) for more information.
    
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>subAccountSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The ID of the account you want to update.</td>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>No</td>
            <td>The new human-readable name to give the account.</td>
        </tr>
        <tr>
            <td>status</td>
            <td>String</td>
            <td>No</td>
            <td>The new status of the account: active, suspended, or closed.</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <twilio.updateAccount configKey="MyTwilioConfig">
        <subAccountSid>{$ctx:subAccountSid}</subAccountSid>
        <friendlyName>{$ctx:friendlyName}</friendlyName>
        <status>{$ctx:subAccountSid}</status>
    </twilio.updateAccount>
    ```

    **Sample request**
    
    Given below is a sample request that can be handled by the updateAccount operation.
    
    ```xml
     <twilio.updateAccount configKey="MyTwilioConfig">
        <subAccountSid>TheAccountSID8e642c9cc32d</subAccountSid>
        <friendlyName>MySubAccount</friendlyName>
        <status>suspended</status>
     </twilio.updateAccount>

    ```

## Work with applications

The following operations are available for working with [applications](http://www.twilio.com/docs/api/rest/applications) and [Connect Apps](http://www.twilio.com/docs/connect) in your Twilio account:

### Create an application

??? note "createApplication"
    To create an application in the master account, use `twilio.createApplication` and specify the following properties. If successful, Twilio responds with a representation of the application, including its SID, a 34-character string that uniquely identifies this application. You must specify `voiceUrl` or `smsUrl` or both. See the [related API documentation](http://www.twilio.com/docs/api/rest/applications) for more information.
    
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>Yes</td>
            <td>The human-readable name to give the application, up to 64 characters.</td>
        </tr>
        <tr>
            <td>apiVersion</td>
            <td>String</td>
            <td>No</td>
            <td>Specifies the API version, either 2010-04-01 or 2008-08-01, to use when requests to the application's URLs are received. Defaults to your account's default API version.</td>
        </tr>
        <tr>
            <td>voiceUrl</td>
            <td>String</td>
            <td>No</td>
            <td>The URL that Twilio should request when somebody dials a phone number assigned to this application. Not required if your application does not support voice.</td>
        </tr>
        <tr>
            <td>voiceMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the voice URL. Defaults to POST.</td>
        </tr>
        <tr>
            <td>voiceFallbackUrl</td>
            <td>String</td>
            <td>No</td>
            <td>A URL that Twilio will request if an error occurs when requests are made to the voice URL.</td>
        </tr>
        <tr>
            <td>voiceFallbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the voice fallback URL. Defaults to POST.</td>
        </tr>
        <tr>
            <td>statusCallback</td>
            <td>String</td>
            <td>No</td>
            <td>The URL that Twilio will request to pass status parameters (such as call ended) to your application.</td>
        </tr>
        <tr>
            <td>statusCallbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the status callback URL. Defaults to POST.</td>
        </tr>
        <tr>
            <td>voiceCallerIdLookup</td>
            <td>Boolean</td>
            <td>No</td>
            <td>If true, performs a lookup of the caller's name from the CNAM database and posts it to your app. Defaults to false.</td>
        </tr>
        <tr>
            <td>smsUrl</td>
            <td>String</td>
            <td>No</td>
            <td>The URL that Twilio should request when somebody sends an SMS to a phone number assigned to this application. Not required if your application does not support SMS.</td>
        </tr>
        <tr>
            <td>smsMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the SMS URL. Defaults to POST.</td>
        </tr>
        <tr>
            <td>smsFallbackUrl</td>
            <td>String</td>
            <td>No</td>
            <td>The URL that Twilio will request if an error occurs when requests are made to the SMS URL.</td>
        </tr>
        <tr>
            <td>smsFallbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the SMS fallback URL. Defaults to POST.</td>
        </tr>
        <tr>
            <td>smsStatusCallback</td>
            <td>String</td>
            <td>No</td>
            <td>Twilio will make a POST request to this URL to pass status parameters (such as sent or failed) to your application if you specify this application's SID as the ApplicationSid on an outgoing SMS request.</td>
        </tr>
    </table>

    **Sample configuration**
    
    ```xml
    <twilio.createApplication configKey="MyTwilioConfig">
        <friendlyName>{$ctx:friendlyName}</friendlyName>
        <apiVersion>{$ctx:apiVersion}</apiVersion>
        <voiceUrl>{$ctx:voiceUrl}</voiceUrl>
        <voiceMethod>{$ctx:voiceMethod}</voiceMethod>
        <voiceFallbackUrl>{$ctx:voiceFallbackUrl}</voiceFallbackUrl>
        <voiceFallbackMethod>{$ctx:voiceFallbackMethod}</voiceFallbackMethod>
        <statusCallback>{$ctx:statusCallback}</statusCallback>
        <statusCallbackMethod>{$ctx:statusCallbackMethod}</statusCallbackMethod>
        <voiceCallerIdLookup>{$ctx:voiceCallerIdLookup}</voiceCallerIdLookup>
        <smsUrl>{$ctx:smsUrl}</smsUrl>
        <smsMethod>{$ctx:smsMethod}</smsMethod>
        <smsFallbackUrl>{$ctx:smsFallbackUrl}</smsFallbackUrl>
        <smsFallbackMethod>{$ctx:smsFallbackMethod}</smsFallbackMethod>
        <smsStatusCallback>{$ctx:smsStatusCallback}</smsStatusCallback>
    </twilio.createApplication>
    ```

    **Sample request**
    
    Given below is a sample request that can be handled by the createApplication operation.
    
    ```xml
     <twilio.createApplication configKey="MyTwilioConfig">
        <friendlyName>Phone Me</friendlyName>
        <apiVersion>2010-04-01</apiVersion>
        <voiceUrl>http://demo.twilio.com/docs/voice.xml</voiceUrl>
        <voiceMethod>POST</voiceMethod>
        <voiceFallbackUrl>http://demo.twilio.com/docs/voicefallback.xml</voiceFallbackUrl>
        <voiceFallbackMethod>POST</voiceFallbackMethod>
        <statusCallback>http://demo.twilio.com/docs/statuscallback.xml</statusCallback>
        <statusCallbackMethod>POST</statusCallbackMethod>
        <voiceCallerIdLookup>false</voiceCallerIdLookup>
        <smsUrl>http://demo.twilio.com/docs/sms.xml</smsUrl>
        <smsMethod>POST</smsMethod>
        <smsFallbackUrl>http://demo.twilio.com/docs/smsfallback.xml</smsFallbackUrl>
        <smsFallbackMethod>POST</smsFallbackMethod>
        <smsStatusCallback>http://demo.twilio.com/docs/smsstatuscallback.xml</smsStatusCallback>
     </twilio.createApplication>

    ```

### Get a list of applications

??? note "getApplicationList"
    To get a list of the applications in the master account, use `twilio.getApplicationList` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/applications) for more information.
    
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>No</td>
            <td>The human-readable application name. Only applications whose name exactly match this string are returned.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getApplicationList configKey="MyTwilioConfig">
        <friendlyName>{$ctx:friendlyName}</friendlyName>
    </twilio.getApplicationList>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getApplicationList operation.

    ```xml
    <twilio.getApplicationList configKey="MyTwilioConfig">
        <friendlyName>Phone Me</friendlyName>
    </twilio.getApplicationList>
    ```

### Get a specific application

??? note "getApplication"
    To get a specific application from the master account, use `twilio.getApplication` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/applications) for more information.
    
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>applicationSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 32-character string that uniquely identifies the account.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getApplication configKey="MyTwilioConfig">
        <applicationSid>{$ctx:applicationSid}</applicationSid>
    </twilio.getApplication>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getApplication operation.

    ```xml
    <twilio.getApplication configKey="MyTwilioConfig">
        <applicationSid>AP2a0747eba6abf96b7e3c3ff0b4530f6e</applicationSid>
    </twilio.getApplication>
    ```

### Get a list of  Connect Apps

??? note "getConnectAppList"
    To get a list of the Connect Apps created in the master account, including the permissions each Connect App will request from users, use `twilio.getConnectAppList`. See the [related API documentation](http://www.twilio.com/docs/api/rest/connect-apps) for more information.

    **Sample configuration**

    ```xml
    <twilio.getConnectAppList configKey="MyTwilioConfig"/>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getConnectAppList operation.

    ```xml
    <twilio.getConnectAppList configKey="MyTwilioConfig"/>
    ```

### Get a specific Connect App

??? note "getConnectApp"
    To get the properties of a specific Connect App, use `twilio.getConnectApp` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/connect-apps) for more information.
    
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>connectAppSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>SID of the Connect App.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getConnectApp configKey="MyTwilioConfig">
        <connectAppSid>{$ctx:connectAppSid}</connectAppSid>
    </twilio.getConnectApp>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getConnectApp operation.

    ```xml
    <twilio.getConnectApp configKey="MyTwilioConfig">
        <connectAppSid>CNb989fdd207b04d16aee578018ef5fd93</connectAppSid>
    </twilio.getConnectApp>
    ```

### List a list of authorized Connect Apps

??? note "getAuthorizedConnectAppList"
    To get a list of the Connect Apps that are authorized for your account, use `twilio.getAuthorizedConnectAppList`. See the [related API documentation](http://www.twilio.com/docs/api/rest/authorized-connect-apps) for more information.

    **Sample configuration**

    ```xml
    <twilio.getAuthorizedConnectAppList configKey="MyTwilioConfig"/>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getAuthorizedConnectAppList operation.

    ```xml
    <twilio.getAuthorizedConnectAppList configKey="MyTwilioConfig"/>
    ```

### Get a specific authorized Connect App

??? note "getAuthorizedConnectApp"
    To get the properties of a specific authorized Connect App, including the permissions you have granted it, use `twilio.getAuthorizedConnectApp` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/connect-apps) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>authorizedConnectAppSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>SID of the authorized Connect App.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getAuthorizedConnectApp configKey="MyTwilioConfig">
        <authorizedConnectAppSid>{$ctx:authorizedConnectAppSid}</authorizedConnectAppSid>
    </twilio.getAuthorizedConnectApp>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getAuthorizedConnectApp operation.

    ```xml
    <twilio.getAuthorizedConnectApp configKey="MyTwilioConfig">
        <authorizedConnectAppSid>ConnectAppSID57d80997a64bd33</authorizedConnectAppSid>
    </twilio.getAuthorizedConnectApp>
    ```

### Update an application

??? note "updateApplication"
    To update the properties of an application, use `twilio.updateApplication`, specify the application's SID, and then specify the properties you want to update. If successful, Twilio responds with a representation of the application. See the [related API documentation](http://www.twilio.com/docs/api/rest/applications) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>applicationSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The SID of the application you are updating.</td>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>No</td>
            <td>The human-readable name of the application, up to 64 characters.</td>
        </tr>
        <tr>
            <td>apiVersion</td>
            <td>String</td>
            <td>No</td>
            <td>Specifies the API version, either 2010-04-01 or 2008-08-01, to use when requests to the application's URLs are received. Defaults to your account's default API version.</td>
        </tr>
        <tr>
            <td>voiceUrl</td>
            <td>String</td>
            <td>No</td>
            <td>The URL that Twilio should request when somebody dials a phone number assigned to this application. Not required if your application does not support voice.</td>
        </tr>
        <tr>
            <td>voiceMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the voice URL. Defaults to POST.</td>
        </tr>
        <tr>
            <td>voiceFallbackUrl</td>
            <td>String</td>
            <td>No</td>
            <td>A URL that Twilio will request if an error occurs when requests are made to the voice URL.</td>
        </tr>
        <tr>
            <td>voiceFallbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the voice fallback URL. Defaults to POST.</td>
        </tr>
        <tr>
            <td>statusCallback</td>
            <td>String</td>
            <td>No</td>
            <td>The URL that Twilio will request to pass status parameters (such as call ended) to your application.</td>
        </tr>
        <tr>
            <td>statusCallbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the status callback URL. Defaults to POST.</td>
        </tr>
        <tr>
            <td>voiceCallerIdLookup</td>
            <td>Boolean</td>
            <td>No</td>
            <td>If true, performs a lookup of the caller's name from the CNAM database and posts it to your app. Defaults to false.</td>
        </tr>
        <tr>
            <td>smsUrl</td>
            <td>String</td>
            <td>No</td>
            <td>The URL that Twilio should request when somebody sends an SMS to a phone number assigned to this application. Not required if your application does not support SMS.</td>
        </tr>
        <tr>
            <td>smsMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the SMS URL. Defaults to POST.</td>
        </tr>
        <tr>
            <td>smsFallbackUrl</td>
            <td>String</td>
            <td>No</td>
            <td>The URL that Twilio will request if an error occurs when requests are made to the SMS URL.</td>
        </tr>
        <tr>
            <td>smsFallbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the SMS fallback URL. Defaults to POST.</td>
        </tr>
        <tr>
            <td>smsStatusCallback</td>
            <td>String</td>
            <td>No</td>
            <td>Twilio will make a POST request to this URL to pass status parameters (such as sent or failed) to your application if you specify this application's SID as the `ApplicationSid` on an outgoing SMS request.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.updateApplication configKey="MyTwilioConfig">
        <applicationSid>{$ctx:applicationSid}</applicationSid>
        <friendlyName>{$ctx:friendlyName}</friendlyName>
        <apiVersion>{$ctx:apiVersion}</apiVersion>
        <voiceUrl>{$ctx:voiceUrl}</voiceUrl>
        <voiceMethod>{$ctx:voiceMethod}</voiceMethod>
        <voiceFallbackUrl>{$ctx:voiceFallbackUrl}</voiceFallbackUrl>
        <voiceFallbackMethod>{$ctx:voiceFallbackMethod}</voiceFallbackMethod>
        <statusCallback>{$ctx:statusCallback}</statusCallback>
        <statusCallbackMethod>{$ctx:statusCallbackMethod}</statusCallbackMethod>
        <voiceCallerIdLookup>{$ctx:voiceCallerIdLookup}</voiceCallerIdLookup>
        <smsUrl>{$ctx:smsUrl}</smsUrl>
        <smsMethod>{$ctx:smsMethod}</smsMethod>
        <smsFallbackUrl>{$ctx:smsFallbackUrl}</smsFallbackUrl>
        <smsFallbackMethod>{$ctx:smsFallbackMethod}</smsFallbackMethod>
        <smsStatusCallback>{$ctx:smsStatusCallback}</smsStatusCallback>
    </twilio.updateApplication>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the updateApplication operation.

    ```xml
    <twilio.updateApplication configKey="MyTwilioConfig">
        <applicationSid>AP2a0747eba6abf96b7e3c3ff0b4530f6e</applicationSid>
        <friendlyName>Phone Me</friendlyName>
        <apiVersion>2010-04-01</apiVersion>
        <voiceUrl>http://demo.twilio.com/docs/voice.xml</voiceUrl>
        <voiceMethod>POST</voiceMethod>
        <voiceFallbackUrl>http://demo.twilio.com/docs/voicefallback.xml</voiceFallbackUrl>
        <voiceFallbackMethod>POST</voiceFallbackMethod>
        <statusCallback>http://demo.twilio.com/docs/statuscallback.xml</statusCallback>
        <statusCallbackMethod>POST</statusCallbackMethod>
        <voiceCallerIdLookup>false</voiceCallerIdLookup>
        <smsUrl>http://demo.twilio.com/docs/sms.xml</smsUrl>
        <smsMethod>POST</smsMethod>
        <smsFallbackUrl>http://demo.twilio.com/docs/smsfallback.xml</smsFallbackUrl>
        <smsFallbackMethod>POST</smsFallbackMethod>
        <smsStatusCallback>http://demo.twilio.com/docs/smsstatuscallback.xml</smsStatusCallback>
    </twilio.updateApplication>
    ```

### Update a Connect App

??? note "updateConnectApp"
    To update the properties of a Connect App, use `twilio.updateConnectApp`, specify the Connect App's SID, and then specify the properties you want to update. If successful, Twilio responds with a representation of the application. See the [related API documentation](http://www.twilio.com/docs/api/rest/connect-apps) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>connectAppSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The SID of the Connect App you are updating.</td>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>No</td>
            <td>The human-readable name of the Connect App, up to 64 characters.</td>
        </tr>
        <tr>
            <td>authorizeCallbackUrl</td>
            <td>String</td>
            <td>No</td>
            <td>The URL the user's browser will redirect to after Twilio authenticates the user and obtains authorization for this Connect App.</td>
        </tr>
        <tr>
            <td>deauthorizeRedirectUrl</td>
            <td>String</td>
            <td>Yes</td>
            <td>The URL to which Twilio will send a request when a user de-authorizes this Connect App.</td>
        </tr>
        <tr>
            <td>deauthorizeCallbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the deauthorize callback URL.</td>
        </tr>
        <tr>
            <td>permissions</td>
            <td>String</td>
            <td>No</td>
            <td>A comma-separated list of the permissions you will request from users of this Connect App. Valid permissions are `get-all` and `post-all`.</td>
        </tr>
        <tr>
            <td>description</td>
            <td>String</td>
            <td>No</td>
            <td>A more detailed human-readable description of this Connect App.</td>
        </tr>
        <tr>
            <td>companyName</td>
            <td>String</td>
            <td>No</td>
            <td>The company name for this Connect App.</td>
        </tr>
        <tr>
            <td>homepageUrl</td>
            <td>String</td>
            <td>No</td>
            <td>The public URL where users can obtain more information about this Connect App.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.updateConnectApp configKey="MyTwilioConfig">
        <connectAppSid>{$ctx:connectAppSid}</connectAppSid>
        <friendlyName>{$ctx:friendlyName}</friendlyName>
        <authorizeCallbackUrl>{$ctx:authorizeCallbackUrl}</authorizeCallbackUrl>
        <deauthorizeRedirectUrl>{$ctx:deauthorizeRedirectUrl}</deauthorizeRedirectUrl>
        <deauthorizeCallbackMethod>{$ctx:deauthorizeCallbackMethod}</deauthorizeCallbackMethod>
        <permissions>{$ctx:permissions}</permissions>
        <description>{$ctx:description}</description>
        <companyName>{$ctx:companyName}</companyName>
        <homepageUrl>{$ctx:homepageUrl}</homepageUrl>
    </twilio.updateConnectApp>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the updateConnectApp operation.

    ```xml
    <twilio.updateConnectApp configKey="MyTwilioConfig">
        <connectAppSid>CNb989fdd207b04d16aee578018ef5fd93</connectAppSid>
        <friendlyName>My Connect App</friendlyName>
        <authorizeCallbackUrl>https://www.mycompany.com/connect_authorize</authorizeCallbackUrl>
        <deauthorizeRedirectUrl>https://www.mycompany.com/connect_deauthorize</deauthorizeRedirectUrl>
        <deauthorizeCallbackMethod>POST</deauthorizeCallbackMethod>
        <permissions>get-all,post-all</permissions>
        <description>Connects to my company's Twilio account</description>
        <companyName>My Company</companyName>
        <homepageUrl>http://www.mycompany.com</homepageUrl>
    </twilio.updateConnectApp>
    ```

### Remove an application

??? note "removeApplication"
    To remove an application from the master account, use `twilio.removeApplication` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/applications) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>applicationSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The SID of the application you are removing.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.removeApplication configKey="MyTwilioConfig">
        <applicationSid>{$ctx:applicationSid}</applicationSid>
    </twilio.removeApplication>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the removeApplication operation.

    ```xml
    <twilio.removeApplication configKey="MyTwilioConfig">
        <applicationSid>AP2a0747eba6abf96b7e3c3ff0b4530f6e</applicationSid>
    </twilio.removeApplication>
    ```

## Work with calls

The following operations are available for working with [calls](http://www.twilio.com/docs/api/rest/call), [recordings](http://www.twilio.com/docs/api/rest/recording), and [transcriptions](http://www.twilio.com/docs/api/rest/transcription) :

### Make a call

??? note "makeCall"
    To make a call, use `twilio.makeCall` and specify the following properties. For more information on formatting phone numbers, see the [related API documentation](http://www.twilio.com/docs/api/rest/making-calls#post-parameters-required).

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>to</td>
            <td>String</td>
            <td>Yes</td>
            <td>The phone number, SIP address, or client identifier to call. For more information on SIP, <a href="http://www.twilio.com/docs/sip">see</a>.</td>
        </tr>
        <tr>
            <td>from</td>
            <td>String</td>
            <td>Yes</td>
            <td>The phone number or client identifier to use as the caller ID. If using a phone number, it must be a Twilio number or a verified outgoing caller ID for your account.</td>
        </tr>
        <tr>
            <td>applicationSid</td>
            <td>String</td>
            <td>No</td>
            <td>The 34-character string that uniquely identifies the application that defines the properties to use for making the call. If you use this property, the following voice properties will be ignored, because they are already defined by the application: `url`, `method`, `fallbackUrl`, `fallbackMethod`, `statusCallback`, and `statusCallbackMethod`.</td>
        </tr>
        <tr>
            <td>url</td>
            <td>String</td>
            <td>No</td>
            <td>The fully qualified URL that should be consulted when the call connects. This property is ignored if you specify an `applicationSid`.</td>
        </tr>
        <tr>
            <td>method</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, GET or POST, to use when connecting to the URL. Defaults to POST. This property is ignored if you specify an `applicationSid`.</td>
        </tr>
        <tr>
            <td>fallbackUrl</td>
            <td>String</td>
            <td>No</td>
            <td>A URL that Twilio will request if an error occurs when requests are made to the URL. This property is ignored if you specify an `applicationSid`.</td>
        </tr>
        <tr>
            <td>fallbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the fallback URL. Defaults to POST. This property is ignored if you specify an `applicationSid`.</td>
        </tr>
        <tr>
            <td>statusCallback</td>
            <td>String</td>
            <td>No</td>
            <td>The URL that Twilio will request when the call ends to notify your application. This property is ignored if you specify an `applicationSid`.</td>
        </tr>
        <tr>
            <td>statusCallbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the status callback URL. Defaults to POST. This property is ignored if you specify an `applicationSid`.</td>
        </tr>
        <tr>
            <td>sendDigits</td>
            <td>String</td>
            <td>No</td>
            <td>A string of keys to dial after connecting to the number. Valid digits in the string include: any digit (0-9), `%23` (the URL-encoded version of #), `*`, and `w` (to insert a half-second pause). For example, if you are connecting to a company phone number and want to pause for one second, dial extension 1234, and then the pound key, `<sendDigits>ww1234%23</sendDigits>`.</td>
        </tr>
        <tr>
            <td>ifMachine</td>
            <td>String</td>
            <td>No</td>
            <td>Specifies whether Twilio should try to determine whether a machine (like voicemail) or a human has answered the call. Possible values are Continue and Hangup. For more information, see the <a href="http://www.twilio.com/docs/api/rest/making-calls#handling-outcomes-answering-machines">API documentation</a>.</td>
        </tr>
        <tr>
            <td>timeout</td>
            <td>Integer</td>
            <td>No</td>
            <td>The integer number of seconds that Twilio should allow the phone to ring before assuming there is no answer. Default is 60 seconds, the maximum is 999 seconds. Note, you could set this to a low value, such as 15, to hangup before reaching an answering machine or voicemail.</td>
        </tr>
        <tr>
            <td>record</td>
            <td>Boolean</td>
            <td>No</td>
            <td>Specifies whether to record the call. If true, the entire call is recorded, and the recording URL is sent to the status callback URL. Defaults to false.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.makeCall configKey="MyTwilioConfig">
        <to>{$ctx:to}</to>
        <from>{$ctx:from}</from>
        <url>{$ctx:url}</url>
        <method>{$ctx:method}</method>
        <fallbackUrl>{$ctx:fallbackUrl}</fallbackUrl>
        <fallbackMethod>{$ctx:fallbackMethod}</fallbackMethod>
        <statusCallback>{$ctx:statusCallback}</statusCallback>
        <statusCallbackMethod>{$ctx:statusCallbackMethod}</statusCallbackMethod>
        <sendDigits>{$ctx:sendDigits}</sendDigits>
        <ifMachine>{$ctx:ifMachine}</ifMachine>
        <timeout>{$ctx:timeout}</timeout>
        <record>{$ctx:record}</record>
    </twilio.makeCall>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the makeCall operation.

    ```xml
    <twilio.makeCall configKey="MyTwilioConfig">
        <to>%2B14155551212</to>
        <from>%2B18668675309</from>
        <url>http://demo.twilio.com/docs/voice.xml</url>
        <method>POST</method>
        <fallbackUrl>http://demo.twilio.com/docs/voicefallback.xml</fallbackUrl>
        <fallbackMethod>POST</fallbackMethod>
        <statusCallback>http://demo.twilio.com/docs/statuscallback.xml</statusCallback>
        <statusCallbackMethod>GET</statusCallbackMethod>
        <sendDigits>ww1234%23</sendDigits>
        <ifMachine>Continue</ifMachine>
        <timeout>60</timeout>
        <record>false</record>
    </twilio.makeCall>
    ```

### Get a list of calls

??? note "getCallList"
    To get a list of calls, use `twilio.getCallList` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/call) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>to</td>
            <td>String</td>
            <td>No</td>
            <td>Only get calls made to this phone number, SIP address, or client identifier.</td>
        </tr>
        <tr>
            <td>from</td>
            <td>String</td>
            <td>No</td>
            <td>Only get calls made from this phone number or client identifier.</td>
        </tr>
        <tr>
            <td>status</td>
            <td>String</td>
            <td>No</td>
            <td>Only get calls currently in this status. May be `queued`, `ringing`, `in-progress`, `canceled`, `completed`, `failed`, `busy`, or `no-answer`.</td>
        </tr>
        <tr>
            <td>startTime</td>
            <td>String</td>
            <td>No</td>
            <td>Only get calls that started on this date, given as `YYYY-MM-DD`. Also supports inequalities, such as `<=YYYY-MM-DD` for calls that started at or before midnight on a date, and `>=YYYY-MM-DD` for calls that started at or after midnight on a date.</td>
        </tr>
        <tr>
            <td>parentCallSid</td>
            <td>String</td>
            <td>No</td>
            <td>Only get calls spawned by the call with this SID.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getCallList configKey="MyTwilioConfig">
        <to>{$ctx:to}</to>
        <from>{$ctx:from}</from>
        <status>{$ctx:status}</status>
        <startTime>{$ctx:startTime}</startTime>
        <parentCallSid>{$ctx:parentCallSid}</parentCallSid>
    </twilio.getCallList>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getCallList operation.

    ```xml
    <twilio.getCallList configKey="MyTwilioConfig">
        <to>2B14155551212</to>
        <from>2B18668675309</from>
        <status>completed</status>
        <startTime>2013-09-30</startTime>
        <parentCallSid>CAe1644a7eed5088b159577c5802d8be38</parentCallSid>
    </twilio.getCallList>
    ```

### Get a specific call

??? note "getCall"
    To get information about a specific call, including start time, end time, and more, use `twilio.getCall` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/call) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>callSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The identifier of the call you want to get.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getCall configKey="MyTwilioConfig">
        <callSid>{$ctx:callSid}</callSid>
    </twilio.getCall>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getCall operation.

    ```xml
    <twilio.getCall configKey="MyTwilioConfig">
        <callSid>CAe1644a7eed5088b159577c5802d8be38</callSid>
    </twilio.getCall>
    ```

### Modify a live call

??? note "modifyLiveCall"
    To interrupt an in-progress call and terminate it or process it using a new URL, use `twilio.modifyLiveCall` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/change-call-state) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>callSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The identifier of the call you want to modify.</td>
        </tr>
        <tr>
            <td>url</td>
            <td>String</td>
            <td>Yes</td>
            <td>The fully qualified URL where the call should be redirected.</td>
        </tr>
        <tr>
            <td>method</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, GET or POST, to use when connecting to the URL. Defaults to POST.</td>
        </tr>
        <tr>
            <td>status</td>
            <td>String</td>
            <td>No</td>
            <td>Either `canceled` or `completed`. Specifying `canceled` will attempt to hang up calls that are queued or ringing but not affect calls already in progress. Specifying `completed` will attempt to hang up a call even if it's already in progress.</td>
        </tr>
        <tr>
            <td>fallbackUrl</td>
            <td>String</td>
            <td>No</td>
            <td>A URL that Twilio will request if an error occurs when requests are made to the URL.</td>
        </tr>
        <tr>
            <td>fallbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the fallback URL. Defaults to POST.</td>
        </tr>
        <tr>
            <td>statusCallback</td>
            <td>String</td>
            <td>No</td>
            <td>The URL that Twilio will request when the call ends to notify your application.</td>
        </tr>
        <tr>
            <td>statusCallbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the status callback URL. Defaults to POST.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.modifyLiveCall configKey="MyTwilioConfig">
        <callSid>{$ctx:callSid}</callSid>
        <url>{$ctx:url}</url>
        <method>{$ctx:method}</method>
        <status>{$ctx:status}</status>
        <fallbackUrl>{$ctx:fallbackUrl}</fallbackUrl>
        <fallbackMethod>{$ctx:fallbackMethod}</fallbackMethod>
        <statusCallback>{$ctx:statusCallback}</statusCallback>
        <statusCallbackMethod>{$ctx:statusCallbackMethod}</statusCallbackMethod>
    </twilio.modifyLiveCall>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the modifyLiveCall operation.

    ```xml
    <twilio.modifyLiveCall configKey="MyTwilioConfig">
        <callSid>CAe1644a7eed5088b159577c5802d8be38</callSid>
        <url>http://demo.twilio.com/docs/voice.xml</url>
        <method>POST</method>
        <status>completed</status>
        <fallbackUrl>http://demo.twilio.com/docs/voicefallback.xml</fallbackUrl>
        <fallbackMethod>POST</fallbackMethod>
        <statusCallback>http://demo.twilio.com/docs/statuscallback.xml</statusCallback>
        <statusCallbackMethod>GET</statusCallbackMethod>
    </twilio.modifyLiveCall>
    ```

### Get a list of recordings

??? note "getRecordingList"
    To get a list of recordings, use `twilio.getRecordingList` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/recording#list) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>callSid</td>
            <td>String</td>
            <td>No</td>
            <td>Only get recordings made during the call given by this SID.</td>
        </tr>
        <tr>
            <td>dateCreated</td>
            <td>String</td>
            <td>No</td>
            <td>Only get recordings created on this date, given as `YYYY-MM-DD`. Also supports inequalities, such as `<=YYYY-MM-DD` for recordings generated at or before midnight on a date, and `>=YYYY-MM-DD` for recordings generated at or after midnight on a date.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getRecordingList configKey="MyTwilioConfig">
        <callSid>{$ctx:callSid}</callSid>
        <dateCreated>{$ctx:dateCreated}</dateCreated>
    </twilio.getRecordingList>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getRecordingList operation.

    ```xml
    <twilio.getRecordingList configKey="MyTwilioConfig">
        <callSid>CAe1644a7eed5088b159577c5802d8be38</callSid>
        <dateCreated>2013-09-30</dateCreated>
    </twilio.getRecordingList>
    ```

### Get a specific recording

??? note "getRecording"
    To get information about a specific recording, including date created, duration, and more, use `twilio.getRecording` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/recording) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>recordingSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The identifier of the recording you want to get.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getRecording configKey="MyTwilioConfig">
        <recordingSid>{$ctx:recordingSid}</recordingSid>
    </twilio.getRecording>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getRecording operation.

    ```xml
    <twilio.getRecording configKey="MyTwilioConfig">
        <recordingSid>CAe1644a7eed5088b159577c5802d8be38</recordingSid>
    </twilio.getRecording>
    ```

### Delete a recording

??? note "deleteRecording"
    To delete a specific recording, use `twilio.deleteRecording` and specify the following properties. Once the recording is deleted, you will no longer be billed for those minutes. If successful, returns HTTP 204 (No Content) with no body. See the [related API documentation](http://www.twilio.com/docs/api/rest/recording) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>recordingSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The identifier of the recording you want to delete.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.deleteRecording configKey="MyTwilioConfig">
        <recordingSid>{$ctx:recordingSid}</recordingSid>
    </twilio.deleteRecording>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the deleteRecording operation.

    ```xml
    <twilio.deleteRecording configKey="MyTwilioConfig">
        <recordingSid>CAe1644a7eed5088b159577c5802d8be38</recordingSid>
    </twilio.deleteRecording>
    ```

### Get a list of transcriptions

??? note "getTranscriptionList"
    To get a list of transcriptions generated from your account, including information such as status and paging information for each transcription, use `twilio.getTranscriptionList`. See the [related API documentation](http://www.twilio.com/docs/api/rest/transcription#list) for more information.

    **Sample configuration**

    ```xml
    <twilio.getTranscriptionList configKey="MyTwilioConfig" />
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getTranscriptionList operation.

    ```xml
    <twilio.getTranscriptionList configKey="MyTwilioConfig" />
    ```

### Get a specific transcription

??? note "getTranscription"
    To get information about a specific transcription, including date created, status, and more, use `twilio.getTranscription` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/transcription) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>transcriptionSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The identifier of the transcription you want to get.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getTranscription configKey="MyTwilioConfig">
        <transcriptionSid>{$ctx:transcriptionSid}</transcriptionSid>
    </twilio.getTranscription>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getTranscription operation.

    ```xml
    <twilio.getTranscription configKey="MyTwilioConfig">
        <transcriptionSid>TR8c61027b709ffb038236612dc5af8723</transcriptionSid>
    </twilio.getTranscription>
    ```

## Work with conferences

The following operations are available for working with [conferences](http://www.twilio.com/docs/api/rest/conference):

### Get a list of conferences

??? note "getConferenceList"
    To get a list of conferences within your account, including information such as status and paging information for each conference, use `twilio.getConferenceList` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/conference#list) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>status</td>
            <td>String</td>
            <td>No</td>
            <td>Only show conferences that currently have this status. Can be `init`, `in-progress`, or `completed`.</td>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>No</td>
            <td>Only show conferences whose friendly name exactly matches this string. Multiple conference instances can have the same friendly name, but only one instance can be in-progress.</td>
        </tr>
        <tr>
            <td>dateCreated</td>
            <td>String</td>
            <td>No</td>
            <td>Only get conferences that started on this date, given as `YYYY-MM-DD`. Also supports inequalities, such as `<=YYYY-MM-DD` for conferences that started at or before midnight on a date, and `>=YYYY-MM-DD` for conferences that started at or after midnight on a date.</td>
        </tr>
        <tr>
            <td>dateUpdated</td>
            <td>String</td>
            <td>No</td>
            <td>Only get conferences that were last updated on this date, given as `YYYY-MM-DD`. Also supports inequalities, such as `<=YYYY-MM-DD` for conferences that were updated at or before midnight on a date, and `>=YYYY-MM-DD` for conferences that were updated at or after midnight on a date.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getConferenceList configKey="MyTwilioConfig">
        <status>{$ctx:status}</status>
        <friendlyName>{$ctx:friendlyName}</friendlyName>
        <dateCreated>{$ctx:dateCreated}</dateCreated>
        <dateUpdated>{$ctx:dateUpdated}</dateUpdated>
    </twilio.getConferenceList>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getConferenceList operation.

    ```xml
    <twilio.getConferenceList configKey="MyTwilioConfig">
        <status>completed</status>
        <friendlyName>My Room</friendlyName>
        <dateCreated>2009-07-06</dateCreated>
        <dateUpdated>2009-07-06</dateUpdated>
    </twilio.getConferenceList>
    ```

### Get a specific conference

??? note "getConference"
    To get information about a specific conference, including information such as friendly name and participants, use `twilio.getConference` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/conference) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>conferenceSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character identifier of the conference whose information you want to retrieve.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getConference configKey="MyTwilioConfig">
        <conferenceSid>{$ctx:conferenceSid}</conferenceSid>
    </twilio.getConference>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getConference operation.

    ```xml
    <twilio.getConference configKey="MyTwilioConfig">
        <conferenceSid>CFbbe46ff1274e283f7e3ac1df0072ab39</conferenceSid>
    </twilio.getConference>
    ```

### Get a list of participants

??? note "getParticipantList"
    To get a list of participants in a conference, use `twilio.getParticipantList` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/participant#list) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>conferenceSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character identifier of the conference whose participants you want to retrieve.</td>
        </tr>
        <tr>
            <td>muted</td>
            <td>Boolean</td>
            <td>No</td>
            <td>If true, only show participants who are muted. If false, only show participants who are not muted. If you do not specify this property, both muted and unmuted participants are returned.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getParticipantList configKey="MyTwilioConfig">
        <conferenceSid>{$ctx:conferenceSid}</conferenceSid>
        <muted>{$ctx:muted}</muted>
    </twilio.getParticipantList>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getParticipantList operation.

    ```xml
    <twilio.getParticipantList configKey="MyTwilioConfig">
        <conferenceSid>CFbbe46ff1274e283f7e3ac1df0072ab39</conferenceSid>
        <muted>false</muted>
    </twilio.getParticipantList>
    ```

### Get a specific participant

??? note "getParticipant"
    To get information about a specific participant in a conference, use `twilio.getParticipant` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/participant) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>conferenceSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character identifier of the conference.</td>
        </tr>
        <tr>
            <td>callSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character identifier of the call the participant made to connect to this conference.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getParticipant configKey="MyTwilioConfig">
        <conferenceSid>{$ctx:conferenceSid}</conferenceSid>
        <callSid>{$ctx:callSid}</callSid>
    </twilio.getParticipant>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getParticipant operation.

    ```xml
    <twilio.getParticipant configKey="MyTwilioConfig">
        <conferenceSid>CFbbe46ff1274e283f7e3ac1df0072ab39</conferenceSid>
        <callSid>CA386025c9bf5d6052a1d1ea42b4d16662</callSid>
    </twilio.getParticipant>
    ```

### Update a participant - Mute or unmute a participant

??? note "updateParticipant"
    To mute or unmute a specific participant in a conference, use `twilio.updateParticipant` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/participant) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>conferenceSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character identifier of the conference.</td>
        </tr>
        <tr>
            <td>callSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character identifier of the call the participant made to connect to this conference.</td>
        </tr>
        <tr>
            <td>muted</td>
            <td>Boolean</td>
            <td>Yes</td>
            <td>Set to true to mute the participant or false to unmute the participant.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.updateParticipant configKey="MyTwilioConfig">
        <conferenceSid>{$ctx:conferenceSid}</conferenceSid>
        <callSid>{$ctx:callSid}</callSid>
        <muted>{$ctx:muted}</muted>
    </twilio.updateParticipant>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the updateParticipant operation.

    ```xml
    <twilio.updateParticipant configKey="MyTwilioConfig">
        <conferenceSid>CFbbe46ff1274e283f7e3ac1df0072ab39</conferenceSid>
        <callSid>CA386025c9bf5d6052a1d1ea42b4d16662</callSid>
        <muted>false</muted>
    </twilio.updateParticipant>
    ```

### Remove a participant

??? note "removeParticipant"
    To remove a specific participant from a conference, use `twilio.removeParticipant` and specify the following properties. See the [related API documentation](http://www.twilio.com/docs/api/rest/participant) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>conferenceSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character identifier of the conference.</td>
        </tr>
        <tr>
            <td>callSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character identifier of the call the participant made to connect to this conference.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.removeParticipant configKey="MyTwilioConfig">
        <conferenceSid>{$ctx:conferenceSid}</conferenceSid>
        <callSid>{$ctx:callSid}</callSid>
    </twilio.removeParticipant>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the removeParticipant operation.

    ```xml
    <twilio.removeParticipant configKey="MyTwilioConfig">
        <conferenceSid>CFbbe46ff1274e283f7e3ac1df0072ab39</conferenceSid>
        <callSid>CA386025c9bf5d6052a1d1ea42b4d16662</callSid>
    </twilio.removeParticipant>
    ```

## Work with phone numbers

The following operations are available for working with phone numbers:

### Add an outgoing phone number

??? note "addOutgoingPhoneNumber"
    To add a new caller ID to your account, use `twilio.addOutgoingPhoneNumber` and specify the following properties. After making this request, Twilio returns a validation code and dials the phone number to perform validation. The code returned must be entered via the phone before the caller ID will be added to your account. See the [related API documentation](https://www.twilio.com/docs/api/rest/outgoing-caller-ids#list-post) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>phoneNumber</td>
            <td>String</td>
            <td>Yes</td>
            <td>The phone number to verify. Should be formatted with a '+' and country code, e.g., +16175551212 (<a href="http://en.wikipedia.org/wiki/E.164">E.164</a> format). Twilio will also accept unformatted US numbers, e.g., (415) 555-1212, 415-555-1212.</td>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>No</td>
            <td>A human readable description for the new caller ID with maximum length 64 characters. Defaults to a nicely formatted version of the number.</td>
        </tr>
        <tr>
            <td>callDelay</td>
            <td>Integer</td>
            <td>No</td>
            <td>The number of seconds, between 0 and 60, to delay before initiating the verification call. Defaults to 0.</td>
        </tr>
        <tr>
            <td>extension</td>
            <td>String</td>
            <td>No</td>
            <td>Digits to dial after connecting the verification call.</td>
        </tr>
        <tr>
            <td>statusCallback</td>
            <td>String</td>
            <td>No</td>
            <td>The URL that Twilio will request when the verification call ends to notify your application whether the verification was successful.</td>
        </tr>
        <tr>
            <td>statusCallbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the status callback URL. Defaults to POST.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.addOutgoingPhoneNumber configKey="MyTwilioConfig">
        <phoneNumber>{$ctx:phoneNumber}</phoneNumber>
        <friendlyName>{$ctx:friendlyName}</friendlyName>
        <callDelay>{$ctx:callDelay}</callDelay>
        <extension>{$ctx:extension}</extension>
        <statusCallback>{$ctx:statusCallback}</statusCallback>
        <statusCallbackMethod>{$ctx:statusCallbackMethod}</statusCallbackMethod>
    </twilio.addOutgoingPhoneNumber>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the addOutgoingPhoneNumber operation.

    ```xml
    <twilio.addOutgoingPhoneNumber configKey="MyTwilioConfig">
        <phoneNumber>+15105555555</phoneNumber>
        <friendlyName>(510) 555-5555</friendlyName>
        <callDelay>30</callDelay>
        <extension>1234</extension>
        <statusCallback>http://demo.twilio.com/docs/statuscallback.xml</statusCallback>
        <statusCallbackMethod>POST</statusCallbackMethod>
    </twilio.addOutgoingPhoneNumber>
    ```

### Get a list of outgoing phone numbers

??? note "getOutgoingPhoneNumberList"
    To get a list of caller IDs for this account, use `twilio.getOutgoingPhoneNumberList` and specify the following properties. The list returns information about each caller ID including the SID, friendly name, and more. The list includes [paging information](https://www.twilio.com/docs/api/rest/response#response-formats-list-paging-information). See the [related API documentation](https://www.twilio.com/docs/api/rest/outgoing-caller-ids#list-get) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>phoneNumber</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows the caller ID resource with this phone number. Should be formatted with a '+' and country code, e.g., +16175551212 (E.164 format). Twilio will also accept unformatted US numbers, e.g., (415) 555-1212, 415-555-1212.</td>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows the caller ID resource with this friendly name.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getOutgoingPhoneNumberList configKey="MyTwilioConfig">
        <phoneNumber>{$ctx:phoneNumber}</phoneNumber>
        <friendlyName>{$ctx:friendlyName}</friendlyName>
    </twilio.getOutgoingPhoneNumberList>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getOutgoingPhoneNumberList operation.

    ```xml
    <twilio.getOutgoingPhoneNumberList configKey="MyTwilioConfig">
        <phoneNumber>+15105555555</phoneNumber>
        <friendlyName>(510) 555-5555</friendlyName>
    </twilio.getOutgoingPhoneNumberList>
    ```

### Get a specific outgoing phone number

??? note "getOutgoingPhoneNumber"
    To get information about a specific caller ID for this account, use `twilio.getOutgoingPhoneNumber` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/outgoing-caller-ids#instance-get) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>outgoingCallerId</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that identifies this caller ID record.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getOutgoingPhoneNumber configKey="MyTwilioConfig">
        <outgoingCallerId>{$ctx:outgoingCallerId}</outgoingCallerId>
    </twilio.getOutgoingPhoneNumber>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getOutgoingPhoneNumber operation.

    ```xml
    <twilio.getOutgoingPhoneNumber configKey="MyTwilioConfig">
        <outgoingCallerId>PNe905d7e6b410746a0fb08c57e5a186f3</outgoingCallerId>
    </twilio.getOutgoingPhoneNumber>
    ```

### Update an outgoing phone number

??? note "updateOutgoingPhoneNumber"
    To update the friendly name for a caller ID, use `twilio.updateOutgoingPhoneNumber` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/outgoing-caller-ids#instance-post) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>outgoingCallerId</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that identifies this caller ID record.</td>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>Yes</td>
            <td>The new friendly name for this caller ID.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.updateOutgoingPhoneNumber configKey="MyTwilioConfig">
        <outgoingCallerId>{$ctx:outgoingCallerId}</outgoingCallerId>
        <friendlyName>{$ctx:friendlyName}</friendlyName>
    </twilio.updateOutgoingPhoneNumber>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the updateOutgoingPhoneNumber operation.

    ```xml
    <twilio.updateOutgoingPhoneNumber configKey="MyTwilioConfig">
        <outgoingCallerId>PNe905d7e6b410746a0fb08c57e5a186f3</outgoingCallerId>
        <friendlyName>(510) 555-5555</friendlyName>
    </twilio.updateOutgoingPhoneNumber>
    ```

### Remove an outgoing phone number

??? note "removeOutgoingPhoneNumber"
    To remove a caller ID from your account, use `twilio.removeOutgoingPhoneNumber` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/outgoing-caller-ids#instance-delete) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>outgoingCallerId</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that identifies the caller ID record you want to remove from the account.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.removeOutgoingPhoneNumber configKey="MyTwilioConfig">
        <outgoingCallerId>{$ctx:outgoingCallerId}</outgoingCallerId>
    </twilio.removeOutgoingPhoneNumber>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the removeOutgoingPhoneNumber operation.

    ```xml
    <twilio.removeOutgoingPhoneNumber configKey="MyTwilioConfig">
        <outgoingCallerId>PNe905d7e6b410746a0fb08c57e5a186f3</outgoingCallerId>
    </twilio.removeOutgoingPhoneNumber>
    ```

### Get a list of available local phone numbers

??? note "getAvailableLocalNumbers"
    To get a list of available local phone numbers you can purchase, use `twilio.getAvailableLocalNumbers` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/available-phone-numbers#local) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>country</td>
            <td>String</td>
            <td>Yes</td>
            <td>The <a href="http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">country code</a> (such as US for United States, CA for Canada, and GB for United Kingdom) in which you want to find available toll-free numbers.</td>
        </tr>
        <tr>
            <td>areaCode</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows numbers in this area code.</td>
        </tr>
        <tr>
            <td>contains</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows numbers that match the specified pattern. Valid characters are * and 0-9a-zA-Z. The * character will match any single digit. For an example, see <a href="https://www.twilio.com/docs/api/rest/available-phone-numbers#local-get-basic-example-2">the API documentation</a>.</td>
        </tr>
        <tr>
            <td>inRegion</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows numbers in this region (state or province).</td>
        </tr>
        <tr>
            <td>inPostalCode</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows numbers in this postal code.</td>
        </tr>
        <tr>
            <td>nearLatLong</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows numbers within 25 miles of this latitude/longitude coordinate. To change the search distance from the given coordinate, also specify the `distance` property.</td>
        </tr>
        <tr>
            <td>nearNumber</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows numbers within 25 miles of this phone number. To change the search distance from the given number, also specify the `distance` property.</td>
        </tr>
        <tr>
            <td>inLata</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows numbers in this Local Access and Transport Area (<a href="http://en.wikipedia.org/wiki/Local_access_and_transport_area">LATA</a>).</td>
        </tr>
        <tr>
            <td>inRateCenter</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows numbers in this <a href="http://en.wikipedia.org/wiki/Telephone_exchange">rate center</a>.</td>
        </tr>
        <tr>
            <td>distance</td>
            <td>Integer</td>
            <td>No</td>
            <td>Specifies the distance from the coordinate (`nearLatLong`) or number (`nearNumber`) to search, up to 500 miles. Defaults to 25.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getAvailableLocalNumbers configKey="MyTwilioConfig">
        <country>{$ctx:country}</country>
        <areaCode>{$ctx:areaCode}</areaCode>
        <contains>{$ctx:contains}</contains>
        <inRegion>{$ctx:inRegion}</inRegion>
        <inPostalCode>{$ctx:inPostalCode}</inPostalCode>
        <nearLatLong>{$ctx:nearLatLong}</nearLatLong>
        <nearNumber>{$ctx:nearNumber}</nearNumber>
        <inLata>{$ctx:inLata}</inLata>
        <inRateCenter>{$ctx:inRateCenter}</inRateCenter>
        <distance>{$ctx:distance}</distance>
    </twilio.getAvailableLocalNumbers>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getAvailableLocalNumbers operation.

    ```xml
    <twilio.getAvailableLocalNumbers configKey="MyTwilioConfig">
        <country>US</country>
        <areaCode>(415)</areaCode>
        <contains>ACME</contains>
        <inRegion>CA</inRegion>
        <inPostalCode>94133</inPostalCode>
        <nearLatLong>37.840699%2C-122.461853</nearLatLong>
        <nearNumber>(415) 555-1234</nearNumber>
        <inLata>722</inLata>
        <inRateCenter>SNFC CNTR</inRateCenter>
        <distance>50</distance>
    </twilio.getAvailableLocalNumbers>
    ```

### Get a list of available toll-free phone numbers

??? note "getAvailableTollFreeNumbers"
    To get a list of available toll-free phone numbers you can purchase, use `twilio.getAvailableTollFreeNumbers` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/available-phone-numbers#toll-free) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>country</td>
            <td>String</td>
            <td>Yes</td>
            <td>The country code (such as US for United States, CA for Canada, and GB for United Kingdom) in which you want to find available toll-free numbers. For more information on country codes supported by Twilio, see <a href="https://www.twilio.com/docs/api/rest/available-phone-numbers#countries">the API documentation</a>.</td>
        </tr>
        <tr>
            <td>areaCode</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows numbers in this area code.</td>
        </tr>
        <tr>
            <td>contains</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows numbers that match the specified pattern. Valid characters are * and 0-9a-zA-Z. The * character will match any single digit. For an example, see <a href="https://www.twilio.com/docs/api/rest/available-phone-numbers#toll-free-get-example-2">the API documentation</a>.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getAvailableTollFreeNumbers configKey="MyTwilioConfig">
        <country>{$ctx:country}</country>
        <areaCode>{$ctx:areaCode}</areaCode>
        <contains>{$ctx:contains}</contains>
    </twilio.getAvailableTollFreeNumbers>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getAvailableTollFreeNumbers operation.

    ```xml
    <twilio.getAvailableTollFreeNumbers configKey="MyTwilioConfig">
        <country>US</country>
        <areaCode>(866)</areaCode>
        <contains>ACME</contains>
    </twilio.getAvailableTollFreeNumbers>
    ```

### Purchase an incoming phone number

??? note "purchasePhoneNumber"
    To purchase an incoming phone number, use `twilio.purchasePhoneNumber` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/incoming-phone-numbers#list-post) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>phoneNumber</td>
            <td>String</td>
            <td>No</td>
            <td>Specify the exact phone number you want to purchase (or specify areaCode instead). Only specify one of these properties. It should be formatted starting with a '+' followed by the country code and the number in <a href="http://en.wikipedia.org/wiki/E.164">E.164</a> format, e.g., '+15105555555'.</td>
        </tr>
        <tr>
            <td>areaCode</td>
            <td>String</td>
            <td>No</td>
            <td>Specify an area code to search for and purchase a phone number in that area code (or specify phoneNumber instead). Only specify one of these properties. Any three-digit, US or Canada area code is valid. Twilio will provision a random phone number within this area code for you.</td>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>Yes</td>
            <td>The friendly name for this phone number.</td>
        </tr>
        <tr>
            <td>voiceApplicationSid</td>
            <td>String</td>
            <td>No</td>
            <td>You can specify the `voiceApplicationSid`, a 34-character string that uniquely identifies the application that defines the properties to use for handling calls to this number, or you can specify the individual voice properties as below, which are ignored if you specify `voiceApplicationSid`: <br><br>
          <table>
            <tr><th>Property</th><th>Description</th></tr>
            <tr>
              <td>voiceUrl</td>
              <td>The URL that Twilio should request when somebody dials this phone number.</td>
            </tr>
            <tr>
              <td>voiceMethod</td>
              <td>Optional. The HTTP method, either GET or POST, for the voice URL request. Defaults to POST.</td>
            </tr>
            <tr>
              <td>voiceFallbackUrl</td>
              <td>Optional. A URL Twilio requests if an error occurs when requesting the voice URL.</td>
            </tr>
            <tr>
              <td>voiceFallbackMethod</td>
              <td>Optional. The HTTP method, either GET or POST, for the voice fallback URL request. Defaults to POST.</td>
            </tr>
            <tr>
              <td>statusCallback</td>
              <td>Optional. The URL Twilio requests to pass call status parameters to your application.</td>
            </tr>
            <tr>
              <td>statusCallbackMethod</td>
              <td>Optional. The HTTP method, either GET or POST, for the status callback request. Defaults to POST.</td>
            </tr>
          </table></td>
        </tr>
        <tr>
            <td>voiceCallerIdLookup</td>
            <td>Boolean</td>
            <td>No</td>
            <td>If true, performs a lookup of the caller's name from the CNAM database and posts it to your app. Defaults to false.</td>
        </tr>
        <tr>
            <td>smsApplicationSid</td>
            <td>String</td>
            <td>No</td>
            <td>You can specify the `smsApplicationSid`, a 34-character string that uniquely identifies the application that defines the properties to use for handling SMS messages to this number, of you can specify the individual SMS properties, which are ignored if you specify `smsApplicationSid`.<table>
            <tr><th>Property</th><th>Description</th></tr>
            <tr>
              <td>smsUrl</td>
              <td>The URL that Twilio should request when somebody sends an SMS to this phone number.</td>
            </tr>
            <tr>
              <td>smsMethod</td>
              <td>Optional. The HTTP method, either GET or POST, that should be used to request the SMS URL. Defaults to POST.</td>
            </tr>
            <tr>
              <td>smsFallbackUrl</td>
              <td>Optional. The URL that Twilio will request if an error occurs when requests are made to the SMS URL.</td>
            </tr>
            <tr>
              <td>smsFallbackMethod</td>
              <td>Optional. The HTTP method, either GET or POST, that should be used to request the SMS fallback URL. Defaults to POST.</td>
            </tr>
          </table></td>
        </tr>
        <tr>
            <td>apiVersion</td>
            <td>String</td>
            <td>No</td>
            <td>Specifies the API version, either 2010-04-01 or 2008-08-01, to use when requests are made to this phone number. Defaults to your account's default API version.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.purchasePhoneNumber configKey="MyTwilioConfig">
        <phoneNumber>{$ctx:phoneNumber}</phoneNumber>
        <friendlyName>{$ctx:friendlyName}</friendlyName>
        <voiceUrl>{$ctx:voiceUrl}</voiceUrl>
        <voiceMethod>{$ctx:voiceMethod}</voiceMethod>
        <voiceFallbackUrl>{$ctx:voiceFallbackUrl}</voiceFallbackUrl>
        <voiceFallbackMethod>{$ctx:voiceFallbackMethod}</voiceFallbackMethod>
        <statusCallback>{$ctx:statusCallback}</statusCallback>
        <statusCallbackMethod>{$ctx:statusCallbackMethod}</statusCallbackMethod>
        <voiceCallerIdLookup>{$ctx:voiceCallerIdLookup}</voiceCallerIdLookup>
        <smsApplicationSid>{$ctx:smsApplicationSid}</smsApplicationSid>
        <apiVersion>{$ctx:apiVersion}</apiVersion>
    </twilio.purchasePhoneNumber>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the purchasePhoneNumber operation.

    ```xml
    <twilio.purchasePhoneNumber configKey="MyTwilioConfig">
        <phoneNumber>15105555555</phoneNumber>
        <friendlyName>(510) 555-5555</friendlyName>
        <voiceUrl>http://demo.twilio.com/docs/voice.xml</voiceUrl>
        <voiceMethod>POST</voiceMethod>
        <voiceFallbackUrl>http://demo.twilio.com/docs/voicefallback.xml</voiceFallbackUrl>
        <voiceFallbackMethod>POST</voiceFallbackMethod>
        <statusCallback>http://demo.twilio.com/docs/statuscallback.xml</statusCallback>
        <statusCallbackMethod>GET</statusCallbackMethod>
        <voiceCallerIdLookup>false</voiceCallerIdLookup>
        <smsApplicationSid>AP2a0747eba6abf96b7e3c3ff0b4530f6e</smsApplicationSid>
        <apiVersion>2010-04-01</apiVersion>
    </twilio.purchasePhoneNumber>
    ```

### Get a list of incoming phone numbers

??? note "getIncomingPhoneNumberList"
    To get a list of incoming phone numbers for this account, use `twilio.getIncomingPhoneNumberList` and specify the following properties. The list returns information about each phone number including the SID, friendly name, and more. The list includes [paging information](https://www.twilio.com/docs/api/rest/response#response-formats-list-paging-information). See the [related API documentation](https://www.twilio.com/docs/api/rest/incoming-phone-numbers#list) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>phoneNumber</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows the incoming phone number resources that match this pattern. You can specify partial numbers and use `*` as a wildcard for any digit.</td>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows the incoming phone number resources whose friendly names exactly match this name.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getIncomingPhoneNumberList configKey="MyTwilioConfig">
        <phoneNumber>{$ctx:phoneNumber}</phoneNumber>
        <friendlyName>{$ctx:friendlyName}</friendlyName>
    </twilio.getIncomingPhoneNumberList>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getIncomingPhoneNumberList operation.

    ```xml
    <twilio.getIncomingPhoneNumberList configKey="MyTwilioConfig">
        <phoneNumber>555****</phoneNumber>
        <friendlyName>(510) 555-5555</friendlyName>
    </twilio.getIncomingPhoneNumberList>
    ```

### Get a specific incoming phone number

??? note "getIncomingPhoneNumber"
    To get information about a specific incoming phone number for this account, use `twilio.getIncomingPhoneNumber` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/incoming-phone-numbers#instance-get) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>incomingCallerId</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that identifies this incoming phone number record.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getIncomingPhoneNumber configKey="MyTwilioConfig">
        <incomingCallerId>{$ctx:incomingCallerId}</incomingCallerId>
    </twilio.getIncomingPhoneNumber>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getIncomingPhoneNumber operation.

    ```xml
    <twilio.getIncomingPhoneNumber configKey="MyTwilioConfig">
        <incomingCallerId>PNe905d7e6b410746a0fb08c57e5a186f3</incomingCallerId>
    </twilio.getIncomingPhoneNumber>
    ```

### Update an incoming phone number

??? note "updateIncomingPhoneNumber"
    To update the properties of an incoming phone number, use `twilio.updateIncomingPhoneNumber`, specify the phone number's SID, and then specify one or more of the properties you set when [purchasing the phone number](#purchase-an-incoming-phone-number). See the [related API documentation](https://www.twilio.com/docs/api/rest/incoming-phone-numbers#instance-post) for more information.

    In addition, you can set the `accountSid` property to transfer this number to a different account. For more information on transferring numbers, see the [API documentation]( https://www.twilio.com/docs/api/rest/subaccounts#exchanging-numbers). 

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>incomingCallerId</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that identifies the incoming phone number record you are updating.</td>
        </tr>
        <tr>
            <td>accountSid</td>
            <td>String</td>
            <td>No</td>
            <td>Set this property to transfer the phone number to a different account, identified by this account SID.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.updateIncomingPhoneNumber configKey="MyTwilioConfig">
        <incomingCallerId>{$ctx:incomingCallerId}</incomingCallerId>
        <accountSid>{$ctx:accountSid}</accountSid>
    </twilio.updateIncomingPhoneNumber>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the updateIncomingPhoneNumber operation.

    ```xml
    <twilio.updateIncomingPhoneNumber configKey="MyTwilioConfig">
        <incomingCallerId>PNe905d7e6b410746a0fb08c57e5a186f3</incomingCallerId>
        <accountSid>TheAccountSID8e642c9cc32d</accountSid>
    </twilio.updateIncomingPhoneNumber>
    ```

### Remove an incoming phone number

??? note "removeIncomingPhoneNumber"
    To remove an incoming phone number from your account, use `twilio.removeIncomingPhoneNumber` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/incoming-phone-numbers#instance-delete) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>incomingCallerId</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that identifies the incoming phone number record you want to remove from the account.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.removeIncomingPhoneNumber configKey="MyTwilioConfig">
        <incomingCallerId>{$ctx:incomingCallerId}</incomingCallerId>
    </twilio.removeIncomingPhoneNumber>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the removeIncomingPhoneNumber operation.

    ```xml
    <twilio.removeIncomingPhoneNumber configKey="MyTwilioConfig">
        <incomingCallerId>PNe905d7e6b410746a0fb08c57e5a186f3</incomingCallerId>
    </twilio.removeIncomingPhoneNumber>
    ```

## Work with queues

The following operations are available for working with [queues](https://www.twilio.com/docs/api/rest/queue):

### Create a queue

??? note "createQueue"
    To create a new queue, use `twilio.createQueue` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/queue#list-post) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>Yes</td>
            <td>A human readable description for the new queue.</td>
        </tr>
        <tr>
            <td>maxSize</td>
            <td>Integer</td>
            <td>No</td>
            <td>The maximum number of members (calls) that can be in this queue simultaneously. Maximum value is 1000. Defaults to 100.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.createQueue configKey="MyTwilioConfig">
        <friendlyName>{$ctx:friendlyName}</friendlyName>
        <maxSize>{$ctx:maxSize}</maxSize>
    </twilio.createQueue>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the createQueue operation.

    ```xml
    <twilio.createQueue configKey="MyTwilioConfig">
        <friendlyName>persistent_queue1</friendlyName>
        <maxSize>30</maxSize>
    </twilio.createQueue>
    ```

### Get a list of existing queues

??? note "getQueueList"
    To get a list of existing queues, use `twilio.getQueueList`. The list returns information about each queue, including SID, current size, average wait time, and more. The list includes [paging information](https://www.twilio.com/docs/api/rest/response#response-formats-list-paging-information). See the [related API documentation](https://www.twilio.com/docs/api/rest/queue#list-get) for more information.

    **Sample configuration**

    ```xml
    <twilio.getQueueList configKey="MyTwilioConfig" />
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getQueueList operation.

    ```xml
    <twilio.getQueueList configKey="MyTwilioConfig" />
    ```

### Get a specific queue

??? note "getQueue"
    To get information about a specific queue, use `twilio.getQueue` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/queue#instance-get) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>queueSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that uniquely identifies this queue.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getQueue configKey="MyTwilioConfig">
        <queueSid>{$ctx:queueSid}</queueSid>
    </twilio.getQueue>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getQueue operation.

    ```xml
    <twilio.getQueue configKey="MyTwilioConfig">
        <queueSid>QU5ef8732a3c49700934481addd5ce1659</queueSid>
    </twilio.getQueue>
    ```

### Update a queue

??? note "updateQueue"
    To update the friendly name or max size of an existing queue, use `twilio.updateQueue` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/queue#instance-post) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>queueSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that uniquely identifies this queue.</td>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>No</td>
            <td>A human readable description for the queue.</td>
        </tr>
        <tr>
            <td>maxSize</td>
            <td>Integer</td>
            <td>No</td>
            <td>The maximum number of members (calls) that can be in this queue simultaneously. Maximum value is 1000. Defaults to 100.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.updateQueue configKey="MyTwilioConfig">
        <queueSid>{$ctx:queueSid}</queueSid>
        <friendlyName>{$ctx:friendlyName}</friendlyName>
        <maxSize>{$ctx:maxSize}</maxSize>
    </twilio.updateQueue>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the updateQueue operation.

    ```xml
    <twilio.updateQueue configKey="MyTwilioConfig">
        <queueSid>QU5ef8732a3c49700934481addd5ce1659</queueSid>
        <friendlyName>persistent_queue1</friendlyName>
        <maxSize>30</maxSize>
    </twilio.updateQueue>
    ```

### Get a list of members in a queue

??? note "getMemberList"
    To get a list of members in a queue, use `twilio.getMemberList` and specify the following properties. The list returns information about each member, including SID, average wait time, position in the queue, and more. See the [related API documentation](https://www.twilio.com/docs/api/rest/queue#instance-subresources) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>queueSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that uniquely identifies the queue whose members you want to retrieve.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getMemberList configKey="MyTwilioConfig">
        <queueSid>{$ctx:queueSid}</queueSid>
    </twilio.getMemberList>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getMemberList operation.

    ```xml
    <twilio.getMemberList configKey="MyTwilioConfig">
        <queueSid>QU5ef8732a3c49700934481addd5ce1659</queueSid>
    </twilio.getMemberList>
    ```

### Get a specific member

??? note "getMember"
    To get information about a specific member in a queue, including SID, wait time, position in the queue, and more, use `twilio.getMember` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/member#instance-get) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>queueSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that uniquely identifies the queue.</td>
        </tr>
        <tr>
            <td>callSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that uniquely identifies the member whose information you want to retrieve.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getMember configKey="MyTwilioConfig">
        <queueSid>{$ctx:queueSid}</queueSid>
        <callSid>{$ctx:callSid}</callSid>
    </twilio.getMember>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getMember operation.

    ```xml
    <twilio.getMember configKey="MyTwilioConfig">
        <queueSid>QU5ef8732a3c49700934481addd5ce1659</queueSid>
        <callSid>CA386025c9bf5d6052a1d1ea42b4d16662</callSid>
    </twilio.getMember>
    ```

### Dequeue a specific member

??? note "dequeueMember"
    To remove a member from the queue and start processing the call, use `twilio.dequeueMember` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/member#instance-post) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>queueSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that uniquely identifies the queue.</td>
        </tr>
        <tr>
            <td>callSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that uniquely identifies the member you want to remove from the queue and start processing.</td>
        </tr>
        <tr>
            <td>url</td>
            <td>String</td>
            <td>Yes</td>
            <td>The URL that Twilio should use to process this call.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.dequeueMember configKey="MyTwilioConfig">
        <queueSid>{$ctx:queueSid}</queueSid>
        <callSid>{$ctx:callSid}</callSid>
        <url>{$ctx:url}</url>
    </twilio.dequeueMember>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the dequeueMember operation.

    ```xml
    <twilio.dequeueMember configKey="MyTwilioConfig">
        <queueSid>QU5ef8732a3c49700934481addd5ce1659</queueSid>
        <callSid>CA386025c9bf5d6052a1d1ea42b4d16662</callSid>
        <url>http://demo.twilio.com/docs/voice.xml</url>
    </twilio.dequeueMember>
    ```

## Work with SMS messages

The following operations are available for working with [SMS messages](https://www.twilio.com/docs/api/rest/sending-messages):

### Send an SMS message

??? note "sendSms"
    To send an SMS message, use `twilio.sendSms` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/sending-sms) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>body</td>
            <td>String</td>
            <td>Yes</td>
            <td>The text of the message you want to send, up to 160 characters.</td>
        </tr>
        <tr>
            <td>to</td>
            <td>String</td>
            <td>Yes</td>
            <td>The destination phone number. Format with a '+' and country code, e.g., +16175551212 (<a href="http://en.wikipedia.org/wiki/E.164">E.164</a> format). For 'To' numbers without a '+', Twilio will use the same country code as the 'From' number. Twilio will also attempt to handle locally formatted numbers for that country code (e.g., (415) 555-1212 for US, 07400123456 for GB). If you are sending to a different country than the 'From' number, you must include a '+' and the country code to ensure proper delivery.</td>
        </tr>
        <tr>
            <td>from</td>
            <td>String</td>
            <td>Yes</td>
            <td>A Twilio phone number enabled for SMS. Only phone numbers or <a href="https://www.twilio.com/docs/api/rest/short-codes">short codes</a> purchased from Twilio work here; for example, you cannot spoof SMS messages from your own cell phone number.</td>
        </tr>
        <tr>
            <td>statusCallbackUrl</td>
            <td>String</td>
            <td>No</td>
            <td>A URL that Twilio will POST to when your message is processed. Twilio will POST the SMS SID as well as status `sent` or `failed`.</td>
        </tr>
        <tr>
            <td>applicationSid</td>
            <td>String</td>
            <td>No</td>
            <td>Twilio will POST the SMS SID as well as status `sent` or `failed` to the URL in the SMS status callback property of this application. If the `statusCallbackUrl` parameter above is also passed, the application's SMS status callback parameter will take precedence.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.sendSms configKey="MyTwilioConfig">
        <body>{$ctx:body}</body>
        <to>{$ctx:to}</to>
        <from>{$ctx:from}</from>
        <statusCallbackUrl>{$ctx:statusCallbackUrl}</statusCallbackUrl>
        <applicationSid>{$ctx:applicationSid}</applicationSid>
    </twilio.sendSms>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the sendSms operation.

    ```xml
    <twilio.sendSms configKey="MyTwilioConfig">
        <body>Jenny%20please%3F%21%20I%20love%20you%20%3C3</body>
        <to>%2B14159352345</to>
        <from>%2B14158141829</from>
        <statusCallbackUrl>http://demo.twilio.com/docs/statuscallback.xml</statusCallbackUrl>
        <applicationSid>AP2a0747eba6abf96b7e3c3ff0b4530f6e</applicationSid>
    </twilio.sendSms>
    ```

### Get a list of SMS messages

??? note "getSmsList"
    To get a list of SMS messages associated with this account, including the SID, status, and more for each message, use `twilio.getSmsList` and specify the following properties. The list includes [paging information](https://www.twilio.com/docs/api/rest/response#response-formats-list-paging-information). See the [related API documentation](https://www.twilio.com/docs/api/rest/sms#list-get) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>to</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows messages to the specified phone number.</td>
        </tr>
        <tr>
            <td>from</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows messages from the specified phone number.</td>
        </tr>
        <tr>
            <td>dateSent</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows messages sent on this date (in <a href="http://wwp.greenwichmeantime.com/">GMT</a> format), given as `YYYY-MM-DD`. You can also specify inequality, such as `<=YYYY-MM-DD` for SMS messages that were sent on or before midnight on a date, and `>=YYYY-MM-DD` for SMS messages sent on or after midnight on a date.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getSmsList configKey="MyTwilioConfig">
        <to>{$ctx:to}</to>
        <from>{$ctx:from}</from>
        <dateSent>{$ctx:dateSent}</dateSent>
    </twilio.getSmsList>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getSmsList operation.

    ```xml
    <twilio.getSmsList configKey="MyTwilioConfig">
        <to>%2B14159352345</to>
        <from>%2B14158141829</from>
        <dateSent>2009-07-06</dateSent>
    </twilio.getSmsList>
    ```

### Get a specific SMS message

??? note "getSms"
    To get information about a specific SMS message, including the SID, status, and more, use `twilio.getSms` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/sms#instance-get) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>messageSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that uniquely identifies this SMS message.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getSms configKey="MyTwilioConfig">
        <messageSid>{$ctx:messageSid}</messageSid>
    </twilio.getSms>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getSms operation.

    ```xml
    <twilio.getSms configKey="MyTwilioConfig">
        <messageSid>SM800f449d0399ed014aae2bcc0cc2f2ec</messageSid>
    </twilio.getSms>
    ```

### Get a list of short codes

??? note "getShortCodeList"
    To get a list of [short codes](https://www.twilio.com/docs/api/rest/short-codes) associated with this account, use `twilio.getShortCodeList` and specify the following properties. The list includes [paging information](https://www.twilio.com/docs/api/rest/response#response-formats-list-paging-information). See the [related API documentation](https://www.twilio.com/docs/api/rest/short-codes#list-get) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>shortCode</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows the short code resources that match this pattern. You can specify partial numbers and use `*` as a wildcard for any digit.</td>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows short codes whose friendly names exactly match this name.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getShortCodeList configKey="MyTwilioConfig">
        <shortCode>{$ctx:shortCode}</shortCode>
        <friendlyName>{$ctx:friendlyName}</friendlyName>
    </twilio.getShortCodeList>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getShortCodeList operation.

    ```xml
    <twilio.getShortCodeList configKey="MyTwilioConfig">
        <shortCode>67898</shortCode>
        <friendlyName>67898</friendlyName>
    </twilio.getShortCodeList>
    ```

### Get a specific short code

??? note "getShortCode"
    To get information about a specific short code, including its account SID, SMS URL, and more, use `twilio.getShortCode` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/short-codes#instance-get) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>shortCodeSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that uniquely identifies this short code.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getShortCode configKey="MyTwilioConfig">
        <shortCodeSid>{$ctx:shortCodeSid}</shortCodeSid>
    </twilio.getShortCode>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getShortCode operation.

    ```xml
    <twilio.getShortCode configKey="MyTwilioConfig">
        <shortCodeSid>SC6b20cb705c1e8f00210049b20b70fce2</shortCodeSid>
    </twilio.getShortCode>
    ```

### Update a short code

??? note "updateShortCodeProperties"
    To update the properties of a short code, use `twilio.updateShortCodeProperties` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/short-codes#instance-post) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>shortCodeSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that uniquely identifies this short code.</td>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>No</td>
            <td>The human-readable description of this short code.</td>
        </tr>
        <tr>
            <td>apiVersion</td>
            <td>String</td>
            <td>No</td>
            <td>Specifies the API version, either 2010-04-01 or 2008-08-01, to use when requests are made to this short code. Defaults to your account's default API version.</td>
        </tr>
        <tr>
            <td>smsUrl</td>
            <td>String</td>
            <td>No</td>
            <td>The URL that Twilio should request when somebody sends an SMS to this phone number.</td>
        </tr>
        <tr>
            <td>smsMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the SMS URL. Defaults to POST.</td>
        </tr>
        <tr>
            <td>smsFallbackUrl</td>
            <td>String</td>
            <td>No</td>
            <td>The URL that Twilio will request if an error occurs when requests are made to the SMS URL.</td>
        </tr>
        <tr>
            <td>smsFallbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either GET or POST, that should be used to request the SMS fallback URL. Defaults to POST.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.updateShortCodeProperties configKey="MyTwilioConfig">
        <shortCodeSid>{$ctx:shortCodeSid}</shortCodeSid>
        <friendlyName>{$ctx:friendlyName}</friendlyName>
        <apiVersion>{$ctx:apiVersion}</apiVersion>
        <smsUrl>{$ctx:smsUrl}</smsUrl>
        <smsMethod>{$ctx:smsMethod}</smsMethod>
        <smsFallbackUrl>{$ctx:smsFallbackUrl}</smsFallbackUrl>
        <smsFallbackMethod>{$ctx:smsFallbackMethod}</smsFallbackMethod>
    </twilio.updateShortCodeProperties>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the updateShortCodeProperties operation.

    ```xml
    <twilio.updateShortCodeProperties configKey="MyTwilioConfig">
        <shortCodeSid>SC6b20cb705c1e8f00210049b20b70fce2</shortCodeSid>
        <friendlyName>67898</friendlyName>
        <apiVersion>2010-04-01</apiVersion>
        <smsUrl>http://demo.twilio.com/docs/sms.xml</smsUrl>
        <smsMethod>POST</smsMethod>
        <smsFallbackUrl>http://demo.twilio.com/docs/smsfallback.xml</smsFallbackUrl>
        <smsFallbackMethod>POST</smsFallbackMethod>
    </twilio.updateShortCodeProperties>
    ```

## Work with usage records and triggers

The following operations are available for working with [usage records](https://www.twilio.com/docs/api/rest/usage-records) and [triggers](https://www.twilio.com/docs/api/rest/usage-triggers):

### Get a list of usage records

??? note "getUsageRecordList"
    To get a list of usage records, use `twilio.getUsageRecordList` and specify the following properties. By default, the list includes one usage record for each category, representing all usage accrued all-time for the account. The list includes [paging information](https://www.twilio.com/docs/api/rest/response#response-formats-list-paging-information). See the [related API documentation](https://www.twilio.com/docs/api/rest/usage-records#list-get) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>usageCategory</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows usage records for the specified <a href="https://www.twilio.com/docs/api/rest/usage-records#usage-categories">usage category</a>.</td>
        </tr>
        <tr>
            <td>startDate</td>
            <td>String</td>
            <td>No</td>
            <td>Only include usage that has occurred on or after this date. Format is `YYYY-MM-DD`. All dates are in GMT. You can also specify offsets from today. For example, `-30days` will set the start date to 30 days before today.</td>
        </tr>
        <tr>
            <td>endDate</td>
            <td>String</td>
            <td>No</td>
            <td>Only include usage that has occurred on or before this date. Format is `YYYY-MM-DD`. All dates are in GMT. You can also specify offsets from today. For example, `+30days` will set the start date to 30 days after today.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getUsageRecordList configKey="MyTwilioConfig">
        <usageCategory>{$ctx:usageCategory}</usageCategory>
        <startDate>{$ctx:startDate}</startDate>
        <endDate>{$ctx:endDate}</endDate>
    </twilio.getUsageRecordList>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getUsageRecordList operation.

    ```xml
    <twilio.getUsageRecordList configKey="MyTwilioConfig">
        <usageCategory>calls</usageCategory>
        <startDate>2013-04-01</startDate>
        <endDate>2013-04-30</endDate>
    </twilio.getUsageRecordList>
    ```

### Create a usage trigger

??? note "addUsageTrigger"
    To create a trigger that will notify your application when a usage threshold has been passed, use `twilio.addUsageTrigger` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/usage-triggers#list-post) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>usageCategory</td>
            <td>String</td>
            <td>Yes</td>
            <td>The <a href="https://www.twilio.com/docs/api/rest/usage-records#usage-categories">usage category</a> you want this trigger to monitor.</td>
        </tr>
        <tr>
            <td>triggerValue</td>
            <td>String</td>
            <td>Yes</td>
            <td>The value for the usage category at which this trigger will fire. You can use an offset like `+30`, which tells Twilio to create the usage trigger with a trigger value 30 units higher than the current usage.</td>
        </tr>
        <tr>
            <td>callbackUrl</td>
            <td>String</td>
            <td>Yes</td>
            <td>The URL to call when this trigger fires.</td>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>No</td>
            <td>A human-readable description of this trigger, up to 64 characters.</td>
        </tr>
        <tr>
            <td>triggerBy</td>
            <td>String</td>
            <td>No</td>
            <td>The field in the usage record that will fire this trigger. Can be `count`, `usage`, or `price`. The default is `usage`.</td>
        </tr>
        <tr>
            <td>recurring</td>
            <td>String</td>
            <td>No</td>
            <td>To make this a recurring trigger that counts based on a specific interval, specify the interval in this property. Can be `daily`, `monthly`, or `yearly`.</td>
        </tr>
        <tr>
            <td>callbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either `GET` or `POST`, to use when calling the callback URL. Defaults to `POST`.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.addUsageTrigger configKey="MyTwilioConfig">
        <usageCategory>{$ctx:usageCategory}</usageCategory>
        <triggerValue>{$ctx:triggerValue}</triggerValue>
        <callbackUrl>{$ctx:callbackUrl}</callbackUrl>
        <friendlyName>{$ctx:friendlyName}</friendlyName>
        <triggerBy>{$ctx:triggerBy}</triggerBy>
        <recurring>{$ctx:recurring}</recurring>
        <callbackMethod>{$ctx:callbackMethod}</callbackMethod>
    </twilio.addUsageTrigger>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the addUsageTrigger operation.

    ```xml
    <twilio.addUsageTrigger configKey="MyTwilioConfig">
        <usageCategory>calls</usageCategory>
        <triggerValue>1000</triggerValue>
        <callbackUrl>http://www.example.com/</callbackUrl>
        <friendlyName>Trigger for sms at usage of 1000</friendlyName>
        <triggerBy>usage</triggerBy>
        <recurring>daily</recurring>
        <callbackMethod>POST</callbackMethod>
    </twilio.addUsageTrigger>
    ```

### Get a list of usage triggers

??? note "getUsageTriggerList"
    To get a list of usage triggers, use `twilio.getUsageTriggerList` and specify the following properties. By default, all usage triggers are returned. The list includes [paging information](https://www.twilio.com/docs/api/rest/response#response-formats-list-paging-information). See the [related API documentation](https://www.twilio.com/docs/api/rest/usage-triggers#list-get) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>recurring</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows usage triggers that count based on this interval. Can be `daily`, `monthly`, or `yearly`. To get non-recurring triggers, set this property to `alltime` or leave it blank.</td>
        </tr>
        <tr>
            <td>usageCategory</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows triggers that monitor the specified <a href="https://www.twilio.com/docs/api/rest/usage-records#usage-categories">usage category</a>.</td>
        </tr>
        <tr>
            <td>triggerBy</td>
            <td>String</td>
            <td>No</td>
            <td>Only shows triggers that are fired by the specified field in the usage record. Can be `count`, `usage`, or `price`. The default is `usage`.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getUsageTriggerList configKey="MyTwilioConfig">
        <recurring>{$ctx:recurring}</recurring>
        <usageCategory>{$ctx:usageCategory}</usageCategory>
        <triggerBy>{$ctx:triggerBy}</triggerBy>
    </twilio.getUsageTriggerList>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getUsageTriggerList operation.

    ```xml
    <twilio.getUsageTriggerList configKey="MyTwilioConfig">
        <recurring>daily</recurring>
        <usageCategory>calls</usageCategory>
        <triggerBy>usage</triggerBy>
    </twilio.getUsageTriggerList>
    ```

### Get a specific usage trigger

??? note "getUsageTrigger"
    To get information about a specific usage trigger, including the trigger's SID, usage category, current value, and more, use `twilio.getUsageTrigger` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/usage-triggers#instance-get) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>usageTriggerSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that uniquely identifies this usage trigger.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.getUsageTrigger configKey="MyTwilioConfig">
        <usageTriggerSid>{$ctx:usageTriggerSid}</usageTriggerSid>
    </twilio.getUsageTrigger>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the getUsageTrigger operation.

    ```xml
    <twilio.getUsageTrigger configKey="MyTwilioConfig">
        <usageTriggerSid>UT33c6aeeba34e48f38d6899ea5b765ad4</usageTriggerSid>
    </twilio.getUsageTrigger>
    ```

### Update a usage trigger

??? note "updateUsageTrigger"
    To update properties for a specific usage trigger, use `twilio.updateUsageTrigger` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/usage-triggers#instance-post) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>usageTriggerSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that uniquely identifies this usage trigger.</td>
        </tr>
        <tr>
            <td>friendlyName</td>
            <td>String</td>
            <td>No</td>
            <td>A human-readable description of this trigger, up to 64 characters.</td>
        </tr>
        <tr>
            <td>callbackUrl</td>
            <td>String</td>
            <td>No</td>
            <td>The URL to call when this trigger fires.</td>
        </tr>
        <tr>
            <td>callbackMethod</td>
            <td>String</td>
            <td>No</td>
            <td>The HTTP method, either `GET` or `POST`, to use when calling the callback URL. Defaults to `POST`.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.updateUsageTrigger configKey="MyTwilioConfig">
        <usageTriggerSid>{$ctx:usageTriggerSid}</usageTriggerSid>
        <friendlyName>{$ctx:friendlyName}</friendlyName>
        <callbackUrl>{$ctx:callbackUrl}</callbackUrl>
        <callbackMethod>{$ctx:callbackMethod}</callbackMethod>
    </twilio.updateUsageTrigger>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the updateUsageTrigger operation.

    ```xml
    <twilio.updateUsageTrigger configKey="MyTwilioConfig">
        <usageTriggerSid>UT33c6aeeba34e48f38d6899ea5b765ad4</usageTriggerSid>
        <friendlyName>Trigger for sms at usage of 1000</friendlyName>
        <callbackUrl>http://www.example.com/</callbackUrl>
        <callbackMethod>POST</callbackMethod>
    </twilio.updateUsageTrigger>
    ```

### Remove a usage trigger

??? note "removeUsageTrigger"
    To remove a usage trigger from your account, use `twilio.removeUsageTrigger` and specify the following properties. See the [related API documentation](https://www.twilio.com/docs/api/rest/usage-triggers#instance-delete) for more information.

    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>usageTriggerSid</td>
            <td>String</td>
            <td>Yes</td>
            <td>The 34-character string that uniquely identifies this usage trigger.</td>
        </tr>
    </table>

    **Sample configuration**

    ```xml
    <twilio.removeUsageTrigger configKey="MyTwilioConfig">
        <usageTriggerSid>{$ctx:usageTriggerSid}</usageTriggerSid>
    </twilio.removeUsageTrigger>
    ```

    **Sample request**

    Given below is a sample request that can be handled by the removeUsageTrigger operation.

    ```xml
    <twilio.removeUsageTrigger configKey="MyTwilioConfig">
        <usageTriggerSid>UT33c6aeeba34e48f38d6899ea5b765ad4</usageTriggerSid>
    </twilio.removeUsageTrigger>
    ```