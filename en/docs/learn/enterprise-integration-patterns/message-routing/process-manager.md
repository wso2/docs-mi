# Process Manager

This section explains how the Process Manager EIP can be implemented using WSO2 ESB.

## Introduction to Process Manager EIP

The Process Manager EIP routes a message through multiple processing steps, when the required steps might not be known at design-time and might not be sequential. It maintains the state of the sequence and determines the next processing step based on intermediate results. 

!!! info
    For more information, see the [Process Manager](http://www.eaipatterns.com/ProcessManager.html) documentation.

![Process manager]({{base_path}}/assets/img/learn/enterprise-integration-patterns/message-routing/process-manager.gif)

## How WSO2 ESB implements the EIP

Message routing can take a different series of processing steps. In the Routing Slip EIP, a message contains the routing path (a sequence of processing steps), which is decided at the design stage. But in many cases the routing decisions have to be made based on intermediate results, and processing steps might need to be executed in parallel. To achieve this dynamic behavior, a processing unit called Process Manager has been introduced, which determines the next processing step based on intermediate results.

Designing and configuring a Process Manager is a fairly big area of study. WSO2 Business Process Server enables you to easily develop business processes using WS-BPEL standards and provides a hosting environment.
