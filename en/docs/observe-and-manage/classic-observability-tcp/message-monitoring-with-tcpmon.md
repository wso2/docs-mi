# Message Monitoring with TCPMon

Users can view and monitor the messages passed along a TCP-based conversation using the TCPMon utility. Therefore, this tool is particularly useful for debugging when you develop Web services. TCPMon is an **Apache** project distributed under **Apache 2.0 License**.

## How TCPMon works

TCPMon is not dependent on any third party libraries. Its user interface is based on a swing UI and works on almost all platforms that support Java. The most common usage of TCPMon is as an intermediary, which monitors the communication between the client (front end) and the back-end server. That is, the messages sent from the client are received by the intermediary instead of the back-end server. These messages are then forwarded to the back-end server from the intermediary.

## Example use case

The following diagram depicts a typical communication between the front
end client and the back-end server. 80 is the listening port of the back-end server, which receives the messages from the client:  

![Client Server Communication]({{base_path}}/assets/img/integrate/tcp/client-server-communication.png)

The following diagram depicts how TCPMon is placed between the client
and the server in order to monitor the messages. 8081 is the listening
port in TCPMon, which receives the messages from the client instead of
the back-end server:

![Client-TCP-Server Communication]({{base_path}}/assets/img/integrate/tcp/client-tcp-server-communication.png)

!!! Note
    -   As an intermediary, TCPMon only receives messages and forwards them to the back-end server. Therefore, it is a safe tool to be used for debugging purposes.
    -   Note that TCPMon cannot be used to view messages transferred over the HTTPS protocol.

## Start using TCPMon

To monitor messages from client to server using TCPMon:

1.  [Start TCPMon]({{base_path}}/observe-and-manage/classic-observability-tcp/starting-tcp-mon).
2.  Give 8081 (the listening port of TCPMon) in the **Listen Port**
    field (This could be any unused port in your local machine).
