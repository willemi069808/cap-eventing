# CAP Eventing with SAP Event Mesh
CAP app to demonstrate eventing with SAP Event Mesh

This project contains 2 separate CAP applications, to run locally, but connecting to SAP Event Mesh on BTP for eventing.

## Event Mesh Setup
Make sure SAP Event Mesh is set up (see https://help.sap.com/docs/SAP_EM/bf82e6b26456494cbdd197057c09979f/082b3dcbfde848b88dc78cd3d46a3d70.html).
When creating the SAP Event Mesh Service Instance you have to provide a NAME, and afterwards you create a Key also with a NAME. Both of these will be used below.


## Usage

Terminal 1 (sending events):
```
cd emitter

npm install
cds bind -2 INSTANCE_NAME:KEY_NAME
cds watch --profile hybrid --port 4005
```

Terminal 2 (receiving events):
```
cd receiver

npm install
cds bind -2 INSTANCE_NAME:KEY_NAME
cds watch --profile hybrid --port 4006
```

Alternatively to "cds bind -2 INSTANCE_NAME:KEY_NAME" you can also put the contents of the Service Key in your default-env.json file, as below:

```json
{
    "VCAP_SERVICES": {
        "enterprise-messaging": [
            {
                "label": "enterprise-messaging",
                "credentials": { ... }
            }
        ]
    }
}
```

