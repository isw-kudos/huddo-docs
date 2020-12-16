### Install Huddo Embedded Experience into Notes/iNotes 9 (Optional)

The Huddo Embedded Experience is installed in the same manner as the default Connections Embedded Experience Gadget & the Activity Stream Gadget.

As of Connections 4 CR3 a mechanism was introduced to simplify this process. Simply export the Widget configuration from Connections and import into the IBM
Notes Widget Catalog as per documentation here or here.

For Connections 4 CR2 and earlier the process is manual (overview).

1. Make sure an OAuth client exists for Domino in Connections (link)
2. Create the Huddo OpenSocial Widget in Notes (link) using the gadget URL: https://<YOUR_CONNECTIONS_URL>/Huddo/HuddoNewsGadget.xml and publish it to the
    IBM Notes Widget Catalog. **Note** : You must replace <YOUR_CONNECTIONS_URL> with the URL of your Connections environment.
3. Approve the Huddo Widget to the Catalog with the necessary proxy and OAuth data (link)
