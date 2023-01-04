# Latest Boards releases directly from Dockerhub

!!! warning
    These instructions are in the process of being deprecated. We are moving to hosting our images in Quay.io instead of Dockerhub. Please see [these instructions](/boards/cp/latest/).

You can get the latest versions of Huddo Boards Docker by subscribing to our own repository in dockerhub as follows:

1.  Create a [dockerhub](https://hub.docker.com) account if you do not already have one.
1.  Email [support@huddo.com](mailto:support@huddo.com) requesting access to Huddo Boards Docker repository, include your dockerhub account name in the email.
1.  Create kubernetes secret with your dockerhub account credentials

        kubectl create secret docker-registry dockerhub --docker-server=docker.io --docker-username=[user] --docker-password=[password] --docker-email=[email] --namespace=connections

1.  Once confirmed by reply email, update your `boards-cp.yaml` file as per [this example](/assets/config/kubernetes/boards-cp-dockerhub.yaml).

    1. At the top set

        - `global.imagePullSecret` to `dockerhub`
        - remove your customised `global.repository`
        - `global.imageTagSuffix` as the date of our latest [release](/boards/releases/) and uncomment it

    1. Add `image.name` (blank) and `image.tag` for each service as per [this example](/assets/config/kubernetes/boards-cp-dockerhub.yaml).
    
        !!! tip 
            Some of the services (`app`, `provider`, `notification`) might not be in your `boards-cp.yaml` file, you must add them.

        ![Example](/assets/boards/cp/image-config-dockerhub.png)

1.  Run helm to apply the changes.

        helm upgrade kudos-boards-cp https://docs.huddo.com/assets/config/kubernetes/kudos-boards-cp-3.1.4.tgz -i -f ./boards-cp.yaml --namespace connections --recreate-pods
