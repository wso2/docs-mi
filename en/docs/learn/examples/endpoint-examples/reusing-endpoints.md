# How to Reuse Endpoints

## Use indirect endpoints

In the following [Send
mediator]({{base_path}}/reference/mediators/send-mediator)
configuration, the `         PersonInfoEpr        ` key refers to a
specific endpoint configured.

```
<send>
   <endpoint key="PersonInfoEpr"/>
</send>
```

## Use resolving endpoints

!!! Info
	The [XPath expression]({{base_path}}/reference/synapse-properties/xpath-expressions) specified in a Resolving endpoint configuration derives an existing endpoint rather than the URL of the endpoint to which the message is sent. To derive the endpoint URL to which the message is sent via an XPath expression, use the **Header** mediator.

In the following [Send
mediator]({{base_path}}/reference/mediators/send-mediator)
configuration, the endpoint to which the message is sent is determined
by the `         ${properties.Mail}        ` expression.

```
<send>
  <endpoint key-expression="${properties.Mail}"/>
</send>
```
