# Proxy

!!! tip

    If you are running Boards on a different domain to DX, you may need to configure a proxy to allow DX to connect to Boards. This is because browsers enforce CORS (Cross-Origin Resource Sharing) which prevents DX from making requests to a different domain.

    DX includes "Outbound HTTP" rules which means you can proxy requests to 3rd party domains via DX, overcoming CORS issues in browsers.

## Steps

1.  Create a proxy

    `vi /opt/HCL/wp_profile/temp/huddo-com-policy.xml`

        <?xml version="1.0" encoding="UTF-8"?>
        <proxy-rules xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.ibm.com/xmlns/prod/sw/http/outbound/proxy-config/2.0">
            <policy active="true" basic-auth-support="true" name="http_huddo_com_policy" url="http://*.huddo.com*">
                <actions>
                    <method>GET</method>
                    <method>POST</method>
                    <method>PUT</method>
                    <method>DELETE</method>
                    <method>HEAD</method>
                </actions>
                <cookie-rule name="http_huddo_com_cookies">
                    <cookie>*</cookie>
                    <handling>passthru</handling>
                </cookie-rule>
            </policy>
            <policy active="true" basic-auth-support="true" name="https_huddo_com_policy" url="https://*.huddo.com*">
                <actions>
                    <method>GET</method>
                    <method>POST</method>
                    <method>PUT</method>
                    <method>DELETE</method>
                    <method>HEAD</method>
                </actions>
                <cookie-rule name="https_huddo_com_cookies">
                    <cookie>*</cookie>
                    <handling>passthru</handling>
                </cookie-rule>
            </policy>
        </proxy-rules>

1.  Apply the policy usng the following command:

        /opt/HCL/wp_profile/ConfigEngine/ConfigEngine.sh update-outbound-http-connection-config -DConfigFileName=/opt/HCL/wp_profile/temp/huddo-com-policy.xml -DPortalAdminId=YOUR_DX_ADMIN_ID -DPortalAdminPwd=YOUR_DX_ADMIN_PASSWORD -DWasUserId=YOUR_WAS_ADMIN_ID -DWasPassword=YOUR_WAS_ADMIN_PASSWORD

1.  Import the SSL Certificate so DX can connect

        /opt/HCL/AppServer/bin/wsadmin.sh -lang jython -username YOUR_WAS_ADMIN_ID -password YOUR_WAS_ADMIN_PASSWORD -c "AdminTask.retrieveSignerFromPort(\"[-keyStoreName NodeDefaultTrustStore -keyStoreScope (cell):dockerCell:(node):dockerNode -host boards.api.huddo.com -port 443 -certificateAlias huddo-com.net -sslConfigName NodeDefaultSSLSettings -sslConfigScopeName (cell):dockerCell:(node):dockerNode ]\")"
