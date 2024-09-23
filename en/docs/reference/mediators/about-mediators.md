# About Mediators

Mediators are individual processing units that perform a specific actions on messages that pass through the Micro Integrator. The mediator takes the message received by the REST API or proxy service, carries out predefined actions on it (such as transforming, enriching, filtering), and outputs the modified message. 

For example, the [Clone]({{base_path}}/reference/mediators/clone-mediator) mediator splits a message into several clones, the [Call]({{base_path}}/reference/mediators/call-mediator) mediator calls a backend endpoint with the message, and the [Aggregate]({{base_path}}/reference/mediators/aggregate-mediator) mediator collects and merges the responses and the [Respond]({{base_path}}/reference/mediators/respond-mediator) mediator sends the message back to the client. 

## Classification of mediators

Mediators are classified as follows based on whether they access the message's content: 

<table>
  <col width="140">
  <tr>
    <th>Classification</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Content-aware mediators</td>
    <td>
      These mediators always access the message content when mediating messages.
    </td>
  </tr>
  <tr>
    <td>Content-unaware mediators</td>
    <td>
      These mediators never access the message content when mediating messages.
    </td>
  </tr>
  <tr>
    <td>Conditionally content-aware mediators</td>
    <td>
      These mediators could be either content-aware or content-unaware depending on their usage in the configuration. For example, a simple <a href="{{base_path}}/reference/mediators/log-mediator">Log</a> mediator configured as <code>&lt;log/&gt;</code> is content-unaware. However, a log mediator configured as <code>&lt;log level=&quot;full&quot;/&gt;</code> would be content-aware since it is expected to log the message payload.
    </td>
  </tr>
</table>

!!! Note
    When at least one content-aware mediator is added to the mediation sequence, the message payload needs to be fully built and accessible in memory. This is necessary because the mediator needs to examine or modify the message's content and hence incurs a performance overhead.

## List of mediators

WSO2 Micro Integrator includes a comprehensive catalog of mediators that provide functionality for implementing widely used [Enterprise Integration Patterns (EIPs)]({{base_path}}/learn/enterprise-integration-patterns/eip-overview/). You can also easily write a custom mediator to provide additional functionality using various technologies such as Java and scripting.

<table>
  <tr>
    <th>Category</th>
    <th>Mediator</th>
    <th>Content aware/unaware</th>
  </tr>
  <tr>
    <td rowspan="11">Generic mediators</td>
    <td>
      <a href="{{base_path}}/reference/mediators/call-mediator">Call mediator</a>
    </td>
    <td>Conditionally content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/property-mediator">Property mediator</a>
    </td>
    <td>Conditionally content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/log-mediator">Log mediator</a>
    </td>
    <td>Conditionally content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/respond-mediator">Respond mediator</a>
    </td>
    <td>Content-unaware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/sequence-mediator">Sequence mediator</a>
    </td>
    <td>Content-unaware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/call-template-mediator">Call Template mediator</a>
    </td>
    <td>Content-unaware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/drop-mediator">Drop mediator</a>
    </td>
    <td>Content-unaware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/property-group-mediator">Property Group mediator</a>
    </td>
    <td>Conditionally content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/cache-mediator">Cache mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/throttle-mediator">Throttle mediator</a>
    </td>
    <td>Content-unaware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/store-mediator">Store mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>

  <tr>
    <td rowspan="7">Flow control mediators</td>
    <td>
      <a href="{{base_path}}/reference/mediators/filter-mediator">Filter mediator</a>
    </td>
    <td>Conditionally content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/switch-mediator">Switch mediator</a>
    </td>
    <td>Conditionally content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/clone-mediator">Clone mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/iterate-mediator">Iterate mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/foreach-mediator">ForEach mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/aggregate-mediator">Aggregate mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/validate-mediator">Validate mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>

  <tr>
    <td rowspan="7">Transformation mediators</td>
    <td>
      <a href="{{base_path}}/reference/mediators/enrich-mediator">Enrich mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/header-mediator">Header mediator</a>
    </td>
    <td>Conditionally content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/xslt-mediator">XSLT mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/json-transform-mediator">JSON Transform mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/fault-mediator">Fault mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/payloadfactory-mediator">PayloadFactory mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/data-mapper-mediator">Data Mapper mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>

  <tr>
    <td rowspan="2">Extension mediators</td>
    <td>
      <a href="{{base_path}}/reference/mediators/script-mediator">Script mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/class-mediator">Class mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>

  <tr>
    <td rowspan="3">Security mediators</td>
    <td>
      <a href="{{base_path}}/reference/mediators/oauth-mediator">Oauth mediator</a>
    </td>
    <td>Content-unaware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/entitlement-mediator">Entitlement mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/ntlm-mediator">NTLM mediator</a>
    </td>
    <td>Content-unaware</td>
  </tr>

  <tr>
    <td rowspan="3">Database mediators</td>
    <td>
      <a href="{{base_path}}/reference/mediators/dss-mediator">Data Service Call mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/dblookup-mediator">DBLookup mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/db-report-mediator">DB Report mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>

  <tr>
    <td rowspan="10">Other mediators</td>
    <td>
      <a href="{{base_path}}/reference/mediators/send-mediator">Send mediator</a>
    </td>
    <td>Content-unaware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/callout-mediator">Callout mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/smooks-mediator">Smooks mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/transaction-mediator">Transaction mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/builder-mediator">Builder mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/loopback-mediator">Loopback mediator</a>
    </td>
    <td>Content-unaware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/fastxslt-mediator">FastXSLT mediator</a>
    </td>
    <td>Content-unaware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/urlrewrite-mediator">URLRewrite mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/xquery-mediator">XQuery mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
  <tr>
    <td>
      <a href="{{base_path}}/reference/mediators/ejb-mediator">EJB mediator</a>
    </td>
    <td>Content-aware</td>
  </tr>
</table>
