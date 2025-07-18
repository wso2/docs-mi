# SMPP Connector Reference

The following operations allow you to work with the SMPP Connector. Click an operation name to see parameter details and samples on how to use it.

## Connection Configurations

??? note "SMPP"
    <table>
        <tr>
            <th>Parameter Name</th>
            <th>Description</th>
            <th>Required</th>
        </tr>
        <tr>
            <td>SMSC Connection Name</td>
            <td>Name of the SMSC Connection</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th colspan="3">Basic</td>
        </tr>
        <tr>
            <td>Host</td>
            <td>Hostname of the SMSC</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>Port</td>
            <td>Port to access the SMSC</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>System ID</td>
            <td>User requesting to bind (username)</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>Password</td>
            <td>Password to allow access</td>
            <td>Yes</td>
        </tr>
        <tr>
            <th colspan="3">Advanced</td>
        </tr>
        <tr>
            <td>Enquire Link Timer</td>
            <td>SMSC is connected or not</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>Session Binding Timeout</td>
            <td>session binding timeout,max time to wait for a response after sending a bind request</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>Transaction Timer</td>
            <td>Time elapsed between SMPP connector request and corresponding response.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>System Type</td>
            <td>It is used to categorize the type of ESME that is binding to the SMSC. Examples include “CP” (Content providers), “VMS” (voice mail system) and “OTA” (over-the-air activation system).</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>Address Ton</td>
            <td>Indicates Type of Number of the ESME address.</td>
            <td>Optional</td>
        </tr>
        <tr>
            <td>Address NPI</td>
            <td>Numbering Plan Indicator for ESME address.</td>
            <td>Optional</td>
        </tr>
    </table>

## Operations
    
## Send SMS message

