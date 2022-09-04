The Huddo Widgets provide the interface for user interaction within Connections. During this step, we will be configuring communities for secure access to the configuration interfaces for Badges and Metrics, as well as provisioning the Analytics widget, Badges/Thanks/Awards Summaries and Leaderboard widgets for end users as well as the Huddo News Gadget.

### Create the Configurator Community

The Badges Configurator Widget is the widget that allows users to perform admin-level configuration of Huddo. The widget has been designed such that it is available to a specific Connections community where membership can be maintained, thereby securing access to the configurator. The HUddo Analytics Admin-level reports interface has been designed with the same concept, which is why the following steps will ask you to create 2 new communities.

1. Login to Connections, navigate to Communities and click Create a Community

    ![create community](/assets/badges/install/install-widgets/create-community.png)

1. Enter a name, such as Huddo Configurator

1. Set Access to Restricted

1. Specify Members as those people you wish to be able to edit Badge definitions. Users can be specified after clicking the **_Access Advanced Features_** link.

1. Enter any tags, web address and description you wish then click Save.

    ![community details](/assets/badges/install/install-widgets/community_details.png)

**Note:** Configurators requires a large column community layout to function properly. Either ‘3 Columns with side menu and banner’, ‘3 Columns with side menu’ or ‘2 Columns with side menu’.

You have now created the Huddo Configurator Community.

Take note of the CommunityUUID in the URL address, as we will need this later.

### Create the Huddo Analytics Administrator Community

The Huddo Analytics widget allows users to review Connections Usage data over specified time periods. Users have access to both reporting and graph functionalities. The following community will be used to host the Connections Administrator level reports and graphs.

1. Login to Connections, navigate to Communities and click Start a Community.

    ![create community](/assets/badges/install/install-widgets/create-community.png)

1. Enter a name, such as Huddo Analytics.

1. Set Access to Restricted.

1. Specify Members as those people you wish to be able to access Connections Administrator level reports and graphs. **_In Connections 5+,_** _users can be specified after clicking the_ **_Access Advanced Features_** _link._

1. Enter any tags, web address and description you wish and click Save.

    ![analytics community details](/assets/badges/install/install-widgets/analytics_community_details.png)

You have now created the Huddo Analytics Administrator Community.

Take note of the CommunityUUID in the URL address, as we will need this later.

### Check out the widgets-config.xml file

To install most of the Widgets you must edit the widgets-config.xml file for Profiles. This file contains the settings for each defined widget. To update this file, you must check the file out and, after making changes, you must check the file back in, as documented in the links below.

The widgets-config.xml file is a standard Connections file that is used to define the configuration settings for each of the widgets supported by
Profiles and Communities. To update settings in the file, you must check the file out and, after making changes, you must check the file back during the same wsadmin
session as the checkout for the changes to take effect.

Checking Out the Widgets-Config.xml File:

