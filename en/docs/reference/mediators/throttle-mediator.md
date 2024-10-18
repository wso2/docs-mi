# Throttle Mediator

The Throttle mediator can be used to restrict access to services.
This is useful for enterprise-level services to avoid heavy loads that can cause performance issues in the system. 
It can also be used when you want to restrict certain user groups (for example, IP addresses and domains) from accessing your system. 
The Throttle mediator defines a throttle group which includes the following.

-   A throttle policy defines the extent to which individuals and groups of IP addresses or domains should be allowed to access the
    service.
-   A mediation sequence to handle requests accepted based on the throttle policy.
-   A mediation sequence to handle requests rejected based on the throttle policy.

## Syntax

```xml
<throttle [onReject="sequenceKey"] [onAccept="sequenceKey"] id="string">
    (<policy key="string"/> | <policy>..</policy>)
    <onReject>..</onReject>?
    <onAccept>..</onAccept>?
</throttle>
```

## Configuration

The configuration of the Throttle mediator is divided into the following sections.

### General

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Group ID</strong></td>
<td><p>An ID for the throttle group. This is a required parameter</p>
</td>
</tr>
</tbody>
</table>

### Throttle Policy

This section is used to specify the throttle policy that should apply to the requests passing through the Throttle mediator. 
A throttle policy has multiple entries defining the extent to which, an individual or a group of IP addresses/domains should be allowed to access the service.

The parameters available to be configured in this section are as follows.

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td id="policy_type"><strong>Policy Type</strong></td>
<td><p>This section is used to specify how the throttle policy is configured. The following options are available.</p>
<ul>
<li><strong>In-Line</strong>: If this is selected, the Throttle policy can be defined within the Throttle mediator configuration.</li>
<li><strong>Referring reference</strong>: If this is selected, you can refer to a predefined Throttle policy saved in the Registry. You can enter the key to access the policy in the <strong>Policy Key</strong> parameter.</li>
</ul>
</td>
<td>
</tr>
<tr class="odd">
<td><strong>Policy Entries</strong></td>
<td><p>This section is used to add the throttle policy if the In-line option is selected for the <a href="#policy_type">policy type</a>. Click on the <strong>Add Parameter</strong> to add throttle policy. The <a href="#throttle-policy-entry-config">throttle policy configurations</a> are described below.</p></td>
</tr>
</tbody>
</table>

The parameters available in the throttle policy entry form to configure the throttle policy are as follows.

