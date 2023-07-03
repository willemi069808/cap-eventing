const cds = require('@sap/cds');
// const AEMClient = require('../../AEMClient');           // --> uses package amqp10
const AEMClient = require('../../AEMClient_XBMSG');     // --> uses package @sap/xb-msg-amqp-v100

cds.on('served', async (services) => {
    const aem = new AEMClient();
    aem.connect().then(() => {
        aem.registerSubscriber(services['gcoe.ReceiverService'], [
            'cap/demo/v1/toys/ownerCreated',
            'cap/demo/v1/toys/ownerChanged',
            'cap/demo/v1/toys/ownerDeleted'
        ]);
    });
});
module.exports = cds.server;
