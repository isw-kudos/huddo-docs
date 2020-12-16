# Boards for HCL Connections in WebSphere (Legacy)

| Issue | Resolution |
| --- | --- |
| JMS Topic not initialised | Please check that the cluster Huddo Boards is installed on has the messaging bus/engine set. |
| Cannot enter Activity Stream Credentials | Please ensure that the user that you are entering can log into Connections and view the homepage activity stream. |
| Unable to Retrieve Members | This error can appear if you are logged into more than one environment at the same time, such as a TEST and PROD server. Please open the environment that Huddo Boards is installed into in a clean browser without any existing cookies or sessions. This can be easily achieved by using incognito/private mode.</br></br>All membership functionality is provided by the IBM SBT so please ensure this is setup correctly, as well as making sure the Activities application is started. |
