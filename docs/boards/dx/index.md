# Boards for HCL DX

## Prerequisites

1.  HCL DX environment
1.  Environment to host Boards, either:

    -   Kubernetes cluster with `kubectl` installed & authenticated, or
    -   Docker

## Steps

1. Setup [WebSphere OAuth](./auth/websphere.md)

1. Deploy Boards in either:

    - [Kubernetes](../kubernetes/index.md) or
    - [Docker](../aio/index.md)

1. Configure [SSO for Boards](./auth/sso.md)

1. Install & configure the [Boards portlet](./portlet/index.md)

## Integration options

The [Boards API](../api/index.md) is the simplest way of extending Boards into your HCL DX environment.

To authenticate, you will need to use the user's API Token. This can be obtained on behalf of the user via SSO. Simply request the `/user/auth/dx/<BASE64_HOSTNAME>/apitoken` endpoint from the [Boards API](https://boards.api.huddo.com/#/default/GetAPITokenBySSO) from the client-side (browser) and include the DX session cookies. Based on your deployment architecture this can be achieved in two ways;

1.  Same Domain

    If your Boards API is deployed on the same domain as your DX server, you can simply request the API Token from the Boards API like this:

        https://<DX_SERVER>/api-boards/user/auth/dx/<BASE64_HOSTNAME>/apitoken

1.  Different Domain

    If your DX server is not on the same domain as the Boards server, you will need to [configure the DX proxy](./auth/proxy.md) to pass the request through your DX server to the Boards server.

    The URL will then look like this:

        https://<DX_SERVER>/wps/proxy/https/<BOARDS_URL>/user/auth/dx/<BASE64_HOSTNAME>/apitoken

    For example:

        https://dx.company.com/wps/proxy/https/boards.api.huddo.com/user/auth/dx/ZHguY29tcGFueS5jb20=/apitoken
