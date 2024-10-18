# Switch Mediator

The **Switch Mediator** is an XPath or JSONPath filter. The XPath or JSONPath expression is evaluated and returns a string. This string is matched against the regular expression in each switch case, in the specified order. If a matching case is found, it is executed, and the remaining cases are not processed. If none of the case statements match and a default case is specified, the default case will be executed.

## Syntax

```xml
    <switch source="[XPath|json-eval(JSON Path)]">
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
<td><strong>Source XPath</strong></td>
<td>The source XPath or JSONPath to be evaluated. When specifying a JSONPath, use the format <code>json-eval(&lt;JSON_PATH&gt;)</code> , such as <code>json-eval(getQuote.request.symbol)</code> . If you use namespaces in the expression, click the <strong>edit icon</strong>, then click <strong>Add Namespace</strong> to map the namespace prefix to the correct URI.
</tr>
<tr class="even">
<td><strong>Number of cases</strong></td>
<td><p>This parameter displays the number of cases currently added to the Switch mediator configuration.</p>
<p><br />
</p></td>
</tr>
<tr class="odd">
<td><strong>Specify default case</strong></td>
<td>Adding a default case is optional. If it is specified, it will be executed if no matching case is identified.</td>
</tr>
</tbody>
</table>

## Switch-case mediator

1.  To add a case, go to edit the switch and click **Add parameter** under **Case Branches**. 
2.  It will open a form where a regular expression can be added in the **Case Regex** parameter. By submitting, it will add an empty case under the switch mediator as a child. 
3.  Click on the `+` mark under a chase to add the mediator(s) you want to execute when this case matches the switching value.

## Examples

In this example, the [Property mediator]({{base_path}}/reference/mediators/property-mediator) sets the local property named `symbol` on the current message depending on the evaluation of the string. It will get the text of the symbol element and match it against the values `MSFT` and `IBM`. If the text does not match either of these symbols, the default case will be executed.

```xml
<switch source="//m0:getQuote/m0:request/m0:symbol">
    <case regex="IBM">
        <!-- the property mediator sets a local property on the *current* message -->
        <property name="symbol" scope="default" type="STRING" value="Great stock - IBM"/>
    </case>
    <case regex="MSFT">
        <property name="symbol" scope="default" type="STRING" value="Are you sure? - MSFT"/>
    </case>
    <default>
        <!-- it is possible to assign the result of an XPath or JSON Path expression as well -->
        <property name="symbol" scope="default" type="STRING" expression="fn:concat('Normal Stock - ', //m0:getQuote/m0:request/m0:symbol)"/>
    </default>
</switch>
```
