# IBM Connections Widget Setup
Basic instructions for adding Buzzy widgets into IBM Connections on-premise environments

---

### Community Widget

Check out the widgets-config.xml file.

    execfile("profilesAdmin.py")
    ProfilesConfigService.checkOutWidgetConfig("/LCCheckedOut", AdminControl.getCell())

Edit the widgets-config.xml file. Under the <resource type="community"> section, then under <widgets>, then within <definitions> add the following.

    <!-- BUZZY -->
    <widgetDef defId="BuzzyOnPremURLWidgetCS" modes="view fullpage" url="{webresourcesSvcRef}/web/com.ibm.social.urliWidget.web.resources/widget/urlWidget.xml" themes="wpthemeNarrow wpthemeWide wpthemeBanner">
				  <itemSet>
				  <item name="resourceId" value="{resourceId}"/>
					<item name="width" value="100%"/>
					<item name="height" value="500px"/>
					<item name="url" value="https://<BUZZY_URL>/connectionsstart?pagestyle=white&amp;leannav=true"/>
				  </itemSet>
			</widgetDef>
    <!-- END BUZZY -->

Check in the widgets-config.xml file.

    ProfilesConfigService.checkInWidgetConfig()

---

### Activity Stream widget

Access Homepage->Administrator

Select the following:

  - Open Social Gadget
  - Trusted and Use SSO
  - Show for Activity Stream events
  - All servers

  Click the Add Mapping button.

Add a Mapping for the Huddo Boards service to the Huddo client. Ensure OAuth Client is set to conn-ee and the Service name is Huddo Boards.
Click the Ok button

Enter The following:

  | Field | Value |
  | ----- | ----- |
  | Title| Buzzy Activity Stream |
  | URL Address| `http://<BUZZY_URL>/assets/connections/gadget.xml`|
  | Secure URL Address| `https://<BUZZY_URL>/assets/connections/gadget.xml`|
  | ICON URL| `http://<BUZZY_URL>/assets/ico/favicon-32x32.png`|
  | ICON SECURE URL| `https://<BUZZY_URL>/assets/ico/favicon-32x32.png`|

Select:

  - Use IBM Connections specific tags
  - Opened by default
  - Display on Updates pages

Select the following Prerequisites:

  - oauthprovider
  - webresources
  - oauth
  - opensocial

  Scroll down and Click Save
