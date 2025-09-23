---
search:
  boost: 0.4
---

# JSONPath Expressions

!!! Note
    WSO2 Integrator: MI will continue to support existing JSONPath expressions. However, it is recommended to use the new [Synapse Expressions]({{base_path}}/reference/synapse-properties/synapse-expressions), as they simplify data extraction and provide a rich set of functions.

[JSONPath](http://goessner.net/articles/JsonPath/) expressions are used for navigating and querying JSON data. JSONPath allows you to extract specific data from JSON documents.

JSONPath expressions are used within mediators like Log, Filter, Property, and Switch mediators to extract JSON data.
`json-eval` function in expressions is used to specify JSONPath.

- The syntax usually starts with `$` to represent the root of the JSON document.
- Dots (.) and brackets ([]) are used to traverse different levels of the JSON hierarchy.

## JSONPath syntax

Suppose we have the following payload:

```
{
  "id": 12345,
  "id_str": "12345",
  "array": [ 1, 2, [ [], [{"inner_id": 6789}] ] ],
  "name": null,
  "object": {},
  "$schema_location": "unknown",
  "12X12": "image12x12.png"
}
```

The following table summarizes sample JSONPath expressions and their outputs:

<table>
<thead>
<tr class="header">
<th>Expression</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>$.</code></pre></td>
<td><pre><code>{ &quot;id&quot;:12345, &quot;id_str&quot;:&quot;12345&quot;, &quot;array&quot;:[1, 2, [[],[{&quot;inner_id&quot;:6789}]]], &quot;name&quot;:null, &quot;object&quot;:{}, &quot;$schema_location&quot;:&quot;unknown&quot;, &quot;12X12&quot;:&quot;image12x12.png&quot;}</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>$.id</code></pre></td>
<td><pre><code>12345</code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>$.name</code></pre></td>
<td><pre><code>null</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>$.object</code></pre></td>
<td><pre><code>{}</code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>$.[&#39;$schema_location&#39;]</code></pre></td>
<td><pre><code>unknown</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>$.12X12</code></pre></td>
<td><pre><code>image12x12.png</code></pre></td>
</tr>
<tr class="odd">
<td><pre><code>$.array</code></pre></td>
<td><pre><code>[1, 2, [[],[{&quot;inner_id&quot;:6789}]]]</code></pre></td>
</tr>
<tr class="even">
<td><pre><code>$.array[2][1][0].inner_id</code></pre></td>
<td><pre><code>6789</code></pre></td>
</tr>
</tbody>
</table>

You can evaluate a JSONPath expression against a property that contains a JSON payload using [Variables]({{base_path}}/reference/synapse-properties/expressions/#variables).

To evaluate a JSONPath expression against a property, use the following syntax.

```json
json-eval(<scope_of_the_property>:<property_name>.<JSONPath_expression>)
```

Example 1: When the property is in the default scope you can use [$ctx]({{base_path}}/reference/synapse-properties/expressions/#ctx).

```json
json-eval(${properties.propertyName.student.name})
```

Example 2: When the property is in the Axis2 scope you can use [$axis2]({{base_path}}/reference/synapse-properties/expressions/#axis2).

```json
json-eval($axis2:propertyName.student.name)
```

Example 3: When the property is in the transport scope you can use [$trp]({{base_path}}/reference/synapse-properties/expressions/#trp).

```json
json-eval($trp:propertyName.student.name)
```