<table id="throttle-policy-entry-config">
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Maximum Request Count</strong></td>
<td><div class="content-wrapper">
<p>The maximum number of messages served at a given time. The number of messages between the inflow throttle handler and the outflow throttle handler cannot exceed the value entered for this parameter at any given time. This parameter value is applied to the entire system. It is not restricted to one or more specific IP addresses/domains.</p>
<p>When this parameter is used, the same Throttle mediator ID should be included in the response flow so that the completed responses are deducted from the available limit.</p>
</div></td>
</tr>
<tr class="even">
<td><strong>Throttle Type</strong></td>
<td>This parameter is used to specify whether the value(s) entered in the <strong>Range</strong> parameter refers to IP addresses or domains.</td>
</tr>
<tr class="odd">
<td><strong>Throttle Range</strong></td>
<td><p>This parameter is used to specify the IP addresses/domains to which the entry in the current row should be applied</p>
<ul>
<li>If you want to apply the entry to a range of IP addresses, enter the range in this parameter, for example, <code>8.100.1.30 – 8.100.1.45</code>. Alternatively, you can enter a single IP address to apply the entry to only one IP address.</li>
<li>If you want to apply the entry to a domain, enter the required domain ID in this parameter.</li>
<li>If you want to apply the entry to all the IP addresses/domains that are not configured in the other configurations, enter <code>other</code> in this parameter.</li>
</ul></td>
</tr>
<tr class="even">
<td><strong>Access Type</strong></td>
<td><p>This parameter is used to specify the extent to which the IP addresses/domains specified in the <strong>Range</strong> parameter are allowed access to the service to which the throttle policy is applied. Possible values are as follows.</p>
<ul>
<li><strong>Allow</strong>: If this is selected, the specified IP addresses/domains are allowed to access the services to which the throttle ID is applied without any restrictions.</li>
<li><strong>Deny</strong>: If this is selected, specified IP addresses/domains are not allowed to access the services to which the throttle ID is applied .</li>
<li><strong>Control</strong>: If this is selected, the specified IP addresses/domains are allowed to access the services to which the throttle ID is applied. However, the number of times they can access the services is controlled by the <strong>Max Request Count</strong>, <strong>Unit Time (ms)</strong>, and the <strong>Prohibit Time Period (ms)</strong> parameters.</li>
</ul></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<strong>Max Request Count</strong>
</div></td>
<td><div class="content-wrapper">
<p>This parameter specifies the maximum number of requests that should be handled within the time interval specified in the <strong>Unit Time</strong> parameter.</p>
<p>This parameter is applicable only when the value selected for the <strong>Access</strong> parameter is <code>Control</code>.</p>
</div></td>
</tr>
<tr class="even">
<td><div class="content-wrapper">
<strong>Unit Time</strong>
</div></td>
<td><div class="content-wrapper">
<p>The time interval in milliseconds for which the maximum number of requests specified for the Throttle ID in the <strong>Max Request Count</strong> parameter apply.</p>
<p>This parameter is applicable only when the value selected for the <strong>Access</strong> parameter is <code>Control</code>.</p>
</div></td>
</tr>
<tr class="odd">
<td><div class="content-wrapper">
<strong>Prohibit Time Period</strong>
</div></td>
<td><div class="content-wrapper">
<p>If the number of requests entered in the <strong>Max Request Count</strong> parameter is achieved before the time interval entered in the <strong>Unit Time (ms)</strong> parameter has elapsed, no more requests are taken by the inflow throttle handler for the time period (in milliseconds) entered to this parameter. Entering a value in this parameter alters the unit time.</p>
<p>For example:</p>
<p>Max Request Count <strong>=</strong> 50<br />
Unit Time = 50000 ms<br />
Prohibit Time Period = 5000 ms</p>
<p>If 50 requests are received within 50000 milliseconds , no requests will be taken for the next 5000 milliseconds. Thus, the time slot considered as the unit time is changed to 40000 milliseconds. If no value is entered in the <strong>Prohibit Time Period (ms)</strong> parameter, no requests will be taken until 15000 more milliseconds (i.e. the remainder of the unit time) have elapsed.</p>
<p>This parameter is applicable only when the value selected for the <strong>Access</strong> parameter is <code>Control</code>.</p>
</div></td>
</tr>
</tbody>
</table>

### On Acceptance

