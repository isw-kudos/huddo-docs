# Update

The following section provides an overview of the update process and the new components that are to be installed. For an experienced Connections administrator or IBM WebSphere Application Server administrator, we expect that this update process should take no longer than one hour.

The update process for Huddo involves the following steps:

Update the Huddo Application in Websphere Application Server

Refresh the Widget Cache

- If your Huddo application utilises a Custom Context Root in the WebSphere Application Server, then follow Installation Guide Step 11 to make necessary
    modifications for default properties.

**Please Note:** The Huddo update guide assumes that the Huddo application in the WebSphere Application server is using the Context Root `/Huddo`. If the Context Root has been set to something other than `/Huddo`, then make sure that you replace `/Huddo` with your Context Root when entering any URLs specified in this document.
