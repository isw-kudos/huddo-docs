![Boards](../../../assets/images/boards-logo.jpg){ style="float: right" width=200 }

Huddo Boards allows files under `50MB` to be attached to cards directly.

Anyone who has access to view the card will be able to view and download the attachment.

!!! tip

    This feature can be disabled organisation wide by an administrator if desired.

### Microsoft 365 (OneDrive) & HCL Connections (Files)

If you use [Microsoft 365](../microsoft/onedrive.md) or HCL Connections as your authentication method, you may also upload files to those services directly, in this case the files and security will be managed by your respective provider. Huddo Boards will only save a link to open these.

### Attaching a File to a Card

Once you have opened your desired card, you can drag&drop a file to upload it, otherwise you can use the UI by:

Clicking the `Links and Attachments`
![](./attaching1.png)

In the menu that appears, choose `Upload to this board.`

![](./attaching3.png)

Locate the file(s) you wish to attach and click open.

Your file will now appear in the Links and Attachments list.

![](./attaching4.png)

### Removing an Attached File

To remove an attached file, navigate to the `...` to the right of the attachment. Click and select Delete to remove the file. The file will be deleted and the link will no longer work. Please ensure you still have a copy of the file if needed before doing this.

### Who Can Remove Files?

Anyone who can edit the card can also remove the attached files.

### Where are Files Stored?

Files attached to cards in Huddo Boards Cloud with Auth0, Google, Facebook, LinkedIn authentication providers are stored in a [Google Cloud Storage](https://cloud.google.com/storage/){ target=\_blank }.

If you are hosting Huddo Boards yourself then files are stored in the default file storage as defined in your environment.

If you are using Microsoft 365 or HCL Connections, your files are stored within these environments.

### Deleting a Card that has Attachments

When you archive a card, the attachments will still be accessible however, if you delete the card permanently then the attachments will also be deleted.

## Adding Emails as Files

Huddo Boards is an eml dropzone such that you are able to drag & drop emails out of email programs that support dragging as eml and drop them on an open card in Huddo to upload them as a file.

### Outlook

In order to allow Outlook to do this, we are aware of the [Outlook2Web](https://outlook2web.com/) program that can facilitate this.
