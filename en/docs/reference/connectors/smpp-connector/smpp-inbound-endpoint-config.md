# SMPP Inbound Endpoint Reference

The following configurations allow you to configure SMPP Inbound Endpoint for your scenario. 

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
    <th>Required</th>
    <th>Possible Values</th>
    <th>Default Value</th>
  </tr>
  <tr>
    <td>host</td>
    <td> IP address of the SMSC.</td>
    <td>Yes</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>port</td>
    <td>Port to access the SMSC.</td>
    <td>Yes</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>systemType</td>
    <td>Identifies the type of ESME system requesting to bind as a receiver with the SMSC.</td>
    <td>No</td>
    <td>"" - (NULL)<br>                        
                        CMT - Cellular Messaging<br>
                        CPT - Cellular Paging<br>                        
                        VMN - Voice Mail Notification<br>                        
                        VMA - Voice Mail Alerting<br>                        
                        WAP - Wireless Application Protocol<br>                        
                        USSD - Unstructured Supplementary Services Data</td>
    <td>"" - (NULL)</td>
  </tr>
  <tr>
    <td>systemId</td>
    <td>Identifies the ESME system requesting to bind as a receiver with the SMSC.</td>
    <td>Yes</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>password</td>
    <td>The password may be used by the SMSC to authenticate the ESME requesting to bind.</td>
    <td>Yes</td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>addressNpi</td>
    <td>Numbering Plan Indicator for ESME address.</td>
    <td>Yes</td>
    <td>UNKNOWN<br>
                        ISDN<br>
                        DATA<br>
                        TELEX<br>                        
                        LAND_MOBILE<br>                        
                        NATIONAL<br/>
                        PRIVATE
                        ERMES<br>
                        INTERNET<br>                        
                        WAP</td>
    <td>N/A</td>
  </tr> 
  <tr>
    <td>addressTon</td>
    <td>Indicates Type of Number of the ESME address.</a></td>
    <td>Yes</td>
    <td>UNKNOWN<br>                        
                        INTERNATIONAL<br>
                        NATIONAL<br>
                        NETWORK_SPECIFIC<br>                        
                        SUBSCRIBER_NUMBER<br>                        
                        ALPHANUMERIC<br>
                        ABBREVIATED</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>bindType</td>
    <td>An ESME bound as a Receiver or Transceiver is authorised to receive short messages from the SMSC.</td>
    <td>Yes</td>
    <td>BIND_RX<br>
                        BIND_TRX</td>
    <td>N/A</td>
  </tr> 
  <tr>
    <td>addressRange</td>
    <td>A single ESME address or a range of ESME addresses served via this SMPP receiver session.</td>
    <td>No</td>
    <td>N/A</td>
    <td>null</td>
  </tr> 
  <tr>
    <td>enquireLinktimer</td>
    <td>Used to check whether SMSC is connected or not.</td>
    <td>No</td>
    <td>N/A</td>
    <td>10000</td>
  </tr>
  <tr>
    <td>transactiontimer</td>
    <td>Time elapsed between SMPP request and the corresponding response.</td>
    <td>No</td>
    <td>N/A</td>
    <td>200</td>
  </tr>
  <tr>
    <td>reconnectInterval</td>
    <td>The Initial retry interval to reconnect with the SMSC while SMSC is not available.</td>
    <td>No</td>
    <td>N/A</td>
    <td>1000ms</td>
  </tr>
  <tr>
    <td>retryCount</td>
    <td>The number of times to retry to connect with SMSC, while connection with the SMSC is closed. If you want to retry forever, give the retry count value as less than 0.</td>
    <td>No</td>
    <td>N/A</td>
    <td>3</td>
  </tr>
  <tr>
    <td>exponentialFactor</td>
    <td>Start with Initial reconnectInterval delay until first retry attempt is made but if that one
                        fails, we should wait (reconnectInterval * exponentialFactor) times more. For example<br>                        
                        let’s say we start with exponentialFactor 2 and 100ms delay until first retry attempt is<br>                        
                        made but if that one fails as well, we should wait two times more (200ms). And later 400ms, 800ms…</td>
    <td>No</td>
    <td>N/A</td>
    <td>5</td>
    </tr>
  <tr>
    <td>maximumBackoffTime</td>
    <td>The above one is an exponential function that can grow very fast. Thus it’s useful to set maximum backoff time at some reasonable level, e.g. 10 seconds:</td>
    <td>No</td>
    <td>N/A</td>
    <td>10000ms</td>
    </tr>  
</table>