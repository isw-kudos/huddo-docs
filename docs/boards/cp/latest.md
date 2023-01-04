# Moving from your local HCL Connections repository to Huddo Boards latest releases.

1. [Follow this guide](/boards/images/) to get access to our images.

1. Once confirmed by reply email, update your `boards-cp.yaml` file as per [this example](/assets/config/kubernetes/boards-cp-quay.yaml).

    1. At the top set

        - `global.repository` to `quay.io/huddo`
        - `global.imageTag` as the date of our latest [release](/boards/releases/)
        - `global.imagePullSecret` to the name of the secret you created
        
            e.g. `<USERNAME>-pull-secret`

            ![Example](/assets/quay/config-yaml.png)

    1. Add `image.tag` for each service as per [this example](/assets/config/kubernetes/boards-cp-quay.yaml).
    
        !!! tip 
            Some of the services (`app`, `provider`, `notification`) might not be in your `boards-cp.yaml` file, you must add them.

        ![Example](/assets/boards/cp/image-config.png)

1. Run the Helm upgrade command to apply the changes.

        helm upgrade kudos-boards-cp https://docs.huddo.com/assets/config/kubernetes/kudos-boards-cp-3.1.4.tgz -i -f ./boards-cp.yaml --namespace connections --recreate-pods
