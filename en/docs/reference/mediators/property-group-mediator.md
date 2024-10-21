# Property Group Mediator

The Property Group mediator is similar to the [Property Mediator]({{base_path}}/reference/mediators/property-mediator). It sets or removes properties on the message in a mediation flow. However, unlike the Property mediator, the Property Group mediator can have multiple properties as a group. This allows you to group multiple property actions (set or remove) into a single mediator, improving the readability and manageability of complex mediation sequences.

## Syntax

```
<propertyGroup>
    (property)+
</propertyGroup>
```

## Configuration

The Property Group mediator configuration includes a description and a set of properties grouped together.

To add a new property, click the **+ Add Parameter** text button. To arrange the properties in the required order within the property
group configuration, you can drag and drop the properties in the desired order. To remove a property, click the delete icon next to the property.
See the [Property mediator]({{base_path}}/reference/mediators/property-mediator/#configuration) documentation for more information on how to configure a property.

You can also add a description to the property group as below. 

`<propertyGroup description="A group of properties to include in the greeting message">`

## Example

The following Property Group mediator configuration adds the `From`, `Message`, and `To` properties to the message. It also removes
the `MessageID` property from the message. All four properties are configured together as a group.

``` xml
<propertyGroup description="A group of properties to include in the greeting.">
    <property action="remove" name="MessageID" scope="default"/>
    <property name="From" scope="default" type="STRING" value=""/>
    <property name="Message" scope="default" type="STRING" value="Welcome to XXX group!"/>
    <property name="To" scope="default" type="STRING" value=""/>
</propertyGroup>
```
