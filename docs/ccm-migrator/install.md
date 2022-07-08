# Installation

## Installing the Application for the first time

Log into the WebSphere Integrated Solutions Console (ISC) for your HCL Connections Environment.

Navigate to Applications \ Application Types \ WebSphere enterprise applications and click "Install".

![Installation - step 1](/assets/ccm-migrator/install01.png)

Locate the "isw-connections-ccm.ear" file on your local file system and click "Next".

![Installation - step 2](/assets/ccm-migrator/install02.png)

Select "Fast Path" and click "Next".

Step 1: Leave the default values, update the Application Name if required, and click "Next".

Step 2: Map the module to a single application server or cluster, and at least
one web server, then click "Next". Our example uses "UtilCluster" and "WebServer1",
but these names may be different in your environment.

Note that after installation and before first use, the application requires users
to specify a server file-system location for storing log files. If the application
is mapped to a cluster, it's best if the cluster only has one server or the
file-system location is synchronized between all servers in the cluster, to ensure
that the log files are up to date regardless of which server the application runs on.

![Installation - step 3](/assets/ccm-migrator/install03.png)

Step 3: Leave the default values and click "Next".

Step 4: Check summary and Complete installation.

Save the master configuration once complete.

## Updating the Web Server Plug-in

_The procedure in this section may or may not be required depending on the configuration of your Connections environment._

In the ISC, navigate to Servers \ Server types \ Web servers.

![Web Server plug-in - step 1](/assets/ccm-migrator/webserver-plugin01.png)

Select the web server, and click "Generate Plug-in". (If your environment has multiple web servers, you should be able to select them all for this step.)

![Web Server plug-in - step 2](/assets/ccm-migrator/webserver-plugin02.png)

When the above step completes, select the web server again, and click "Propagate Plug-in". (If your environment has multiple web servers, you should be able to select them all for this step.)

![Web Server plug-in - step 3](/assets/ccm-migrator/webserver-plugin03.png)

## Configuring the Application

### Licence Key
Without a licence applied, the application can only be used in test mode, where files and folders are reported but not actually migrated.

When requesting a licence you will need to supply:

- The domain name used to access the application in the browser.
- For limited (demo) licences: The community UUIDs that will be allowed to migrate their files.

After receiving your key, you will need to create `name space bindings`
for CCM Migrator using the _exact_ values provided by the Huddo team.
_Please ensure you use the exact case and spelling for the name space bindings as stated below._<br>
All licensed installs require `iswCCMLicenceKey`.<br>
Limited licences also require `iswCCMLicenceCommunities`.

| Binding identifier +<br> Name in name space... | String value |
|------------------------------------------------|--------------|
| `iswCCMLicenceKey`                             | Licence key string<br>e.g. `A+gAAACsrdTGobh6+PNOTAREALKEYjpVT/6AgMY4SxyOM2ZQ` |
| `iswCCMLicenceCommunities` { nowrap }          | Comma delimited list of community ids without white space<br>e.g. `4f4847e3-fdda-4da4-a1b7-2829111a694b,4f4847e3-fdda-4da4-a1b7-2829111a694c,4f4847e3-fdda-4da4-a1b7-2829111a694d` |

You may follow the steps below for how to create name space bindings.

In the ISC, navigate to Environment \ Naming \ Name space bindings.

![Name-space binding - step 1](/assets/ccm-migrator/namespace-binding01.png)

Select the "Cell" scope, then click "New".

![Name-space binding - step 2](/assets/ccm-migrator/namespace-binding02.png)

Set the binding type to "String", then click "Next".

![Name-space binding - step 3](/assets/ccm-migrator/namespace-binding03.png)

Set both the "Binding identifier" and "Name in name space" fields to "iswCCMLicenceKey". Enter your licence key in the "String value" field.

![Name-space binding - step 4](/assets/ccm-migrator/namespace-binding04.png)

Click "Next", then click "Finish", then save the master configuration. Repeat these steps for `iswCCMLicenceCommunities`.

### Security

In the ISC, navigate to Applications \ Application Types \ WebSphere enterprise
applications, and click the "isw-connections-ccm" application in the list.

Navigate to Configuration \ Detail Properties \ Security role to user/group mapping.

Select the "AdminUsers" role and Map users/groups per your requirements. It is
suggested that only one or a small number of users are given access to this application.

Click "OK" and save the changes to the configuration.

Start the application by checking the select box for it from the list and clicking "Start".
