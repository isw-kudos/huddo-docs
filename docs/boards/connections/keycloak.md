For an on-premise (component pack) installation of Huddo Boards, you may use an external Keycloak server to provide authentication. To achieve this, you need to setup a new application in the same keycloak realm as connections. This new application must issue access_tokens that have full access to the connections api.

> When using this approch, Huddo Boards will get tokens from keycloak but will still validate them against connections using the url `/connections/opensocial/oauth/rest/people/@me/@self`

The following ENV variables should be set to achieve this:

| Key                                   | Description                                                 |
| ------------------------------------- | ----------------------------------------------------------- |
| `user.env.CONNECTIONS_CLIENT_ID`      | Your Keycloak application client-id                         |
| `user.env.CONNECTIONS_CLIENT_SECRET`  | Your Keycloak application client-secret                     |
| `user.env.CONNECTIONS_URL`            | HCL Connections URL, e.g. `https://connections.example.com` |
| `user.env.CONNECTIONS_KEYCLOAK_URL`   | Your Keycloak URL e.g. `https://login.example.com`          |
| `user.env.CONNECTIONS_KEYCLOAK_REALM` | Your Keycloak realm                                         |
