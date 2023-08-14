# Troubleshoot MongoDB

## Connect to Mongo

You may need to connect to Mongo for validation or other changes. To connect to Kubernetes Mongo:

- In Component Pack

        kubectl exec -it mongo-0 -c mongo -n connections -- mongo --ssl --sslPEMKeyFile /etc/mongodb/x509/user_admin.pem --sslCAFile /etc/mongodb/x509/mongo-CA-cert.crt --host mongo-0.mongo.connections.svc.cluster.local --authenticationMechanism=MONGODB-X509 --authenticationDatabase '$external' -u C=IE,ST=Ireland,L=Dublin,O=IBM,OU=Connections-Middleware-Clients,CN=admin,emailAddress=admin@mongodb


        # CP Mongo5
        kubectl exec -it mongo5-0 -c mongo5 -n connections -- mongosh --tls --tlsCertificateKeyFile /etc/ca/user_admin.pem --tlsCAFile /etc/ca/internal-ca-chain.cert.pem --host mongo5-0.mongo5.connections.svc.cluster.local --authenticationMechanism=MONGODB-X509 --authenticationDatabase '$external' -u C=IE,ST=Ireland,L=Dublin,O=IBM,OU=Connections-Middleware-Clients,CN=admin,emailAddress=admin@mongodb

- Standalone deployment

    1.  get the name of the mongo pod

            kubectl get pods --all-namespaces

            NAMESPACE     NAME                                     READY   STATUS    RESTARTS   AGE
            boards        mongo-67696548c-xpdqh                    1/1     Running   0          35s

    1. exec into the pod using the mongosh (or mongo) command - replacing pod name and namespace

            kubectl exec -it mongo-67696548c-xpdqh -n boards -- mongosh --host mongo-service:27017

## Access Boards Data

1. check the database names

        show dbs

1. open the db containing board nodes (select as appropriate)

        # CP
        use boards-app

        # Standalone
        use kudos-boards-service

1. find all boards
        
        db.nodes.find({ type: 'board' })

1. find a board from a particular activitity
        
        db.nodes.find({ providerID: 'activities-id-goes-here' })
        
1. find the members for a particular board

        db.boardmembers.find({ board: ObjectId("_id-of-board-found-above") })
        
## Replace Member of a Board

1. open the db containing users (select as appropriate)

        # CP
        use boards-user

        # Standalone
        use kudos-user-service

1. find the users in question, e.g Andrew & Nicky

        db.users.find({ name: "Andrew Welch" })
        { "_id" : ObjectId("617891eae72f26802c4bec5e"), "email" : "awelch@isw.net.au", ....

        db.users.find({ name: "Nicky Tope" })
        { "_id" : ObjectId("617891ed660876da990253b7"), "email": "ntope@isw.net.au", .....

1. switch to the [boards app](#access-boards-data)

1. find the members for a particular board (substitute the ID)

        db.boardmembers.find({ board: ObjectId("<BOARD_ID>") })

1. replace `user A` with `user B`, e.g. Andrew with Nicky

        db.boardmembers.updateOne({ board: ObjectId("<BOARD_ID>"), 'entity.kind': 'User', 'entity.id': '617891eae72f26802c4bec5e' }, { $set: { 'entity.id': '617891ed660876da990253b7' }})
