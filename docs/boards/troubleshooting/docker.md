# Huddo Boards Docker

## Authentication

### Logging-in doesn't work

Please revoke your OAuth access to Huddo Boards Cloud within HCL Connections.
Go to `https://<YOUR_CONNECTIONS_URL>/connections/oauth/apps` (replacing `<YOUR_CONNECTIONS_URL>`) and press 'Revoke'

![Application Access](/assets/connections/application-access.png)

---

## Kubernetes Ingress Controller Version

To check the version of the ingress controller run this command

    kubectl get pods --all-namespaces | grep ingress-controller
    kubectl exec -it <POD_NAME> -n <NAMESPACE> -- /nginx-ingress-controller --version

where

- `<POD_NAME>` is the name of the Ingress controller pod
- `<NAMESPACE>` is the namespace of the Ingress controller pod. e.g. `kube-system` or `connections`

For example

    kubectl get pods --all-namespaces | grep ingress
    kubectl exec -it nginx-ingress-controller-84d4dfc9b-7gv4m -n kube-system -- /nginx-ingress-controller --version

Example

    -------------------------------------------------------------------------------
    NGINX Ingress controller
      Release:    0.23.0
      Build:      git-be1329b22
      Repository: https://github.com/kubernetes/ingress-nginx
    -------------------------------------------------------------------------------

As of 0.22.0 the Ingress controller rewrite-target definition changed. If Boards is installed at a context root, the format must include the regular expression like below. This is already the default in the `kudos-boards-cp-2.0.1.tgz` chart.

    webfront:
      ingress:
        path: /boards/(.*)
        annotations:
          nginx.ingress.kubernetes.io/rewrite-target: /$1
          # Add for CP7.0 - use the shared ingress-nginx
          kubernetes.io/ingress.class: "nginx"

    core:
      ingress:
        path: /api-boards/(.*)
        annotations:
          nginx.ingress.kubernetes.io/rewrite-target: /$1
          # Default annotations below which should be included such that they are not overwritten
          nginx.ingress.kubernetes.io/proxy-body-size: 50m
          nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"
          nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
          nginx.ingress.kubernetes.io/affinity: cookie
          # Add for CP7.0 - use the shared ingress-nginx
          kubernetes.io/ingress.class: "nginx"