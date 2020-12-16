###Options for ENSURE_TEAMS

This array of teams defines which organisations/providers are pre-configured when Huddo Boards starts. This is required in order to login.


| Key           | Description                                                                                                                                                                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name          | If defining multiple teams you may use this long description to help determine which is which                                                                                                                                                                                    |
| teamName      | A Unique name to identify your team, this should be kept short and not contain any spaces, punctuation or special characters                                                                                                                                                     |
| provider      | Your oauth provider, available options are <br>`connections` - Connections on premise<br>`smartcloud` - Connections cloud<br>`msgraph` - Office 365 or Azure AD                                                                                                                  |
| externalId    | Based on the provider you chose above:<br>`connections` - Connections domain base64 encoded (**Optional** - calculated from oAuth.baseURL)<br>`smartcloud` - your organisation id<br>`msgraph` - your tenant id                                                    |
| admins        | Defines which users who login with this organisation are considered administrators.<br>It is an array of Emails or IDs (for Connections this is PROF_GUID). For example:<br>`"admins": ["person@company.com", "person2@company.com", "PROF_GUID_3"],`                            |
| frameUrl      | The URL of the Connections Header frame configured in [this step](/boards/connections/header-on-prem/).<br>_OPTIONAL_: Only required if you are running the Connections App Loader WAS application and desire the Boards experience to always include the HCL Connections header |
| oAuth.baseURL | Your Connections url, only needed if you chose `connections` as your provider.                                                                                                                                                                                                   |



For example:

    ENSURE_TEAMS: >
      [{
        "name" : "<COMPANY NAME>",
        "teamName" : "connections",
        "provider" : "connections",
        "admins": ["person@company.com", "person2@company.com", "PROF_GUID_3"],
        "frameUrl": "https://[CONNECTIONS_URL]/boards",
        "oAuth" : {
          "baseURL" : "https://[CONNECTIONS_URL]"
        },
        "globalOAuth": true
      }]
