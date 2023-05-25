const cds = require('@sap/cds');
const assert = require('assert');
const AMQP = require("amqp10");

module.exports = class AEMClient {
    /**
     * SAP Advanced Event Mesh wrapper for CAP Nodejs using the AMQP protocol.
     * @param {Boolean} useJSON Specifies whether event data should be treated as JSON. Default: true
     */
    constructor(useJSON = true) {
        this.connectionInfo = cds.env.requires.SAPAEM.credentials;
        this.useJSON = useJSON;
        this.broker = null;
        assert(this.connectionInfo, 'No connection details specified in cds.requires.SAPAEM.credentials')
    }
    /**
     * Connects the AEM client to the cloud broker. Connection details should be specified in cds.requires.SAPAEM.credentials
     */
    connect = () => {
        assert(this.broker == null, 'Broker is already connected.');
        this.broker = new AMQP.Client(AMQP.Policy.merge({ defaultSubjects: false }));
        console.log("Advanced Event Mesh > Starting");
        return this.broker.connect(`${this.connectionInfo.protocol}://${this.connectionInfo.user}:${this.connectionInfo.password}@${this.connectionInfo.host}:${this.connectionInfo.port}`)
    }
    /**
     * Disconnects the AEM client with appropriate Close performatives and TCP socket teardowns.
     */
    disconnect = () => {
        assert(this.broker, 'Broker is not connected.');
        console.log("Advanced Event Mesh > Stopping");
        return this.broker.disconnect()
    }
    /**
     * Creates an AEM receiver which will receive events on the specified topics.
     * @param {Service} service CDS Service that should receive events on the topics. This name should include the namespace.
     * @param {String[]} topics Name (or array of names) of topics that should be received.
     */
    registerSubscriber = (service, topics = []) => {
        assert(this.broker, 'Broker is not connected.');
        (Array.isArray(topics) ? topics : [topics]).forEach(topic => {
            this.broker.createReceiver(topic).then(receiver => {
                console.log(`Advanced Event Mesh > Receiver created for ${topic}`);
                receiver.on('errorReceived', err => { return new Error(err); });
                receiver.on('message', msg => {
                    console.log(`Advanced Event Mesh > Received on topic ${topic}`);
                    return service.emit(topic, this.useJSON ? JSON.parse(msg.body) : msg.body);
                });
            });
        });
    };
    /**
     * Creates an AEM sender which can send events on the specified topics.
     * @param {Service} service CDS Service that would emit events on the topics. This name should include the namespace.
     * @param {String[]} topics Name (or array of names) of topics that the service would be sent.
     */
    registerPublisher = (service, topics) => {
        assert(this.broker, 'Broker is not connected.');
        (Array.isArray(topics) ? topics : [topics]).forEach(topic => {
            this.broker.createSender(topic).then(sender => {
                console.log(`Advanced Event Mesh > Sender created for ${topic}`);
                service.on(topic, msg => {
                    console.log(`Advanced Event Mesh > Sending to topic ${topic}`);
                    return sender.send(this.useJSON ? JSON.stringify(msg.data) : msg.data);
                });
            })
        });
    };
};
