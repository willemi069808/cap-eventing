const cds = require('@sap/cds');
const AEMClient = require('../../AEMClient');

cds.on('served', async (services) => {
    const aem = new AEMClient();
    aem.connect().then(() => {
        aem.registerPublisher(services['gcoe.EmitterService'], 'cap/demo/v1/toys/ownerChanged');
    });
});
module.exports = cds.server;
