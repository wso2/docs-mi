# SOAP Headers

!!! Info
	The following properties are SOAP headers that can be used with the [Property mediator]({{base_path}}/reference/mediators/property-mediator) and the [Property Group mediator]({{base_path}}/reference/mediators/property-group-mediator).

SOAP headers provide information about the message, such as the To and
From values. You can use the `get-property()` function
in the [Property mediator]({{base_path}}/reference/mediators/property-mediator) to retrieve these
headers. You can also add Custom SOAP headers using either the
[Payload mediator]({{base_path}}/reference/mediators/payloadfactory-mediator)
or the [Script mediator]({{base_path}}/reference/mediators/script-mediator).

## To

|     Parameter       |           Value               |
|---------------------|-------------------------------|
| **Header Name**     | To                            |
| **Possible Values** | Any URI                       |
| **Description**     | The To header of the message. |
| **Example**         | ${properties.To}            |

## From

|     Parameter       |           Value               |
|---------------------|---------------------------------|
| **Header Name**     | From                            |
| **Possible Values** | Any URI                         |
| **Description**     | The From header of the message. |
| **Example**         | ${properties.From}            |

## Action

|     Parameter       |           Value               |
|---------------------|---------------------------------------|
| **Header Name**     | Action                                |
| **Possible Values** | Any URI                               |
| **Description**     | The SOAPAction header of the message. |
| **Example**         | ${properties.Action}                |

## ReplyTo

|     Parameter       |           Value               |
|---------------------|--------------------------------------------|
| **Header Name**     | ReplyTo                                    |
| **Possible Values** | Any URI                                    |
| **Description**     | The ReplyTo header of the message.         |
| **Example**         | \<header name="ReplyTo" action="remove"/\> |

## MessageID

|     Parameter       |           Value               |
|---------------------|----------------------------------------------------------------------------------------------------------------|
| **Header Name**     | MessageID                                                                                                      |
| **Possible Values** | UUID                                                                                                           |
| **Description**     | The unique message ID of the message. It is not recommended to make alterations to this property of a message. |
| **Example**         | ${properties.MessageID}                                                                                      |

## RelatesTo

|     Parameter       |           Value               |
|---------------------|--------------------------------------------------------------------------------------------------------------|
| **Header Name**     | RelatesTo                                                                                                    |
| **Possible Values** | UUID                                                                                                         |
| **Description**     | The unique ID of the request to which the current message is related. It is not recommended to make changes. |
| **Example**         | ${properties.RelatesTo}                                                                                    |

## FaultTo

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tr>
	<th>Parameter</th>
	<th>Value</th>
</tr>
<tbody>
<tr class="odd">
<td><p><strong>Header Name</strong></p></td>
<td><p>FaultTo</p></td>
</tr>
<tr class="even">
<td><p><strong>Possible Values</strong></p></td>
<td><p>Any URI</p></td>
</tr>
<tr class="odd">
<td><p><strong>Description</strong></p></td>
<td><p>The FaultTo header of the message.</p></td>
</tr>
<tr class="even">
<td><p><strong>Example</strong></p></td>
<td><div class="content-wrapper">
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><span id="cb1-1"><a href="#cb1-1"></a>&lt;header name=<span class="st">&quot;FaultTo&quot;</span> value=<span class="st">&quot;http://localhost:9000&quot;</span>/&gt;</span></code></pre></div>
</div>
</div>
</div></td>
</tr>
</tbody>
</table>
