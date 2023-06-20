### Update Config file

Please set the following ENV variables in your config file

| Key                                       | Description                                                                                                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global.env.API_GATEWAY`                  | Fully qualified URL of the API in the format `https://[API_URL]`                                                                                                          |
| `webfront.env.DEFAULT_TEAM`               | Name of the team users will primarily login with.</br>This will be shown on the login page.</br>**Optional**: Only set if you are authenticating with multiple providers. |
| `events.env.NOTIFIER_EMAIL_HOST`          | SMTP gateway hostname, e.g. `smtp.ethereal.com`                                                                                                                           |
| `events.env.NOTIFIER_EMAIL_USERNAME`      | **Optional**: SMTP gateway authentication.<br/>Setting a value will enable auth and use the default port of `587`                                                         |
| `events.env.NOTIFIER_EMAIL_PASSWORD`      | **Optional**: SMTP gateway authentication password                                                                                                                        |
| `events.env.NOTIFIER_EMAIL_PORT`          | **Optional**: SMTP gateway port. <br/>Default: `25` (**OR** `587` if `NOTIFIER_EMAIL_USERNAME` is set)                                                                    |
| `events.env.NOTIFIER_EMAIL_FROM_NAME`     | **Optional**: Emails are sent from this name.<br/>Default: `Huddo Boards`                                                                                                 |
| `events.env.NOTIFIER_EMAIL_FROM_EMAIL`    | **Optional**: Emails are sent from this email address.<br/>Default: `no-reply@huddo.com`                                                                                  |
| `events.env.NOTIFIER_EMAIL_SUPPORT_EMAIL` | **Optional**: Support link shown in emails.<br/>Default: `support@huddo.com`                                                                                              |
| `events.env.NOTIFIER_EMAIL_HELP_URL`      | **Optional**: Help link shown in new user welcome email.<br/>Default: `https://docs.huddo.com/boards/howto/knowledgebase/`                                                |
| `events.env.NOTIFIER_EMAIL_OPTIONS`       | **Optional**: Custom NodeMailer email options (insecure tls etc).<br/>For example: `"{\"ignoreTLS\": true,\"tls\":{\"rejectUnauthorized\":false}}"`                       |
| `provider.env.WIDGET_ID`                  | **Optional**: ID of the Community widget configured in [this step](../connections/widgets-on-prem.md#community-widget)                                                 |
| `user.env.CONNECTIONS_NAME`               | **Optional**: If you refer to 'Connections' by another name, set it here                                                                                                  |
| `user.env.CONNECTIONS_CLIENT_ID`          | oAuth client-id, usually `huddoboards`                                                                                                                                    |
| `user.env.CONNECTIONS_CLIENT_SECRET`      | oAuth client-secret as configured in [this step](../connections/auth-on-prem.md)                                                                                       |
| `user.env.CONNECTIONS_URL`                | HCL Connections URL, e.g. `https://connections.example.com`                                                                                                               |
| `user.env.CONNECTIONS_ADMINS`             | Emails or GUIDs of users to grant admin permissions.<br/>e.g. `"[\"admin1@company.example.com\", \"PROF_GUID_2\"]`"                                                       |
| `user.env.CONNECTIONS_KEYCLOAK_URL`       | **Optional**: See [keycloak authentication](../connections/keycloak.md) for more information                                                                           |
| `user.env.CONNECTIONS_KEYCLOAK_REALM`     | **Optional**: See [keycloak authentication](../connections/keycloak.md) for more information                                                                           |
| `user.env.DISABLE_WELCOME_EMAIL`          | **Optional**: Set to disable welcome emails for users                                                                                                                     |
