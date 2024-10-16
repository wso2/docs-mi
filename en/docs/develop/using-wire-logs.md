# Use Wire Logs

When debugging a Synapse flow, you can view the actual HTTP messages at the [entry]({{base_path}}/get-started/key-concepts/#message-entry-points) and the [exit]({{base_path}}/get-started/key-concepts/#message-exit-points) points of the Micro Integrator via wire logs. For example, you can view wire logs of the incoming flow and the final response of an [API]({{base_path}}/reference/synapse-properties/rest-api-properties) or a [proxy service]({{base_path}}/reference/synapse-properties/proxy-service-properties). 
Similarly, you can see the outgoing and incoming wire logs at an [endpoint]({{base_path}}/reference/synapse-properties/endpoint-properties). Wire logs are useful to troubleshoot unexpected issues that occur when integrating miscellaneous systems. For example, you can use wire logs to verify whether the message payload is properly going out from the server is correct, and whether the HTTP headers such as the content type is properly set in the outgoing message.
  
!!! Note
    It is recommended to enable wire logs only for troubleshooting purposes. Running production systems with wire logs enabled is not recommended, as it can incur a performance overhead.  

## Enable wire logs

See [Configure Logs]({{base_path}}/observe-and-manage/classic-observability-logs/configuring-log4j2-properties/#wire-logs-and-header-logs) for instructions.

## Sample wire log

Following is a sample wirelog.

```bash
[2013-09-22 19:47:57,797] DEBUG - wire >> "POST /services/StockQuoteProxy HTTP/1.1[\r][\n]"
[2013-09-22 19:47:57,798] DEBUG - wire >> "Content-Type: text/xml; charset=UTF-8[\r][\n]"
[2013-09-22 19:47:57,798] DEBUG - wire >> "SOAPAction: "urn:getQuote"[\r][\n]"
[2013-09-22 19:47:57,799] DEBUG - wire >> "User-Agent: Axis2[\r][\n]"
[2013-09-22 19:47:57,799] DEBUG - wire >> "Host: localhost:8280[\r][\n]"
[2013-09-22 19:47:57,799] DEBUG - wire >> "Transfer-Encoding: chunked[\r][\n]"
[2013-09-22 19:47:57,800] DEBUG - wire >> "[\r][\n]"
[2013-09-22 19:47:57,800] DEBUG - wire >> "215[\r][\n]"
[2013-09-22 19:47:57,800] DEBUG - wire >> "http://localhost:8280/services/StockQuoteProxyurn:uuid:9e1b0def-a24b-4fa2-8016-86cf3b458f67urn:getQuoteIBM[\r][\n]"
[2013-09-22 19:47:57,801] DEBUG - wire >> "0[\r][\n]"
[2013-09-22 19:47:57,801] DEBUG - wire >> "[\r][\n]"
[2013-09-22 19:47:57,846]  INFO - TimeoutHandler This engine will expire all callbacks after : 120 seconds, irrespective of the timeout action, after the specified or optional timeout
[2013-09-22 19:47:57,867] DEBUG - wire << "POST /services/SimpleStockQuoteService HTTP/1.1[\r][\n]"
[2013-09-22 19:47:57,867] DEBUG - wire << "Content-Type: text/xml; charset=UTF-8[\r][\n]"
[2013-09-22 19:47:57,867] DEBUG - wire << "SOAPAction: "urn:getQuote"[\r][\n]"
[2013-09-22 19:47:57,867] DEBUG - wire << "Transfer-Encoding: chunked[\r][\n]"
[2013-09-22 19:47:57,868] DEBUG - wire << "Host: localhost:9000[\r][\n]"
[2013-09-22 19:47:57,868] DEBUG - wire << "Connection: Keep-Alive[\r][\n]"
[2013-09-22 19:47:57,868] DEBUG - wire << "User-Agent: Synapse-PT-HttpComponents-NIO[\r][\n]"
[2013-09-22 19:47:57,868] DEBUG - wire << "[\r][\n]"
[2013-09-22 19:47:57,868] DEBUG - wire << "215[\r][\n]"
[2013-09-22 19:47:57,868] DEBUG - wire << "http://localhost:8280/services/StockQuoteProxyurn:uuid:9e1b0def-a24b-4fa2-8016-86cf3b458f67urn:getQuoteIBM[\r][\n]"
[2013-09-22 19:47:57,868] DEBUG - wire << "0[\r][\n]"
[2013-09-22 19:47:57,869] DEBUG - wire << "[\r][\n]"
[2013-09-22 19:47:58,002] DEBUG - wire >> "HTTP/1.1 200 OK[\r][\n]"
[2013-09-22 19:47:58,002] DEBUG - wire >> "Content-Type: text/xml; charset=UTF-8[\r][\n]"
[2013-09-22 19:47:58,002] DEBUG - wire >> "Date: Sun, 22 Sep 2013 14:17:57 GMT[\r][\n]"
[2013-09-22 19:47:58,002] DEBUG - wire >> "Transfer-Encoding: chunked[\r][\n]"
[2013-09-22 19:47:58,002] DEBUG - wire >> "Connection: Keep-Alive[\r][\n]"
[2013-09-22 19:47:58,002] DEBUG - wire >> "[\r][\n]"
[2013-09-22 19:47:58,014] DEBUG - wire << "HTTP/1.1 200 OK[\r][\n]"
[2013-09-22 19:47:58,015] DEBUG - wire << "Content-Type: text/xml; charset=UTF-8[\r][\n]"
[2013-09-22 19:47:58,015] DEBUG - wire << "Date: Sun, 22 Sep 2013 14:17:58 GMT[\r][\n]"
[2013-09-22 19:47:58,015] DEBUG - wire << "Server: WSO2-PassThrough-HTTP[\r][\n]"
[2013-09-22 19:47:58,016] DEBUG - wire << "Transfer-Encoding: chunked[\r][\n]"
[2013-09-22 19:47:58,016] DEBUG - wire << "[\r][\n]"
[2013-09-22 19:47:58,016] DEBUG - wire >> "4d8[\r][\n]"
[2013-09-22 19:47:58,017] DEBUG - wire >> "urn:getQuoteResponseurn:uuid:9e1b0def-a24b-4fa2-8016-86cf3b458f673.827143922330303-8.819296796724336-170.50810412063595170.73218944560944Sun Sep 22 19:47:57 IST 2013-170.472077024782785.562077973231586E7IBM Company178.0616712932281324.9438904049222641.9564266653777567195.61908401976004IBM6216[\r][\n]"
[2013-09-22 19:47:58,017] DEBUG - wire >> "0[\r][\n]"
[2013-09-22 19:47:58,018] DEBUG - wire >> "[\r][\n]"
[2013-09-22 19:47:58,021] DEBUG - wire << "4d8[\r][\n]"
[2013-09-22 19:47:58,022] DEBUG - wire << "urn:getQuoteResponseurn:uuid:9e1b0def-a24b-4fa2-8016-86cf3b458f673.827143922330303-8.819296796724336-170.50810412063595170.73218944560944Sun Sep 22 19:47:57 IST 2013-170.472077024782785.562077973231586E7IBM Company178.0616712932281324.9438904049222641.9564266653777567195.61908401976004IBM6216[\r][\n]"
[2013-09-22 19:47:58,022] DEBUG - wire << "0[\r][\n]"
[2013-09-22 19:47:58,022] DEBUG - wire << "[\r][\n]
```

There are two incoming messages and two outgoing messages in the above log. First part of the wire logs of a message contains the HTTP headers and it is followed by the message payload. You need to identify the message direction as shown below to read wire logs.

-   `DEBUG - wire >>`: This represents a message, which is coming into WSO2 Micro Integrator from the wire.
-   `DEBUG - wire <<`: This represents a message, which goes to the wire from the Micro Integrator.
