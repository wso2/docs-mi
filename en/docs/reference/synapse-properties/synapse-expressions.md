# Synapse Expressions

## Overview

Synapse Expressions are powerful expressions designed to streamline the handling of JSON payloads. Handling of XML payloads is also supported using a dedicated function to evaluate XPath expressions.

Since JSONPath is limited to extracting JSON content only, it's necessary to use XPath to perform additional operations on the extracted data (for example, addition and substring extraction). Synapse Expressions address this limitation by enabling direct operations on JSON payloads, eliminating the need for complex workarounds.

Furthermore, Synapse Expressions provide a unified syntax to access a wide range of system elements, including properties, variables, configurations, headers, registry content, secrets, and parameters. This cohesive approach simplifies development, making it significantly more efficient and user-friendly for developers.

## Syntax

The syntax for Synapse Expressions is as follows:

```
${expression}
```

Here, the expression can be a combination of literals, value access expressions, operators, filter expressions, conditional expressions, and functions.

Example usage:

```
<log level="custom">
    <property name="Greeting" expression="${'Hello ' + payload.student.name}"/>
</log>
```

!!! Note
    For the rest of this document, we will refer to the Synapse Expression using the expression only. When using the expression, the expression should be enclosed within `${}`.

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

## Value access expressions

### Access values in payloads

Synapse expressions allow direct access to payload content using the payload or the `$` prefix.
```
payload.students
$.orders
payload.user["first name"]
```

!!! Note
    Use the bracket notation `["first name"]` when the key contains spaces, special characters, or reserved words.

### Access variables

Variables defined using the variable mediator, are accessed using the `var` prefix.
```
var.name
var.totalPrice
var["last name"]
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
params.queryParams.parameterName
params.uriParams.pathName
```

### Access function parameters

Function parameters used in templates are available through the params prefix.
```
params.functionParams.paramName
```

## Operators

Synapse expressions support arithmetic, comparison, and logical operators between operands.

### Arithmetic operators

Addition (`+`), subtraction (`-`), multiplication (`*`), division (`/`), and modulus (`%`) operators are supported between operands.

``` 
var.num1 + var.num2
var.num1 - var.num2
var.num1 * var.num2
var.num1 / var.num2
var.num1 % var.num2
```

### Comparison operators

Greater than (`>`), less than (`<`), greater than or equal to (`>=`), less than or equal to (`<=`), equal to (`==`), and not equal to (`!=`) operators are supported between operands.

```
var.num1 > var.num2
var.num1 < var.num2
var.num1 >= var.num2
var.num1 <= var.num2
var.num1 == var.num2
var.num1 != var.num2
```

### Logical operators

Logical AND (`&&`) and Logical OR (`||`) operators are supported between operands.

```
var.boolValue1 and var.boolValue2
var.boolValue1 && var.boolValue2
var.boolValue1 or var.boolValue2
var.boolValue1 || var.boolValue2
```

When using operators, it's possible to use brackets to group expressions and enforce precedence.

```
(var.num1 + var.num2) * var.num3
var.boolValue1 && (var.boolValue2 || var.boolValue3)
(var.num1 + 5) > var.num2 && (var.num3 - 3) < var.num4
```

## Conditional expressions

Synapse Expressions support conditional expressions using the ternary operator with the following syntax.

```
conditional expression ? true expression : false expression
```

Here, true expression will be evaluated if the conditional expression is true, otherwise, the false expression will be evaluated.

Example usage:

```
var.age > 18 ? "Adult" : "Child"
var.num1 > var.num2 ? var.num1 : var.num2  
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
payload.users[?(@.age >= var.minAge)]
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
indexOf(payload.value, "search", 5)</code></pre></td>
<td>Returns the position of the first occurrence of the specified input in the string.
Specify a starting index as the third parameter for the search.</td>
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

Synapse expressions can be used to fetch secrets from the secure-vault.

Syntax for fetching secrets:
```
secret(alias)
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
<variable name="var1" expression="${exists('var.notMandatoryProperty') ? var.notMandatoryProperty : 'default' }"/>
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
<td>size</td>
</tr>
<tr class="even">
<td>empty</td>
<td>empty true</td>
<td>empty false</td>
<td>var</td>
<td>payload</td>
</tr>
<tr class="odd">
<td>headers</td>
<td>config</td>
<td>properties</td>
<td>props</td>
<td>params</td>
</tr>
</tbody>
</table>

