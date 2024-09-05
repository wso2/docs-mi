# About Mediators

Mediators are individual processing units that perform a specific function on messages that pass through the Micro Integrator. The mediator takes the message received by the proxy service or REST API, carries out some predefined actions on it (such as transforming, enriching, filtering), and outputs the modified message. 

For example, the [Clone]({{base_path}}/reference/mediators/clone-mediator) mediator splits a message into several clones, the [Send]({{base_path}}/reference/mediators/send-mediator) mediator sends the messages, and the [Aggregate]({{base_path}}/reference/mediators/aggregate-mediator) mediator collects and merges the responses before sending them back to the client. 

Mediators also include functionality to match incompatible protocols, data formats, and interaction patterns across different resources. [XQuery]({{base_path}}/reference/mediators/xquery-mediator) and [XSLT]({{base_path}}/reference/mediators/xslt-mediator) mediators allow rich transformations on the messages. Content-based routing using XPath filtering is supported in different flavors, allowing users to get the most convenient configuration experience. Built-in capability to handle transactions allow message mediation to be done transactionally inside the Micro Integrator.

Mediators are always defined within a [mediation sequence]({{base_path}}/reference/mediation-sequences).

## Classification of mediators

Mediators are classified as follows based on whether they access the message's content: 

<table>
  <col width="140">
  <tr>
    <th>Classification</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><b>Content-Aware</b> mediators</td>
    <td>
      These mediators always access the message content when mediating messages (e.g., <a href="{{base_path}}/reference/mediators/enrich-mediator">Enrich</a> mediator).
    </td>
  </tr>
  <tr>
    <td><b>Content-Unaware</b> mediators</td>
    <td>
      These mediators never access the message content when mediating messages (e.g., <a href="{{base_path}}/reference/mediators/send-mediator">Send</a> mediator).
    </td>
  </tr>
  <tr>
    <td><b>Conditionally Content-Aware</b> mediators</td>
    <td>
      These mediators could be either content-aware or content-unaware depending on their exact instance configuration. For example, a simple <a href="{{base_path}}/reference/mediators/log-mediator"></a> mediator instance (i.e. configured as <log/>) is content-unaware. However a log mediator configured as <log level=”full”/> would be content-aware since it is expected to log the message payload.
    </td>
  </tr>
</table>

## List of mediators

WSO2 Micro Integrator includes a comprehensive library of mediators that provide functionality for implementing widely used [Enterprise Integration Patterns (EIPs)]({{base_path}}/learn/enterprise-integration-patterns/eip-overview/). You can also easily write a custom mediator to provide additional functionality using various technologies such as Java and scripting.

### Generic mediators

- [Call mediator]({{base_path}}/reference/mediators/call-mediator)
- [Property mediator]({{base_path}}/reference/mediators/property-mediator)
- [Log mediator]({{base_path}}/reference/mediators/log-mediator)
- [Respond mediator]({{base_path}}/reference/mediators/respond-mediator)
- [Sequence mediator]({{base_path}}/reference/mediators/sequence-mediator)
- [Call Template mediator]({{base_path}}/reference/mediators/call-template-mediator)
- [Drop mediator]({{base_path}}/reference/mediators/drop-mediator)
- [Property Group mediator]({{base_path}}/reference/mediators/property-group-mediator)
- [Cache mediator]({{base_path}}/reference/mediators/cache-mediator)
- [Throttle mediator]({{base_path}}/reference/mediators/throttle-mediator)
- [Store mediator]({{base_path}}/reference/mediators/store-mediator)

### Flow control mediators

- [Filter mediator]({{base_path}}/reference/mediators/filter-mediator)
- [Switch mediator]({{base_path}}/reference/mediators/switch-mediator)
- [Clone mediator]({{base_path}}/reference/mediators/clone-mediator)
- [Iterate mediator]({{base_path}}/reference/mediators/iterate-mediator)
- [ForEach mediator]({{base_path}}/reference/mediators/foreach-mediator)
- [Aggregate mediator]({{base_path}}/reference/mediators/aggregate-mediator)
- [Validate mediator]({{base_path}}/reference/mediators/validate-mediator)

### Transformation mediators

- [Enrich mediator]({{base_path}}/reference/mediators/enrich-mediator)
- [Header mediator]({{base_path}}/reference/mediators/header-mediator)
- [XSLT mediator]({{base_path}}/reference/mediators/xslt-mediator)
- [JSON Transform mediator]({{base_path}}/reference/mediators/json-transform-mediator)
- [Fault mediator]({{base_path}}/reference/mediators/fault-mediator)
- [PayloadFactory mediator]({{base_path}}/reference/mediators/payloadfactory-mediator)
- [Data Mapper mediator]({{base_path}}/reference/mediators/data-mapper-mediator)

### Extension mediators

- [Script mediator]({{base_path}}/reference/mediators/script-mediator)
- [Class mediator]({{base_path}}/reference/mediators/class-mediator)

### Security mediators

- [Oauth mediator]({{base_path}}/reference/mediators/oauth-mediator)
- [Entitlement mediator]({{base_path}}/reference/mediators/entitlement-mediator/)
- [NTLM mediator]({{base_path}}/reference/mediators/ntlm-mediator/)

### Database mediators

- [Data Service Call mediator]({{base_path}}/reference/mediators/dss-mediator/)
- [DBLookup mediator]({{base_path}}/reference/mediators/dblookup-mediator)
- [DB Report mediator]({{base_path}}/reference/mediators/db-report-mediator)

### Other mediators

- [Send mediator]({{base_path}}/reference/mediators/send-mediator)
- [Callout mediator]({{base_path}}/reference/mediators/callout-mediator)
- [Smooks mediator]({{base_path}}/reference/mediators/smooks-mediator)
- [Transaction mediator]({{base_path}}/reference/mediators/transaction-mediator)
- [Builder mediator]({{base_path}}/reference/mediators/builder-mediator)
- [Loopback mediator]({{base_path}}/reference/mediators/loopback-mediator/)
- [FastXSLT mediator]({{base_path}}/reference/mediators/fastxslt-mediator)
- [URLRewrite mediator]({{base_path}}/reference/mediators/urlrewrite-mediator/)
- [XQuery mediator]({{base_path}}/reference/mediators/xquery-mediator/)
- [EJB mediator]({{base_path}}/reference/mediators/ejb-mediator/)