??? note "sendSMS"
    Use to send SMS Message to the SMSC (Short Message Service Center),
    <table>
      <tr>
         <th>Parameter Name</th>
         <th>Description</th>
         <th>Required</th>
      </tr>
      <tr>
         <td>serviceType</td>
         <td>
            Indicates SMS application service. The following generic service_types are defined:
            <table>
               <tr>
                  <td>"" (NULL)	</td>
                  <td>Default</td>
               </tr>
               <tr>
                  <td>"CMT"</td>
                  <td>Cellular Messaging</td>
               </tr>
               <tr>
                  <td>"CPT"	</td>
                  <td>Cellular Paging</td>
               </tr>
               <tr>
                  <td>"VMN"</td>
                  <td>Voice Mail Notification</td>
               </tr>
               <tr>
                  <td>"VMA"</td>
                  <td>Voice Mail Alerting</td>
               </tr>
               <tr>
                  <td>"WAP"</td>
                  <td>Wireless Application Protocol</td>
               </tr>
               <tr>
                  <td>"USSD"</td>
                  <td>Unstructured Supplementary Services Data</td>
               </tr>
            </table>
         </td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>sourceAddressTon</td>
         <td>Type of number for source address.</td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>sourceAddressNpi</td>
         <td>Numbering plan indicator for source address.</td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>sourceAddress</td>
         <td>Source address of the SMS message.</td>
         <td>Yes</td>
      </tr>
      <tr>
         <td>destinationAddressTon</td>
         <td>Type of number for destination. Used as a default for the destination address.</td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>destinationAddressNpi</td>
         <td>numbering plan indicator for destination.</td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>destinationAddress</td>
         <td>
            Destination address of the SMS message.
            Source address TON, Destination address TON
            <table>
               <tr>
                  <th>TON</th>
                  <th>VALUE</th>
               </tr>
               <tr>
                  <td>Unknown</td>
                  <td>0</td>
               </tr>
               <tr>
                  <td>International</td>
                  <td>1</td>
               </tr>
               <tr>
                  <td>National</td>
                  <td>2</td>
               </tr>
               <tr>
                  <td>Network Specific</td>
                  <td>3</td>
               </tr>
               <tr>
                  <td>Subscriber Number</td>
                  <td>4</td>
               </tr>
               <tr>
                  <td>Alphanumeric</td>
                  <td>5</td>
               </tr>
               <tr>
                  <td>Abbreviated</td>
                  <td>6</td>
               </tr>
               <tr>
                  <td>All other values reserved</td>
            </table>
            Source address NPI, Destination address NPI
            <table>
               <tr>
                  <th>NPI</th>
                  <th>VALUE</th>
               </tr>
               <tr>
                  <td>Data (X.121)</td>
                  <td>2</td>
               </tr>
               <tr>
                  <td>ERMES</td>
                  <td>16</td>
               </tr>
               <tr>
                  <td>Internet (IP)</td>
                  <td>20</td>
               </tr>
               <tr>
                  <td>ISDN (E163/E164)</td>
                  <td>1</td>
               </tr>
               <tr>
                  <td>Land Mobile (E.212)</td>
                  <td>4</td>
               </tr>
               <tr>
                  <td>National</td>
                  <td>8</td>
               </tr>
               <tr>
                  <td>Private</td>
                  <td>9</td>
               </tr>
               <tr>
               <tr>
                  <td>Telex (F.69)</td>
                  <td>3</td>
               </tr>
               <tr>
                  <td>Unknown</td>
                  <td>0</td>
               </tr>
               <tr>
               <tr>
                  <td>WAP Client Id (to be defined by WAP Forum)</td>
                  <td>24</td>
               </tr>
               <tr>
            </table>
         </td>
         <td>Yes</td>
      </tr>
      <tr>
         <td>message</td>
         <td>Content of the SMS message.</td>
         <td>Yes</td>
      </tr>
    <tr>
        <td>smscDeliveryReceipt</td>
        <td>This parameter is used to request an SMSC delivery receipt. The following values can be defined:
            <table>
                <tr>
                    <th>Value</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td>DEFAULT</td>
                    <td>No SMSC Delivery Receipt requested. This is the default value.</td>
                </tr>
                <tr>
                    <td>SUCCESS_FAILURE</td>
                    <td>SMSC Delivery Receipt requested where final delivery outcome is delivery success or failure.</td>
                </tr>
                <tr>
                    <td>FAILURE</td>
                    <td>SMSC Delivery Receipt requested where the final delivery outcome is delivery failure.</td>
                </tr>
                <tr>
                    <td>SUCCESS</td>
                    <td>SMSC Delivery Receipt requested where the final delivery outcome is success. This is supported from SMPP 5.0.</td>
                </tr>
           </table>
        </td>
        <td>Optional</td>
    </tr>
      <tr>
         <td>esmClass</td>
         <td>
            The esmClass parameter is used to indicate special message attributes associated with the short Message(message mode and type).
            <table>
               <tr>
                  <th>Bits 7 6 5 4 3 2 1</th>
                  <th>Meanning</th>
               </tr>
               <tr>
                  <td>
                     x x x x x x 0 0<br>
                     x x x x x x 0 1<br>
                     x x x x x x 1 0<br>
                     x x x x x x 1 1<br>
                  </td>
                  <td>Messaging Mode (bits 1-0)<br>
                     Default SMSC Mode (e.g. Store and Forward)<br>
                     Datagram mode<br>
                     Forward (i.e. Transaction) mode<br>
                     Store and Forward mode<br>
                     (use to select Store and Forward mode if Default SMSC Mode is non Store and Forward)<br>
                  </td>
               </tr>
               <tr>
                  <td>x x 0 0 0 0 x x<br>
                     x x 0 0 1 0 x x<br>
                     x x 0 1 0 0 x x<br>
                  </td>
                  <td>Message Type (bits 5-2)<br>
                     Default message Type (i.e. normal message)<br>
                     Short Message contains ESME Delivery Acknowledgement<br>
                     Short Message contains ESME Manual/User Acknowledgement<br>
                  </td>
               </tr>
               <tr>
                  <td>0 0 x x x x x x<br>
                     0 1 x x x x x x<br>
                     1 0 x x x x x x<br>
                     1 1 x x x x x x<br>
                  </td>
                  <td>GSM Network Specific Features (bits 7-6)<br>
                     No specific features selected<br>
                     UDHI Indicator (only relevant for MT short messages)<br>
                     Set Reply Path (only relevant for GSM network)<br>
                     Set UDHI and Reply Path (only relevant for GSM network)<br>
                  </td>
               </tr>
            </table>
         </td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>protocolId</td>
         <td>protocol identifier (network specific).<br>
            GSM - Set according to GSM 03.40 [ GSM 03.40]<br>
            ANSI-136 (TDMA)<br>
            For mobile terminated messages, this field is not used and is therefore ignored by the SMSC.<br>
            For ANSI-136 mobile originated messages, the SMSC should set this value to NULL.<br>
            IS-95 (CDMA)<br>
            For mobile terminated messages, this field is not used and is therefore ignored by the SMSC.<br>
            For IS-95 mobile originated messages, the SMSC should set this value to NULL.<br>
         </td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>priorityFlag</td>
         <td>
            sets the priority of the message.
            <table>
               <tr>
                  <th>Priority Level</th>
                  <th>GSM</th>
                  <th>ANSI-136</th>
                  <th>IS-95</th>
               </tr>
               <tr>
                  <td>0</td>
                  <td>Non-priority</td>
                  <td>Bulk</td>
                  <td>Normal</td>
               </tr>
               <tr>
                  <td>1</td>
                  <td>Priority</td>
                  <td>Normal</td>
                  <td>Interactive</td>
               </tr>
               <tr>
                  <td>2</td>
                  <td>Priority</td>
                  <td>Urgent</td>
                  <td>Urgent</td>
               </tr>
               <tr>
                  <td>3</td>
                  <td>Priority</td>
                  <td>Very Urgent</td>
                  <td>Emergency</td>
               </tr>
               <tr>All other values reserved
               </tr>
            </table>
            Priority<br>
            There are two types of priority. 
            <ol>
               <li>Delivery priority - Message delivery is attempted even if the mobile is temporarily absent.
                  E.g., Temporarily out of reach or another short message is being delivered at the same time.
               </li>
               <li>Content priority - No free message memory capacity.
                  E.g., The user does not delete any received message and maximum storage space has been reached. 
               </li>
            </ol>
            Non-priority<br>
            It will attempt delivery if the mobile has not been identified as temporarily absent.
         </td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>scheduleDeliveryTime</td>
         <td>This parameter specifies the scheduled time at which the message delivery should be first attempted. Set to NULL for immediate delivery.</td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>validityPeriod</td>
         <td>The validity_period parameter indicates the SMSC expiration time, after which the message should be discarded if not delivered to the destination. It can be defined in absolute time format or relative time format.</td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>validityPeriod</td>
         <td>The validity_period parameter indicates the SMSC expiration time, after which the message should be discarded if not delivered to the destination. It can be defined in absolute time format or relative time format.</td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>replaceIfPresentFlag</td>
         <td>
            The replace_if_present_flag parameter is used to request the SMSC to replace a previously submitted message, that is still pending delivery. The SMSC will replace an existing message provided that the source address, destination address and service_type match the same fields in the new message.
            <table>
               <tr>
                  <th>Value</th>
                  <th>Description</th>
               </tr>
               <tr>
                  <td>0</td>
                  <td>Don't replace (default)</td>
               </tr>
               <tr>
                  <td>1</td>
                  <td>Replace</td>
               </tr>
               <tr>
                  <td>2-255</td>
                  <td>reserved</td>
               </tr>
            </table>
            <td>Optional</td>
         </tr>
      <tr>
         <td>alphabet</td>
         <td>
            Alphabet is used in the data encoding of SMS message. Following alphabets are supported.
            <ol>
               <li>ALPHA_DEFAULT</li>
               <li>ALPHA_8_BIT</li>
               <li>ALPHA_UCS2</li>
               <li>ALPHA_RESERVED</li>
            </ol>
         </td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>charset</td>
         <td>
            Charset is used when decoding the message in SMSC. Following charsets are supported.
            <ol>
               <li>UTF-8</li>
               <li>UTF-16</li>
            </ol>
         </td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>isCompressed</td>
         <td>It allows SMS message compression.</td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>messageClass</td>
         <td>
            <table>
               <tr>
                  <th>Value</th>
                  <th>Message Class</th>
               </tr>
               <tr>
                  <td>CLASS0</td>
                  <td>Flash messages. Display only not store into the phone</td>
               </tr>
               <tr>
                  <td>CLASS1</td>
                  <td>ME specific - the SMS is stored in the mobile phone memory</td>
               </tr>
               <tr>
                  <td>CLASS2</td>
                  <td>SIM specific - the SMS is stored on the SIM</td>
               </tr>
               <tr>
                  <td>CLASS3</td>
                  <td>TE specific - this means the SMS is sent to a computer attached to the receiving mobile phone</td>
               </tr>
            </table>
            Data encoding - defines the encoding scheme of the SMS message. You can find general data coding scheme from [here](https://en.wikipedia.org/wiki/Data_Coding_Scheme) for different combination of alphabet, message class, isCompressed values.
         </td>
         <td>Optional</td>
      </tr>
      <tr>
         <td>submitDefaultMsgId</td>
         <td>
            Indicates short message to send from a predefined list of messages stored on SMSC.<br>
            <table>
               <tr>
                  <th>Value</th>
                  <th>Description</th>
               </tr>
               <tr>
                  <td>0</td>
                  <td>reserved</td>
               </tr>
               <tr>
                  <td>1 - 254</td>
                  <td>Allowed values</td>
               </tr>
               <tr>
                  <td>255</td>
                  <td>reserved</td>
               </tr>
            </table>
         </td>
         <td>Optional</td>
      </tr>
      <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
        </tr>
        <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).</td>
            <td>Optional</td>
        </tr>
    </table>

