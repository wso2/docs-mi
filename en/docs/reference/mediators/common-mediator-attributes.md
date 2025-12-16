\# Common Mediator Attributes



Some attributes are common to all mediators in WSO2 Integrator: MI. These attributes are used to improve the readability and maintainability of mediation logic and do not change the functional behavior of the mediator.



\## description



The `description` attribute can be used with any mediator to provide a human-readable explanation of what the mediator does.



\### Purpose

\- Improves readability of mediation flows

\- Helps developers and operators understand configurations easily

\- Does not affect runtime behavior



\### Usage example



```xml

<log description="Logs the incoming request payload">

&nbsp;   <property name="message" value="Request received"/>

</log>



