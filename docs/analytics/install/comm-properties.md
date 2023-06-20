## Step 6: Additional properties for Communities Widgets (OPTIONAL)

At this stage, the Huddo Configuration Widget shows in the Communities Customization Palette for all Communities. This means they can be added to any community. However, they are restriced to function only in their respective Community created during this installation process. This message will be shown if theyare added to any other community.

![Metrics Unauthorised](/assets/badges/install/comm-properties/configurator_unauthorised.png)

It is possible to remove these Widgets from the Customizations Palette, so that users cannot see/add them to their Communties. This requires modifying the Configuration Widget definitions we created earlier in the widgets-config.xml file and restarting the clusters again.

Checkout and edit the widgets-config.xml file:

[Connections 5.5](https://help.hcltechsw.com/connections/v55/admin/admin/t_admin_profiles_changing_admin.html)

[Connections 6.0](https://help.hcltechsw.com/connections/v6/admin/admin/t_admin_profiles_changing_admin.html)

[Connections 6.5](https://help.hcltechsw.com/connections/v65/admin/admin/t_admin_profiles_changing_admin.html)

Locate the Configuration Widget definitions under the resource element with the type of community, e.g. `<resource ... type="community" ... >`, then under `<widgets>`, then within `<definitions>` add the following:

Add the attribute `showInPalette="false"` to each Configurator you wish to hide from the Customizations page. We could not define this attribute earlier, as otherwise we wouldn’t have been able to add the Widgets to the Configuration Communities.

Add the attribute loginRequired="true" to each Community widget if you wish to hide the widgets from users that are not logged in. This is only applicable if your security settings for the Communities application allow users to view communities without logging in.

Your configuration should now look like this:

    <widgetDef defId="BadgesConfigurator" description="badgesConfigurator" modes="view fullpage" url="https://<CONNECTIONS_SERVER_URL>/Huddo/BadgesConfigurator.xml" themes="wpthemeWide" showInPalette="false" loginRequired="true">
        <itemSet>
            <item name="resourceId" value="{resourceId}"/>
            <item name="communityId" value="YOUR_BADGES_COMMUNITY_UUID"/>
        </itemSet>
    </widgetDef>

Check in the Widgets-Config.xml File:

[Connections 5.5](https://help.hcltechsw.com/connections/v55/admin/admin/t_admin_profiles_changing_admin.html)

[Connections 6.0](https://help.hcltechsw.com/connections/v6/admin/admin/t_admin_profiles_changing_admin.html)

[Connections 6.5](https://help.hcltechsw.com/connections/v65/admin/admin/t_admin_profiles_changing_admin.html)

Then [Restart the clusters](../../badges/install/apply-changes.md).
