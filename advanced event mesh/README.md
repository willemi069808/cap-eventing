# CAP Eventing with SAP Integration Suite, Advanced Event Mesh
CAP app to demonstrate eventing with SAP Integration Suite, Advanced Event Mesh

This project contains 2 separate CAP applications, to run locally, but connecting to SAP Integration Suite, Advanced Event Mesh on BTP for eventing.

## Event Mesh Setup
- Make sure SAP Integration Suite, Advanced Event Mesh is set up (see https://help.pubsub.em.services.cloud.sap/Cloud/ggs_signup.htm).
- Make sure you have created an Event Broker Service (Open 'Cluster Manager' and click 'Create Service').
- Take note of the 'Connection Details' to your broker by opening the details page of your Event Broker Service, tab 'Connect', option 'AMQP'.

## Usage

You can choose between 2 different AMQP packages (amqp10 or @sap/xb-msg-amqp-v100) by using either line 2 or 3 in server.js.

Create a .env file in both projects, with the following connection details. Make sure to put all info on 1 line:
```
cds.requires.SAPAEM.credentials = { "host": "xxx.messaging.solace.cloud", "port": 5671, "protocol": "amqps", "user": "solace-cloud-client", "password": "xxx"}
```

Terminal 1 (sending events):
```
cd emitter

npm install
npm run emitter
```

Terminal 2 (receiving events):
```
cd receiver

npm install
npm run receiver
```

