
# Domino OIDC

Huddo Boards supports OIDC authentication with HCL Domino 14.5

## Pre-requisites

- [Provider configuration](https://help.hcl-software.com/domino/14.5.0/admin/secu_configure_domino_as_oidc_provider.html) for more information on provider configuration.

## Configuration

!!! tip

    See [Client registration](https://help.hcl-software.com/domino/14.5.0/admin/secu_register_oauth_client.html) for more information on client registration.

1. Open the `idpcat.nsf` database in Domino

2. Click `Add OAuth Client`

3. Register the Huddo Boards client with the following values:

        Domino OIDC provider: domidp.isw.net.au
        Name: Huddo Boards DEV8
        Client ID: huddoboards
        Authentication method: Client secret basic
        Client secret: <generate-a-random-string-or-uuid>
        Redirect URI(s): https://<boards-url>/auth/dworkspace/callback
        Audience(s): Domino
        Scope(s): openid email profile Domino.user.all

## Environment variables

Set the following environment variables in your config boards yaml file

| Key                                 | Description                                                          |
| ----------------------------------- | ----------------------------------------------------- |
| `user.env.DOMINO_OIDC_URL`          | HCL Domino OIDC URL, e.g. `https://domino.oidc.api.company.com` |
| `user.env.DOMINO_OIDC_CLIENT_ID`    | OAuth client id configured in `idpcat.nsf`. Default is `huddoboards` |
| `user.env.DOMINO_OIDC_CLIENT_SECRET`| OAuth client secret configured in `idpcat.nsf` |
| `user.env.DOMINO_LDAP_URL`          | URL of LDAP server, e.g. `ldap://ad.example.com` |
| `user.env.DOMINO_LDAP_BIND_DN`      | Bind DN for LDAP search, e.g. `CN=Boards,OU=Service Accounts,DC=example,DC=com` |
| `user.env.DOMINO_LDAP_BIND_PASSWORD`| Bind password for LDAP search |
| `user.env.DOMINO_LDAP_BASE_DN`      | Base DN for LDAP search, e.g. `DC=example,DC=com` |
| `user.env.DOMINO_WORKSPACE_URL`     | HCL Domino Workspace URL. This value is used for the Navigation header, e.g. `<DOMINO_WORKSPACE_URL>/navbar/v1/component` |
| `user.env.DOMINO_ADMINS`            | **Optional**: Emails or GUIDs of users to grant admin permissions.<br/> |
