# System Management

System Management patterns aim to monitor the number of messages sent and their processing times without analyzing the message data, except for some fields in the message header in selected patterns. This is in contrast to Business Activity Monitoring, which directly analyzes the payload data contained in a message.

This section introduces various system management patterns and how they can be simulated using the WSO2 Micro Integrator.

<table>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/system-management/control-bus">Control Bus</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/control-bus-icon.gif"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/control-bus-icon.gif" alt="control-bus" width="80"></a></td>
        <td>Administers a messaging system that is distributed across multiple platforms and a wide geographic area.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/system-management/detour">Detour</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/detour-icon.gif"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/detour-icon.gif" alt="detour" width="80"></a></td>
        <td>Routes a message through intermediate steps to perform validation, testing or debugging functions.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/system-management/message-history">Message History</a></td>
        <td></td>
        <td>Lists all applications that the message passed through since its origination.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/system-management/message-store">Message Store</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-store-icon.gif"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/message-store-icon.gif" alt="message-store" width="80"></a></td>
        <td>Reports against message information without disturbing the loosely coupled and transient nature of a messaging system.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/system-management/smart-proxy">Smart Proxy</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/smart-proxy-icon.gif"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/smart-proxy-icon.gif" alt="smart-proxy" width="80"></a></td>
        <td>Tracks messages on a service that publishes reply messages to the Return Address specified by the requester.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/system-management/test-message">Test Message</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/test-message-icon.gif"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/test-message-icon.gif" alt="test-message" width="80"></a></td>
        <td>Ensures the health of message processing components by preventing situations such as garbling outgoing messages due to an internal fault.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/system-management/wire-tap">Wire Tap</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/wire-tap-icon.gif"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/wire-tap-icon.gif" alt="wire-tap" width="80"></a></td>
        <td>Inspects messages that travel on a Point-to-Point Channel.</td>
    </tr>
</table>
