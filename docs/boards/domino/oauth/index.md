
# Configure Domino OAuth

This guide will describe how to add a new OAuth application for Boards users to login via Domino.

![oauth outcome](./outcome.png)

## Steps

1.  Open the REST API and click `Configuration`

    ![Rest API homepage](../main.png)

1.  Login

    ![login](../login.png)

1.  Click `Application Management - OAUTH`

    ![oauth](../admin.png)

1.  Click `Add Application`

    ![oauth](./oauth.png)

1.  Enter the following details and click `ADD`

    Determine the appropriate URL for your environment as per [our guide](../callback.md).

    - Application Name: `Huddo Boards`
    - Callback URL, e.g.

            https://<ON_PREM_BOARDS_URL>/auth/domino/callback
            https://boards.huddo.com/auth/domino/[encoded domain]/callback

    - Startup Page, e.g.

            https://<ON_PREM_BOARDS_URL>/auth/domino
            https://boards.huddo.com/auth/domino/[encoded domain]

    - Scope: `$DATA` (click `+` icon)
    - Contacts: `<YOUR_EMAIL>`

    ![newapp](./add.png)

1.  Click the `generate application secret` icon.

    ![generate secret](./generate-secret.png)

1.  Copy both the `App Id` and `App Secret`

    These will be referred to later as `CLIENT_ID` and `CLIENT_SECRET`