This section is used to specify the mediation sequence that should be applied when a request is accepted based on the [throttle policy](#throttle-policy) defined for the Throttle
mediator. The parameters available to be configured in this section are as follows.

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>On Accept Branch Sequence Type</strong></td>
<td><div class="content-wrapper">
<p>This parameter is used to specify how the On Acceptance sequence is defined. The following options are available.</p>
<ul>
<li><strong>In-line Sequence</strong>: If this is selected, the mediation sequence to be applied to accepted requests can be defined within the Throttle mediator configuration. Click on the <strong>OnAccept</strong> node in the mediation flow to define the sequence in-line once the throttle mediator is added.<br />
</li>
<li><strong>Referring Sequence</strong>: If this is selected, you can refer to a predefined mediation sequence.</li>
</ul>
</div></td>
</tr>
</tbody>
</table>

### On Rejection

This section is used to specify the mediation sequence that should be applied when a request is rejected based on the [throttle policy](#throttle-policy) defined for the Throttle mediator. The parameters available to be configured in this section are as follows.

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>On Reject Branch Sequence Type</strong></td>
<td><div class="content-wrapper">
<p>This parameter is used to specify how the On Acceptance sequence is defined. The following options are available.</p>
<ul>
<li><strong>In-line Sequence</strong>: If this is selected, the mediation sequence to be applied to rejected requests can be defined within the Throttle mediator configuration. Click on the <strong>OnReject</strong> node in the mediation flow to define the sequence in-line once the throttle mediator is added.<br />
</li>
<li><strong>Referring Sequence</strong>: If this is selected, you can refer to a predefined mediation sequence.</li>
</ul>
</div></td>
</tr>
</tbody>
</table>

## Examples

### Example for a concurrency-based policy

This sample policy only contains a component called `MaximumConcurrentAccess`. This indicates the maximum number of concurrent requests that can pass through Synapse in a single unit of time, and this value applies to all the IP addresses and domains.

=== "REST API"
    ```xml
    <api xmlns="http://ws.apache.org/ns/synapse" name="ThrottleAPI" context="/throttle">
        <resource methods="GET" uri-template="/getQuote">
            <inSequence>
                <throttle id="A">
                    <policy>
                        <wsp:Policy xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy"
                                    xmlns:throttle="http://www.wso2.org/products/wso2commons/throttle">
                            <throttle:ThrottleAssertion>
                                <throttle:MaximumConcurrentAccess>10</throttle:MaximumConcurrentAccess>
                            </throttle:ThrottleAssertion>
                        </wsp:Policy>
                    </policy>
                    <onAccept>
                        <log level="custom">
                            <property name="text" value="**Access Accept**"/>
                        </log>
                        <call>
                            <endpoint key="SimpleStockQuoteServiceEndpoint"/>
                        </call>
                    </onAccept>
                    <onReject>
                        <log level="custom">
                            <property name="text" value="**Access Denied**"/>
                        </log>
                        <makefault response="true" description="" version="soap12">
                            <code value="soap12Env:Receiver" xmlns:soap12Env="http://www.w3.org/2003/05/soap-envelope"/>
                            <reason value="**Access Denied**"/>
                        </makefault>
                        <drop/>
                    </onReject>
                </throttle>
            </inSequence>
        </resource>
    </api>
    ```
=== "Endpoint"
    ```xml
    <endpoint xmlns="http://ws.apache.org/ns/synapse" name="SimpleStockQuoteServiceEndpoint">
        <address uri="http://localhost:9000/soap/services/SimpleStockQuoteService"/>
    </endpoint>
    ```

### Example for a rates-based policy

This sample policy only contains a rates-based policy. This indicates the maximum number of concurrent requests that can pass through Synapse on a single unit of time, and this value applies to all the IP addresses and domains.

=== "REST API"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <api context="/throttle" name="ThrottleAPI" xmlns="http://ws.apache.org/ns/synapse">
        <resource methods="GET" uri-template="/getQuote">
            <inSequence>
                <throttle description="" id="A">
                    <policy>
                        <!-- define throttle policy -->
                        <wsp:Policy xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy"
                            xmlns:throttle="http://www.wso2.org/products/wso2commons/throttle">
                            <throttle:MaximumCount>4</throttle:MaximumCount>
                            <throttle:UnitTime>800000</throttle:UnitTime>
                            <throttle:ProhibitTimePeriod wsp:Optional="true">1000</throttle:ProhibitTimePeriod>
                        </wsp:Policy>
                    </policy>
                    <onAccept>
                        <log category="INFO" level="custom">
                            <property name="text" value="**Access Accept**"/>
                        </log>
                        <call>
                            <endpoint key="SimpleStockQuoteServiceEP"/>
                        </call>
                    </onAccept>
                    <onReject>
                        <log category="INFO" level="custom">
                            <property name="text" value="**Access Denied**"/>
                        </log>
                        <makefault response="true" description="" version="soap12">
                            <code value="soap12Env:Receiver" xmlns:soap12Env="http://www.w3.org/2003/05/soap-envelope"/>
                            <reason value="**Access Denied**"/>
                        </makefault>
                        <drop/>
                    </onReject>
                </throttle>
            </inSequence>
            <faultSequence>
            </faultSequence>
        </resource>
    </api>
    ```
=== "Endpoint"
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <endpoint name="SimpleStockQuoteServiceEP" xmlns="http://ws.apache.org/ns/synapse">
        <address uri="http://localhost:9000/services/SimpleStockQuoteService"/>
    </endpoint>
    ```
