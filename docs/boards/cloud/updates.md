# Boards Cloud Updates

Please see here for recent changes to [Huddo Boards Cloud](https://boards.huddo.com)

## 2023

### July

2023-07-12

Fixes:

- Activity list missing action menu

2023-07-05

Fixes:

- Ability to edit nodes when opened directly

2023-07-04

Fixes:

- Assignments to non-primary aliases

2023-07-03

Improvements:

- Improved author experience - restrict to allowed actions
- Board title/board options button - styling and usability improvements
- Current member role now highlighted in members dialog and links added to member permissions documentation
- Improved randomisation and readability of Assignment Role colours
- Added tooltips to Assignment Role avatars
- Microsoft Teams

    - detect members in private sub channels (OAuth Admin consent must be certified again)
    - fix for creating Board in private sub channels
    - loading spinner positioning

Fixes:

- Connections 8 styling fixes
- Fixed coloured role borders when assigning member roles
- Fix URLs pointing to old docs pages
- Issue detecting highest licence when multiple
- Minor fixes to Welcome and Plan Selection dialogs
  
---

### June

2023-06-26

Improvements:

- Readers can now select text in descriptions
- General reader experience

Fixes:

- Tours appearing incorrectly
- Template role assignment on touch devices

2023-06-21

Fixes:

- Move button now appears again

2023-06-19

Fixes:

- Timeline group-by colours

2023-06-15

Improvements:

- Readers no longer see actions they cannot perform

Fixes:

- Getting members from private sub-channels

2023-06-06

Improvements:

- Member promotion emails - add invite and membership details to give more context
- New configuration option to enable/disable member promotion requests
- Do not clear edited name/description when changing templates
- Ability to create new organisation from guest is reader popup

Fixes:

- Issue with exporting Board as CSV with special characters (e.g. Umlaut)
- Issue affecting Org config when user has multiple orgs
- Color selection/editing on small screens (e.g. mobiles)
- German translations with extra '}' character
- Issues with Role Assignments (duplicates etc)
- Collab - fix for offering user org trial
- Issue in create first board tour

---

### May

2023-05-26

Features:

- Organisation Guests are now treated as Reader
- Ability for guest to request a promotion to member, sent to admins via email & socket

2023-05-23

Improvements:

- Drag and drop of lists

  - drag by header
  - fix blank list when scrolled and dragged
  - prevent scrolling of list in drag mode

- Cards can be Archived+Deleted from the card modal toolbar.
- Enable "Assign to Roles" when creating a new Board via 'Create Template from Board' button.
- More compact Board Members view on small (phone) screens.

Fixes:

- Issue with blank tile label
- Issue with empty Assign Roles in new Board wizard
- Board Tiles sidebar shadow regression bug
- Card drag and drop

  - issue where a duplicate card appears when drag to end
  - issue where card jumps back to top when dragging a card to end of same list

- Button for copying a template says "Copy Template" instead of "Copy Board"
- Fixed loading of template description in to board description field in the new board wizard.
- Deleting an open template now redirects to template list instead of board list.
- Fixed "Assign to Roles" screen appearing in Board wizard without any roles to assign members.
- When creating a new Board, edited name and description fields are not lost when changing the selected template.

2023-05-16

Improvements:

- Organisation view of members & groups

  - loading feedback
  - virtualised scroll for faster render
  - show membership of linked aliases
  - prevent duplicates of invites to org

- localised format of dates in CSV export

Fixes:

- Security issue affecting external users and public communities (Connections)
- issue where Organisation invites not visible if members with linked aliases

2023-05-05

Features:

- Drag card to archive

Improvements:

- Auto-move dependency parent
- Expand all in activity view
- Hide edit options on archived card
- Performance improvements related to icons used on Template Roles
- Show count of tasks assigned to Role in Board Members view

Fixes:

- Dragging card from assigned user created user image as card
- Sending duplicate due date reminders

---

### April

2023-04-21

Features:

- Button to assign all sub-tasks as dependencies of parent
- Template Roles - base functionality

Fixes:

- Removed Connections community members not removed from Board membership
- Deleting an assigned label

2023-04-12

Features:

- Custom Colours. Colours and tags have been merged. You are now able to create as many colours as you like in a Board

---

### March

2023-03-20

Fixes:

- Group member changes not being picked up

2023-03-17

Improvements:

- Timeline card title always visible

2023-03-15

Improvements:

- UI for member adding on Mobile

Fixes:

- Kanban Printing
- Timeline calendar shifting when opening a card

2023-03-10

Features:

- [Template Rescheduling](../howto/templates/global.md#template-scheduling)
- Drag & Drop assignments from parent to sub-cards in modal

Fixes:

- Assign users to a named licence

---

### February

2023-02-20

Fixes:

- Attachments are moved in child nodes when the parent is moved
- Updated attachments to correctly show when their parent had been moved

---

### January

2023-01-31

Features:

- New Organisation summary view

Improvements:

- Outlook attachments using plugin
- Copy/Paste functionality

2023-01-24

Improvements:

- Styling for HCL Connections 8 new UI
- Handling of default profile images in Connections
- Detect language from Connections dropdown
- Security updates (node 18)

---

## 2022

### December

2022-12-14

Improvements:

- synchronise dependencies in real time
- faster creation of multi cards
- presence of users open on card without board open
- adding dependencies between private cards
- handling of dependencies where not accessible
- make associated comments public when card is made public
- synchronise my private tasks between my windows

Fixes:

- issue opening board "Error: Minified React error #185"
- issue where Community widget shows 'my' boards incorrectly
- issue where someone online in board remained online if page reloaded
- issue where lists hidden when previewing Kanban view while creating a Board
- issue where page crashed on logout in Node view
- issue where page crashed on logout in Timeline view
- issue where files couldn't be downloaded
- issue where page reloaded in admin view

### November

2022-11-29

- Improvements

  - synchronise dependencies in real time
  - faster creation of multi cards
  - presence of users open on card without board open
  - link to API documentation
  - adding dependencies between private cards
  - handling of dependencies where not accessible
  - make associated comments public when card is made public
  - synchronise my private tasks between my windows

- Fixes

  - issue where someone online in board remained online if page reloaded
  - issue where lists hidden when previewing Kanban view while creating a Board
  - issue where page crashed on logout in Node view
  - issue where page crashed on logout in Timeline view
  - issue where files couldn't be downloaded
  - issue where page reloaded in admin view

2022-11-08

- Features

  - installable web app

- Performance

  - faster load
  - added virtual scroll for Kanban
  - smoother drag and drop
  - faster filtering/searching inside a Board

- Improvements

  - improved new user experience in integrations
  - hide dependency lines while dragging & resizing
  - usability of tile color label edit/selection
  - stop auto redirecting expired account

- Fixes

  - fix for drag scrolling lists on mobile
  - fix editing link titles
  - fix positioning of timeline arrows caused by swimlane animations
  - fix double click to add list

---

### October

2022-10-17

- Updates for Timeline

  - animate expand/collapse of scheduled lanes
  - fix for hidden cards on timeline when duplicated (eg multiple colors/assignments)
  - highlight multiple instances of same card on hover
  - remember last view (list/color/members)
  - live updates of list names, color labels and members
  - show color labels

2022-10-05

- Fix for opening 'Owners Only' community boards

2022-10-04

- Fix for timeline lists not scrolling
- Updated translations

### September

2022-09-27

- Fix for not being able to close date picker on mobile

2022-09-05

- Updated translations including notifications

### July

2022-07-08

- Compatibility for private channels in Teams

### June

2022-06-23

- Print feature for Board View
- Fix for loading ToDo View with deleted groups
- Fix for 'View' by 'Groups'
- Fix for description not saving in certain window changing scenarios
- Fix for character encoding in update streams

2022-06-21

- Fix for viewing user presence
- Fix for viewing card title when user presence is also displayed
- Fix for 'Commented on' recent updates not syncing in real-time
- Fix for displaying changes made in Activity View
- Updated Recent Boards in side toolbar
- Fix for auth loop when using Connections Header

2022-06-10

- Fix for card toolbar on smaller resolutions
- Community widget now works if user has no email
- Highlights widget fix for opening fullpage
- Fix for visibility of Owners Only group Boards

2022-06-07

- Fix for readers not being able to complete cards
- Fix for dependencies in Todos view

### May

2022-05-20

- NEW [Dependencies feature](../howto/dependencies/index.md)

2022-05-10

- Fix for Microsoft admin approval

2022-05-09

- Can no longer close a page when editing a description
- Description locking alert moved for better visibility
- Authors no longer appear to be able to edit descriptions when unable to
- Fix for opening links in description
- Fix for comment truncation issue in rare circumstances
- Fix for new line @mentions
- Fix for focused description loss when immediately moving to comments
- Fix for showing editor toolbar when selecting all using keyboard

---

### April

2022-04-28

- Updated RTE to latest
- New Teams welcome message card
- New Teams notification cards
- Fix for email attachments not attaching

2022-04-19

- Updated fix for Moderated Community access
- Fix for crash when updating Board title
- Fix for description locking in communities

2022-04-07

- Fix for Moderated Community access

2022-04-06

- NEW linked-cards micro-app
- Fix for comment stream entry for Orient Me
- Fix for updating card title from Boards view in FireFox
- Fix for deeplinked Connections Community widgets
- Fix for Boards Search styling
- Fix for opening filters via icon
- Fix for Teams login popup not closing

---

### March

2022-03-21

- Improve file upload feedback (eg when socket unavailable)
- Fix duplicates appearing in history from live events
- Fix first comments not live displaying

2022-03-11

- Fix for timeline cards sometimes showing a day off
- Fix when loading a Community widget where the Board has been deleted causing an inifinite loop

2022-03-09

- Fix for pasting into edited comment clears comment
- Fix for loading subscriptions
- Reducing browser console noise

2022-03-03

- Fix for crashing when tours are dismissed
- Fix for private card toggle

---

### February

2022-02-17

- Ability to change Private cards to Public
- Updated Date pickers with month/year selection
- Updated Material UI library to latest
- Fix for saving description on modal closure
- Fix for transfer membership

---

### January

2022-01-31

- Fix for welcome message in MS Teams Bot
- Fix for lost descriptions on first edit when pasting an image
- Improved file upload feedback
- Fix where you could not upload the full 50MB for a file
- Fix for going to the Boards homepage not group list when in group context
- Performance improvements

2022-01-14

- Fix link format in card history
- Fix opening URL from MS-Office add-in
- Update SunEditor to latest

2022-01-04

- Fix for notifications on comments to other commenters
- Fix for emails when users are no longer Board members

---

## 2021

2021-12

- Fix for child nodes not loading when loading a node directly
- Fix for completing tasks when multi-assign has been removed
- Fix for breadcrumbs not displaying when opening a card node directly
- Adding generic Create Card functionality
- Fix for requesting too many Connections community members at once
- Fix for adding tags with the same starting letter
- Mindmap move card & Board name overflow fixes
- Update comment count when deleting comment
- Syncing when description is deleted
- Board history max card title height
- Updated Arabic translations

2021-11

- Fix for background when RTE in fullscreen mode
- Fix for opening cards with a theme set
- Updated Arabic translations
- Fix for drag&drop assignments creating extra cards
- Added Recent Updates Feed

2021-10

- Updated German translations
- MS Teams login fix
- Fix for issue where link is inserted at start of description
- Fix for issue when changing user account tries to loads the previous open Board
- Fix for issue when adding group as board member
- Added user images by API
- Fix for copy/paste lists in Activity view
- Fix for compatibility with Visual Update One (Collab Cloud)
- Fix for issue where multiple toasts in quick succession never auto closed
- Fix for starting Zaps/Flows with Huddo Boards
- Auto Premium Trial
- Enhancement for msgraph groups which are not teams (owner != member)
- Unsubscribe emails link
- Fix for logout/login socket issue
- Fix for Activity view interact to create list
- Fix for adding Connections/Collab Cloud Communities as members
- Improved performance by reducing page load size
- User Presence on cards
- Improved Activities View performance
- Improved private card creation process

2021-09

- Adding undo/redo buttons to description toolbar
- Fix for trial dialog opening
- Better caching and performance of my/public groups
- Integromat integration
- User search performance
- Community name search improvements
- Admin page crash fix
- Fix for Teams notifications turning back on when they are disabled

2021-08

- Private Card feature
- Fix for group membership for private groups
- Improved invite handling
- Ability to set group permissions for a Board on create in the group
- More granular user permissions for group membership
- Fix for ToDo view filtering
- Update to user subscriptions allowing emails to be applied
- User subscriptions now default to purchasing user
- User subscriptions are now named, not first-come-first-serve
- Better management options for user subscriptions
- Fix for error thrown when assigning colours in a Board
- Small screen icon positions, in particular for attached files
- Various performance updates

2021-07

- Fix for access to Boards in Teams
- Fix for issue where you could not change level of community members
- Fix for issue when accepting email invites for guest/external users
- Performance relating to loading times

2021-06

- Initial version of this page
