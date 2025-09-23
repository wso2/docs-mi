# Comparison with JSONPath

## Single line expression vs. multiple JSONPath evaluations

In the following example, we are implementing a simple use case to compare **JSONPath** with **Synapse Expressions**.

Suppose we have the following customer orders payload coming in the request. We have a new promotion for customers who have placed more than 3 orders with each total greater than 100.

```json
{
    "orders": [
        {
            "orderId": "ORD001",
            "customerID": "CUST123",
            "total": 150.00,
            "date": "2025-01-20"
        },
        {
            "orderId": "ORD002",
            "customerID": "CUST123",
            "total": 250.00,
            "date": "2025-01-22"
        },
        {
            "orderId": "ORD003",
            "customerID": "CUST456",
            "total": 300.00,
            "date": "2025-01-25"
        },
        {
            "orderId": "ORD004",
            "customerID": "CUST123",
            "total": 80.00,
            "date": "2025-01-26"
        },
        {
            "orderId": "ORD005",
            "customerID": "CUST123",
            "total": 120.00,
            "date": "2025-01-27"
        },
        {
            "orderId": "ORD006",
            "customerID": "CUST456",
            "total": 330.00,
            "date": "2025-01-28"
        }
    ]
}
```
Now, we need to develop an API to check if a given customer (for example: `CUST123`) is eligible for the promotion.

In the following API, we have two resources to check the eligibility of the customer for the promotion. The first resource uses Synapse Expressions and the second resource uses JSONPath expressions.
```
<?xml version="1.0" encoding="UTF-8"?>
<api context="/promotion" name="promotionCheck" xmlns="http://ws.apache.org/ns/synapse">
    <resource methods="POST" uri-template="/new?minimumBillAmount={minimumBillAmount}">
        <inSequence>
            <variable name="customerId" type="STRING" value="CUST123"/>
            <variable name="isEligible" type="STRING" expression="${length($.orders[?(@.customerID==vars.customerId &amp;&amp; @.total &gt; params.queryParams.minimumBillAmount)]) &gt; configs.promo_bill_count ? 'eligible' : 'not eligible'}"/>
            <log>
                <message>${vars.isEligible}</message>
            </log>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
    <resource methods="POST" uri-template="/old?minimumBillAmount={minimumBillAmount}&amp;promoBillCount={promoBillCount}">
        <inSequence>
            <property name="customerId" type="STRING" value="CUST123"/>
            <property name="billCount" type="STRING" expression="${properties.query.param.promoBillCount}"/>
            <property name="billAmount" type="INTEGER" expression="${properties.query.param.minimumBillAmount}"/>
            <property name="filterResult" type="JSON" expression="${payload.orders[?(@.customerID=='{${properties.customerId}}' &amp;&amp; @.total &gt; {${properties.billAmount}}}])"/>
            <property name="filterLength" type="STRING" expression="json-eval(${properties.filterResult.length}())"/>
            <filter source="${properties.filterLength} > ${properties.billCount}" regex="true">
                <then>
                    <log>
                        <property name="result" value="eligible"/>
                    </log>
                </then>
                <else>
                    <log>
                        <property name="result" value="not eligible"/>
                    </log>
                </else>
            </filter>
        </inSequence>
        <faultSequence>
        </faultSequence>
    </resource>
</api>
```

!!! Note
    This promotion eligibility check API is included in the **Synapse Expressions** sample in the VSCode extension.

### Explanation

In the first resource, we are using the following single-line Synapse Expression to check the eligibility.
```
length($.orders[?(@.customerID == vars.customerId && @.total > params.queryParams.minimumBillAmount)]) > configs.promoEligibilityCount ? "Eligible" : "Not eligible"
```
Breaking down the expression:

<a href="{{base_path}}/assets/img/reference/complex_expression.png"><img src="{{base_path}}/assets/img/reference/complex_expression.png" alt="Expression Breakdown" width="100%"></a>

In the second resource, we are using JSONPath expressions to achieve the same functionality.

There, we have to use multiple variables to store intermediate results. Also, we have to use XPath functions for the length comparison in the filter mediator.

Hence, the **Synapse Expressions** provides a more concise and readable way to achieve the same functionality. As a bonus, it provides a better performance due to minimal evaluations.

## Performance comparison

We conducted a performance test to compare the execution time of the two resources. The test was conducted with 50 and 100 concurrent threads invoking the API for an extended amount of time.

The following chart shows the performance comparison between the two cases.

<a href="{{base_path}}/assets/img/reference/performance_chart.png"><img src="{{base_path}}/assets/img/reference/performance_chart.png" alt="Performance" width="60%"></a>

You can download the performance test artifacts from <a href="{{base_path}}/assets/attachments/reference/performance-test-artifacts.zip">here</a>, to reproduce the test results.