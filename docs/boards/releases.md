# Boards Self-Hosted Releases (change log)

## How To Upgrade

!!! warning "Important - new image hosting"

    As of January 2023 we have moved our image hosting. Please [follow this guide](images.md) to configure your Kubernetes with access to our images hosted in Quay.io. We have provided new [Huddo charts](helm-charts.md) to utilise these images.

Please use the appropriate update command with the latest [helm chart](helm-charts.md). For example:

1.  Huddo Boards in Kubernetes

    ```
    helm upgrade huddo-boards https://docs.huddo.com/assets/config/kubernetes/huddo-boards-1.0.0.tgz -i -f ./boards.yaml --namespace boards
    ```

1.  Component Pack (Activities Plus)

    !!! tip

        To upgrade from images in the Component Pack to images hosted by us please follow [this guide](cp/latest.md).

    !!! danger

        New chart for Component Pack

        As of `huddo-boards-cp-1.0.0.tgz` we have changed the Minio pods to run as `user 1000` instead of `root`.
        You must perform the following command on the shared drive (`/pv-connections` file system) before using this new chart. The change is backwards compatible.

            cd /pv-connections/kudos-boards-minio/
            chown 1000:1000 -R .

    ```
    helm upgrade huddo-boards-cp https://docs.huddo.com/assets/config/kubernetes/huddo-boards-cp-1.2.0.tgz -i -f ./boards-cp.yaml --namespace connections
    ```

---

## Releases

!!! note

    Updates may include minor schema migrations at any time. If you have a need to downgrade versions then we recommend performing a back-up of the Mongo database before you update versions.

### 2024

#### 2024-12-12

Build #1177

Improvements:

-   Support retrieval of auth token by SSO in Connections. Fix issue with duplicate LtpaToken and remove requirement for the client.externalId

Activity Migration:

-   Process to detect files with missing CCREFUUID in the SQL DB and remigrate into S3 and update Node file link

#### 2024-12-11

Build #1177

Improvements:

-   lookup performance of groups (e.g. Communities, Teams, etc)

#### 2024-12-10

Build #1177

Improvements:

