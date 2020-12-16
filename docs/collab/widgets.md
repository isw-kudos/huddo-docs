# HCL Connections Multi-Tenant Widget Setup

Adding Activities Plus widgets into HCL Connections Multi-Tenant environments

---

### Community Widget

1. Check out the widgets-config.xml file.

        execfile("profilesAdmin.py")
        ProfilesConfigService.checkOutWidgetConfig("/tmp", AdminControl.getCell())

1. Edit the widgets-config.xml file

    Find the resource element with the type of community, e.g. `<resource ... type="community" ... >`, then under `<widgets>`, then within `<definitions>` add the following:

        <!-- Activities Plus -->
        <widgetDef defId="Activities Plus" modes="view fullpage" url="{webresourcesSvcRef}/web/com.ibm.social.urliWidget.web.resources/widget/urlWidget.xml" themes="wpthemeNarrow wpthemeWide wpthemeBanner" uniqueInstance="true">
            <itemSet>
                <item name="resourceId" value="{resourceId}"/>
                <item name="width" value="100%"/>
                <item name="height" value="500px"/>
                <item name="url" value="https://kudosboards.com/community/collab"/>
            </itemSet>
        </widgetDef>
        <!-- END Activities Plus -->

1. Check in the widgets-config.xml file.

        ProfilesConfigService.checkInWidgetConfig()

1. Restart the `Communities` application via the ISC

---

### Homepage Activity Stream Embeded Experience

Open wsadmin

    cd /opt/WebSphere/AppServer/profiles/Dmgr01/bin/
    wsadmin -lang jython

Register the Gadget

    execfile("newsAdmin.py")

    NewsWidgetCatalogService.addWidget(isGadget=1, policyFlags=["GADGET_BASE", "GADGET_TRUSTED", "GADGET_SSO"], proxyPolicy=ProxyPolicy.INTRANET_ACCESS, appContexts=[WidgetContexts.EMBEDXP], title="Activities Plus", url="https://kudosboards.com/widgets/connections/url-gadget.xml", enabled=1, isDefaultOpened=0, prereqs=[])

This will output a Widget ID, for example `'3562a039-0d03-43cd-8a1b-3eb3cbc9ab14'`. Use this id in the next command to bind the OAuth provider.

    NewsOAuth2ConsumerService.bindGadget(<WIDGET_ID>, "connections_service", "conn-ee", "false")
    NewsWidgetCatalogService.clearWidgetCaches()
