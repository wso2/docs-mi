# Message

In an enterprise that uses Message Channels to connect between two different applications, you must package information as a message. Messages facilitate information transmission from one application to another. 

!!! info
    For more information, see the [Message](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Message.html) documentation.

## Sample message

For example, the following code segment illustrates a SOAP message of a typical request that is transformed by the service based on its mediation flow, which contains a header and a body. The header holds information about the data being transmitted, its origin, and its destination, and the body holds the actual data.

!!! info
    When the message below is sent as a request, ensure that the **Content-Type** header is set to `text/xml`.

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.samples" xmlns:xsd="http://services.samples/xsd">
  <soapenv:Header />
   <soapenv:Body>
      <ser:getQuote>       
         <ser:request>
             <ser:symbol>foo</ser:symbol>
         </ser:request>     
      </ser:getQuote>
    </soapenv:Body>
</soapenv:Envelope>
```
