const cds = require('@sap/cds');
const AEMClient = require('../../AEMClient');

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
