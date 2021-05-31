The Huddo Analytics Application is provided as a .war file that is to be installed as a WebSphere Application in your Connections server environment.
The application provides the Huddo Analytics engine, as well as the widgets for user interaction.

### Login to the WebSphere Integrated Solution

Login to the WebSphere Integrated Solution Console for your Connections environment via a webbrowser.

Enter your administrator User ID and Password, then click the “Log in” button.

![login](/assets/badges/install/app/WAS_Console_login.png)

### Install the Huddo.war file

Navigate to Applications → Application Types → WebSphere enterprise applications

![install app](/assets/badges/install/app/install_app.png)

Click the Install button

![install button](/assets/badges/install/app/install_button.png)

Browse the Local File System Path for the downloaded Huddo.war file then Click Next

![browse war](/assets/badges/install/app/browse_war.png)

Check the Fast Path Option then Click Next

![fastpath](/assets/badges/install/app/fastpath.png)

Change the Application name to Huddo then Click Next

![app name](/assets/badges/install/app/app_name.png)

Highlight the Nodes for the Application, including the IHS Node. Select the Badges Module, click Apply then Next.

**_Please Note:_** _It’s recommended that you create a separate cluster for Huddo if your Connections install is bigger than 10,000 users. You can do this via the ISC by clicking on_ **_Servers > Clusters > WebSphere_** _application server clusters and then clicking New._

![server mapping](/assets/badges/install/app/server_mapping.png)

Click on Browse and map the default resources as shown. Click Next.
<!--- //cluster??? -->
![resource mapping](/assets/badges/install/app/resource_mapping.png)

Enter Huddo as the Context Root, then click Next.

**_Please Note:_** _The Huddo Installation guide assumes that the Context Root is set as ‘/Huddo’. If you set the Context Root to something other than ‘/Huddo’, then make sure that you replace ‘/Huddo’ with your Context Root when entering addresses._

![context root](/assets/badges/install/app/context_root.png)

Review the Installation Summary. Click Finish.

![summary](/assets/badges/install/app/summary.png)

Review the Installation Results. Click Save.

![save install](/assets/badges/install/app/save_install.png)

Review the Synchronisation Summary. Click OK.

You have now successfully installed Huddo as a WebSphere Enterprise Application. Next, you will need to edit the security settings.


### Modify the Huddo Application Security Role assignments

During this step, we will be defining the authenticated users/groups for each Security Role.

Find Huddo in the list of enterprise applications and click on Huddo to open the application configuration screen

![app list](/assets/badges/install/app/kudos_app_list.png)

Click Security role to user/group mapping

![security role](/assets/badges/install/app/security_role_link.png)

To ensure that only authorised users have access to Huddo and its data, modify the mapping of the AllServlets and Reader roles to the Special Subjects: **All Authenticated in Application/Trusted Realm**, then Click OK

**_Please note:_** _You may set the Reader role to Everyone to grant read-only access to Huddo widget data to unauthenticated users._

![role mapping](/assets/badges/install/app/role_mapping.png)
