# Variable mediator

The Variable mediator is used to manage variables within a mediation flow. The Variable mediator allows you to set variables, which can then be used later in the mediation flow.

## Syntax

```xml
<variable name="string" [type="STRING"|"BOOLEAN"|"INTEGER"|"DOUBLE"|"LONG"|"XML"|"JSON"] (value="string" | expression="expression") />
```

## Configuration

The parameters available to configure the Variable mediator are as follows:

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="even">
<td><strong>Name</strong></td>
<td><div class="content-wrapper">
<p>The name of the variable. This name uniquely identifies the variable in the mediation flow.</p>
</div></td>
</tr>
<tr class="odd">
<td><strong>Data Type</strong></td>
<td><div class="content-wrapper">
<p>The data type of the variable. Available types are as follows:</p>
<ul>
<li><strong>STRING</strong></li>
<li><strong>BOOLEAN</strong></li>
<li><strong>INTEGER</strong></li>
<li><strong>DOUBLE</strong></li>
<li><strong>LONG</strong></li>
<li><p><strong>XML</strong></p></li>
<li><p><strong>JSON</strong></p></li>
</ul>
</td>
</tr>
<tr class="even">
<td><strong>Value</strong></td>
<td>You can give either a static value or a <a href="{{base_path}}/reference/synapse-properties/synapse-expressions">Synapse expression</a>.
</td>
</tr>
</tbody>
</table>

## Examples

### Set a variable with a static value

This example demonstrates setting a variable with a static value.

```xml
<variable name="username" value="JohnDoe" type="STRING"/>
```

### Set a variable with an expression

This example demonstrates dynamically setting a variable using an expression.

```xml
<variable name="userDataObject" expression="${payload.user.data}" type="JSON"/>
<variable name="userId" expression="${payload.user.id}" type="INTEGER"/>
```
