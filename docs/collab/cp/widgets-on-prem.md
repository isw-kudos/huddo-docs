# HCL Connections Widget Setup

Add Huddo Collab widgets into HCL Connections on-premise environments

---

### Ideas Community Widget

1.  SSH to the WAS Deployment Manager

1.  Start `wsadmin`

        cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin
        ./wsadmin.sh -lang jython -user wasadmin -password <password-here>

1.  Check out the `widgets-config.xml` file.

        execfile("profilesAdmin.py")
        ProfilesConfigService.checkOutWidgetConfig("/LCCheckedOut", AdminControl.getCell())

1.  Edit the `widgets-config.xml` file.

    Find the resource element with the type of community, e.g. `<resource ... type="community" ... >`, then under `<widgets>`, then within `<definitions>` add the following, replacing `[HUDDO_URL]` with your URL:

        <!-- Huddo Collab Ideas -->
        <widgetDef defId="CollabIdeas" modes="view fullpage" url="{webresourcesSvcRef}/web/com.ibm.social.urliWidget.web.resources/widget/urlWidget.xml" themes="wpthemeNarrow wpthemeWide wpthemeBanner" uniqueInstance="true">
            <itemSet>
                <item name="resourceId" value="{resourceId}"/>
                <item name="width" value="100%"/>
                <item name="height" value="500px"/>
                <item name="url" value="https://[HUDDO_URL]/ideas/community/connections"/>
            </itemSet>
        </widgetDef>
        <!-- END Huddo Collab Ideas -->

1.  Check in the widgets-config.xml file.

        ProfilesConfigService.checkInWidgetConfig()

1.  Restart the `Communities` application via the ISC

    !!! tip

        If widgets no longer load in Communities and you see errors in the browser console like:

            The following error occurs when retrieving widgetProcess production.
            com.ibm.jsse2.util.h: PKIX path building failed: com.ibm.security.cert.IBMCertPathBuilderException: unable to find valid certification path to requested target

        then please ensure the Connections domain root certificate is trusted in the WebSphere ISC. This can be added using `Retrieve from port` under `SSL certificate and key management` > `Key stores and certificates` > `CellDefaultTrustStore` > `Signer certificates`

1.  _Optional_. [Install the extensions for Connections Customizer](./customizer/integrations.md). This includes a fix for the Community Widget that enables attachments to be downloaded as well as multiple new integrations for Connections.