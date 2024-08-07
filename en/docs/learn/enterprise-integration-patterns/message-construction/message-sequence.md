# Message Sequence

This section explains how the Message Sequence EIP can be implemented using the ESB profile of WSO2 EI.

## Introduction to Message Sequence

When transmitting a large set of data, you might want to break it into smaller chunks in order to maintain system performance. The Message Sequence EIP facilitates this by sending data as a sequence of smaller messages and marking each message with sequence identification fields. 

!!! info

    For more information, see the [Message Sequence](http://www.eaipatterns.com/MessageSequence.html).

![Message sequence size]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-construction/message-sequence-size.gif)

## How the ESB profile implements the EIP

When the sent request is large, the ESB profile by default breaks it into smaller chunks. In order to maintain consistency of the message, each chunk is then mapped with a sequence identity number so that its sequential order is not lost.  