## Best practices

SynapsePath provides a fault tolerance design which avoids disruptive failures. In case of an error in a complex expression, it fails in the first evaluation without propagating the invalid result to the rest of the evaluation steps.

For example:
```
45 == (  $["null"] ? var.num1 : var.num2)
```
 
If you want to evaluate the above expression, evaluate the conditional expression part first. Then, with that result, you can check the equality condition with 45. Here, if `$[“null”]` is a null value, the conditional expression fails and exits the evaluation, returning an empty result without evaluating the rest of the expression.

### Check for null values

When accessing values from a JSON payload, it is important to check for null values before performing operations on them.

```
var.num1 == null ? var.num2 : var.num1
"Hello " +  ( exists($.student.lastName) ? $.student.firstName + " " +  $.student.lastName : $.student.firstName )
```

### Use brackets for complex expressions

When using multiple operators in an expression, it is recommended to use brackets to group expressions and enforce precedence.

```
(var.num1 + var.num2) * var.num3
```

### Check data types

When performing operations on values, it is important to check the data type of the values to avoid unexpected results.

```
isNumber(var.num1) ? var.num1 * 2 : 0
```

### Check expression results

As described above, Synapse expressions return an empty result if an error occurs during evaluation. Therefore, it is important to check for empty values before proceeding with further operations.

## Example

The following example demonstrates the usage of Synapse Expressions in a simple scenario.

```
<?xml version="1.0" encoding="UTF-8"?>
<api context="/test" name="SynapseExpressionTestAPI" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="GET POST" uri-template="/{name}?age={age}&amp;category={category}">
        <inSequence>
            <variable name="name" expression="${params.uriParams.name}" type="STRING"/>
            <variable name="age" expression="${integer(params.queryParams.age)}" type="INTEGER"/>
            <variable name="category" expression="${params.queryParams.category}" type="STRING"/>
            <variable name="booksOnCategory" expression="${payload..book[?(@.category==var.category)]}}"/>
            <variable name="expensive" expression="${payload..book[?(@.category==var.category &amp;&amp; @.price > payload.expensive)].title}"/>
            <log>
                <message>
Today is ${formatDateTime(now(), "yyyy-MMM-dd")}
Hello "${var.name}", you are ${var.age > 18 ? "eligible" : "not eligible"} to vote.
We found ${length(var.booksOnCategory)} book(s) on your favourite category "${var.category}".
${var.booksOnCategory[*].title}
${length(var.expensive) > 0 ? "We found " + string(length(var.expensive)) + " expensive book(s) according to your margin" : "All the books above are not expensive according to your margin"}
${length(var.expensive) > 0 ? var.expensive : ""}
                </message>
            </log>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
</api>
```

Invoke the API with the following request:

```curl
curl --location 'http://localhost:8290/test/john?age=3&category=fiction' \
--header 'Content-Type: application/json' \
--data '{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Herman Melville",
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      {
        "category": "fiction",
        "author": "J.R.R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      },
      {
        "category": "fiction",
        "author": "Harper Lee",
        "title": "To Kill a Mockingbird",
        "price": 10.99
      },
      {
        "category": "fiction",
        "author": "George Orwell",
        "title": "Animal Farm",
        "price": 7.99
      },
      {
        "category": "biography",
        "author": "Anne Frank",
        "title": "The Diary of a Young Girl",
        "price": 6.99
      }
    ]
  },
  "expensive": 10
}
```

You will get a similar log to the following in the server. 

You can try out different query parameters to get different results.

```
Today is 2024-Dec-05
Hello "john", you are not eligible to vote.
We found 4 book(s) on your favourite category "fiction".
["Moby Dick","The Lord of the Rings","To Kill a Mockingbird","Animal Farm"]
we found 2 expensive book(s) according to your margin
["The Lord of the Rings","To Kill a Mockingbird"]
```