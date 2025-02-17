# Synapse Expressions Sample

This sample contains a REST API that demonstrates the use of **Synapse Expressions** in WSO2 Micro Integrator.

The API have the following resources dedicated to explain different usages of Synapse Expressions.

1.  Literal values
2.  Accessing values from payloads, variables, properties etc.
3.  Operators
4.  Conditional expressions
5.  Filter expressions
6.  Functions
7.  XPath expressions

!!! note
    Above sections are explained in detail in the [Synapse Expressions Syntax]({{base_path}}/reference/synapse-properties/synapse-expressions-syntax) guide.

## Deploying the sample

1.  Open the sample by clicking on the **Synapse Expressions** card.
2.  Give a folder location to save the sample.
3.  [Build and run]({{base_path}}/develop/deploy-artifacts#build-and-run) the sample in your Micro Integrator.

## Invoking the sample

You can download the **Postman collection** for this sample from <a href="{{base_path}}/assets/attachments/learn/synapse_expressions_postman_collection.json" download="SynapseExpressions.postman_collection.json">here.</a>

### Literal values

If you are using the Postman collection, you can invoke the **Literals** resource.

If you are using cURL, you can invoke the API using the following command.

```shell
curl --location 'http://localhost:8290/test/literals'
```

You will get the following output in the server console.

```
Literal values in Synapse Expressions
Hello World
2025
true
```

### Accessing values from payloads, variables, properties etc.

If you are using the Postman collection, you can invoke the **Accessing values** resource.

If you are using cURL, you can invoke the API using the following command.

```
curl --location 'http://localhost:8290/test/accessingValues/books?qParamKey=fiction' \
--header 'Content-Type: application/json' \
--data '{
    "books": [
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
        }
    ]
}'
```

You will get a console output similar to follows

```
Accessing values in Synapse Expressions
Access paylod values : ["Moby Dick","The Lord of the Rings","To Kill a Mockingbird","Animal Farm"]
Access variable : [8.99,22.99,10.99,7.99]
Access headers : application/json
...
```

### Operators

If you are using the Postman collection, you can invoke the **Operators** resource.

If you are using cURL, you can invoke the API using the following command.

```
curl --location 'http://localhost:8290/test/operators' \
--header 'Content-Type: application/json' \
--data '{
    "num1" : 10,
    "num2" : 5,
    "num3" : -2,
    "num4" : 6
}'
```

You will get a console output similar to follows

```
Operations in Synapse Expressions

Arithmetic Operations
Addition : 15
Subtraction : 5
Multiplication : -20
...
```

### Conditional expressions

If you are using the Postman collection, you can invoke the **Conditional** resource.

If you are using cURL, you can invoke the API using the following command

```
curl --location 'http://localhost:8290/test/conditional' \
--header 'Content-Type: application/json' \
--data '{
    "age" : 17
}'
```

You will get the following output in the server console.

```
Conditional Expressions
Child
```

### Filter expressions

If you are using the Postman collection, you can invoke the **Filters** resource.

If you are using cURL, you can invoke the API using the following command

```
curl --location 'http://localhost:8290/test/filters' \
--header 'Content-Type: application/json' \
--data '{
    "store": {
      "books": [
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
    "expensive": 20
  }
'
```

You will get the following output in the server console.

```
Filter Expressions
Filter books of category 'biography' : [{"category":"biography","author":"Anne Frank","title":"The Diary of a Young Girl","price":6.99}]
Filter expensive books : [{"category":"fiction","author":"J.R.R. Tolkien","title":"The Lord of the Rings","isbn":"0-395-19395-8","price":22.99}]
```

### Functions

If you are using the Postman collection, you can invoke the **Functions** resource.

If you are using cURL, you can invoke the API using the following command

```
curl --location 'http://localhost:8290/test/functions' \
--header 'Content-Type: application/json' \
--data '{
    "text" : "Hello World",
    "trimText" :"     Hello    ",
    "num1" : -2.6,
    "num2" : 1.2345,
    "num3" : 100,
    "encoded" : "SGVsbG8gV29ybGQ=",
    "url" : "search?query=hello world&category=books&sort=price&page=1",
    "encodedURL" : "https://example.com/search?query=hello%20world&category=books&sort=price&page=1",
    "array" : [1,2,3],
    "object" : "{\"a\":\"b\"}",
    "convert_int" : "123",
    "convert_float" : "3.14",
    "convert_boolean" : "true",
    "convert_array" : "[1,\"Hello\",true]"
}'
```

You will get a console output similar to follows

```
Functions in Synapse Expressions

String functions
Length : 11
Upper case : HELLO WORLD
Lower case : hello world
Substring :  World , llo 
```

### XPath expressions

If you are using the Postman collection, you can invoke the **XPath** resource.

If you are using cURL, you can invoke the API using the following command

```
curl --location 'http://localhost:8290/test/xpath' \
--header 'Content-Type: application/xml' \
--data '<?xml version="1.0" encoding="UTF-8"?>
<root xmlns:a="http://namespaceA.com" xmlns:b="http://namespaceB.com">
    <a:parent>
        <b:child>
            <a:value>Value1</a:value>
        </b:child>
    </a:parent>
</root>'
```

You will get the following output in the server console.

```
XPATH functions
Accessing XML elements with namespaces : Value1
```
