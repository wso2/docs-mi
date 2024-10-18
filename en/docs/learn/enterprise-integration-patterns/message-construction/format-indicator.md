# Format Indicator

## Introduction to Format Indicator

The Format Indicator EIP allows communication channels to know the format of data transmitted to the Micro Integrator. Once the format is identified, the receiver will know how to process the message based on its format. 

!!! info
    For more information, see the [Format Indicator](http://www.eaipatterns.com/FormatIndicator.html) documentation.

## How WSO2 Micro Integrator implements the EIP

When a message arrives, before it is sent through mediation, it will be transformed into a SOAP envelope using message builders. This way, the message will be in a standard format for the message mediation engine to do the processing. Once the response is ready to be sent back to the receiver, it will be changed back to its original format through message formatters. 
