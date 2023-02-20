The following steps provides an overview of the update process needed for the initial upgrade from v6.0.0 to 7.0.0. These steps should be done in addition to the usual update steps.
For an experienced Connections administrator or IBM WebSphere Application Server administrator, we expect that this update process should take no longer than one hour.

### Update Context Root



### Update Widgets
    
#### Homepage

Open the Administration tab (on the Homepage) and browse to the Enabled Widgets list. For each Kudos Widget listed, select it and edit.

![add apps menu](/assets/badges/install/add-widgets/add_another_app.png)

|                | OLD Widget Title     | OLD URL Address                                                 | NEW Widget Title     | NEW URL Address                                                 | 
|----------------|----------------------|-----------------------------------------------------------------|----------------------|-----------------------------------------------------------------|
| Leaderboard    | Kudos Leaderboard    | https://`<CONNECTIONS_SERVER_URL>`/Kudos/RankingDisplay.xml     | Huddo Leaderboard    | https://`<CONNECTIONS_SERVER_URL>`/Huddo/RankingDisplay.xml     |
| News Gadget    | Kudos News Gadget    | https://`<CONNECTIONS_SERVER_URL>`/Kudos/KudosNewsGadget.xml    | Huddo News Gadget    | https://`<CONNECTIONS_SERVER_URL>`/Huddo/HuddoNewsGadget.xml    |
| Awarder        | Kudos Awarder        | https://`<CONNECTIONS_SERVER_URL>`/Kudos/KudosAwarder.xml       | Huddo Awarder        | https://`<CONNECTIONS_SERVER_URL>`/Huddo/HuddoAwarder.xml       |
| User Analytics | Kudos User Analytics | https://`<CONNECTIONS_SERVER_URL>`/Kudos/AnalyticsDashboard.xml | Huddo User Analytics | https://`<CONNECTIONS_SERVER_URL>`/Huddo/AnalyticsDashboard.xml |

#### Profile & Community

### Update header.jsp

### Update Mobile

### Update Database


!!! note
    The Huddo update guide assumes that the Huddo application in the WebSphere Application server is using the Context Root ‘/Huddo’. If the Context Root has been set to something other than ‘/Huddo’, then make sure that you replace ‘/Huddo’ with your Context Root when entering any URLs specified in this document.
