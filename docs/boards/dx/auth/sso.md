### Allow SSO for Boards

!!! tip

    This task is only required if Boards is hosted on a different domain to HCL DX

## Steps

Edit the config to include the following,

1.  haproxy.cfg

    Edit the config using the following command

    `kubectl edit configmap <DX_DEPLOYMENT>-haproxy -n <DX_NAMESPACE> -o yaml`

    For example:

    `kubectl edit configmap hcl-dx-dev1-haproxy -n hcl-dx-dev1 -o yaml`

    Add the following line

        http-response replace-header Set-Cookie ^(.*) \1;\ SameSite=None;\ Secure

    For example:

    ![outcome](./haproxy.png)

1.  httpd.conf

        Header edit Set-Cookie ^(.*)$ "$1; Secure; SameSite=None"
