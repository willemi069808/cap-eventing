const cds = require('@sap/cds');
const eventTopic = 'cap/demo/v1/toys/ownerChanged';

module.exports = async (srv) => {
    const messaging = await cds.connect.to('messaging')

    messaging.on(eventTopic, async req => {
        console.log('received >', req.event, req.data);

        const { Toy, Owner } = req.data;
        await UPDATE(cds.entities.Toys, Toy).with({ Owner: Owner });
        await INSERT.into(cds.entities.Changes).entries({
            Toy_ID: Toy,
            Data: `This toy now belongs to ${Owner}`
        });
    });
}