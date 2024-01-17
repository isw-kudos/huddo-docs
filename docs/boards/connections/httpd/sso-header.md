# Connections Header via SSO

The following configuration is required to load the Connections Header via SSO from the Boards domain.

1.  Open the `httpd.conf` as per [this guide](./edit.md).

1.  Add the following:

    !!! note

          Customise the `SetEnvIf` domain below as required for your Boards domain.

    ```apache
    # Huddo Boards - allow CORS related access control headers in requests for
    Header unset Access-Control-Allow-Origin
    SetEnvIf Origin "https://(boards\.huddo\.com)$" AccessControlAllowOrigin=$0
    Header always set Access-Control-Allow-Origin %{AccessControlAllowOrigin}e env=AccessControlAllowOrigin
    Header always set Access-Control-Allow-Credentials "true" env=AccessControlAllowOrigin
    Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE, PUT"
    Header always set Access-Control-Allow-Headers "x-requested-with, Content-Type, origin, authorization, accept, client-security-token, Cache-Control, Content-Language, Expires, Last-Modified, Pragma, slug, X-Update-Nonce,x-ic-cre-request-origin,x-ic-cre-user,x-lconn-auth,x-shindig-st"
    Header always set Access-Control-Expose-Headers "Content-Disposition, Content-Encoding, Content-Length, Date, Transfer-Encoding, Vary, ETag, Set-Cookie, Location, Connection, X-UA-Compatible, X-LConn-Auth, X-LConn-UserId, Authorization,x-ic-cre-user" env=AccessControlAllowOrigin

    # Allow LtpaToken usage from Boards domain
    Header edit Set-Cookie ^(.*)$ "$1; Secure; SameSite=None"
    ```

1.  Apply similar changes anywhere that the LtpaToken is issued. For example:

    -   via an `nginx` proxy:

        ```nginx
        # Allow LtpaToken usage from Boards domain
        proxy_cookie_flags LtpaToken Secure SameSite=None;
        proxy_cookie_flags LtpaToken2 Secure SameSite=None;
        ```

## Verse integration

See [HCL Domino documentation](https://help.hcltechsw.com/domino/12.0.0/admin/conf_samesite_cookie.html) for more details

---

!!! tip

    Users may need to logout and login to Connections again for the LtpaToken cookie to be re-issued with SSO enabled
