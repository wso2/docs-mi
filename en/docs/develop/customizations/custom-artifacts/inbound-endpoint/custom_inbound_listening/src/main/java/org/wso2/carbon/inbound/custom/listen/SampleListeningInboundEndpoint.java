/*
 *  Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 *  WSO2 LLC. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 */

package org.wso2.carbon.inbound.custom.listen;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.synapse.inbound.InboundProcessorParams;
import org.wso2.carbon.inbound.endpoint.protocol.generic.GenericInboundListener;

public class SampleListeningInboundEndpoint extends GenericInboundListener{

	private static final Log log = LogFactory.getLog(SampleListeningInboundEndpoint.class);

    /**
     * Constructor
     *
     * @param params  Parameters of the inbound endpoint
     */
   public SampleListeningInboundEndpoint(InboundProcessorParams params) {
       super(params);
	   log.info("Initialized the custom listening inbound endpoint.");
   }

    /**
     * Initialize the listening
     */
    public void init() {
        //TODO : need to implement the logic here
        log.info("Inside the init method, listening starts here ...");
    }

    /**
     * Stopping the inbound endpoint
     */
    public void destroy() {
        //TODO : need to implement the logic here
        log.info("Inside the destroy method, destroying the listening inbound ...");
    }

    /**
     * Implement pause method with necessary logic to enable graceful shutdown in your custom inbound endpoint.
     * <p>
     * pause() temporarily stops accepting incoming messages without destroying
     * the listener or releasing resources, allowing the endpoint to be resumed later.
     */
    @Override
    public void pause(){
        //TODO : need to implement the logic here
        log.info("Inside the pause method, Pausing the listening inbound...");
    }

    /**
     * Implement activate(), deactivate() and isDeactivated() methods with necessary logic
     * to enable dynamic control (activate/deactivate) in your custom inbound endpoint
     */
    @Override
    public boolean activate() {
        //TODO : need to implement the logic here
        log.info("Inside the activate method, activating the listening inbound after a deactivation...");
        return false;
    }

    @Override
    public boolean deactivate() {
        //TODO : need to implement the logic here
        log.info("Inside the deactivate method, deactivating the listening inbound...");
        return false;
    }

    @Override
    public boolean isDeactivated() {
        //TODO : need to implement the logic here
        log.info("Inside the isDeactivated method, check running status of the listening inbound...");
        return false;
    }

}
