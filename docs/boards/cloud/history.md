# Boards Cloud Updates (History)

!!! tip

    For recent updates, see the [Boards Cloud Updates](./updates.md) page.

## 2022

### December

2022-12-14

Improvements:

-   synchronise dependencies in real time
-   faster creation of multi cards
-   presence of users open on card without board open
-   adding dependencies between private cards
-   handling of dependencies where not accessible
-   make associated comments public when card is made public
-   synchronise my private tasks between my windows

Fixes:

-   issue opening board "Error: Minified React error #185"
-   issue where Community widget shows 'my' boards incorrectly
-   issue where someone online in board remained online if page reloaded
-   issue where lists hidden when previewing Kanban view while creating a Board
-   issue where page crashed on logout in Node view
-   issue where page crashed on logout in Timeline view
-   issue where files couldn't be downloaded
-   issue where page reloaded in admin view

### November

2022-11-29

Improvements:

-   synchronise dependencies in real time
-   faster creation of multi cards
-   presence of users open on card without board open
-   link to API documentation
-   adding dependencies between private cards
-   handling of dependencies where not accessible
-   make associated comments public when card is made public
-   synchronise my private tasks between my windows

Fixes:

-   issue where someone online in board remained online if page reloaded
-   issue where lists hidden when previewing Kanban view while creating a Board
-   issue where page crashed on logout in Node view
-   issue where page crashed on logout in Timeline view
-   issue where files couldn't be downloaded
-   issue where page reloaded in admin view

2022-11-08

Features:

-   installable web app

Performance:

-   faster load
-   added virtual scroll for Kanban
-   smoother drag and drop
-   faster filtering/searching inside a Board

Improvements:

-   improved new user experience in integrations
-   hide dependency lines while dragging & resizing
-   usability of tile color label edit/selection
-   stop auto redirecting expired account

Fixes:

-   fix for drag scrolling lists on mobile
-   fix editing link titles
-   fix positioning of timeline arrows caused by swimlane animations
-   fix double click to add list

---

### October

2022-10-17

-   Updates for Timeline

    -   animate expand/collapse of scheduled lanes
    -   fix for hidden cards on timeline when duplicated (eg multiple colors/assignments)
    -   highlight multiple instances of same card on hover
    -   remember last view (list/color/members)
    -   live updates of list names, color labels and members
    -   show color labels

2022-10-05

-   Fix for opening 'Owners Only' community boards

2022-10-04

-   Fix for timeline lists not scrolling
-   Updated translations

### September

2022-09-27

-   Fix for not being able to close date picker on mobile

2022-09-05

-   Updated translations including notifications

### July

2022-07-08

-   Compatibility for private channels in Teams

### June

2022-06-23

-   Print feature for Board View
-   Fix for loading ToDo View with deleted groups
-   Fix for 'View' by 'Groups'
-   Fix for description not saving in certain window changing scenarios
-   Fix for character encoding in update streams

2022-06-21

-   Fix for viewing user presence
-   Fix for viewing card title when user presence is also displayed
-   Fix for 'Commented on' recent updates not syncing in real-time
-   Fix for displaying changes made in Activity View
-   Updated Recent Boards in side toolbar
-   Fix for auth loop when using Connections Header

2022-06-10

-   Fix for card toolbar on smaller resolutions
-   Community widget now works if user has no email
-   Highlights widget fix for opening fullpage
-   Fix for visibility of Owners Only group Boards

2022-06-07

-   Fix for readers not being able to complete cards
-   Fix for dependencies in Todos view

### May

2022-05-20

-   NEW [Dependencies feature](../howto/dependencies/index.md)

2022-05-10

-   Fix for Microsoft admin approval

2022-05-09

-   Can no longer close a page when editing a description
-   Description locking alert moved for better visibility
-   Authors no longer appear to be able to edit descriptions when unable to
-   Fix for opening links in description
-   Fix for comment truncation issue in rare circumstances
-   Fix for new line @mentions
-   Fix for focused description loss when immediately moving to comments
-   Fix for showing editor toolbar when selecting all using keyboard

---

### April

2022-04-28

-   Updated RTE to latest
-   New Teams welcome message card
-   New Teams notification cards
-   Fix for email attachments not attaching

2022-04-19

-   Updated fix for Moderated Community access
-   Fix for crash when updating Board title
-   Fix for description locking in communities

