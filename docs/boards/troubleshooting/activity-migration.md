# Activity Migration

## Missing Long Descriptions

This process will find links to long descriptions which were not imported correctly, mand attach missing long description content 
> Note: this process requires images from our Docker repository with date tags on or after 2021-03-22

### Process Overview

This service will:

1. mount the Connections Shared drive
1. find any migrated cards which have a link to the old "Long Description" (with `/downloadExtended/` in the URL)
1. use the Connections database to locate the files' path on the NFS drive
1. retrieve the file contents from the file path
1. save this full content into the card and overwrite the short summary version which previously was used
1. remove the link on the card to the Long Description
1. log statistics on how many cards were fixed

> Note: any changes made to the description (rich text area) by users since the migration will be over-written by the loaded content. If there are any cards which you want to keep the existing, simply delete the link to "Long Description" before running this process.

Steps:

1. Add the volume, volume mount & `FILE_PATH_ACTIVITIES_CONTENT_STORE` to the boards yaml config. For example:

        migration:
          # Ensure only one pod runs
          replicaCount: 1
          volumes:
            - name: connections-shared-drive
              nfs: 
                # Replace with IP address for the NFS server
                server: 192.168.10.1
                # path to the Connections Shared directory
                # for example "/opt/HCL/Connections/data/shared" or "/nfs/data/shared"
                path: /nfs/data/shared
            # CP deploy requires this next volume
            - name: mongo-secret-vol
              secret:
                secretName: mongo-secret
                defaultMode: 420
          volumeMounts:
            - name: connections-shared-drive
              mountPath: /data
            # CP deploy requires this next volume mount
            - name: mongo-secret-vol
              mountPath: /etc/mongodb/x509
          env:
            # the extension after /data can be found from the WebSphere ACTIVITIES_CONTENT_DIR variable
            FILE_PATH_ACTIVITIES_CONTENT_STORE: /data/activities/content

1. Replace the `volumes.nfs.server` IP and the `server.nfs.path` to the shared drive (e.g. `/nfs/data/shared` or `/opt/HCL/data/shared` etc)
1. Deploy the Activity Migration chart applicable for your deployment ([CP](/boards/cp/migration/) or [standalone Kubernetes](/boards/connections/migration/))
1. Review the pod logs for the status of how many long description were replaced
