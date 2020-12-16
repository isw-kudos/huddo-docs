# HCL Connections Mobile App Setup
Basic instructions for adding Huddo Boards into the HCL Connections mobile application

---

### Mobile App Integration

1. Check out `mobile-config.xml`

        execfile("mobileAdmin.py")
        MobileConfigService.checkOutConfig("/LCCheckedOut", AdminControl.getCell())

1. Edit `mobile-config.xml`

    - Find the `Applications` element and add the following `Application`:

            <Application name="Boards" enabled="true">
              <ApplicationIcon>
                <Android>
                  <Hdpi>http://[BOARDS_URL]/img/logo-small.png</Hdpi>
                  <Mdpi>http://[BOARDS_URL]/img/logo-small.png</Mdpi>
                  <Ldpi>http://[BOARDS_URL]/img/logo-small.png</Ldpi>
                </Android>
                <IOS>
                  <Reg>http://[BOARDS_URL]/img/logo-small.png</Reg>
                  <Retina>http://[BOARDS_URL]/img/logo-small.png</Retina>
                </IOS>
                <DefaultLocation>http://[BOARDS_URL]/img/logo-small.png</DefaultLocation>
              </ApplicationIcon>
              <ApplicationLabel>Huddo Boards</ApplicationLabel>
              <ApplicationURL>https://[BOARDS_URL]/auth/connections</ApplicationURL>
            </Application>

        > where `[BOARDS_URL]` is your configured URL for Boards.

    - Find the `ApplicationsList` element and append `Boards`. For example:

            <ApplicationsList>profiles,communities,files,filesync,wikis,activities,forums,blogs,bookmarks,Boards</ApplicationsList>

1. Save and check-in `mobile-config.xml`

        MobileConfigService.checkInConfig("/LCCheckedOut", AdminControl.getCell())

1. Sync the `Nodes` as required