**Note**: For more information on how this works in an actual scenario, see [SMPP Connector Example]({{base_path}}/reference/connectors/smpp-connector/smpp-connector-example/).

## Send bulk SMS message

??? note "sendBulkSMS"
    Used to send SMS messages to multiple destinations.
    <table>
    <tr>
       <th>Parameter Name</th>
       <th>Description</th>
       <th>Required</th>
    </tr>
    <tr>
       <td>serviceType</td>
       <td>
          Indicates the SMS application service used. The following generic service_types are defined:
          <table>
             <tr>
                <td>"" (NULL)	</td>
                <td>Default</td>
             </tr>
             <tr>
                <td>"CMT"</td>
                <td>Cellular Messaging</td>
             </tr>
             <tr>
                <td>"CPT"	</td>
                <td>Cellular Paging</td>
             </tr>
             <tr>
                <td>"VMN"</td>
                <td>Voice Mail Notification</td>
             </tr>
             <tr>
                <td>"VMA"</td>
                <td>Voice Mail Alerting</td>
             </tr>
             <tr>
                <td>"WAP"</td>
                <td>Wireless Application Protocol</td>
             </tr>
             <tr>
                <td>"USSD"</td>
                <td>Unstructured Supplementary Services Data</td>
             </tr>
          </table>
       </td>
       <td>Optional</td>
    </tr>
    <tr>
       <td>sourceAddressTon</td>
       <td>Type of number for source address.</td>
       <td>Optional</td>
    </tr>
    <tr>
       <td>sourceAddressNpi</td>
       <td>Numbering plan indicator for source address.</td>
       <td>Optional</td>
    </tr>
    <tr>
       <td>sourceAddress</td>
       <td>Source address of the SMS message.</td>
       <td>Yes</td>
    </tr>
    <tr>
      <td>destinationAddresses</td>
      <td>
      Destination addresses can be defined in the following 3 formats.
      <ol>
      <li>Default Values: Default numbering plan and type will be added for all numbers</li>
      <code>
      {"mobileNumbers": ["+94715XXXXXX", "+1434XXXXXX"]}
      </code>
      <li> Custom numbering plan and type for all numbers. The specified plan and type will be set to all numbers.</li>
      <pre>
      {
        "type": "NATIONAL",
        "numberingPlan":"NATIONAL",
        "mobileNumbers": [
            "+94713089759",
            "+189718674"
        ]
      }
      </pre>
      <li>Each number is assigned different properties. Numbers without the properties will be assigned default values (You can set a custom type and numbering plan as default, as mentioned in the previous format). Properties can be set to numbers individually.</li>
      <pre>
      {
      "mobileNumbers": 
      ["+9471XXXXXX", "+189718674",{ "type": "INTERNATIONAL", "numberingPlan": "NATIONAL", "mobileNumber": "222333" }]
      }
      </pre>
      </ol>
      </td>
      <td>Yes</td>
    </tr>
    <tr>
       <td>message</td>
       <td>Content of the SMS message.</td>
       <td>Yes</td>
    </tr>
    <tr>
       <td>esmClass</td>
       <td>
          The esmClass parameter is used to indicate special message attributes associated with the short Message (message mode and type).
          <table>
             <tr>
                <th>Bits 7 6 5 4 3 2 1</th>
                <th>Meanning</th>
             </tr>
             <tr>
                <td>
                   x x x x x x 0 0<br>
                   x x x x x x 0 1<br>
                   x x x x x x 1 0<br>
                   x x x x x x 1 1<br>
                </td>
                <td>Messaging Mode (bits 1-0)<br>
                   Default SMSC Mode (e.g. Store and Forward)<br>
                   Datagram mode<br>
                   Forward (i.e. Transaction) mode<br>
                   Store and Forward mode<br>
                   (use to select Store and Forward mode if Default SMSC Mode is non Store and Forward)<br>
                </td>
             </tr>
             <tr>
                <td>x x 0 0 0 0 x x<br>
                   x x 0 0 1 0 x x<br>
                   x x 0 1 0 0 x x<br>
                </td>
                <td>Message Type (bits 5-2)<br>
                   Default message Type (i.e. normal message)<br>
                   Short Message contains ESME Delivery Acknowledgement<br>
                   Short Message contains ESME Manual/User Acknowledgement<br>
                </td>
             </tr>
             <tr>
                <td>0 0 x x x x x x<br>
                   0 1 x x x x x x<br>
                   1 0 x x x x x x<br>
                   1 1 x x x x x x<br>
                </td>
                <td>GSM Network Specific Features (bits 7-6)<br>
                   No specific features selected<br>
                   UDHI Indicator (only relevant for MT short messages)<br>
                   Set Reply Path (only relevant for GSM network)<br>
                   Set UDHI and Reply Path (only relevant for GSM network)<br>
                </td>
             </tr>
          </table>
       </td>
       <td>Optional</td>
    </tr>
    <tr>
       <td>protocolId</td>
       <td>protocol identifier (network specific).<br>
          GSM - Set according to GSM 03.40 [ GSM 03.40]<br>
          ANSI-136 (TDMA)<br>
          For mobile terminated messages, this field is not used and is therefore ignored by the SMSC.<br>
          For ANSI-136 mobile originated messages, the SMSC should set this value to NULL.<br>
          IS-95 (CDMA)<br>
          For mobile terminated messages, this field is not used and is therefore ignored by the SMSC.<br>
          For IS-95 mobile originated messages, the SMSC should set this value to NULL.<br>
       </td>
       <td>Optional</td>
    </tr>
    <tr>
       <td>priorityFlag</td>
       <td>
          sets the priority of the message.
          <table>
             <tr>
                <th>Priority Level</th>
                <th>GSM</th>
                <th>ANSI-136</th>
                <th>IS-95</th>
             </tr>
             <tr>
                <td>0</td>
                <td>Non-priority</td>
                <td>Bulk</td>
                <td>Normal</td>
             </tr>
             <tr>
                <td>1</td>
                <td>Priority</td>
                <td>Normal</td>
                <td>Interactive</td>
             </tr>
             <tr>
                <td>2</td>
                <td>Priority</td>
                <td>Urgent</td>
                <td>Urgent</td>
             </tr>
             <tr>
                <td>3</td>
                <td>Priority</td>
                <td>Very Urgent</td>
                <td>Emergency</td>
             </tr>
             <tr>All other values reserved
             </tr>
          </table>
          Priority<br>
          There are two types of priority. 
          <ol>
             <li>Delivery priority - Message delivery is attempted even if the mobile is temporarily absent.
                E.g., Temporarily out of reach or another short message is being delivered at the same time.
             </li>
             <li>Content priority - No free message memory capacity.
                E.g., The user does not delete any received message and maximum storage space has been reached. 
             </li>
          </ol>
          Non-priority<br>
          It will attempt delivery if the mobile has not been identified as temporarily absent.
       </td>
       <td>Optional</td>
    </tr>
    <tr>
       <td>scheduleDeliveryTime</td>
       <td>This parameter specifies the scheduled time at which the message delivery should be first attempted. Set to NULL for immediate delivery.</td>
       <td>Optional</td>
    </tr>
    <tr>
       <td>validityPeriod</td>
       <td>The validity_period parameter indicates the SMSC expiration time, after which the message should be discarded if not delivered to the destination. It can be defined in absolute time format or relative time format.</td>
       <td>Optional</td>
    </tr>
    <tr>
       <td>registeredDelivery</td>
       <td>Indicator to signify if an SMSC delivery receipt or acknowledgment is required - Value other than 0 represents delivery report request.</td>
       <td>Optional</td>
    </tr>
    <tr>
       <td>validityPeriod</td>
       <td>The validity_period parameter indicates the SMSC expiration time, after which the message should be discarded if not delivered to the destination. It can be defined in absolute time format or relative time format.</td>
       <td>Optional</td>
    </tr>
    <tr>
       <td>replaceIfPresentFlag</td>
       <td>
          The replace_if_present_flag parameter is used to request the SMSC to replace a previously submitted message, that is still pending delivery. The SMSC will replace an existing message provided that the source address, destination address and service_type match the same fields in the new message.
          <table>
             <tr>
                <th>Value</th>
                <th>Description</th>
             </tr>
             <tr>
                <td>0</td>
                <td>Don't replace (default)</td>
             </tr>
             <tr>
                <td>1</td>
                <td>Replace</td>
             </tr>
             <tr>
                <td>2-255</td>
                <td>reserved</td>
             </tr>
             <td>Optional</td>
             <tr>
                <td>alphabet</td>
                <td>
                   Alphabet is used in the data encoding of SMS message. Following alphabets are supported.
                   <ol>
                      <li>ALPHA_DEFAULT</li>
                      <li>ALPHA_8_BIT</li>
                      <li>ALPHA_UCS2</li>
                      <li>ALPHA_RESERVED</li>
                   </ol>
                </td>
                <td>Optional</td>
             </tr>
             <tr>
                <td>charset</td>
                <td>
                   Charset is used when decoding the message in SMSC. Following charsets are supported.
                   <ol>
                      <li>UTF-8</li>
                      <li>UTF-16</li>
                   </ol>
                </td>
                <td>Optional</td>
             </tr>
             <tr>
                <td>isCompressed</td>
                <td>It allows SMS message compression.</td>
                <td>Optional</td>
             </tr>
             <tr>
                <td>messageClass</td>
                <td>
                   <table>
                      <tr>
                         <th>Value</th>
                         <th>Message Class</th>
                      </tr>
                      <tr>
                         <td>CLASS0</td>
                         <td>Flash messages. These are display only and not stored in the phone</td>
                      </tr>
                      <tr>
                         <td>CLASS1</td>
                         <td>ME specific - the SMS is stored in the mobile phone memory</td>
                      </tr>
                      <tr>
                         <td>CLASS2</td>
                         <td>SIM specific - the SMS is stored on the SIM</td>
                      </tr>
                      <tr>
                         <td>CLASS3</td>
                         <td>TE specific - this means the SMS is sent to a computer attached to the receiving mobile phone</td>
                      </tr>
                   </table>
                   Data encoding - defines the encoding scheme of the SMS message. You can find general data coding scheme from [here](https://en.wikipedia.org/wiki/Data_Coding_Scheme) for different combination of alphabet, message class, isCompressed values.
                </td>
                <td>Optional</td>
             </tr>
             <tr>
                <td>submitDefaultMsgId</td>
                <td>
                   Indicates a short message to send from a predefined list of messages stored on SMSC.<br>
                   <table>
                      <tr>
                         <th>Value</th>
                         <th>Description</th>
                      </tr>
                      <tr>
                         <td>0</td>
                         <td>reserved</td>
                      </tr>
                      <tr>
                         <td>1 - 254</td>
                         <td>Allowed values</td>
                      </tr>
                      <tr>
                         <td>255</td>
                         <td>reserved</td>
                      </tr>
                   </table>
                </td>
                <td>Optional</td>
             </tr>
         </table>
         <tr>
            <td>responseVariable</td>
            <td>Name of the variable to which the output of the operation should be assigned</td>
            <td>Yes</td>
         </tr>
         <tr>
            <td>overwriteBody</td>
            <td>Replace the Message Body in Message Context with the output of the operation (This will remove the payload from the above variable).</td>
            <td>Optional</td>
         </tr>
      </table>
