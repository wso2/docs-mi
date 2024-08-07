# Message

In an enterprise that uses Message Channels to connect between two different applications, you must package information as a message. Messages facilitate information transmission from one application to another. In this case, the Message EIP is used as the transfer medium.

!!! info
    For more information, see the [Message](https://www.enterpriseintegrationpatterns.com/patterns/messaging/Message.html) documentation.

## How the ESB profile supports the Message EIP 

For example, the following code segment illustrates a SOAP message of a typical request that is transformed by the ESB Profile based on its mediation flow, which contains a header and a body. The header holds information about the data being transmitted, its origin, and its destination, and the body holds the actual data.

```
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
