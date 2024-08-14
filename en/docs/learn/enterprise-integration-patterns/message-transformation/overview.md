# Message Transformation

One challenge of data communication is that the formats of data and their storage mechanisms vary among different systems. A [message translator]({{base_path}}/learn/enterprise-integration-patterns/messaging-systems/message-translator) is an architectural pattern that acts as a filter between other filters or applications to translate one data format to another, transforming your message as it passes through the Micro Integrator.

This section introduces various types of message translators and how they can be simulated using the WSO2 Micro Integrator.

<table>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-transformation/envelope-wrapper">Envelope Wrapper</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/envelope-wrapper.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/envelope-wrapper.png" alt="envelope-wrapper" width="80"></a></td>
        <td>How existing systems participate in a messaging exchange, which places specific requirements in the message format, such as message header fields or encryption.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-transformation/content-enricher">Content Enricher</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/data-enricher.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/data-enricher.png" alt="data-enricher" width="80"></a></td>
        <td>How to communicate with another system if the message originator does not have all the required data items available.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-transformation/content-filter">Content Filter</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/content-filter.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/content-filter.png" alt="content-filter" width="80"></a></td>
        <td>How to simplify dealing with a large message when you are interested only in a few data items.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-transformation/claim-check">Claim Check</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/store-in-library.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/store-in-library.png" alt="store-in-library" width="80"></a></td>
        <td>How to reduce the data volume of a message sent across the system without sacrificing information content.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-transformation/normalizer">Normalizer</a></td>
        <td><a href="{{base_path}}/assets/img/learn/enterprise-integration-patterns/normalizer.png"><img src="{{base_path}}/assets/img/learn/enterprise-integration-patterns/normalizer.png" alt="normalizer" width="80"></a></td>
        <td>How to process messages that are semantically equivalent but arrive in a different format.</td>
    </tr>
    <tr>
        <td><a href="{{base_path}}/learn/enterprise-integration-patterns/message-transformation/canonical-data-model">Canonical Data Model</a></td>
        <td></td>
        <td>How to minimize dependencies when integrating applications that use different data formats.</td>
    </tr>
</table>