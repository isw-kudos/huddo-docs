# Huddo Boards for HCL Domino

Huddo Boards supports authentication, user and group lookup with HCL Domino.

> The steps below are still work in progress, this feature is not yet publicly released.

---

### Prerequisites

- Domino Proton (AppDev Pack >= 1.0.12) [Documentation](https://doc.cwpcollaboration.com/appdevpack/docs/en/admin_landing_page.html)
- Domino IAM service (AppDev Pack >= 1.0.12) [Overview](https://doc.cwpcollaboration.com/appdevpack/docs/en/iam_landing_page.html)
- User credentials (PEM certificate and Key) for an application user that Boards will use to read a names.nsf database via the Proton Service.

### Server setup

We will require 2 domains from you
- Domino Server domain (that has Proton listening)
- IAM Server domain

### IAM Setup

> **Callback id** The Huddo Boards callback uses a base64 encoded version of your Domino Server domain, you can use a service like [https://www.base64encode.org/](https://www.base64encode.org/) to achieve this

You will need to setup an Application in the IAM Service with the following details

| Item                       | Details                                                  |
| ---                        | ---                                                      |
| Application Name           | Huddo Boards                                             |
| Application Home Page      | https://boards.huddo.com                                 |
| Authorization Callback URL | https://boards.huddo.com/auth/domino/[id above]/callback |
| Proton Access              | Domino Database Access                                   |
| Functional ID              | LDAP CN for IAM application user                         |
| Scopes                     | Offline Access                                           |

### Proton User

The boards application backend uses a single user to access your names.nsf directory, you will need to setup a user with appropriate access and import a PEM Certificate as detailed below.

### Application Process

Please email [support@huddo.com](mailto://support@huddo.com) with the following details

| Item             | Detail / example                                                             |
| ---              | ---                                                                          |
| IAM domain       | *https://iam.example.com*                                                    |
| Domino domain    | *https://proton.example.com*                                                 |
| Proton Port      | *3002*                                                                       |
| client_id        | The IAM Application client id                                                |
| client_secret    | The IAM Application client secret                                            |
| user_certificate | PEM encoded certificate that represents the Proton User above                |
| user_key         | Private Key for the above certificate                                        |
| group_search     | Please indicate whether you would like us to search Groups in your directory |

