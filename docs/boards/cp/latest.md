# Moving from your local HCL Connections repository to Huddo Boards latest releases.

1. [Follow this guide](/boards/images/) to configure your Kubernetes with access to our images hosted in Quay.io.

1. Once confirmed by reply email, update your `boards-cp.yaml` file as per [this example](/assets/config/kubernetes/boards-cp.yaml).  At the top set

    - `global.imageTag` as the date of our latest [release](/boards/releases/)
    - `global.imagePullSecret` to the name of the secret you created
    
        e.g. `<USERNAME>-pull-secret`

        ![Example](/assets/quay/config-yaml.png)

1. Run the Helm upgrade command with our new Huddo chart to apply the changes.

        helm upgrade huddo-boards-cp https://docs.huddo.com/assets/config/kubernetes/huddo-boards-cp-1.1.0.tgz -i -f ./boards-cp.yaml --namespace connections

    !!! note
        The chart name has changed. You may need to `helm delete kudos-boards-cp` first