3.  Give the address of the back end server as the target hostname. For
    example, if you are monitoring messages sent to
    [www.apache.org](http://www.apache.org) , enter this web address as
    the hostname.
4.  Give 80 as the target port, which is the listening port of
    [www.apache.org.](http://www.apache.org.)  

    ![TCPMon console]({{base_path}}/assets/img/integrate/tcp/tcpmon-admin-console.png)

5.  Click **Add** to save the setting.
6.  Now, point the browser to 'localhost:8081' instead of [www.apache.org](http://www.apache.org).
7.  A new tab in TCPMon will indicate the 8081 port. You can view the
    requests and responses passing through TCPMon as shown below.  

    ![TCPMon ports]({{base_path}}/assets/img/integrate/tcp/tcpmon-port8081-console.png)

8.  The options at the bottom of the screen can be used to have the
    messages in XML format (useful in debugging Web services), to save
    and resend the messages and also to switch the layout of the message
    windows.

    ![TCPMon console option]({{base_path}}/assets/img/integrate/tcp/tcp-console-options.png)

 ## Using TCPMon with WSO2 Micro Integrator

This section shows how to integrate TCPMon with **WSO2 Micro Integrator (MI)** so you can observe messages flowing between clients, MI, and backend services during development and troubleshooting.

### Prerequisites

- WSO2 Micro Integrator **4.4.0+**
- TCPMon (Apache Axis utility)
- Java 8+  
- MI running locally (default HTTP port **8290**)

!!! note
    TCPMon works at the TCP level and is ideal for **HTTP** traffic during debugging.  
    For HTTPS, either configure trusted certificates end-to-end or switch services to HTTP temporarily while you debug.

---

### Monitor inbound messages (Client → MI)

Use TCPMon as a listener **in front of MI** so all client requests pass through it.

![Monitor Inbound Messages]({{base_path}}/assets/img/integrate/tcp/Client_MI2.png)

1. **Start TCPMon** and create a new listener:
   - **Listen Port**: `8081` (any free local port)
   - **Target Host**: `localhost`
   - **Target Port**: `8290` (MI default HTTP port)

2. **Send client requests via TCPMon**, not directly to MI.  

For example, if your MI proxy is normally at:
```
http://localhost:8290/services/SimpleProxy
```

send requests to:
```
http://localhost:8081/services/SimpleProxy
```

3. Observe in TCPMon:
- **Left pane** → incoming request from client  
- **Right pane** → response returned by MI

---

### Monitor outbound messages (MI → Backend)

Route MI's **endpoint** through a second TCPMon listener to capture calls MI makes to upstream/backends.

![Monitor Outbound Messages]({{base_path}}/assets/img/integrate/tcp/MI_BACKEND.png)

1. **Start another TCPMon** instance:
- **Listen Port**: `8082`
- **Target Host**: `<real-backend-host>` (e.g., `backend.example.com`)
- **Target Port**: `<real-backend-port>` (e.g., `9000`)

2. **Point your MI endpoint to TCPMon** instead of the real backend.  
Example Proxy Service:
```xml
<proxy name="SimpleProxy" startOnLoad="true" transports="http">
    <target>
        <inSequence>
            <log level="full"/>
            <send>
                <endpoint>
                    <!-- Route via TCPMon (8082) instead of the real backend -->
                    <address uri="http://localhost:8082/services/BackendService"/>
                </endpoint>
            </send>
        </inSequence>
        <outSequence>
            <send/>
        </outSequence>
    </target>
</proxy>
```

---

### End-to-end example (both directions)

The setup below shows how to monitor both inbound and outbound traffic using two TCPMon instances.

![End-to-End Monitoring]({{base_path}}/assets/img/integrate/tcp/ALL.png)

| Flow | Source | → | Destination | TCPMon Mapping |
|------|----------|---|--------------|----------------|
| Inbound | Client | → | Micro Integrator | TCPMon `8081 → 8290` |
| Outbound | Micro Integrator | → | Backend Service | TCPMon `8082 → 9000` |

1. Start TCPMon **#1**: Listen on **8081**, target **localhost:8290**  
2. Start TCPMon **#2**: Listen on **8082**, target your backend (e.g., `backend.example.com:9000`)  
3. Update the MI endpoint to `http://localhost:8082/...`  
4. Send requests to `http://localhost:8081/services/SimpleProxy`

**You can now view:**
- Requests/responses between **Client ↔ MI** in TCPMon 8081  
- Requests/responses between **MI ↔ Backend** in TCPMon 8082

---

### Practical Use Cases

#### Use Case 1: Debugging SOAP Message Transformation

![SOAP Transformation]({{base_path}}/assets/img/integrate/tcp/SOAP_Transform.png)

**Scenario:** You need to verify that SOAP envelopes are correctly transformed to REST JSON before reaching the backend.

**Setup:**
- Client sends SOAP requests to TCPMon (8081)
- TCPMon forwards to MI which transforms SOAP to REST
- MI sends JSON to backend REST API
- View XML format in TCPMon to debug transformation issues

---

#### Use Case 2: Debugging Authentication Headers

![Authentication Debugging]({{base_path}}/assets/img/integrate/tcp/Auth_Debug.png)

**Scenario:** Debug authentication issues by inspecting whether authorization headers are being correctly passed or modified.

**Setup:**
- Client sends requests with Authorization headers to TCPMon (8081)
- TCPMon captures headers for inspection
- MI may modify or add additional headers via Header Mediator
- Backend API validates and responds with 200 OK or 401 Unauthorized
- Verify headers are correctly passed or modified by MI

---

#### Use Case 3: Load Balancing & Failover Testing

![Load Balancing]({{base_path}}/assets/img/integrate/tcp/Load_Balance.png)

**Scenario:** Test load balancing behavior and verify requests are distributed correctly across multiple backend servers.

**Setup:**
- Client sends load test requests to TCPMon (8081)
- TCPMon forwards to MI Load Balance Endpoint
- MI distributes requests across Server 1 and Server 2
- Monitor distribution to ensure proper load balancing and failover

---

### Tips & troubleshooting

- **Port in use?** Pick any free local port for the TCPMon listener (e.g., 8083/8084).  
- **Nothing appears in TCPMon?** Ensure your client or MI **actually targets the TCPMon port** (8081/8082).  
- **HTTPS traffic?** Use HTTP for debugging or configure certificates so TCPMon can handle TLS.  
- **Headers/payloads:** Enable **XML view** in TCPMon to inspect SOAP/REST bodies.

---

### References

- [Apache TCPMon Documentation](https://ws.apache.org/tcpmon/)  
- [WSO2 MI Docs – Message Monitoring with TCPMon](https://mi.docs.wso2.com/en/latest/observe-and-manage/classic-observability-tcp/message-monitoring-with-tcpmon/)