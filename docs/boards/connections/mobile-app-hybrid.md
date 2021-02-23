# HCL Connections Mobile App Setup
Basic instructions for adding Huddo Boards into the HCL Connections mobile application

---

### Mobile App Integration

1. Check-out `mobile-config.xml`

        execfile("mobileAdmin.py")
        MobileConfigService.checkOutConfig("/LCCheckedOut", AdminControl.getCell())

1. Edit `mobile-config.xml`

    - Find the `Applications` element and add the following `Application`:

            <Application name="Boards" enabled="true">
              <ApplicationIcon>
                <Android>
                  <Hdpi>http://boards.huddo.com/img/logo-small.png</Hdpi>
                  <Mdpi>http://boards.huddo.com/img/logo-small.png</Mdpi>
                  <Ldpi>http://boards.huddo.com/img/logo-small.png</Ldpi>
                </Android>
                <IOS>
                  <Reg>http://boards.huddo.com/img/logo-small.png</Reg>
                  <Retina>http://boards.huddo.com/img/logo-small.png</Retina>
                </IOS>
                <DefaultLocation>http://boards.huddo.com/img/logo-small.png</DefaultLocation>
              </ApplicationIcon>
              <ApplicationLabel>Huddo Boards</ApplicationLabel>
              <ApplicationURL>https://boards.huddo.com/auth/connections/[CONNECTIONS_HOSTNAME_BASE64]</ApplicationURL>
            </Application>

    > where `[CONNECTIONS_HOSTNAME_BASE64]` is your Connections hostname base64 encoded.  E.g.</br>
          `connections.example.com` => `Y29ubmVjdGlvbnMuZXhhbXBsZS5jb20=`</br>

    - Find the `ApplicationsList` or `DefaultNavigationOrder` element and append `Boards`. For example:

            <ApplicationsList>profiles,communities,files,filesync,wikis,activities,forums,blogs,bookmarks,Boards</ApplicationsList>
or

            <DefaultNavigationOrder>profiles,communities,files,filesync,wikis,activities,forums,blogs,bookmarks,Boards</DefaultNavigationOrder>


1. Save and check-in `mobile-config.xml`

        MobileConfigService.checkInConfig("/LCCheckedOut", AdminControl.getCell())

1. Sync the `Nodes` as required
