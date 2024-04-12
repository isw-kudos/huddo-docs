# Huddo Boards for HCL Domino Proton (DEPRECATED)

!!! warning

    These instructions are deprecated. Please see the new [Domino REST API](./index.md) for new installations. For existing installations we recommend following our [migration guide](./migration/index.md).

Huddo Boards supports authentication, user and group lookup with HCL Domino.

---

### Prerequisites

-   Domino Proton (AppDev Pack >= 1.0.12) [Documentation](https://doc.cwpcollaboration.com/appdevpack/docs/en/admin_landing_page.html)
-   Domino IAM service (AppDev Pack >= 1.0.12) [Overview](https://doc.cwpcollaboration.com/appdevpack/docs/en/iam_landing_page.html)
-   User credentials (PEM certificate and Key) for an application user that Boards will use to read a names.nsf database via the Proton Service.

### Setup

We will require 2 domains from you

-   Domino Server domain (that has Proton listening)
-   IAM Server domain

### IAM Setup

**Callback URL**

**Huddo Boards Cloud**: Boards cloud uses a base64 encoded version of your Domino Server domain, you can use a service like [https://www.base64encode.org/](https://www.base64encode.org/) to achieve this, the callback format looks like this: `https://boards.huddo.com/auth/domino/[ encoded domain ]/callback`

> e.g. for domain proton.example.com the callback url would be https://boards.huddo.com/auth/domino/cHJvdG9uLmV4YW1wbGUuY29t/callback

**Huddo Boards On Prem**: For an on premise installation we use a global authentication setup so the callback url does not need an id. depending on your deployment it could look like one of the following:

-   `https://boards.your.domain.com/auth/domino/callback`
-   `https://your.domain.com/boards/auth/domino/callback` if you have a context root (i.e. you would access boards application at /boards).

You will need to setup an Application in the IAM Service with the following details

| Item                       | Details                                                                      |
| -------------------------- | ---------------------------------------------------------------------------- |
| Application Name           | Huddo Boards                                                                 |
| Application Home Page      | https://boards.huddo.com (or your boards url for an on-premise installation) |
| Authorization Callback URL | Callback URL above                                                           |
| Proton Access              | Domino Database Access                                                       |
| Functional ID              | LDAP CN for IAM application user                                             |
| Scopes                     | Offline Access                                                               |

### Proton User

The boards application backend uses a single user to access your names.nsf directory, you will need to setup a user with appropriate access and import a PEM Certificate as detailed below, for more information, see [HCL's Documentation](https://doc.cwpcollaboration.com/appdevpack/docs/en/domino-db-quick-start.html#secure-network-requests)

### Application Process

Please email [support@huddo.com](mailto://support@huddo.com) with the following details

| Item             | Detail / example                                                             |
| ---------------- | ---------------------------------------------------------------------------- |
| IAM domain       | *https://iam.example.com*                                                    |
| Domino domain    | *https://proton.example.com*                                                 |
| Boards url       | For on-premise installations (your licence will be tied to this url)         |
| Proton Port      | _3002_                                                                       |
| client_id        | The IAM Application client id                                                |
| client_secret    | The IAM Application client secret                                            |
| user_certificate | PEM encoded certificate that represents the Proton User above                |
| user_key         | Private Key for the above certificate                                        |
| group_search     | Please indicate whether you would like us to search Groups in your directory |
