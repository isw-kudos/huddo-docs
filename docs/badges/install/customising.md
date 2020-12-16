### Customising Huddo Strings, Properties & Images (Optional)

You only need to perform this step if you wish to customise the user interface strings used in Huddo or the default properties used by the application, e.g. to use a custom context root etc. If you do not wish to do any of the above, you do not need to follow this step.

### Customising Huddo Strings

The files for customising Huddo Strings need to be placed in the directory given by the Websphere Variable PROFILES_STATS_DIR. These files are then automatically copied into the application directory upon start up.

Please Note:

- **These files are in JSON format and it is critical that the syntax of these files is valid for the customisation to take effect.**
- **This step can be performed at any stage after the installation and is not required to complete the installation.**


    1. Create a folder called HuddoStrings in the directory given by the PROFILES_STATS_DIR WebSphere Variable.
    2. Create a text file called UserInterfaceLang.js in the HuddoStrings directory.
    3. Open the default UserInterfaceLang.js file from the location `<installedAppsDir>`/`<cell name>`/Huddo.ear/Huddo.war/defaultLang/
    4. Add the strings you wish to customise to the newly created UserInterfaceLang.js file from the original file while maintaining a similar format.
        e.g.: below is a sample customised UserInterfaceLang.js file which overwrites 7 properties:

```
{
    NAME_LABEL : "User Name",
    MESSAGE_LABEL : "Notes",
    MY_NETWORK : "My Circle",
    EVERYONE : "All",
    THIS_COMMUNITY : "Community",
    CONGRATULATIONS_PROFILE_COMPLETE_MSG : "Congratulations on completing your profile!",
    GRID_VIEW:"Grid View"
}
```
**Note:** only add the strings you wish to customise as this procedure will overwrite the existing strings for all other languages with the provided values.

If you wish to add specific customisations for different languages:

1. Create a sub-folder with the locale name within the HuddoStrings directory (See List of Language Codes)
2. Create a language specific version of UserInterfaceLang.js file as per Steps 3 & 4 above.
3. Place it in the locale sub-folder.

Example:

    English: PROFILES_STATS_DIR/ HuddoStrings/en/UserInterfaceLang.js
    English-UK: PROFILES_STATS_DIR/ HuddoStrings/en-gb/UserInterfaceLang.js
    French: PROFILES_STATS_DIR/ HuddoStrings/fr/UserInterfaceLang.js

5. After all the string, property and image customisations are completed, restart the Huddo application via the WebSphere Application Server ISC.

### Customising Huddo Properties

The files for customising Huddo Properties need to be placed in the directory given by the Websphere Variable PROFILES_STATS_DIR. These files are then automatically
copied into the application directory upon start up.

Available properties files to customise:

- **applicationConfig.js** – Context roots for Connections & Huddo
- **messages.properties** – Strings used in Huddo emails & Activity Stream entries
- **resource.properties** – Miscellaneous settings, i.e. database aliases etc.


Please Note:

- **These files are in JSON format and it is critical that the syntax of these files is valid for the customisation to take effect.**
- **This step can be performed at any stage after the installation and is not required to complete the installation.**
    1. Create a folder called HuddoProperties in the directory given by the PROFILES_STATS_DIR Websphere Variable.
    2. Copy the property file(s) to be edited into the HuddoProperties folder from the location
       `<installedAppsDir>`/`<cell name>`/Huddo.ear/Huddo.war/defaultProperties/
    3. Open the HuddoProperties folder’s newly copied files and edit the properties as required before saving.
    4. After all the string, property and image customisations are completed, restart the Huddo application via the WebSphere Application Server ISC.


### Customising Huddo Images

The custom images need to be placed in the directory given by the Websphere Variable PROFILES_STATS_DIR.
These files are then automatically copied into the application directory upon start up.

Please Note:

- **This step can be performed at any stage after the installation and is not required to complete the installation.**
    1. Determine the image(s) to be customised in the HuddoImages folder from the location
       `<installedAppsDir>`/`<cell name>`/Huddo.ear/Huddo.war/defaultImages/

            Common files customised include:
                kudos_stream.png (as seen in the Homepage Activity Stream)
                mobile_`<MOBILE_DEVICE>`.png (i.e. mobile_android.png etc – as seen for Huddo mobile)

    2. Create a folder called HuddoImages in the directory given by the PROFILES_STATS_DIR Websphere Variable.
    3. Place a copy of the custom image into the HuddoImages folder with the same name as the image file you wish to overwrite.
    4. After all the string, property and image customisations are completed, restart the Huddo application via the WebSphere Application Server ISC.

