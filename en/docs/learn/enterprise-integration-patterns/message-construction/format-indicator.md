# Format Indicator

The Format Indicator EIP allows communication channels to know the format of data transmitted to the ESB profile. Once the format is identified, the receiver will know how to process the message based on its format. 

!!! info
    For more information, see the [Format Indicator](http://www.eaipatterns.com/FormatIndicator.html) documentation.

## How the ESB profile implements the EIP

The Architecture described in Introducing the Enterprise Integrator in WSO2 EI documentation describes how the ESB profile processes a message it receives. When a message arrives, before it is sent through mediation, it will be transformed to a SOAP envelope using message builders. This way, the message will be in a standard format for the message mediation engine to do the processing. Once the response is ready to be sent back to the receiver, it will be changed back to its original format through message formatters. 
