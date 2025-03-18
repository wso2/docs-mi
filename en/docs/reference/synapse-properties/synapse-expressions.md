# Expressions

## Overview

**Synapse Expressions** is a powerful, single-line expression type designed to overcome the limitations in JSONPath expressions.

While JSONPath effectively extracts JSON content, it falls short when additional data manipulations are required. Typically, developers have to switch to XPath to perform mathematical and string manipulations on the extracted data.

**Synapse Expressions** fixes these issues by enabling arithmetic, logical and comparison operations on data. Apart from payload contents, it can extract data from a broad spectrum of elements, including properties, variables, configurations, headers, registry content, secrets and parameters. 

Also, it provides a rich set of functions to manipulate the data, such as string, math, date/time, and type-check and type-convert functions.

## Features

- **Single-line expressions**: Perform complex operations in a single line. (See [comparison]({{base_path}}/reference/synapse-properties/synapse-expressions-comparison/#single-line-expression-vs-multiple-jsonpath-evaluations) for a detailed explanation.)
- **Access to system elements**: Access properties, variables, configurations, headers, registry content, secrets, and parameters. (See [accessing values]({{base_path}}/reference/synapse-properties/synapse-expressions-syntax/#accessing-values) section in the syntax guide.)
- **Rich set of functions**: Manipulate data using string, math, date-time, and many other misc functions. (See [functions]({{base_path}}/reference/synapse-properties/synapse-expressions-syntax/#functions) section in the syntax guide.)
- **Performance**: Yield faster results compared to the same implementation done using JSONPath and Xpath expressions. (See [comparison]({{base_path}}/reference/synapse-properties/synapse-expressions-comparison#performance-comparison) for performance test results.)

## Usage

Synapse expressions can be used in the following places:

```
<!--Usage for templating in log and payload mediators-->
<log category="INFO">
    <message>Hello ${payload.user.name}</message>
</log>

<payloadFactory  media-type="json" template-type="default">
    <format>{ "Hello" : "${payload.name}" }</format>
</payloadFactory

<!--Usage in mediators where it accepts expressions-->
<variable name="age" type="INTEGER" expression="${payload.user.age}"/>

<!--Usage in connectors-->
<http.init>
    <connectionType>HTTPS</connectionType>
    <baseUrl>{${payload.url}}</baseUrl>
    ...
```

## Tooling support

In places where the Synapse Expressions can be used, the tooling support is provided to assist the user in writing the expressions. 

<a href="{{base_path}}/assets/img/reference/VSCode_expression_support.gif"><img src="{{base_path}}/assets/img/reference/VSCode_expression_support.gif" alt="Expression Syntax" width="80%"></a>

```
