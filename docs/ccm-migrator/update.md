# Update

## Updating the Application

This part of the documentation only applies if you have been provided with a new
version of the application for the purpose of fixing bugs or adding features.

Log into the ISC for your HCL Connections environment.

If you're updating from a version of CCM Migrator which can't migrate file follows
(before 8 July 2022) to a version which can migrate file follows, the update process
requires some extra information. This is described under
[Gathering required information](install.md#gathering-required-information) at the top of
the installation document.

Navigate to Applications \ Application Types \ WebSphere enterprise applications.

Select the "isw-connections-ccm" application from the list, and click "Update".

![Updating - step 1](/assets/ccm-migrator/update01.png)

Using the default option ("Replace the entire application"), select the new "isw-connections-ccm.ear" file, and click "Next".

![Updating - step 2](/assets/ccm-migrator/update02.png)

Click "Next" at the bottom of most subsequent screens, leaving all options at the default,
except that you may need to enter the JNDI name for the Filenet Object Store database at
"Step 3: Map resource environment references to resources".

Click "Finish" upon reaching the "Summary" stage. This may be labelled as "Step 3" or
"Step 4" depending on whether you needed to enter a JNDI name as above.

![Updating - step 3](/assets/ccm-migrator/update03.png)

After clicking "Finish", there will be some delay while the next screen fills in. Click the "Save" link when it appears.

![Updating - step 4](/assets/ccm-migrator/update04.png)

Depending on your WebSphere configuration, the nodes may synchronize immediately or there may be some delay (typically up to 1 minute) while they synchronize in the background. Changes to the application only take effect after nodes have synchronized.

After updating the application and synchronizing nodes, and before using the application again, any users of the application should clear their web browser cache to ensure that changes to client-side files take effect. It is only necessary to clear the cache or "temporary internet files". Clearing cookies or logins is unnecessary.

## Updating the Licence

After receiving your new key, you will need to update the `name space bindings`
for CCM Migrator using the _exact_ values provided by the Huddo team.
_Please ensure you use the exact case and spelling for the name space bindings as stated below._<br>
All licensed installs require `iswCCMLicenceKey`.<br>
Limited licences also require `iswCCMLicenceCommunities`.

| Binding identifier +<br> Name in name space... | String value |
|------------------------------------------------|--------------|
| `iswCCMLicenceKey`                             | Licence key string<br>e.g. `A+gAAACsrdTGobh6+PNOTAREALKEYjpVT/6AgMY4SxyOM2ZQ` |
| `iswCCMLicenceCommunities` { nowrap }          | Comma delimited list of community ids without white space<br>e.g. `4f4847e3-fdda-4da4-a1b7-2829111a694b,4f4847e3-fdda-4da4-a1b7-2829111a694c,4f4847e3-fdda-4da4-a1b7-2829111a694d` |

You may follow the steps below for how to update name space bindings.

In the ISC, navigate to Environment \ Naming \ Name space bindings.

![Name-space binding - step 1](/assets/ccm-migrator/namespace-binding01.png)

Select the `iswCCMLicenceKey` binding.

![Name-space binding - step 2](/assets/ccm-migrator/namespace-binding05.png)

Update the "String" with the new value, then click "OK".

![Name-space binding - step 3](/assets/ccm-migrator/namespace-binding06.png)

Then save the master configuration. Repeat these steps for `iswCCMLicenceCommunities` if this also needs to be updated.