## Run latest Huddo Boards for Component Pack

### Setup Dockerhub Credentials

Please register your Dockerhub credentials with the ISW Huddo team and then run the following command

    kubectl create secret docker-registry dockerhub --docker-server=docker.io --docker-username=<username> --docker-password=<password> --docker-email=<email> --namespace=connections

### Update config to pull images from Dockerhub

```yaml
global
  env:
    repository: docker.io/kudos-boards-docker
```
### Deploy

Run the following update command

    helm upgrade kudos-boards-cp https://docs.huddo.com/assets/config/kubernetes/kudos-boards-cp-3.0.0.tgz -i -f ./boards-cp.yaml --namespace connections --recreate-pods
