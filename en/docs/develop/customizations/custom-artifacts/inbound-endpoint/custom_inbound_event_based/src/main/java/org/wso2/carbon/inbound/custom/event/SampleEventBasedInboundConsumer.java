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

package org.wso2.carbon.inbound.custom.event;

import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.synapse.core.SynapseEnvironment;
import org.wso2.carbon.inbound.endpoint.protocol.generic.GenericEventBasedConsumer;

public class SampleEventBasedInboundConsumer extends GenericEventBasedConsumer {

    private static final Log log = LogFactory.getLog(SampleEventBasedInboundConsumer.class);

    /**
     * @param properties
     * @param name
     * @param synapseEnvironment
     * @param injectingSeq
     * @param onErrorSeq
     * @param coordination
     * @param sequential
     */
    public SampleEventBasedInboundConsumer(Properties properties, String name, SynapseEnvironment synapseEnvironment,
                                           String injectingSeq, String onErrorSeq, boolean coordination, boolean sequential) {
        super(properties, name, synapseEnvironment, injectingSeq, onErrorSeq, coordination, sequential);
        log.info("Initialized the busy waiting consumer.");
    }

    /**
     * Start listening for incoming events on the inbound endpoint.
     * <p>
     * This is the main entry point that activates the event listener and begins processing
     * incoming events from the configured source.
     */
    @Override
    public void listen() {
        //TODO: Implement logic to start listening for events
        log.info("Inside the listen method. Starting to listen for events.");
    }

    /**
     * Gracefully suspend event processing.
     * <p>
     * pause() temporarily halts the processing of incoming events without destroying the connection
     * or releasing resources, allowing the endpoint to resume event processing later.
     */
    @Override
    public void pause(){
        //TODO: Implement logic to gracefully suspend event processing
        log.info("Inside the pause method. Gracefully suspending event processing.");
    }

    /**
     * Implement resume() method to enable dynamic lifecycle control (activate/deactivate) of the inbound endpoint.
     * <p>
     * resume() should re-establish the connections and restore the endpoint to an active state.
     * <p>
     * Note: While resume() and destroy() methods are loosely coupled, ensure that resume() performs all necessary
     * restoration actions corresponding to the cleanup performed in destroy().
     */
    @Override
    public void resume(){
        //TODO: Implement logic to restore endpoint to active state
        log.info("Inside the resume method. Restoring the event-based inbound endpoint.");
    }

    /**
     * Completely shut down the event listener and release all resources.
     * <p>
     * destroy() terminates event listening, closes all connections, and releases allocated resources.
     * <p>
     * Note: destroy() is coupled with resume() to enable dynamic control of event-based inbound endpoint.
     */
    @Override
    public void destroy() {
        //TODO: Implement logic to terminate event listening and release resources
        log.info("Inside the destroy method. Terminating event listening and releasing resources.");
    }
}
