# Variable mediator

The Variable mediator is used to manage variables within a mediation flow. The Variable mediator allows you to set or remove variables, which can then be used later in the mediation flow.

## Syntax

```xml
<variable name="string" [action="set"|"remove"] [type="STRING"|"INTEGER"|"BOOLEAN"|"DOUBLE"|"FLOAT"|"LONG"|"SHORT"|"OM"|"JSON"] 
        (value="string" | expression="expression") />
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
<tr class="odd">
<td><strong>Action</strong></td>
<td><p>The action to perform on the variable.</p>
<ul>
<li><strong>set</strong>: If this is selected, the variable will be set in the message.</li>
<li><strong>remove</strong>: If this is selected, the variable will be removed from the message.</li>
</ul></td>
</tr>
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
<li><strong>INTEGER</strong></li>
<li><strong>BOOLEAN</strong></li>
<li><strong>DOUBLE</strong></li>
<li><strong>FLOAT</strong></li>
<li><strong>LONG</strong></li>
<li><strong>SHORT</strong></li>
<li><p><strong>OM</strong></p></li>
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
<variable name="username" action="set" value="JohnDoe" type="STRING"/>
```

### Set a variable with an expression

This example demonstrates dynamically setting a variable using an expression.

```xml
<variable name="userDataObject" action="set" expression="${payload.user.data}" type="JSON"/>
<variable name="userId" action="set" expression="${payload.user.id}" type="INTEGER"/>
```

### Remove a variable

This example demonstrates removing a variable from the message.

```xml
<variable name="sessionToken" action="remove"/>
```
