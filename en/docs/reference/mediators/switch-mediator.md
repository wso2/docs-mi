# Switch Mediator

The **Switch Mediator** evaluates a Synapse expression and returns a result. This result is then matched against the regular expressions defined in each switch case, in the specified order. If a matching case is found, it is executed, and the remaining cases are not processed. If none of the case statements match the default case will be executed.

## Syntax

```xml
    <switch source="[expression]">
        <case regex="string">
            mediator+
        </case>+
        <default>
            mediator+
        </default>
    </switch>
```

## Configuration

The parameters available to configure the Switch mediator are as follows.

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Expression</strong></td>
<td>The Synapse expression to be evaluated which should return a string.</td>
</tr>
<tr class="even">
<td><strong>Cases</strong></td>
<td><p>This section displays the number of cases currently added to the switch mediator and option to add a new case.</p>
<p><br />
</p></td>
</tr>
</tbody>
</table>

### Adding a new case

1.  To add a case, go to edit the switch mediator and click **Add new case** under **Cases** section.
2.  It will open a form where a regular expression can be added in the **Regex Pattern** parameter. By submitting, it will add an empty case under the switch mediator as a child.
3.  Click on the `+` mark under a case to add the mediator(s) you want to execute when this case matches the switching value.

## Examples

In this example, the [Variable mediator]({{base_path}}/reference/mediators/variable-mediator) sets the variable named `symbol` on the current message depending on the evaluation of the expression. The expression will get the symbol value and match it against the values `MSFT` and `IBM`. If the symbol value does not match either of these symbols, the default case will be executed.

```xml
<switch source="${payload.request.symbol}">
    <case regex="IBM">
        <!-- the variable mediator sets a variable on the *current* message -->
        <variable name="symbol" type="STRING" value="Great stock - IBM"/>
    </case>
    <case regex="MSFT">
        <variable name="symbol" type="STRING" value="Are you sure? - MSFT"/>
    </case>
    <default>
        <!-- it is possible to assign the result of an expression as well -->
        <variable name="symbol" type="STRING" expression="${'Normal Stock - ' + payload.request.symbol}"/>
    </default>
</switch>
```
