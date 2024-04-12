# HCL Domino REST API for Boards Cloud

Huddo Boards Cloud supports authentication, user and group lookup with HCL Domino.

!!! tip

    See [Domino REST API for Boards On-Premise](./index.md) for Boards On Premise installations.

---

## Prerequisites

1. [Domino REST API](https://opensource.hcltechsw.com/Domino-rest-api/tutorial/installconfig/index.html) installed and configured. Ensure you [setup the oauth.json](https://opensource.hcltechsw.com/Domino-rest-api/howto/VoltMX/configuring-keep-idplite-with-identity-service.html?h=oauth.json#set-up-domino-rest-api) file.
1. Enabled access to [names.nsf](https://opensource.hcltechsw.com/Domino-rest-api/howto/database/excludeddb.html?h=names.#procedure)

## Setup

1.  Configure OAuth

    **URLs**

    Boards Cloud uses a base64 encoded version of your Domino Server domain, you can use a service like [https://www.base64encode.org/](https://www.base64encode.org/) to achieve this.

        // callback URL
        https://boards.huddo.com/auth/domino/[ encoded domain ]/callback

        // startup page
        https://boards.huddo.com/auth/domino/[ encoded domain ]

    > e.g. the callback url would look like this: `https://boards.huddo.com/auth/domino/cHJvdG9uLmV4YW1wbGUuY29t/callback`

    Please determine the URL for your environment and then [follow this guide](./oauth/index.md).

1.  [Configure Schema](./schema/index.md)

1.  [Configure Scope](./scope/index.md)

## Application Process

Please email [support@huddo.com](mailto://support@huddo.com) with the following details

| Item                 | Detail / example                                                |
| -------------------- | --------------------------------------------------------------- |
| DOMINO_AUTH_URL      | HCL Domino REST API URL. E.g. *https://domino.example.com:8080* |
| DOMINO_CLIENT_ID     | The IAM Application client id                                   |
| DOMINO_CLIENT_SECRET | The IAM Application client secret                               |
