## Add Huddo Boards plugin

1. Open [365 Admin Centre](https://admin.microsoft.com/AdminPortal/Home#/Settings/IntegratedApps)

      Click `Settings` -> `Integrated apps` -> `Upload custom apps`

      ![example](/assets/msgraph/outlook1.png)


1. Select `Provide link to manifest file`

        https://boards.huddo.com/office/outlook/add-in.xml

      Click `Validate` then click `Next`

      ![example](/assets/msgraph/outlook3.png)

1. Specify who has access and click `Next`

      ![example](/assets/msgraph/outlook4.png)

      1. Click `Finish Deployment`

      ![example](/assets/msgraph/outlook5.png)

1. Click `Done`

      ![example](/assets/msgraph/outlook6.png)

1. Open [Outlook](https://outlook.office365.com/mail/)

      You should now see the `Huddo Boards` option in the menu of an email

      ![example](/assets/msgraph/outlook7.png)

### Outlook Desktop Extra Steps

In order for our plugin to work in the desktop version of Outlook the [Microsoft Edge WebView2 Runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) need to been installed.