-   Add locale support/text translations for date pickers
-   Minor DE translation improvements
-   Support [disabling of the Resource links](./env/notifications.md#resource-links) in the email footer
-   Support [admin configuration for MSAD](./env/common.md#microsoft-active-directory-ad)

Fixes:

-   Personal iCal feed, include cards with only due date (no start date)
-   Issue where card history and comments were not updating when switching between cards/sub cards
-   Fix performance issue where Community Members were expanded too frequently
-   Authentication issue in micro apps

#### 2024-11-28

Build #1171

Fixes:

-   Regression bug: direct links to cards (e.g. in emails) renders blank screen
-   Upload to MSGraph 'My' files
-   Issue with text color in rich text editor

#### 2024-11-14

Build #1165

Features:

-   My Todos Timeline - show your tasks for each of your Boards in one central, visual place

Improvements:

-   New 'Completed' Boards tab, split from the archive
-   Loading speed of Completed/Archived - recently modified

Fixes:

-   Issue where creating Board tile labels overwrites the last label
-   CNX8 header integration: notification popover issue
-   CNX8 header integration: positioning of create board floating button overlapping right menu
-   Allow upgrading external users to full membership

Activity Migration:

-   Prevent duplicate key exception encountered with very old data for two public members in same Activity

#### 2024-11-05

Build #1160

Improvements:

-   Upgrade socket.io to latest, change to default polling then upgrade to websockets, add more backend error logging, allow custom headers
-   Better style support when using extensions injecting dom elements (eg. grammarly)
-   Accessibility: use mui button groups for mindmap layout controls (hover/focus styles), add outline on focus to colour labels and member icons, fix padding and add focus outline to complete button
-   Kanban lists - move padding down a level so scrollbar is right aligned

Migration:

-   UI - Stop migration polling on tab blur, restart on focus
-   Improved detection speed of already processed Activities (DB query selection, new index, hashset comparison)
-   Environment variable to migrate Activities by ID (`IMMEDIATELY_PROCESS_ACTIVITY_IDS`)

#### 2024-10-29

Build #1155

Features:

-   PDF zoom/paging controls

Improvements:

-   update to the latest version (v6.xx) of Material-UI
-   improved flex layout of card icons and assignments + enable assigment avatar stacking
-   add a card from the top of a list in board view
-   create board from template - make this action more prominent, highlight and add as a floating action when viewing a template
-   Members and colours can be assigned to a card by dragging from the sidebar within the card options dialog view
-   Tasks with a due date only (no start date) will now appear in the timeline view
-   Minor style, position calculation and other improvements to the timeline view
-   Allow caching of uploaded files based on unique etag
-   Simplification of task/entry. Add icons to their create buttons to clearly differentiate. Allow setting dates and dependencies on entry, auto converts to task
-   Simplification of dates. 'End Date' has been merged into 'Due Date'
-   Styling of recent updates loading progress bar
-   better grid spacing for board members and colours
-   Rename entry to note for clarity

Fixes:

-   minor UI fixes in board and card detail views
-   close nav drawer when todos is clicked
-   card details title textarea - make auto width with no resize to avoid overflow or small width issues
-   assignment roles
    -   role icon search issue
    -   colours used based on colour scheme
-   drag and drop
    -   prevent dragging anchor and images when read only
    -   prevent touch drag opening context menu
    -   timeline - orange border for drag preview
-   dependency arrow calculation fix for bordering cards
-   Themed card title appearing in the background in card details dialog
-   Positioning of rich text toolbar when card title long
-   Export Board with creator/updater null (data imported from Activities)
-   Protection against assignments to user null (data imported from Activities)
-   Dark mode styling of transfer ownership dialog
-   issue with customisation of events (APP_LOGO_URL, BRAND_LOGO_URL, SOCIAL_LINKS)

Activity Migration:

-   performance - keep userId map in memory to avoid redis JSON.stringify/parse expense
-   memory utilisation

    -   stream files from disk to S3 in smaller/customisable chunks
    -   release processed nodes from memory faster

-   additional debug logging

#### 2024-08-29

Build #1112

Features:

-   Dark mode!

    ![dark mode](./howto/dark-mode.png)

Improvements:

-   Board tile grid auto-sizing
-   Create a Card button spans full width of list
-   Organisation content administration.

    -   Delete functionality for Boards which user is not an owner of
    -   Search by board name - case insensitive
    -   Sort by Archive column
    -   Select all only selects visible

Fixes:

-   Issue with webhooks
-   Issue moving cards by DnD in Kanban in Firefox with Linux OS
-   Content Admin - scrolling issues (wobbling and while filtered)
-   MindMap - dont show edit option on hover while creating new card

#### 2024-08-07

Build #1092

Features:

-   Support for [Microsoft AD](./msad/index.md)

Improvements:

-   Card details refresh (new styling & theme updates)

    ![card details](./howto/card-details.png)

-   Todos filtering by Board - move under filter options

    ![todos board filters](./howto/todos-board-filters.png)

-   use bolder Roboto fonts to emphasise headings and actions
-   Board autocomplete - search boards immediately, show in drop down, dont filter by current selection

Language Translations:

-   Added missing translations for the following languages:

    -   Bulgarian (bg)
    -   Catalan (ca)
    -   Chinese (Simplified) (zh)
    -   Chinese (Traditional) (zh-TW)
    -   Czech (cs)
    -   Danish (da)
    -   Dutch (nl)
    -   French (fr)
    -   Italian (it)
    -   Japanese (ja)
    -   Polish (pl)
    -   Portuguese (pt)
    -   Romanian (ro)
    -   Russian (ru)
    -   Slovak (sk)
    -   Slovenian (sl)
    -   Spanish (es)

Fixes:

-   Text overflow issue in Activity view 'add a card' at top button
-   Issue with incorrect number of Microsoft users in organisation admin view
-   Issue when filtering todos by selected Boards, showing cards outside of the selected Boards if also filtering by text/color with "Match All Filters" disabled
-   support Drag-N-Drop transitions from touch to mouse devices and back again
-   show number of comments on private cards

#### 2024-06-27

Build #1053

Improvements:

-   list menu - show for authors/readers (hide menu options per access)
-   restrict the selectable roles available in the dropdown when creating new/editing existing members

Fixes:

-   Regression bug causing @mentions to not send in comments
-   bug where possible to reduce role of other member with higher privelleges than current member
-   fix wrap/styling issues for board calendar feed section

#### 2024-06-25

Build #1049

Features:

-   Click on images in comments to preview

Improvements:

-   caching of API requests (features & login methods)
-   responsive design of cards in Activity view and modal (small screen)
-   card display - cursor & border updates
-   create card - don't hide input/buttons on blur if text has been entered
-   Mobile: save/cancel buttons when creating comments
-   Mobile (Android): fix for keyboard covering input fields
-   only allow link on card to bookmark (not uploaded files)
-   performance of data selection from redux
-   mobile: always show rich text editor toolbar in comments (to access @mentions)

Fixes:

-   card link in node view on small screen
-   fix rich text fullscreen issue
-   Parse email to card when dragging from HCL Notes
-   loading wrong page/route when logging in with multiple windows (e.g. Community widget & Related Tasks)
-   issue where dual tooltips in collapsed Board sidebar
-   Assign Member list overflowing on phone
-   issue with text overflow in card links
-   issue with center alignment of login page on small extra screen devices
-   issue with toolbar position for comments (balloon) under header when adding new comment in sidebar

#### 2024-05-27

Build #1028

Features:

-   Drag and drop of cards between browser tabs/windows
-   Drag and drop bookmarks into Board lists/cards

Activity Migration:

-   MSSQL: Support for authentication per database

#### 2024-05-17

Build #1027

##### HCL DX

As [announced at Engage 2024](https://www.huddo.com/blog/huddo-engage-2024) - Huddo Boards for HCL Digital Experience (DX). [Learn more](./dx/index.md).

Features:

-   Card and Board recent updates feed - filter to show all or comments/updates only

Improvements:

-   add a permanent but closable info level toast when board is read-only
-   update rich text editor to latest version
-   card details view improvements
    -   show card fields/data in defined sections in a grid formation with headings and add buttons
    -   change "add a comment" action to start as a button
-   tooltips on date picker
-   add invalid date error message
-   primary session expired message - show as info alert
-   tab color and style improvements
-   more consistent use of primary/secondary action colours on buttons
-   no collapse for empty lists activity todo pivot views
-   auto collapse empty lists initially and after a card is dragged out of them
-   New Board Wizard - more specific label for board name and template name
-   Activity view improvements

    -   styling (shadows, spacing, border edges when expanded/collapsed)
    -   drop cards on list header (highlight like shadow)
    -   add card at top hides the bottom add card

-   Usability:

    -   Timeline: add zoom -+ controls that increment zoom levels
    -   Mindmap accessibility

        -   1st tab selects board node, allow arrow key nav, and tab to access actions from there
        -   sidebar controls - use mui checkboxes + ensure hover effects on buttons
        -   clear node selection on escape keypress
        -   fix text cutoff/ensure ellipsis on longer node titles
        -   add help link to sidebar
        -   allow keyboard pan and zoom using shift+arrow and +- keys

    -   add contact support button to error catch page
    -   add severity levels when showing toasts, fade transition
    -   ensure board creator is displayed as a non-editable owner on board/template creation
    -   ensure board tile labels are sorted in selection menu
    -   make 'Recent' heading in sidebar look less like other actionable items
    -   use delete icon (bin) for remove actions for member tiles, dates, tags, and board tile labels

Fixes:

-   Board tile label delete - ensure tile label is deleted from the label object in store
-   update material-ui libraries to fix date picker display issues on small screens
-   ensure card header theme displays correctly when card is opened via direct link
-   minor styling fix for dependencies section on a node
-   board/activity lists - more precise and consistent footer spacing/padding
-   create card and add comment actions - ensure entered text persists on unfocus + other focus related fixes
-   issue with exporting a board in Teams client
-   date picker error on mobile/touch devices
-   issue with format of dates in date picker
-   issues in list header title - not full width, no-wrap ellipsis, use correct cursors
-   don't show grab cursor on lists in todos / pivoted views
-   issue saving tags when creating new template
-   ensure tags are copied from template/source
-   Accessibility fixes:

    -   Focus highlighting overrides
    -   use focus outline rather than background colour
    -   Fix for keyboard access to CreateCard app clear buttons to choose board/list
    -   MenuHelper.jsx - pass the disabled prop to the button
    -   position of assign members menu
    -   better focus styling for add board tile button
    -   better contrast when focusing on boards logo
    -   board tiles sort dropdowns - use defined focus bg and colours
    -   minor fixes for focused input controls

Activity Migration:

-   Support custom DB names in MSSQL

#### 2024-04-03

Build #1003

Features:

-   Emoji reactions on comments

    -   Quick selection

        ![emoji quick](./howto/reactions/quick.png)

    -   Picker

        ![emoji picker](./howto/reactions/picker.png)

-   [Micro Apps](./apps/index.md)

    -   [My Next Tasks Summary](./apps/index.md#my-next-tasks-summary)
    -   [My Next Tasks](./apps/index.md#my-next-tasks)

[API Documentation](https://boards.api.huddo.com):

-   `/todos/next`
-   `/todos/summary`
-   `/board/{boardId}/labels`
-   `/board/labels`
-   `/user/auth/{provider}/{externalId}/apitoken`

Improvements:

-   Streamlined `/todos/assigned` & `/todos/created` API, separating out the Board labels to `/board/labels` & `/board/{boardId}/labels` endpoints
-   Loading feedback when creating a board
-   Editing of comments on mobile (focus at end of text, save/cancel buttons)
-   Loading feedback of recent boards sidebar
-   Card link opening behavious (links to other boards open in same tab)
-   Teams board links open tabs
-   Show loading spinner while waiting on clicked link to open in a teams tab
-   Add copy/paste list option in list menu
-   Add duplication list option in list menu
-   More comprehensive history feed details for moving or reordering cards

Fixes:

-   Create board from template when opened and only a reader
-   Creating Board in group restricts to the group's Organisation
-   Better handling of authentication when provider session changes user account
-   Visibility of 'Embed Link' when viewing Boards by Group
-   Creation of Board in Group when using /group/{groupId} route (embedded)
-   View cards in fullscreen on small screens
-   Issue when deleting all Boards tile colors
-   Links to card ancestors (Todo view)
-   Prevent date selection incorrectly showing today when no date set
-   Upload files to Teams private channel OneDrive
-   Scroll to bottom of a list when creating a new card
-   Delete action in card dialog / in archive view
-   Add card section in a list delays retract/height change to prevent card drag issues
-   Dragging empty colour labels in Firefox
-   Filter/search by list name
-   Unauthorised error when adding existing board as Teams tab
-   Fix potential onEnter errors in rich text editor
-   Prevent overflow on file preview
-   Load board members on fullscreen list view (for @mentions)
-   Fix potential onBlur errors in rich text editor
-   Don't show iCalendar feed options in Teams

Activity Migration:

-   Security updates
-   Oracle DB

    -   Update to use new v6 thin client
    -   allow different credentials for [PEOPLEDB](./cp/migration/index.md#peopledb-acl)

-   MSSQL

    -   Update to v10
    -   allow self-signed certificates with [CONNECTIONS_DB_OPTIONS](./cp/migration/index.md#mssql) variable

#### 2024-02-14

Build #960

Fixes:

-   Connections SSO header scripts - Notifications panel
-   Missing translations caused by load race condition
-   Translation of timeline months headers

#### 2024-02-07

Build #956

Fixes:

-   Issue with Board Content Admin on Mongo v3
-   Microsoft Teams private channels
    -   Link to File will now show the private channel's files.
    -   Owner/Author access level was setting all members to Author.
-   Microsoft Teams Mobile: Removed licence related cards in org admin view.
-   Microsoft Teams: Removed obsolete "Disable Notifications" button.
-   Rich text editor dialog - allow scroll on overflow
-   Use SMTP email address before using Exchange address when parsing email attachments
-   Don't show organisation admin links from Boards sidebar menu in Teams on a mobile device
-   Activity view scrolling issue

#### 2024-01-16

Improvements:

-   Microsoft Teams integrations

    -   UI redesign when adding new Boards tab
    -   Onboarding Tours

-   faster opening of cards
-   allow clicking links in description when content locked for editing
-   allow reordering private cards
-   US English updates
-   organisation plan loading feedback

Fixes:

-   issue loading licence caused by race condition in Licence service startup
-   issue where completing a new task showed incorrect icon
-   issue where Board content deleted when hovered and press Ctrl+Alt+Delete
-   issue when opening a card by link, then a subcard within that card
-   issue when reordering cards with filtered (hidden) content
-   visibility of card title in header breadcrumb (Component Pack)
-   RichText saving when used @symbol (but not an @mention)
-   @mentions keyboard navigation improvements (home/end, up to bottom, down back to top), escape without closing modal
-   @mentions only considered new on first save
-   issue where mentions popup partially hidden at top
-   issue where could not mention users when opening a card directly by link
-   hide private cards when viewing board by assignments
-   create card from Outlook/Verse - fix toggle of attach body, ordering of recent boards
-   drag dependency links in Firefox

---

### 2023

#### 2023-12-18

Feature:

-   Drag emails from Outlook to create as card
-   Support for latest MongoDB (v7)
-   API documentation for /user/{userId}, /user/group/{groupId} etc

Improvements:

-   Accessibility (keyboard navigation - colors/members dialog, aria-labels, popover, html.lang attribute, improved roles, aria-selected, aria-expanded, hover/focus on cards)
-   Drag email to card - attach .eml and .msg file
-   Positioning of unscheduled cards in Timeline
-   Improved document titles based on context
-   Smoother drag scroll on Kanban
-   Ensure grab cursor for Kanban drag scroll
-   Update childcounts in activity lists when filtering
-   Visibility of selected board filters
-   Searching for a board includes the description

Fixes:

-   Card label overflow issue when 5 lines
-   Issue where comment events sent to mentioned users
-   Link to File dialog options
-   Issue saving card name when editing it directly on the card
-   Issue when focusing on boards search input

---

#### 2023-11-30

Features:

-   Support for Domino by [REST API](./domino/index.md)

    !!! tip

        Please [follow this guide](./domino/migration/index.md) to migrate from your existing Proton based Domino authentication

Improvements:

-   Minor accessibility improvement - add aria-labels
-   Security updates (Node v20)
-   allow running webfront pods as random user id

Fixes:

-   Fix template description not showing in new board wizard
-   Debounce User/Group searching
-   Issue where menu buttons in the open card view were not overflowing to the 'more' menu correctly and causing a flickering effect
-   Issue where lists in board view could not easily be dragged to re-order
-   Issue with board title button long text overflowing
-   Issue with card background images

---

#### 2023-11-14

Improvements:

-   Accessibility

    -   more consistent tooltips (for screen readers and better explanation of functionality)
    -   Keyboard navigation (particularly in the Board Tiles, Kanban view, Card dialog) - (vision & motor impaired)
    -   better screen reader information (vision impaired)
    -   improved colour contrast (low vision users)

-   API for Member deletion
-   Support [Keycloak v22 custom path](./connections/keycloak.md)

Fixes:

-   Email for mentions missing fields

---

#### 2023-10-31

Improvements:

-   Translations (German and English US)
-   Use https protocol for iCal feed instead of webcals
-   Hide unusable Colors button when read-only access when sidebar collapsed
-   Consistency of Board colour feature naming

Fixes:

-   Issue where iCal feed dates off by 1 due to timezone differences
-   Issue where page blank in Firefox when loading with Connections 7 header via SSO

---

#### 2023-10-25

!!! danger

    When deployed, this release (and all subsequent) will perform a once-off schema migration for Boards notification/event data in the Mongo database. We recommend performing a back-up of the database before you update versions

Features

-   [Board iCalendar feed](./howto/ical/board.md)
-   [Personal iCalendar feed](./howto/ical/personal.md)

Improvements:

-   Show Member/Labels buttons in collapsed sidebar
-   Added translations to missing access role fields
-   loading of Board task stats on tiles as required
-   performance of loading My Boards
-   redirect in place for expired session of Collab/Connections with SSO header

Fixes:

-   Connections Header about.jsp issue for older environments (regression in 2023-10-17)
-   Issue where page crashed when reloaded page with Card open, then opening member dialog

---

#### 2023-10-17

Improvements:

-   updated German translations (UI and emails)
-   expired session handling when using SSO

Fixes:

-   showing CNX8 notification action center in sidebar
-   pasting image in rich text field (desciption and comments)
-   support SafeLinx cookie auth on manifest.json
-   issue where dependencies change view after deletion
-   allow assigned author to assign/unassign

KNOWN ISSUE

-   Connections Header loading via SSO loading in older environments (eg CNX7)

---

#### 2023-09-14

##### Mongo schema migrations

!!! danger

    When deployed, this release (and all subsequent) will perform major once-off schema migrations for Boards data in the Mongo database. We recommend performing a back-up of the database before you update versions.

Features:

-   [Organisation content administration & membership management](./admin/content-member-management.md)
-   Labels pivot view for Board and Activity views
-   Pasting URLs into description and comments automatically converted to clickable link

Improvements:

-   support HCL Connections 8 CR3 style changes
-   API performance (faster response, less data) of the

    -   'My/Public Boards' data
    -   cards in a Board

-   Users with the author role now have full edit access on cards that are assigned to them (rather than complete and comment access only)
-   consistency of sidebar icon positioning when collapsed/expanded

Fixes:

-   public member creation when creating Board
-   issues in dependency arrow positioning
-   auto reschedule dependencies when dates change
-   selecting the same file to upload after cancelling
-   expand/collapse lists when pivoted by dates/assignment
-   Ensure assignments are duplicated when copying and pasting tasks
-   Prevent cards from being moved to another list at the same time they are archived by dragging to the archive button
-   Ensure the current user has the correct actions available according to their board role when opening cards from the My Todos view
-   Drag & Drop from rich email clients onto a list
-   Activity list missing action menu

---

#### 2023-07-04

Improvements:

-   Readers can now select text in descriptions
-   General reader experience
-   Improved author experience - restrict to allowed actions
-   Board title/board options button - styling and usability improvements
-   Current member role now highlighted in members dialog and links added to member permissions documentation
-   Improved randomisation and readability of Assignment Role colours
-   Added tooltips to Assignment Role avatars
-   Microsoft Teams

    -   detect members in private sub channels (OAuth Admin consent must be certified again)
    -   fix for creating Board in private sub channels
    -   loading spinner positioning

Fixes:

-   Connections 8 styling fixes (support banner and nav customisations)
-   Fixed coloured role borders when assigning member roles
-   Fix URLs pointing to old docs pages
-   Issue detecting highest licence when multiple
-   Minor fixes to Welcome and Plan Selection dialogs
-   Template role assignment on touch devices
-   Assignments to non-primary aliases

---

#### 2023-06-22

##### Mongo schema migrations

!!! danger

    When deployed, this release (and all subsequent) will perform major once-off schema migrations for Boards data in the Mongo database. We recommend performing a back-up of the database before you update versions.

Features:

-   [Template Rescheduling](howto/templates/global.md#template-scheduling)
-   [Template Roles](howto/assignment-roles/assignment-roles.md)
-   Custom Colours - colours and tags have been merged. You are now able to create as many colours as you like in a Board.
-   Button to assign all sub-tasks as dependencies of parent
-   Drag & Drop assignments from parent to sub-cards in modal
-   Drag card to archive

Improvements:

-   Readers no longer see actions they cannot perform
-   Outlook attachments using plugin
-   Copy/Paste functionality (buttons & menu items)
-   UI for member adding on Mobile
-   Timeline card title always visible
-   Auto-move dependency parent
-   Expand all in activity view
-   Hide edit options on archived card
-   Localised format of dates in CSV export
-   Cards can be Archived+Deleted from the card modal toolbar.
-   Drag and drop of lists

    -   drag by header
    -   fix blank list when scrolled and dragged
    -   prevent scrolling of list in drag mode

Fixes:

-   Styling of ITM sidebar in Connections 8 CR1/CR2
-   Connections 8 integrations when Boards on different domain
-   Getting members from private sub-channels (teams)
-   Attachments are moved in child nodes when the parent is moved
-   Updated attachments to correctly show when their parent had been moved
-   Kanban Printing
-   Timeline calendar shifting when opening a card
-   Removed Connections community members not removed from Board membership
-   Dragging card from assigned user created user image as card
-   Sending duplicate due date reminders
-   Card drag and drop

    -   issue where a duplicate card appears when drag to end
    -   issue where card jumps back to top when dragging a card to end of same list

-   Issue with exporting Board as CSV with special characters (e.g. Umlaut)
-   German translations with extra '}' character

---

#### 2023-05-12

Fixes:

-   Security issue affecting external users and public communities

---

#### 2023-01-24

Improvements:

-   Handling of default profile images in Connections
-   Detect language from Connections dropdown

Fixes:

-   Styling for HCL Connections 8 'Important-to-Me' sidebar
-   Handling of licence with new organisation in store

---

#### 2023-01-17

Improvements:

-   Styling for HCL Connections 8 new UI

---

#### 2023-01-03

Improvements:

-   Security updates (node 18)

Fixes:

-   Issue with blank page served on `/boards`

---

### Archive

For release history before 2023 please [see here](./releases-archive.md).
