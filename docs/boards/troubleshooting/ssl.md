# SSL

## Self Signed Certificates

Issues with self-signed certificates can be resolved in 2 different ways:

1. Add the self-signed certificate
1. Disable TLS validation

### Add the self-signed certificate

To mount the certificate in the pods:

1. Create a secret containing the certificate

    ```bash
    kubectl create secret generic internal-ca --from-file=./cert.pem -n connections
    ```

    Where:

    - `cert.pem` is the name of your certificate file (this is also used below as the `subPath` in the volumeMounts section)
    - `connections` is the namespace where the Boards chart is installed (replace with your namespace)

1. Mount the secret in each applicable deployment by adding the following `volume` & `volumeMount` to your existing values yaml, then redeploy the Boards helm chart.

    ```yaml
    global:
        env:
            NODE_EXTRA_CA_CERTS: /etc/ssl/certs/internal-ca.pem

    core:
        volumes:
            - name: ssl-cert-vol
              secret:
                  secretName: internal-ca
        volumeMounts:
            - name: ssl-cert-vol
              mountPath: /etc/ssl/certs/internal-ca.pem
              subPath: cert.pem

    app:
        volumes:
            - name: ssl-cert-vol
              secret:
                  secretName: internal-ca
        volumeMounts:
            - name: ssl-cert-vol
              mountPath: /etc/ssl/certs/internal-ca.pem
              subPath: cert.pem

    user:
        volumes:
            - name: ssl-cert-vol
              secret:
                  secretName: internal-ca
        volumeMounts:
            - name: ssl-cert-vol
              mountPath: /etc/ssl/certs/internal-ca.pem
              subPath: cert.pem

    provider:
        volumes:
            - name: ssl-cert-vol
              secret:
                  secretName: internal-ca
        volumeMounts:
            - name: ssl-cert-vol
              mountPath: /etc/ssl/certs/internal-ca.pem
              subPath: cert.pem

    # if your email service is also using Self Signed Certificates
    events:
        volumes:
            - name: ssl-cert-vol
              secret:
                  secretName: internal-ca
        volumeMounts:
            - name: ssl-cert-vol
              mountPath: /etc/ssl/certs/internal-ca.pem
              subPath: cert.pem
    ```

### Disable TLS Validation

!!! warning

    This is not recommended for production environments.

You can add the environment variable `NODE_TLS_REJECT_UNAUTHORIZED: '0'`.

This value is required in `core`, `user` & `provider` deployments (and possibly `events` depending on the email server configuration).

```yaml
core:
    env:
        NODE_TLS_REJECT_UNAUTHORIZED: "0"
user:
    env:
        NODE_TLS_REJECT_UNAUTHORIZED: "0"
provider:
    env:
        NODE_TLS_REJECT_UNAUTHORIZED: "0"

# if required for your email server
events:
    env:
        NODE_TLS_REJECT_UNAUTHORIZED: "0"
```
