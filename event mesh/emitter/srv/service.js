const cds = require('@sap/cds');
const eventTopic = 'cap/demo/v1/toys/ownerChanged';

module.exports = async (srv) => {
    const messaging = await cds.connect.to('messaging')

    srv.on('changeOwner', async req => {
        const id = req.params[0];
        const { newOwner } = req.data;
        const data = { Toy: id, Owner: newOwner };

        await messaging.emit(eventTopic, data);
        req.notify(`Event sent > ${eventTopic}`);

        await UPDATE(cds.entities.Toys, id).with({ Owner: newOwner });
        return SELECT.from(cds.entities.Toys, id);
    });
}