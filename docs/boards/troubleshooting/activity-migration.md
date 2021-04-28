# Activity Migration

## Missing Long Descriptions

This process will find and fix cards with long descriptions which were not imported correctly due to an incorrect HTTP 404 response from the HCL Connections API
> Note: this requires Boards images with date tags on or after 2021-03-22

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

### Steps

1. Add the volume, volume mount & `FILE_PATH_ACTIVITIES_CONTENT_STORE` to the boards yaml config. For example:

    ```yaml
    migration:
      # configure access to the Connections Shared mount
      sharedDrive:
        # Replace with IP address for the NFS server
        server: 192.168.10.56
        # for example "/opt/HCL/Connections/data/shared" or "/nfs/data/shared"
        path: /nfs/data/shared
      env:
        # the extension after /data can be found from the WebSphere ACTIVITIES_CONTENT_DIR variable
        FILE_PATH_ACTIVITIES_CONTENT_STORE: /data/activities/content
    ```

1. Replace the `sharedDrive.server` IP and the `sharedDrive.path` to the shared drive (e.g. `/nfs/data/shared` or `/opt/HCL/data/shared` etc)
1. Deploy the Activity Migration chart applicable for your deployment ([CP v3](/boards/cp/migration/) or [standalone Kubernetes v5](/boards/connections/migration/))
1. Review the pod logs for the status of how many long description were replaced