2022-04-07

-   Fix for Moderated Community access

2022-04-06

-   NEW linked-cards micro-app
-   Fix for comment stream entry for Orient Me
-   Fix for updating card title from Boards view in FireFox
-   Fix for deeplinked Connections Community widgets
-   Fix for Boards Search styling
-   Fix for opening filters via icon
-   Fix for Teams login popup not closing

---

### March

2022-03-21

-   Improve file upload feedback (eg when socket unavailable)
-   Fix duplicates appearing in history from live events
-   Fix first comments not live displaying

2022-03-11

-   Fix for timeline cards sometimes showing a day off
-   Fix when loading a Community widget where the Board has been deleted causing an inifinite loop

2022-03-09

-   Fix for pasting into edited comment clears comment
-   Fix for loading subscriptions
-   Reducing browser console noise

2022-03-03

-   Fix for crashing when tours are dismissed
-   Fix for private card toggle

---

### February

2022-02-17

-   Ability to change Private cards to Public
-   Updated Date pickers with month/year selection
-   Updated Material UI library to latest
-   Fix for saving description on modal closure
-   Fix for transfer membership

---

### January

2022-01-31

-   Fix for welcome message in Microsoft Teams Bot
-   Fix for lost descriptions on first edit when pasting an image
-   Improved file upload feedback
-   Fix where you could not upload the full 50MB for a file
-   Fix for going to the Boards homepage not group list when in group context
-   Performance improvements

2022-01-14

-   Fix link format in card history
-   Fix opening URL from MS-Office add-in
-   Update SunEditor to latest

2022-01-04

-   Fix for notifications on comments to other commenters
-   Fix for emails when users are no longer Board members

---

## 2021

2021-12

-   Fix for child nodes not loading when loading a node directly
-   Fix for completing tasks when multi-assign has been removed
-   Fix for breadcrumbs not displaying when opening a card node directly
-   Adding generic Create Card functionality
-   Fix for requesting too many Connections community members at once
-   Fix for adding tags with the same starting letter
-   Mindmap move card & Board name overflow fixes
-   Update comment count when deleting comment
-   Syncing when description is deleted
-   Board history max card title height
-   Updated Arabic translations

2021-11

-   Fix for background when RTE in fullscreen mode
-   Fix for opening cards with a theme set
-   Updated Arabic translations
-   Fix for drag&drop assignments creating extra cards
-   Added Recent Updates Feed

2021-10

-   Updated German translations
-   Microsoft Teams login fix
-   Fix for issue where link is inserted at start of description
-   Fix for issue when changing user account tries to loads the previous open Board
-   Fix for issue when adding group as board member
-   Added user images by API
-   Fix for copy/paste lists in Activity view
-   Fix for compatibility with Visual Update One (Collab Cloud)
-   Fix for issue where multiple toasts in quick succession never auto closed
-   Fix for starting Zaps/Flows with Huddo Boards
-   Auto Premium Trial
-   Enhancement for msgraph groups which are not teams (owner != member)
-   Unsubscribe emails link
-   Fix for logout/login socket issue
-   Fix for Activity view interact to create list
-   Fix for adding Connections/Collab Cloud Communities as members
-   Improved performance by reducing page load size
-   User Presence on cards
-   Improved Activities View performance
-   Improved private card creation process

2021-09

-   Adding undo/redo buttons to description toolbar
-   Fix for trial dialog opening
-   Better caching and performance of my/public groups
-   Integromat integration
-   User search performance
-   Community name search improvements
-   Admin page crash fix
-   Fix for Teams notifications turning back on when they are disabled

2021-08

-   Private Card feature
-   Fix for group membership for private groups
-   Improved invite handling
-   Ability to set group permissions for a Board on create in the group
-   More granular user permissions for group membership
-   Fix for ToDo view filtering
-   Update to user subscriptions allowing emails to be applied
-   User subscriptions now default to purchasing user
-   User subscriptions are now named, not first-come-first-serve
-   Better management options for user subscriptions
-   Fix for error thrown when assigning colours in a Board
-   Small screen icon positions, in particular for attached files
-   Various performance updates

2021-07

-   Fix for access to Boards in Teams
-   Fix for issue where you could not change level of community members
-   Fix for issue when accepting email invites for guest/external users
-   Performance relating to loading times

2021-06

-   Initial version of this page
