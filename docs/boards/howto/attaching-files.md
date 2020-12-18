<img style="float: right" src="/assets/images/boards-logo.jpg" width="200" alt="My Boards" />

Huddo Boards allows files under `20mb` to be attached to cards directly.

Anyone who has access to view the card will be able to view and download the attachment.

> This feature can be disabled organisation wide by an administrator if desired.

### Office 365 (OneDrive) & HCL Connections (Files)

If you use Office 365 or HCL Connections as your authentication method, you may also upload files to those services directly, in this case the files and security will be managed by your respective provider. Huddo Boards will only save a link to open these.

### Attaching a File to a Card

Open your desired card, click the + next to Links and Attachments
![](/assets/boards/attaching1.png)

In the menu that appears, choose Upload.

![](/assets/boards/attaching2.png)

Locate the file(s) you wish to attach and click open, Huddo Boards will examine the selected files and prompt you where to upload them as below. choose `Upload to Huddo Boards` and click `Upload`.

![](/assets/boards/attaching3.png)

Your file will now appear in the Links and Attachments list.

![](/assets/boards/attaching4.png)

### Removing an Attached File

To remove an attached file, hover over the file in the card and click the `X` to remove the link. The file will be deleted and the link will no longer work. Please ensure you still have a copy of the file if needed before doing this.

### Who Can Remove Files?

Anyone who can edit the card can also remove the attached files.

### Where are Files Stored?

Files attached to cards in Huddo Boards Cloud with Auth0, Google, Facebook, LinkedIn authentication providers are stored in <a target="_blank" href="https://cloud.google.com/storage/">Google Cloud Storage</a>

If you are hosting Huddo Boards yourself then files are stored in the default file storage as defined in your environment.

If you are using Office 365 or HCL Connections, your files are stored within these environments.

### Deleting a Card that has Attachments

When you archive a card, the attachments will still be accessible however, if you delete the card permanently then the attachments will also be deleted.
