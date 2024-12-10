# Configuration Options

## Shared Options

Please set the following environment variables in your config file as required

| Key                                       | Description                                                                                                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global.env.API_GATEWAY`                  | Fully qualified URL of the API in the format `https://[API_URL]`                                                                                                          |
| `webfront.env.DEFAULT_TEAM`               | Name of the team users will primarily login with.</br>This will be shown on the login page.</br>**Optional**: Only set if you are authenticating with multiple providers. |
| `licence.env.LICENCE`                     | Licence key obtained from the [Huddo Store](https://store.huddo.com)                                                                                                      |
| `events.env.NOTIFIER_EMAIL_HOST`          | SMTP gateway hostname, e.g. `smtp.ethereal.com`                                                                                                                           |
| `events.env.NOTIFIER_EMAIL_USERNAME`      | **Optional**: SMTP gateway authentication.<br/>Setting a value will enable auth and use the default port of `587`                                                         |
| `events.env.NOTIFIER_EMAIL_PASSWORD`      | **Optional**: SMTP gateway authentication password                                                                                                                        |
| `events.env.NOTIFIER_EMAIL_PORT`          | **Optional**: SMTP gateway port. <br/>Default: `25` (**OR** `587` if `NOTIFIER_EMAIL_USERNAME` is set)                                                                    |
| `events.env.NOTIFIER_EMAIL_FROM_NAME`     | **Optional**: Emails are sent from this name.<br/>Default: `Huddo Boards`                                                                                                 |
| `events.env.NOTIFIER_EMAIL_FROM_EMAIL`    | **Optional**: Emails are sent from this email address.<br/>Default: `no-reply@huddo.com`                                                                                  |
| `events.env.NOTIFIER_EMAIL_SUPPORT_EMAIL` | **Optional**: Support link shown in emails.<br/>Default: `support@huddo.com`                                                                                              |
| `events.env.NOTIFIER_EMAIL_HELP_URL`      | **Optional**: Help link shown in new user welcome email.<br/>Default: `https://docs.huddo.com/boards/howto/knowledgebase/`                                                |
| `events.env.NOTIFIER_EMAIL_OPTIONS`       | **Optional**: Custom NodeMailer email options (insecure tls etc).<br/>For example: `"{\"ignoreTLS\": true,\"tls\":{\"rejectUnauthorized\":false}}"`                       |
| `user.env.DISABLE_WELCOME_EMAIL`          | **Optional**: Set to disable welcome emails for users                                                                                                                     |

## Provider Specific Options

### HCL Connections

!!! tip

    **Optional**: These settings are only required if you are using HCL Connections as your authentication provider.

| Key                                   | Description                                                                                                            |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `provider.env.WIDGET_ID`              | **Optional**: ID of the Community widget configured in [this step](../connections/widgets-on-prem.md#community-widget) |
| `user.env.CONNECTIONS_NAME`           | **Optional**: If you refer to 'Connections' by another name, set it here                                               |
| `user.env.CONNECTIONS_CLIENT_ID`      | oAuth client-id, usually `huddoboards`                                                                                 |
| `user.env.CONNECTIONS_CLIENT_SECRET`  | oAuth client-secret as configured in [this step](../connections/auth-on-prem.md)                                       |
| `user.env.CONNECTIONS_URL`            | HCL Connections URL, e.g. `https://connections.example.com`                                                            |
| `user.env.CONNECTIONS_ADMINS`         | Emails or GUIDs of users to grant admin permissions.<br/>e.g. `"[\"admin1@company.example.com\", \"PROF_GUID_2\"]`"    |
| `user.env.CONNECTIONS_KEYCLOAK_URL`   | **Optional**: See [keycloak authentication](../connections/keycloak.md) for more information                           |
| `user.env.CONNECTIONS_KEYCLOAK_REALM` | **Optional**: See [keycloak authentication](../connections/keycloak.md) for more information                           |
| `user.env.CONNECTIONS_KEYCLOAK_PATH`  | **Optional:** Keycloak path</br>Default: `/auth/realms`</br>Customise this to `/realms` as of Keycloak v22             |

---

### HCL Domino

!!! tip

    **Optional**: These settings are only required if you are using HCL Domino as your authentication provider.

| Key                                             | Description                                                                                                                                             |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user.env.DOMINO_AUTH_URL`                      | HCL Domino REST API URL. See [domino authentication](../domino/index.md) for more information                                                           |
| `user.env.DOMINO_CLIENT_ID`                     | oAuth client-id, see [domino authentication](../domino/index.md) for more information                                                                   |
| `user.env.DOMINO_CLIENT_SECRET`                 | oAuth client-secret, see [domino authentication](../domino/index.md) for more information                                                               |
| `user.env.DOMINO_ADMINS`                        | **Optional**: Emails or GUIDs of users to grant admin permissions.<br/>See [domino authentication](../domino/index.md) for more information             |
| `user.env.DOMINO_USE_PROFILE_IMAGE_ATTACHMENTS` | **Optional**: set `true` to enable using profile images<br>See [domino authentication](../domino/index.md) for more information                         |
| `user.env.DOMINO_PROFILE_IMAGE_NAME`            | **Optional**: file name of profile images. Uses first image attached if not set<br>See [domino authentication](../domino/index.md) for more information |
| `user.env.DOMINO_AUTH_SCOPE`                    | **Optional**: defaults to `$DATA`<br>See [domino authentication](../domino/index.md) for more information                                               |
| `user.env.DOMINO_REST_SCOPE`                    | **Optional**: defaults to `directorylookup`<br>See [domino authentication](../domino/index.md) for more information                                     |

---

### HCL Digital Experience (DX)

!!! tip

    **Optional**: These settings are only required if you are using HCL DX as your authentication provider.

| Key                              | Description                                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `user.env.DX_URL`                | HCL DX URL, e.g. `https://dx.company.com`                                                              |
| `user.env.DX_CLIENT_ID`          | oAuth client-id, see [dx authentication](../dx/auth/websphere.md) for more information                 |
| `user.env.DX_CLIENT_SECRET`      | oAuth client-secret, see [dx authentication](../dx/auth/websphere.md) for more information             |
| `user.env.DX_ADMINS`             | **Optional**: Emails or GUIDs of users to grant admin permissions.                                     |
| `user.env.DX_AUTH_PROVIDER_NAME` | **Optional**: name of the [OAuth Service Provider](../dx/auth/websphere.md). Defaults to `OAuthConfig` |

---

### Microsoft Active Directory (AD)

!!! tip

    **Optional**: These settings are only required if you are using Microsoft Active Directory (AD) as your authentication provider.

Please follow the steps in the [Microsoft Active Directory Federation Service](../msad/index.md) guide to configure your AD FS server, and the Huddo Boards application group.

| Key                                | Description                             | Example / Default                                 |
| ---------------------------------- | --------------------------------------- | ------------------------------------------------- |
| `user.env.MSAD_NAME`               | Name on the login button                | `Microsoft AD`                                    |
| `user.env.MSAD_ADMINS`             | Email/ID of users to grant admin access | `["admin@example.com", "admin2@example.com"]`     |
| `user.env.MSAD_FS_URL`             | AD FS server URL                        | `https://adfs.example.com`                        |
| `user.env.MSAD_CLIENT_ID`          | AD FS client id                         |                                                   |
| `user.env.MSAD_CLIENT_SECRET`      | AD FS client secret                     |                                                   |
| `user.env.MSAD_LDAP_URL`           | URL of LDAP server                      | `ldap://ad.example.com`                           |
| `user.env.MSAD_LDAP_BASE_DN`       | Base DN for LDAP search                 | `DC=example,DC=com`                               |
| `user.env.MSAD_LDAP_BIND_DN`       | Bind DN for LDAP search                 | `CN=Boards,OU=Service Accounts,DC=example,DC=com` |
| `user.env.MSAD_LDAP_BIND_PASSWORD` | Bind password for LDAP search           |                                                   |
