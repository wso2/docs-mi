---
tags:
  - filter
  - ifelse
---

# If Else Mediator

The **If Else Mediator** can be used for filtering messages based on a Synapse expression, 
XPath, JSONPath or a regular expression. If the condition succeeds, the
If Else mediator executes the other mediators enclosed in the sequence.

## Syntax

``` java
<filter (source="[SynapseExpression|XPath|json-eval(JSONPath)]" regex="string") | xpath="[SynapseExpression|XPath|json-eval(JSONPath)]">
   mediator+
</filter>
```

This mediator could also be used to handle a scenario where two
different sequences are applied to messages that meet the filter
criteria and messages that do not meet the filter criteria.

``` java
<filter (source="[SynapseExpression|XPath|json-eval(JSONPath)]" regex="string") | xpath="[SynapseExpression|XPath|json-eval(JSONPath)]">
   <then>
     mediator+
   </then>
   <else>
     mediator+
   </else>
</filter>
```

In this case, the filter condition remains the same. The messages that
match the filter criteria will be mediated using the set of mediators
enclosed in the `         then        ` element. The messages that do
not match the filter criteria will be mediated using the set of
mediators enclosed in the `         else        ` element.

!!! Note
    If you use [legacy XPath expressions]({{base_path}}/reference/synapse-properties/xpath-expressions/) for numeric conditions, XPath evaluation represents all numeric values as Double. As a result, comparisons involving properties of type `INTEGER`, `FLOAT`, or `LONG` may not behave as expected. However, when the property type is `STRING`, the underlying XPath evaluation library first casts the value to a Double and then performs the comparison.

## Configuration

The parameters available for configuring the If Else mediator are as
follows:

<table>
<thead>
<tr class="header">
<th>Parameter Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>Condition</strong></td>
<td><p>This is used to specify the condition that resolves to a boolean value. The message will be branched based on the result of this condition.</p>
</tr>
</tbody>
</table>

### Advanced configurations

Parameters available to configure advanced properties of the If Else mediator are as follows:

<table>
  <tr>
    <th>
      Parameter Name
    </th>
    <th>
      Description
    </th>
  </tr>
  <tr>
    <td>
      <strong>Use a regex pattern</strong>
    </td>
    <td>
      If this is selected, the condition will use a regex-based evaluation.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Expression</strong>
    </td>
    <td>An expression that resolves to a string value, which will be compared with the regex pattern. This field is enabled only when 
      <strong>Use a regex pattern</strong> is selected.
    </td>
  </tr>
  <tr>
    <td>
      <strong>Matches</strong>
    </td>
    <td>The regex pattern to compare with the evaluated expression. This field is enabled only when 
      <strong>Use a regex pattern</strong> is selected.
    </td>
  </tr>
</table>

##  Examples

### Approving or rejecting loan applications based on a condition

In this example, the If Else Mediator will check the credit score in a loan application and decide whether to approve or reject it. 
If the credit score is 1000, the application is approved; otherwise, it is rejected.

``` java
<filter xpath="${payload.loanApplication.creditScore == 1000}">
   <then>
      <log category="INFO">
         <message>ApprovalStatus = Approved</message>
      </log>
      <sequence key="loan_approval_seq"/>
   </then>
   <else>
      <log category="INFO">
         <message>ApprovalStatus = Rejected</message>
      </log>
      <sequence key="loan_rejection_seq"/>
   </else>
</filter>
```
