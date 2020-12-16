So far, you have configured the location of the Huddo widgets. You will now add the widgets to the user interface.

### Add the Configurators Widgets to their Communities

Login to Connections and navigate to the previously created Badges Configurator Community

1. Click Community Actions then 'Add Apps' from the drop down menu
   
    ![add apps](/assets/badges/install/add-widgets/community_add_apps.png)

1. Select the Configurator(s) to add to the Community

    ![add apps menu](/assets/badges/install/add-widgets/add_apps_menu.png)

1. Click X

The Configurators will now be added to the main view.

Repeat the above steps for each configurator community you created.

We recommend removing all the default widgets from the main page (i.e. Forums, Bookmarks, Files and Feeds) to conserve screen real-estate, and
making use of the Configurator widget easier. The default widgets may be removed or added back at any stage.

### Remove the Default Widgets (Optional)

Click the Actions drop-down and select Delete
    ![delete apps](/assets/badges/install/add-widgets/delete_widget.png)

Fill in the required data then click Ok on the Delete prompt
    ![delete apps prompt](/assets/badges/install/add-widgets/delete_widget_prompt.png)

### Add the Huddo Analytics Widget to Communities

Login to Connections and navigate to the Huddo Analytics Community

Click Community Actions then 'Add Apps' from the drop down menu

![add apps](/assets/badges/install/add-widgets/community_add_apps.png)

Select HuddoAnalytics

![add apps menu](/assets/badges/install/add-widgets/add_apps_menu.png)

Click X

We recommend removing all the default widgets from the main page (i.e. Forums, Bookmarks, Files and Feeds) to conserve screen real-estate, and making use of the Analytics widgets easier. The default widgets may be removed or added back at any stage.

Your first Huddo Analytics widget will now be added to the main view.

The default view shows the report categories. Once a report category is selected, default report instances for that category can be selected.

Once the report instance is selected, further options for that report can be selected.

The report currently configured is previewed below the options and can be saved for quick viewing on all subsequent page loads.

In the Huddo Analytics community, the Huddo Analytics widgets provide access to Connections Administrator level reports. In other communities, the Huddo Analytics widgets can be added to provide access to Community Manager level reports.

Multiple Huddo Analytics widgets are designed to exist in each community.

### Add the Widgets to the Home page

The Huddo Leaderboard Widget allows users to view the top 10 contributors either in the entire organisation or in a specific user’s network. Adding the
Huddo Leaderboard to all users Home page provides easy access for users to view their progress and drive their behaviour.

By defining the Huddo News Gadget in the Homepage Administration tab, the Huddo News Gadget will be made available to the end users. The following diagram shows how the gadget will be embedded.

Adding widgets to the Home page of Connections is done through the Connections Web page. 

Login to Connections as a user assigned to the admin security role of the Homepage application and navigate to the Administration tab.

Click the 'Add another app' button and enter the following details. Once you have defined each widget, click Save and then click the 'Add another widget' button to add the next.

![add apps menu](/assets/badges/install/add-widgets/add_another_app.png)

|                | Widget Type        | Widget Title         | URL Address                                                     | Use HCL Connections specific tags | Display on My Page | Display on Updates Pages | Opened by Default | Multiple apps | Prerequisites                                  |
|----------------|--------------------|----------------------|-----------------------------------------------------------------|-----------------------------------|--------------------|--------------------------|-------------------|---------------|------------------------------------------------|
| Leaderboard    | iWidget            | Huddo Leaderboard    | https://`<CONNECTIONS_SERVER_URL>`/Huddo/RankingDisplay.xml     | False                             | False              | True                     | True              | False         | profiles                                       |
| News Gadget    | Open Social Gadget | Huddo News Gadget    | https://`<CONNECTIONS_SERVER_URL>`/Huddo/HuddoNewsGadget.xml    | True                              | False              | False                    | True              | False         | oauthprovider, oauth, opensocial, webresources |
| Awarder        | iWidget            | Huddo Awarder        | https://`<CONNECTIONS_SERVER_URL>`/Huddo/HuddoAwarder.xml       | False                             | True               | False                    | False             | False         | -                                              |
| User Analytics | iWidget            | Huddo User Analytics | https://`<CONNECTIONS_SERVER_URL>`/Huddo/AnalyticsDashboard.xml | False                             | True               | False                    | False             | True          | -                                              |

For the Open Social Gadget, select the following:

- Open Social Gadget
- Trusted and Use SSO
- Show for Activity Stream events
- All servers

Click the Add Mapping button.

- Add a Mapping for the Huddo service to the Huddo client. Ensure OAuth Client is set to Huddo and the Service name is Huddo.

Highlight each Huddo widget individually in the Disabled widgets section and click Enable

The Huddo widgets will now show in the Enabled widgets list.

It will also show on the Updates and Widgets tabs, if these options were selected.

### Add the Huddo Awarder Widget to My Page

**Please Note:** A default widget provided by Connections is required on ‘My Page’ for the Huddo widgets to function.

Open My Page through the Sidebar link or Home button and select Customize

![my page customise](/assets/badges/install/add-widgets/my_page_customise.png)

Select Huddo Awarder. If you cannot find it, look under the 'Other' category.

![my page add apps](/assets/badges/install/add-widgets/my_page_add_apps.png)

Click X

You will now have the Huddo Awarder Widget displayed in the My Page section.
**Please Note:** The Huddo Awarder cannot be used by a user until they have been allocated awards for distribution. See the User Guide for further
information.

### Add the Huddo User Analytics Widget to My Page

This step will ensure the User Analytics widget was defined successfully in the Administration section, and is working as expected. This step is a good introduction to User Reports, however is optional.

**Please Note:** A default widget provided by Connections is required on ‘My Page’ for the Huddo widgets to function.

Open My Page through the Sidebar link or Home button and select Customize

![my page customise](/assets/badges/install/add-widgets/my_page_customise.png)

Select Huddo User Analytics. If you cannot find it, look under the 'Other' category.

![my page add apps](/assets/badges/install/add-widgets/my_page_add_apps.png)

Click X

You will now have your first Huddo User Analytics Widget displayed in the My Page section. From here you can start using Analytics by selecting a report category, and then a specific reports instance.

Multiple Huddo User Analytics widgets are designed to exist on My Page.

