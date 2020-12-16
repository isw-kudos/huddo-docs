Huddo integrates into the Connections Mobile native application and allows users to utilise Huddo features from their mobile device. The integration is performed by modifying the mobile-config.xml configuration. This feature is optional.

### Check out the mobile-config.xml file

To add ‘Huddo Badges’ to the Connections mobile native app menu you must edit the mobile-config.xml file. To update this file, you must check the file out and, after making changes, you must check the file back in, [as documented here](https://help.hcltechsw.com/connectionsmobile/admin/overview/t_mobile_change_config_properties.html).

The mobile-config.xml file is a standard Connections file that is used to define the configuration settings for the Connections Mobile native application. To update this file, you must check the file out and, after making changes, check the file back in during the same wsadmin session as the checkout for the changes to take effect.

### Edit the mobile-config.xml

Then proceed to add the following Application definition under the `<Applications>` node

    <Application name="Huddo" enabled="true">
        <ApplicationIcon>
            <Android>
                <Hdpi> **../../** Huddo/images/mobile_android.png</Hdpi>
                <Mdpi> **../../** Huddo/images/mobile_android.png</Mdpi>
                <Ldpi> **../../** Huddo/images/mobile_android.png</Ldpi>
            </Android>
            <IOS>
                <Reg> **../../** Huddo/images/mobile_iOS.png</Reg>
                <Retina> **../../** Huddo/images/mobile_iOS.png</Retina>
            </IOS>
            <DefaultLocation> **../../** Huddo/images/mobile_default.png</DefaultLocation>
        </ApplicationIcon>
        <ApplicationLabel>Huddo Badges</ApplicationLabel>
        <ApplicationURL>http://<YOUR_CONNECTIONS_SERVER>/Huddo/mobile</ApplicationURL>
    </Application>

Add the following to the `<ApplicationList>` node: Huddo.

The result should be similar to: `<ApplicationsList>profiles,communities,files,wikis,activities,forums,blogs,bookmarks,Huddo</ApplicationsList>`

**Please Note:** Make sure you replace `<YOUR_CONNECTIONS_SERVER>` in all places with the URL of your Connections Environment.
If you use a custom context root for Huddo, please ensure you update the references above appropriately.
You can customise the name/images shown in the Mobile application by changing the text/URLs above.

### Check in the mobile-config.xml file

Now that you have modified the mobile-config.xml, it must be checked back in to Connections. Please refer to the Connections product
documentation for instructions on how to check in the mobile-config.xml file, located here.

**Note:** the configuration file must be checked in during the same wsadmin session in which it was checked out.

