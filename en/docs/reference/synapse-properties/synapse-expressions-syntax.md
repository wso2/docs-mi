# Synapse Expressions Syntax

**Synapse Expressions** are identified by the enclosing `${}` syntax. 

```
${expression}
```

By default, Synapse Expressions returns a valid JSON result. When working with XML payloads, we can use the [XPATH]({{base_path}}/reference/synapse-properties/synapse-expressions-syntax/#xpath-functions) function which returns an XML result.

The main building blocks of Synapse Expressions are expressions and parameters.

<a href="{{base_path}}/assets/img/reference/expression_overview.png"><img src="{{base_path}}/assets/img/reference/expression_overview.png" alt="Expression Syntax" width="80%"></a>

Each expression can just be a parameter or an expression which combines multiple parameters.

We can chain the above building blocks to create complex expressions required by integration use cases.

!!! Note
    For the rest of this document, we will refer to the Synapse Expression without the enclosing `${}`.

!!! Note
    We have a dedicated sample in the VSCode extension to demonstrate each of the following sections. You can deploy the sample in Micro Integrator and follow along by invoking the relevant resources to see the results.

## Literals

Literals are constant values that are directly used in the expression.

The following types of literals are supported in Synapse expressions.

<table>
<thead>
<tr class="header">
<th>Literal Type</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>String</td>
<td><pre><code>"Hello World"</code></pre></td>
</tr>
<tr class="even">
<td>Number</td>
<td><pre><code>123.4</code></pre></td>
</tr>
<tr class="odd">
<td>Boolean</td>
<td><pre><code>true</code></pre></td>
</tr>
<tr class="even">
<td>Null</td>
<td><pre><code>null</code></pre></td>
</tr>
</tbody>
</table>

## Accessing values

### Access values in payloads

Synapse expressions allow direct access to payload content using the `payload` or the `$` prefix.
```
payload.students
$.orders
payload.user["first name"]
```

!!! Note
    Use the bracket notation `["first name"]` when the key contains spaces, special characters, or reserved words.

### Access variables

Variables defined using the variable mediator, are accessed using the `vars` prefix.
```
vars.name
vars.totalPrice
vars["last name"]
```

### Access transport headers

Transport headers can be accessed using the `headers` prefix.
```
headers.Host
headers["Content-Type"]
```

### Access properties

Properties scoped to Synapse or Axis2 can be retrieved using the `properties` or `props` (shortened) prefix.
```
props.synapse.propertyName
properties.axis2.propertyName
```

### Access query and path parameters

Query and path parameters are available through the `params` prefix.
```
params.queryParams.queryParamName
params.pathParams.pathParamName
```

### Access function parameters

Function parameters used in templates are available through the params prefix.
```
params.functionParams.paramName
```

### Access config parameters

Config parameters are accessed via the `configs` prefix with the property name.
```
configs.configName
```

For more information about Config parameters, see [Injecting Parameters]({{base_path}}/develop/injecting-parameters/).

## Operators

Synapse expressions support arithmetic, comparison, and logical operators between operands.

### Arithmetic operators

Addition (`+`), subtraction (`-`), multiplication (`*`), division (`/`), and modulus (`%`) operators are supported between operands.

``` 
vars.num1 + vars.num2
vars.num1 - vars.num2
vars.num1 * vars.num2
vars.num1 / vars.num2
vars.num1 % vars.num2
```

### Comparison operators

Greater than (`>`), less than (`<`), greater than or equal to (`>=`), less than or equal to (`<=`), equal to (`==`), and not equal to (`!=`) operators are supported between operands.

```
vars.num1 > vars.num2
vars.num1 < vars.num2
vars.num1 >= vars.num2
vars.num1 <= vars.num2
vars.num1 == vars.num2
vars.num1 != vars.num2
```

### Logical operators

Logical AND (`&&`) and Logical OR (`||`) operators are supported between operands.

```
vars.boolValue1 and vars.boolValue2
vars.boolValue1 && vars.boolValue2
vars.boolValue1 or vars.boolValue2
vars.boolValue1 || vars.boolValue2
```

When using operators, it's possible to use brackets to group expressions and enforce precedence.

```
(vars.num1 + vars.num2) * vars.num3
vars.boolValue1 && (vars.boolValue2 || vars.boolValue3)
(vars.num1 + 5) > vars.num2 && (vars.num3 - 3) < vars.num4
```

## Conditional expressions

Synapse Expressions support conditional expressions using the ternary operator with the following syntax.

```
conditional expression ? true expression : false expression
```

Here, true expression will be evaluated if the conditional expression is true, otherwise, the false expression will be evaluated.

Example usage:

```
vars.age > 18 ? "Adult" : "Child"
vars.num1 > vars.num2 ? vars.num1 : vars.num2  
```

## Filter expressions

Filter expressions are used to filter arrays based on a condition. The filter expression is enclosed within square brackets and the condition is specified within the brackets.

!!! Note
    Filter expressions have the same syntax as JSONPath filter expressions (with the added functionality of injecting parameters using access expressions) and internally also use the JSONPath engine to evaluate the filter expression.

Example usage:

Selects users with age greater than or equal to 18:

```
payload.users[?(@.age >= 18)]
```

Selects users with age greater than or equal to the value of the `minAge` variable:

```
payload.users[?(@.age >= vars.minAge)]
```

## Functions

Synapse Expressions support a wide range of functions that are essential for integration use cases.

### String functions

The following functions are applicable when the value is a string.

<table>
<thead>
<tr class="header">
<th>Function Name</th>
<th>Syntax</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>length</code></pre></td>
<td><pre><code>length("text")
length(payload.array)</code></pre></td>
<td>Returns the length of the string if the input is a string. Returns the length of the array if the input is a JSON array.</td>
</tr>
<tr class="even">
<td><pre><code>toUpper</code></pre></td>
<td><pre><code>toUpper("text")
toUpper(payload.value)</code></pre></td>
<td>Converts the provided string to uppercase.</td>
</tr>
<tr class="odd">
<td><pre><code>toLower</code></pre></td>
<td><pre><code>toLower("TEXT")
toLower(payload.value)</code></pre></td>
<td>Converts the provided string to lowercase.</td>
</tr>
<tr class="even">
<td><pre><code>subString</code></pre></td>
<td><pre><code>subString(payload.value, 2)
subString("text", 0, 2)</code></pre></td>
<td>Extracts a substring from the input string starting from the specified index.
Specify an end index as third parameter to extract up to that position.</td>
</tr>
<tr class="odd">
<td><pre><code>startsWith</code></pre></td>
<td><pre><code>startsWith("text", "te")
startsWith(payload.value, "start")</code></pre></td>
<td>Checks if the string starts with the specified prefix.</td>
</tr>
<tr class="even">
<td><pre><code>endsWith</code></pre></td>
<td><pre><code>endsWith("text", "xt")
endsWith(payload.value, "end")</code></pre></td>
<td>Checks if the string ends with the specified suffix.</td>
</tr>
<tr class="odd">
<td><pre><code>contains</code></pre></td>
<td><pre><code>contains("text", "e")
contains(payload.value, "substring")</code></pre></td>
<td>Checks if the string contains the specified substring.</td>
</tr>
<tr class="even">
<td><pre><code>trim</code></pre></td>
<td><pre><code>trim("  text  ")
trim(payload.value)</code></pre></td>
<td>Removes leading and trailing whitespace from the string.</td>
</tr>
<tr class="odd">
<td><pre><code>replace</code></pre></td>
<td><pre><code>replace("text", "t", "r")
replace(payload.value, "old", "new")</code></pre></td>
<td>Replaces all occurrences of the specified old value with the new value in the string.</td>
</tr>
<tr class="even">
<td><pre><code>split</code></pre></td>
<td><pre><code>split("a,b,c", ",")
split(payload.value, ";")</code></pre></td>
<td>Splits the string into an array using the specified delimiter.</td>
</tr>
<tr class="odd">
<td><pre><code>charAt</code></pre></td>
<td><pre><code>charAt("text", 1)
charAt(payload.value, 3)</code></pre></td>
<td>Returns the character at the specified index in the string.</td>
</tr>
<tr class="even">
<td><pre><code>indexOf</code></pre></td>
<td><pre><code>indexOf("text", "e")
indexOf(payload.value, "text", 5)</code></pre></td>
<td>Returns the position of the first occurrence of the specified input in the string.
Specify a starting index as the third parameter (indexOf search begins after this position).</td>
</tr>
</tbody>
</table>

### Numerical functions

The following functions are applicable when the value is a number.

<table>
<thead>
<tr class="header">
<th>Function Name</th>
<th>Syntax</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>abs</code></pre></td>
<td><pre><code>abs(-5)
abs(payload.value)</code></pre></td>
<td>Returns the absolute value of the input.</td>
</tr>
<tr class="even">
<td><pre><code>floor</code></pre></td>
<td><pre><code>floor(3.7)
floor(payload.value)</code></pre></td>
<td>Returns the largest integer less than or equal to the input value.</td>
</tr>
<tr class="odd">
<td><pre><code>ceil</code></pre></td>
<td><pre><code>ceil(3.2)
ceil(payload.value)</code></pre></td>
<td>Returns the smallest integer greater than or equal to the input value.</td>
</tr>
<tr class="even">
<td><pre><code>sqrt</code></pre></td>
<td><pre><code>sqrt(16)
sqrt(payload.value)</code></pre></td>
<td>Returns the square root of the input value.</td>
</tr>
<tr class="odd">
<td><pre><code>log</code></pre></td>
<td><pre><code>log(10)
log(payload.value)</code></pre></td>
<td>Returns the natural logarithm (base e) of the input value.</td>
</tr>
<tr class="even">
<td><pre><code>pow</code></pre></td>
<td><pre><code>pow(2, 3)
pow(payload.base, payload.exponent)</code></pre></td>
<td>Returns the result of raising the base to the power of the exponent.</td>
</tr>
<tr class="odd">
<td><pre><code>round</code></pre></td>
<td><pre><code>round(2.7543)
round(2.7543, 2)
round(payload.value, payload.decimalPlaces)</code></pre></td>
<td>Round the number to the given decimal places</td>
</tr>
</tbody>
</table>


### Encode and decode functions

Synapse expressions provide XPath functions to encode and decode strings.

<table>
<thead>
<tr class="header">
<th>Function Name</th>
<th>Syntax</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>base64encode</code></pre></td>
<td><pre><code>base64encode("text")
base64encode(payload.value, "ISO-8859-1")</code></pre></td>
<td>Encodes the input value using Base64 encoding.
Encodes the input value using Base64 encoding with the specified character set.</td>
</tr>
<tr class="even">
<td><pre><code>base64decode</code></pre></td>
<td><pre><code>base64decode("dGV4dA==")
base64decode(payload.encodedValue)</code></pre></td>
<td>Decodes a Base64-encoded value to its original form.</td>
</tr>
<tr class="odd">
<td><pre><code>urlEncode</code></pre></td>
<td><pre><code>urlEncode("text with spaces")
urlEncode(payload.value)</code></pre></td>
<td>Encodes a string to make it safe for inclusion in a URL.</td>
</tr>
<tr class="even">
<td><pre><code>urlDecode</code></pre></td>
<td><pre><code>urlDecode("text%20with%20spaces")
urlDecode(payload.value)</code></pre></td>
<td>Decodes a URL-encoded string to its original form.</td>
</tr>
</tbody>
</table>

### Type checking functions

Synapse Expressions include the following type checks to validate the type of the input value before evaluating expressions on them.

<table>
<thead>
<tr class="header">
<th>Function Name</th>
<th>Syntax</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>isNumber</code></pre></td>
<td><pre><code>isNumber(payload.value)</code></pre></td>
<td>Checks if the input value is a number.</td>
</tr>
<tr class="even">
<td><pre><code>isString</code></pre></td>
<td><pre><code>isString(payload.value)</code></pre></td>
<td>Checks if the input value is a string.</td>
</tr>
<tr class="odd">
<td><pre><code>isArray</code></pre></td>
<td><pre><code>isArray(payload.array)</code></pre></td>
<td>Checks if the input value is an array.</td>
</tr>
<tr class="even">
<td><pre><code>isObject</code></pre></td>
<td><pre><code>isObject(payload.object)</code></pre></td>
<td>Checks if the input value is an object.</td>
</tr>
</tbody>
</table>


### Type conversion functions

Synapse Expressions include the following type conversion functions to convert the input value to the specified type.

<table>
<thead>
<tr class="header">
<th>Function Name</th>
<th>Syntax</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>integer</code></pre></td>
<td><pre><code>integer(payload.value)</code></pre></td>
<td>Converts the input value to an integer.</td>
</tr>
<tr class="even">
<td><pre><code>float</code></pre></td>
<td><pre><code>float(payload.value)</code></pre></td>
<td>Converts the input value to a floating-point number.</td>
</tr>
<tr class="odd">
<td><pre><code>string</code></pre></td>
<td><pre><code>string(payload.value)</code></pre></td>
<td>Converts the input value to a string.</td>
</tr>
<tr class="even">
<td><pre><code>boolean</code></pre></td>
<td><pre><code>boolean(payload.value)</code></pre></td>
<td>Converts the input value to a boolean.</td>
</tr>
<tr class="odd">
<td><pre><code>object</code></pre></td>
<td><pre><code>object(payload.value)</code></pre></td>
<td>Converts the string representation of a JSON object to a JSON object.
After conversion, JSONPath syntax can be used to access the object. For example, <code>object(value).students..*</code></td>
</tr>
<tr class="even">
<td><pre><code>array</code></pre></td>
<td><pre><code>array(payload.value)</code></pre></td>
<td>Converts the string representation of a JSON array to a JSON array.
After conversion, JSONPath syntax can be used to access the array. For example, <code>array(value)[3].name<code></td>
</tr>
</tbody>
</table>

### Registry functions

Synapse expressions include the following functions to access registry content and registry properties.

<table>
<thead>
<tr class="header">
<th>Syntax</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>registry("gov:/config/service")
registry(payload.path)</code></pre></td>
<td>Accesses the registry value at the specified path.</td>
</tr>
<tr class="even">
<td><pre><code>registry("gov:/config/service").property("key")
registry(payload.path).property("key")</code></pre></td>
<td>Accesses the registry property at the specified path with the provided key.</td>
</tr>
<tr class="odd">
<td><pre><code>registry("gov:/config/resource").student.name
registry(payload.path).student.name</code></pre></td>
<td>Accesses the JSON payload inside the registry resource at the specified path.
Supported only for JSON resources in registry.</td>
</tr>
</tbody>
</table>

### Date time functions

Synapse expressions include the following functions to work with date and time.

<table>
<thead>
<tr class="header">
<th>Function Name</th>
<th>Syntax</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>now</code></pre></td>
<td><pre><code>now()</code></pre></td>
<td>Returns the current time in milliseconds since the Unix epoch.</td>
</tr>
<tr class="even">
<td><pre><code>formatDateTime</code></pre></td>
<td><pre><code>formatDateTime("29-09-1988", "dd-MM-yyyy", "yyyy MMM dd")
formatDateTime(now(), "yyyy-MM-dd")</code></pre></td>
<td>Transforms the input date/time from the specified old format to the new format.
Accepts string inputs or results from <code>now()</code>.</td>
</tr>
</tbody>
</table>

### Fetch secrets

Synapse expressions can be used to fetch secrets from the default secure-vault and the hashicorp vault.

Syntax for fetching secrets:
```
secret('alias')
hashicorp-vault('pathName','fieldName')
hashicorp-vault('namespace', 'pathname','fieldname')
```

Example usage:
```
<variable name="password" expression="${secret('mysqlpassword')}"/>
```

### Check exists function

Synapse Expressions include the following function to check if a property exists.

Syntax for checking if a property exists:
```
exists(value)
```

Example usage:
```
<variable name="var1" expression="${exists('vars.notMandatoryProperty') ? vars.notMandatoryProperty : 'default' }"/>
```

### Invert function

Not function can be used to invert a boolean value.

Syntax for inverting a boolean value:
```
not(value)
```

Example usage:
```
<variable name="var1" expression="${not(payload.booleanValue)}"/>
```

### XPath functions

Synapse expressions provide XPath functions to work with XML payloads.

Syntax for calling an XPath function without namespaces:

```
xpath(expression)
```

Example usage: Calling an XPath function without namespaces:
```
<variable name="StudentName" expression="${xpath('//student/text()')}"/>
```

Example usage: Calling an XPath function with namespaces:
```
<variable name="Width" expression="${xpath('//a:parent/b:child/a:value/text()')}" xmlns:a="http://namespaceA.com" xmlns:b="http://namespaceB.com"/>
```

Syntax for calling an XPath function on a variable:

```
xpath(expression, 'variable-name')
```

Example usage:
```
<variable name="StudentName" expression="${xpath('//student/text()', 'Students')}"/>
```

## Reserved keywords

The following keywords are reserved in Synapse expressions and cannot be used in value access expressions with dot notation. Instead, use the bracket notation.

<table>
<thead></thead>
<tbody>
<tr class="odd">
<td>contains</td>
<td>in</td>
<td>nin</td>
<td>subsetof</td>
</tr>
<tr class="even">
<td>size</td>
<td>empty</td>
<td>empty true</td>
<td>empty false</td>
</tr>
</tbody>
</table>

## Best practices

SynapsePath provides a fault tolerance design which avoids disruptive failures. In case of an error in a complex expression, it fails in the first evaluation without propagating the invalid result to the rest of the evaluation steps.

For example:
```
45 == (  $["null"] ? vars.num1 : vars.num2)
```

When we evaluate the above expression, it will try to parse the value of `$["null"]` to a boolean. If its true it will compare 45 with `vars.num1`, otherwise it will compare 45 with `vars.num2`. If `$["null"]` is not a boolean, the evaluation will not throw any exceptions, but will return an empty result.

We need to carefully handle these empty results, when the data we take as inputs are not guaranteed to be valid.

### Check for null values

When accessing values from a JSON payload, it is important to check for null values before performing operations on them.

```
vars.num1 == null ? vars.num2 : vars.num1
"Hello " +  ( exists($.student.lastName) ? $.student.firstName + " " +  $.student.lastName : $.student.firstName )
```

### Use brackets for complex expressions

When using multiple operators in an expression, it is recommended to use brackets to group expressions and enforce precedence.

```
(vars.num1 + vars.num2) * vars.num3
```

### Check data types

When performing operations on values, it is important to check the data type of the values to avoid unexpected results.

```
isNumber(vars.num1) ? vars.num1 * 2 : 0
```

### Check expression results

As described above, Synapse expressions return an empty result if an error occurs during evaluation. Therefore, it is important to check for empty values before proceeding with further operations.
