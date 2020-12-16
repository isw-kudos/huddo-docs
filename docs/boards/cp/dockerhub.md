## Moving from your local HCL Connections repository to Huddo Boards latest releases.

You can get the latest versions of Huddo Boards Docker by subscribing to our own repository in dockerhub as follows:

1. Create a [dockerhub](https://hub.docker.com) account if you do not already have one.
1. Email [support@huddo.com](mailto:support@huddo.com) requesting access to Huddo Boards Docker repository, include your dockerhub account name in the email.
1. Create kubernetes secret with your dockerhub account credentials

        kubectl create secret docker-registry dockerhub --docker-server=docker.io --docker-username=[user] --docker-password=[password] --docker-email=[email] --namespace=connections

1. Once confirmed by reply email, update your `boards-cp.yaml` file as per [this example](/assets/config/kubernetes/boards-cp-dockerhub.yaml).

    - Change the `global.imagePullSecret` to `dockerhub`
    - Remove your customised `global.repository`
    - Check our [releases](https://docs.huddo.com/boards/cp/releases/) page to get the latest release date tag. Add this date tag as `global.imageTagSuffix` and uncomment the line as per the example.
    - Add (blank) image name and tag for each service as per the example. *Note:* some of the services (app, provider, notification) will not be in your boards-cp.yaml file, you should ADD THEM.

1. Run helm to apply the changes.

        helm upgrade kudos-boards-cp https://docs.huddo.com/assets/config/kubernetes/kudos-boards-cp-2.0.0.tgz -i -f ./boards-cp.yaml --namespace connections --recreate-pods

