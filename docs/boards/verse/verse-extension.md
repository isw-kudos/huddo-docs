## Installation in Verse On Premise

1. Download your custom Huddo Boards Extensions package from the [Huddo Store](https://store.huddo.com/boards-extensions/).
2. Extract the package and find the `verse/application.json` file.
3. View `verse/application.json` as plain text to confirm the "url" fields contain the URL for your Boards deployment.
4. Use this file with the localFileProvider method described in the [HCL Verse Developers](https://doc.cwpcollaboration.com/verse-developer/docs/domino-server-deployment#when-to-use-the-built-in-endpoint) documentation.

This documentation has been copied in below.

-------------------------------------------------------------------------------------------

#### Deploying extensions using the built-in endpoint
Verse On-Premises implemented a built-in endpoint to serve the application’s JSON data from a local file or an HTTP hosted file. If storing the applications JSON data as a static file works for you, this is the way to go.

Two data providers are implemented in the built-in endpoint:

- __Local file data provider__: Serves the applications JSON data from a local file on the Domino server. This allows you to deploy extensions without dependency on another server. The path of the file can be specified using a `notes.ini` parameter `VOP_Extensibility_Applications_Json_FilePath`.

- __HTTP data provider__: Serves the applications JSON data from an HTTP hosted file. This allows you to deploy `applications.json` to a centralized HTTP server. The HTTP URL of the file can be specified using `notes.ini` parameter `VOP_Extensibility_Applications_Json_URL`.

The `notes.ini` parameter `VOP_Extensibility_Data_Provider_Name` controls which data provider to use, either `localFileProvider` or `httpDataProvider`. By default, if none is specified, `localFileProvider` will be used. In either case, the data provider will periodically check the source `applications.json` file for updates, so you don’t have to restart the server after a new version of `applications.json` is deployed.

To use the local file data provider:

- Make sure `notes.ini` parameter `VOP_Extensibility_Data_Provider_Name` is either clear or set to `localFileProvider`.

- Deploy `applications.json` to the Domino server.

- Make sure notes.ini parameter `VOP_Extensibility_Applications_Json_FilePath` is set to the file path of `applications.json`. For example:

        VOP_Extensibility_Applications_Json_FilePath=D:\data\applications.json

To use the HTTP data provider:

- Make sure `notes.ini` parameter `VOP_Extensibility_Data_Provider_Name` is set to `httpDataProvider.`

        VOP_Extensibility_Data_Provider_Name=httpDataProvider

- Deploy `applications.json` to the HTTP server.

- Make sure `notes.ini` parameter `VOP_Extensibility_Applications_Json_URL` is set to the HTTP URL of `applications.json`. For example:

        VOP_Extensibility_Applications_Json_URL=https://files.renovations.com/vop/applications.json