[Connections 5.5](https://help.hcltechsw.com/connections/v55/admin/admin/t_admin_profiles_changing_admin.html)

[Connections 6.0](https://help.hcltechsw.com/connections/v6/admin/admin/t_admin_profiles_changing_admin.html)

[Connections 6.5](https://help.hcltechsw.com/connections/v65/admin/admin/t_admin_profiles_changing_admin.html)

### Configure Configurator and Community Leaderboard Widgets

By updating the widgets-config.xml with the code supplied below, the Badges Configurator and Huddo Community Analytics widgets will be made available. This will allow them to be placed into Connections Communities.

You must define the Widgets and where to find their associated .xml files. You will need the CommunityUuids you took note of earlier. 

Edit the widgets-config.xml file. Find the resource element with the type of community, e.g. `<resource ... type="community" ... >`, then under `<widgets>`, then within `<definitions>` add the following:

**IMPORTANT**: Don’t forget to substitute the following placeholders with the corresponding values!
YOUR_METRICS_COMMUNITY_UUID, YOUR_BADGES_COMMUNITY_UUID, YOUR_FILTERS_COMMUNITY_UUID , YOUR_ANALYTICS_COMMUNITY_UUID, CONNECTIONS_SERVER_NAME

    <widgetDef defId="BadgesConfigurator" description="badgesConfigurator" modes="view fullpage" url="https://CONNECTIONS_SERVER_NAME/Huddo/BadgesConfigurator.xml" themes="wpthemeWide" uniqueInstance="true">
        <itemSet>
            <item name="resourceId" value="{resourceId}"/>
            <item name="communityId" value="YOUR_BADGES_COMMUNITY_UUID"/>
        </itemSet>
    </widgetDef>
    <widgetDef defId="HuddoAnalytics" description="HuddoAnalytics" modes="view edit" url="https://CONNECTIONS_SERVER_NAME/Huddo/AnalyticsDashboard.xml" uniqueInstance="false" themes="wpthemeNarrow wpthemeWide wpthemeBanner">
        <itemSet>
            <item name="resourceId" value="{resourceId}"/>
            <item name="adminCommunityId" value="YOUR_ANALYTICS_COMMUNITY_UUID"/>
        </itemSet>
    </widgetDef>

We recommend using absolute URLs in widget-config.xml for reduced configuration complexity. If you have a requirement for the use of relative URLs and are unsure of the implications, you may discuss this with our support team.

### Check in the widgets-config.xml file

Now that you have modified the widgets-config.xml, it must be checked back in to Connections. Please refer to the Connections product
documentation for instructions on how to check in the widgets-config.xml file, located below.

Checking In the Widgets-Config.xml File:

[Connections 5.5](https://help.hcltechsw.com/connections/v55/admin/admin/t_admin_profiles_changing_admin.html)

[Connections 6.0](https://help.hcltechsw.com/connections/v6/admin/admin/t_admin_profiles_changing_admin.html)

[Connections 6.5](https://help.hcltechsw.com/connections/v65/admin/admin/t_admin_profiles_changing_admin.html)

### Register Widgets (Connections 6.0 CR1 onwards)

Since Connections 6.0 CR1 it is now required to register third-party widgets in the widget-container for increased security. We have scripts and instructions for [this here](https://github.com/isw-kudos/kudos-widgetcontainer-registration).

### Add Huddo configuration JSP to the header

Perform this task to add Huddo Configuration information to Connections pages.

This is achieved by customising the _header.jsp_ file, used for customizing the Connections Navigation bar.

If you have not customised the header.jsp file for your connections environment, please make a copy of the file from:

`<WAS_home>`/profiles/`<profile_name>`/installedApps/`<cell_name>`/Homepage.ear/homepage.war/nav/templates

Paste the copy into the common\nav\templates subdirectory in the customization directory: `<installdir>`\data\shared\customization\common\nav\templates\header.jsp

Edit the _header.jsp_ file in the customisations directory add the following lines **after the Moderation link and before the `</ul>`** HTML tag as shown:

![header customisation](/assets/badges/install/install-widgets/header_customisation.png)

To add the Huddo Config JSP

    --%><c:if test="${'communities' == appName || 'homepage' == appName || 'profiles' == appName}"><%--
        --%><c:catch var="e"><c:import var="kudosConfig" url="http://${pageContext.request.serverName}/Kudos/kudosConfig.jsp"/></c:catch><%--
        --%><c:if test="${empty e}"><script type="text/javascript">${kudosConfig}</script></c:if><%--
    --%></c:if><%--

Save and close the file, the changes will take effect when the clusters are restarted. (See next task)

### Specify Huddo Analytics Admin Community for Security

This change will not be picked up by Connections until the Huddo Application is restarted. This will be performed at the end of the configuration.

Create the resource.properties file in the Profiles Statistics customisation directory:
`<PROFILES_STATS_DIR>`/HuddoProperties
Where **PROFILES_STATS_DIR** is defined by the WebSphere variable:
e.g. /opt/IBM/Connections/data/shared/profiles/statistics/HuddoProperties

Put the following line in the file, replacing `<KUDOS_ANALYTICS_ADMIN_COMMUNITY_ID>` with the ID of the Huddo Analytics Community created in Task 2.4:

    analyticsAdminCommunityID=<KUDOS_ANALYTICS_ADMIN_COMMUNITY_ID>

**IMPORTANT**: If a file of the same name already exists, merge the contents into the existing file.
