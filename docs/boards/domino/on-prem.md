# HCL Domino REST API for Boards On-Premise

Huddo Boards supports authentication, user and group lookup with HCL Domino.

!!! tip

    See [Domino REST API for Boards Cloud](./cloud.md) for integration with Boards Cloud (hybrid installations).

---

## Prerequisites

1. [Domino REST API](https://opensource.hcltechsw.com/Domino-rest-api/tutorial/installconfig/index.html) installed and configured. Ensure you [setup the oauth.json](https://opensource.hcltechsw.com/Domino-rest-api/howto/VoltMX/configuring-keep-idplite-with-identity-service.html?h=oauth.json#set-up-domino-rest-api) file.
1. Enabled access to [names.nsf](https://opensource.hcltechsw.com/Domino-rest-api/howto/database/excludeddb.html?h=names.#procedure)

## Setup

1.  Configure OAuth

    **URLs**

    For an on premise installation the callback url & startup page is simple:

        https://<BOARDS_URL>/auth/domino/callback
        https://<BOARDS_URL>/auth/domino

    For example:

        https://boards.your.domain.com/auth/domino/callback
        https://boards.your.domain.com/auth/domino

        // if you have a context root (i.e. you would access boards application at /boards)
        https://your.domain.com/boards/auth/domino/callback
        https://your.domain.com/boards/auth/domino

    Please determine the URL for your environment and then [follow this guide](./oauth/index.md).

1.  [Configure Schema](./schema/index.md)

1.  [Configure Scope](./scope/index.md)

## Application Process

Please email [support@huddo.com](mailto://support@huddo.com) with the following details

| Item                 | Detail / example                                                |
| -------------------- | --------------------------------------------------------------- |
| Boards URL           | Your licence will be tied to this url                           |
| DOMINO_AUTH_URL      | HCL Domino REST API URL. e.g. *https://domino.example.com:8080* |
| DOMINO_CLIENT_ID     | The Domino Auth client id                                       |
| DOMINO_CLIENT_SECRET | The Domino Auth client secret                                   |
