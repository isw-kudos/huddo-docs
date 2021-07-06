## Installation in Verse On Premise

You may either download Huddo Boards [applications.json file](https://boards.huddo.com/widgets/verse/applications-onprem.json) and use it as a localFileProvider or just copy the url for it and use it as a httpDataProvider by following the instructions below.

> The information below is an excerpt from
> [HCL Verse Developers](https://doc.cwpcollaboration.com/verse-developer/docs/getting-started)

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
