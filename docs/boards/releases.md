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
    helm upgrade huddo-boards-cp https://docs.huddo.com/assets/config/kubernetes/huddo-boards-cp-1.1.1.tgz -i -f ./boards-cp.yaml --namespace connections
    ```

---

## Releases

!!! note

    Updates may include minor schema migrations at any time. If you have a need to downgrade versions then we recommend performing a back-up of the Mongo database before you update versions.

### 2023

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

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2023-01-03)

Improvements:

-   Security updates (node 18)

Fixes:

-   Issue with blank page served on `/boards`

---

### 2022

#### 2022-12-15

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-12-15)

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

-   issue opening board "Error: Minified React error #185"
-   issue where Community widget shows 'my' boards incorrectly
-   issue where someone online in board remained online if page reloaded
-   issue where lists hidden when previewing Kanban view while creating a Board
-   issue where page crashed on logout in Node view
-   issue where page crashed on logout in Timeline view
-   issue where files couldn't be downloaded
-   issue where page reloaded in admin view

---

#### 2022-11-15

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-11-15)

Improvements:

-   Redis client reuse
-   Ensure Redis is available on startup

---

#### 2022-11-09

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-11-09)

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
-   debugging added for socket connections and description locking

        > In browser console, you can enter `boards.setDebug(true)` and press Enter to enable this, then reload the page.
        > You will then get debug logs in the console for all websocket and description lock events.
        > Use `boards.setDebug(false)` to turn this off when done.

Fixes:

-   fix for drag scrolling lists on mobile
-   fix editing link titles
-   fix positioning of timeline arrows caused by swimlane animations
-   fix double click to add list

---

#### 2022-10-24

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-10-24)

Improvements:

-   reduced processing whilst dragging cards
-   /app/createcard micro app - new users can now create a board instead of being stuck with no board to choose

Timeline:

-   animate expand/collapse of scheduled lanes
-   fix for hidden cards on timeline when duplicated (eg multiple colors/assignments)
-   highlight multiple instances of same card on hover
-   remember last view (list/color/members)
-   live updates of list names, color labels and members
-   show color labels

Fixes:

-   webhook api events may not have fired in a specific situation for users with linked accounts

---

#### 2022-10-10

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-10-07)

Fixes:

-   API documentation page no longer using local config (all "Try it out" routes would fail).

---

#### 2022-10-07

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-10-07)

API Updates:

-   Add `PATCH` method for `/node/{nodeId}` to allow changing any attribute of a card or list
-   Add webhook for card-moved events (`/webhook/card-moved/{boardId}`)

Translations:

-   Full translation run for all supported languages

Features / Fixes:

-   Fixed scolling in the Timeline view when you have too many lists to fit in the view
-   Changed colours on the Timeline view to better show cards when dragging
-   Fix for closing date picker on touch screens
-   Remade the drag preview on timeline to look more like a card
-   Build process refactor - docker images are much smaller after this update
-   All images updated to pass latest security scan requirements

---

#### 2022-09-07

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-09-07)

Security Update:

-   Full node.js package audit and update

---

#### 2022-08-25

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-08-25)

Features:

-   Added translations for Dependencies feature
-   Added translations for all email templates

---

#### 2022-08-16

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-08-16)

Features:

-   Domino authentication [More info here](./domino/proton.md)

Fixes:

-   Distorted profile image if not square

---

#### 2022-08-09

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-08-09)

Improvements:

-   Compatibility for private channels in Teams

Fixes:

-   Attach Card with remembered previous selection

---

#### 2022-06-24

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-06-24)

Features:

-   [Dependencies feature](howto/dependencies/index.md)

Improvements:

-   Printing in Board View
-   Highlights widget opening fullpage
-   Updated Recent Boards in side toolbar
-   Viewing card title when user presence is also displayed
-   Visibility of Owners Only group Boards

Fixes:

-   Styling of user presence when multiple
-   Card toolbar on smaller resolutions
-   Community widget now works if user has no email
-   'Commented on' recent updates not syncing in real-time
-   Auth loop when using Connections Header
-   Loading ToDo View & 'View' by 'Groups' when a group has been deleted
-   Description not saving in certain window changing scenarios

---

#### 2022-05-13

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-05-13)

Features:

-   Auto login to Boards if only one provider configured

Improvements:

-   Prevent closing page when still editing description
-   Styling of description locked alert for visibility when scrolled
-   New Teams welcome message card
-   New Teams notification cards

Fixes:

-   Clickable links in description
-   Moving focus between description and comments
-   Saving description changes when focusing new comment
-   Truncation of comment when posting in some circumstances
-   Prevent authors attempting to edit descriptions when not allowed
-   @mentions on new lines created with shift+enter
-   Showing bubble editor when select all text in comment (ctrl+a)
-   Issue with attachments from EML uploads (e.g. drag from HCL Notes)

---

#### 2022-04-20

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-04-20)

Features:

-   Login to Boards using Single Sign On (SSO) in Microsoft Teams

    > **Note**: you will need to:
    >
    > 1. [Configure SSO in Teams](msgraph/auth/index.md#configure-sso-in-teams) in your existing Azure OAuth application definition
    > 2. [download the latest app definition from Boards admin section and update it in Teams](msgraph/teams/on-prem.md#configure-application).

Fixes:

-   Issue loading Activity Stream gadget
-   Issue with Moderated Community access
-   Issue when updating Board title
-   Issue with lock of description in communities

---

#### 2022-04-07

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-04-07)

Improvements:

-   Reduced number of simultaneous MongoDB connections

Fixes:

-   Issue with comment stream entry for Orient Me
-   Issue with updating card title from Boards view in FireFox
-   Issue with deeplinked Connections Community widgets
-   Issue with Boards Search styling
-   Issue with opening filters via icon
-   Issue with Moderated Community ACL
-   Issue with Teams login popup not closing

Activity Migration:

-   Fix invisible top level task/entries

---

#### 2022-03-21

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-03-21)

Improvements:

-   File upload feedback (eg when socket unavailable)

Fixes:

-   WebSocket failure fallback to Polling
-   Prevent duplicates appearing in history from live events
-   First comments not live displaying
-   Issue where Timeline displaying some cards a day out
-   Issue where Subscriber Redis crashes after too many concurrent events

---

#### 2022-03-09

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-03-09)

Improvements:

-   Upgraded libraries for performance/security/support (e.g. Material UI, Redis)
-   Improved loading perfomance (reduced bundle size)

Fixes:

-   issue where comments disappear in certain scenarios
-   issue where pasting into edited comment clears comment
-   issue where loading a Community widget where the Board has been deleted causing an inifinite loop

Activity Migration:

-   Added optional variables to reprocess migrated files which had encoding issues

---

#### 2022-02-17

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-02-17)

Features:

-   Ability to change Private cards to Public

Improvements:

-   Updated Date pickers with month/year selection
-   Updated Material UI library to latest
-   Better internationalisation of dates

Fixes:

-   Fix for saving description on modal closure
-   Fix for transfer membership
-   Fix detection of descriptions migrated from Activities
-   Fix for entry styling when Visual Update One applied

Activity Migration:

-   Uses new FileInfo meta structure
-   Fix to flag cards with description

---

#### 2022-02-10

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-02-10)

##### File store migration

> **CAUTION**: When deployed, this release (and all subsequent) will migrate the minio file store, changing it's structure permanently, we recommend performing a backup of the file store (/pv-connections/kudos-boards-minio) before installation in case there is any need to roll back.

Improvements:

-   File uploads have better user feedback, showing a partial file and track the upload progress
-   File downloads make better use of the original mimetype and no longer use the file name in the url
-   When setting Due, Start and End Dates the picker now supports clicking in the header to choose a year

Fixes:

-   Cards created from Outlook / Verse can crash a board
-   Date "chips" on card view need to be clicked twice
-   Pasting an image can wipe a description
-   Boards in a community / team no longer show "My Boards" on error
-   Clicking "Private" sometimes does nothing
-   File size calculation now allows a full 50mb file

---

#### 2022-01-07

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2022-01-07)

Fixes:

-   Issue where notifications of comments not sent to other commenters
-   Issue where emails sent to content creators when users are no longer Board members
-   Issue when completing tasks when multi-assign has been removed
-   Issue where sub cards not loading when opening a card via url
-   Issue where card breadcrumbs (ancestors) not displaying when opening a card via url

---

### 2021

2021-12-17
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-12-17)

Improvements:

-   Throttle lookups of members from Communities application
-   Improved description of scheduled cards in Recent Updates history
-   Arabic language updates

Fixes:

-   Issue when adding Tag with same starting letter as previous
-   Issue when moving Cards in MindMap
-   Issue where Board title overflowed in MindMap
-   Issue where removing description was not synchronised to other users with modal open

---

2021-11-23
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-11-23)

Features:

-   Recent Updates (board level and inside cards)

Improvements:

-   Arabic language updates
-   MSGraph user searching (inc Guests)
-   Activity Migration: better feedback when invalid content store data

Fixes:

-   Assigning a user by drag/drop creates second card from profile image

2021-11-18
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-11-18)

Updates:

-   All services have been updated to the latest LTS version on Node.js, all dependencies have been updated to their latest supported versions.
-   Updated translations for Arabic and German.

---

2021-11-02
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-11-02)

Fixes:

-   Licence not found errors when adding or removing licences in the LICENCE key environment variable.

---

2021-10-26
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-10-26)

Fixes:

-   SSL Issue connecting to Component Pack Mongo

---

2021-10-22
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-10-22)

Features:

-   User Presence
-   Private Cards

Improvements:

-   Load performance by reducing page size
-   Activities View performance
-   Optional API Rate Limiting
-   Better handling of conflicting CSS from Visual Update One
-   Enhancement for Microsoft Graph groups which are not teams (owner vs member)

Fixes:

-   Issue when adding Connections Communities as members
-   Issue when changing user account tries to loads the previous open Board
-   Issue where link is inserted at start of description
-   Issue with authenticated webhooks
-   Issue with S3 "bucket-already-exists" race condition
-   Issue where multiple toasts in quick succession never auto closed

---

2021-09-29
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-09-29)

Improvements:

-   Reduce reliance on Communities application

    -   Reduce member lookups
    -   Increase page size of Communities requests
    -   Throttles simultaneous requests to Communities
    -   Increase caching of responses

-   Undo / Redo option in Rich Text editor

Fixes:

-   Indexing issue when recreating `providerID_1` with new options

---

2021-09-24
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-09-24)

Improvements:

-   Debug logging of 400 errors in webfront

Fixes:

-   issue with index in Component Pack mongo when assigned task name too long

---

2021-09-17
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-09-17)

> **Note:** this update performs several schema changes on start-up as a once-off. Board content may be temporarily unavailable for a few minutes. Also be aware that downgrading to a previous release will cause access issues in Community boards with role 'inherit'. Please contact us if you have any issues at support@huddo.com

> **Note:** if you encounter 400 bad requests when loading `/boards`, please see this [troubleshooting guide](troubleshooting/nginx.md).

Features:

-   Private Cards

Improvements:

-   Board load performance
-   User/Group search performance
-   more granular user permissions for group membership
-   ability to set group permissions for a Board on create in the group
-   Community name search improvements (handling of names with special characters)
-   added missing German translations
-   MongoDB - refined and reduced total indexes. Be aware that this update will cause a heavy re-index.

Fixes:

-   issue where you could not change level of community members
-   issue assigning colours in quick succession
-   issue when removing filters on ToDo view
-   teams notifications turning back on when they are disabled
-   issue accepting email invites for guest/external users

---

2021-06-24
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-06-24)

Fixes:

-   Added environment variable `FORCE_POLLING` in webfront to avoid issues seen when using IHS as reverse proxy
-   API documentation should now work for cp releases, see `/api-boards/`

---

2021-06-09
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-06-09)

**Breaking change:**

> Emails are now sent by the `events` service. You must move the NOTIFIER\_\* environment variables from `core` to `events` as shown in [v3 of our chart](helm-charts.md#kudos-boards-cp)

Images:

```
iswkudos/kudos-boards:user-2021-06-09
iswkudos/kudos-boards:provider-2021-06-09
iswkudos/kudos-boards:licence-2021-06-09
iswkudos/kudos-boards:notification-2021-06-09
iswkudos/kudos-boards:webfront-2021-06-09
iswkudos/kudos-boards:core-2021-06-09
iswkudos/kudos-boards:boards-2021-06-09
iswkudos/kudos-boards:activity-migration-2021-06-09
iswkudos/kudos-boards:boards-event-2021-06-09
```

New Features:

-   Due Date reminder emails
-   Email notification controls
-   Product Tours

Improvements:

-   New email styling & full Card/Board representation

Fixes

-   Visibility of assignment completion (ticks) when multi-complete
-   Issue where description was hidden if other card attribute updated
-   UI feedback when completing task on Todos view
-   Completion logic when completing last assignment
-   Missing description when post comment, export Board as CSV, create Board from Template (since 06-02)
-   Logout issue (since 06-02)

---

2021-06-02
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-06-02)

Images:

```
iswkudos/kudos-boards:user-2021-06-02
iswkudos/kudos-boards:provider-2021-06-02
iswkudos/kudos-boards:licence-2021-06-02
iswkudos/kudos-boards:notification-2021-06-02
iswkudos/kudos-boards:webfront-2021-06-02
iswkudos/kudos-boards:core-2021-06-02
iswkudos/kudos-boards:boards-2021-06-02
iswkudos/kudos-boards:activity-migration-2021-06-02
iswkudos/kudos-boards:boards-event-2021-06-02
```

Improvements:

-   Only load Descriptions when required (less data, faster loading times)
-   Styling/positioning of Date selection

Fixes

-   Missing Boards when viewed by Color (if never opened)

---

2021-05-31
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-05-31)

Images:

```
iswkudos/kudos-boards:user-2021-05-31
iswkudos/kudos-boards:provider-2021-05-31
iswkudos/kudos-boards:licence-2021-05-31
iswkudos/kudos-boards:notification-2021-05-31
iswkudos/kudos-boards:webfront-2021-05-31
iswkudos/kudos-boards:core-2021-05-31
iswkudos/kudos-boards:boards-2021-05-31
iswkudos/kudos-boards:activity-migration-2021-05-31
iswkudos/kudos-boards:boards-event-2021-05-31
```

Improvements:

-   Microsoft (Teams & Sharepoint) - detect owners vs members (authors)
-   Creating board in Sharepoint sites
-   Comment create/delete UI performance
-   Card completion performance

Fixes:

-   ACL for Readers/Commenters
-   Protect against removing an assignment while still creating
-   Showing image pasted in description with no text
-   Linking to files in folders
-   Description lock issues when framed (Connections, Sharepoint etc)
-   Wrap long comments instead of sideways scrolling

---

2021-05-13
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-05-13)

Images:

```
iswkudos/kudos-boards:user-2021-05-13
iswkudos/kudos-boards:provider-2021-05-13
iswkudos/kudos-boards:licence-2021-05-13
iswkudos/kudos-boards:notification-2021-05-13
iswkudos/kudos-boards:webfront-2021-05-13
iswkudos/kudos-boards:core-2021-05-13
iswkudos/kudos-boards:boards-2021-05-13
iswkudos/kudos-boards:activity-migration-2021-05-13
iswkudos/kudos-boards:boards-event-2021-05-13
```

Improvements:

-   Link to Files / Upload to Files

    -   Show options for all member Groups (Communities)
    -   Updated defaults for private Boards
    -   Alphabetic ordering of Connections files
    -   Type to filter

-   Allow custom NodeMailer email options (insecure tls etc)

    `core.env.NOTIFIER_EMAIL_OPTIONS: "{\"ignoreTLS\": true,\"tls\":{\"rejectUnauthorized\":false}}"`

Fixes:

-   Color tag menu positioning on small screen
-   Boards image on file uploads (context root)

---

2021-05-04
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-05-04)

Images:

```
iswkudos/kudos-boards:user-2021-05-04
iswkudos/kudos-boards:provider-2021-05-04
iswkudos/kudos-boards:licence-2021-05-04
iswkudos/kudos-boards:notification-2021-05-04
iswkudos/kudos-boards:webfront-2021-05-04
iswkudos/kudos-boards:core-2021-05-04
iswkudos/kudos-boards:boards-2021-05-04
iswkudos/kudos-boards:activity-migration-2021-05-04
iswkudos/kudos-boards:boards-event-2021-05-04
```

Improvements:

-   User feedback when assigning tasks to multiple users (no flickering)
-   Reconnect live events after service updates
-   API docs only at root, send 404 for missing/incorrect routes
-   Reduce height of background event loading progress bar

Fixes:

-   Archive view loading animation
-   Adding an Admin by email search
-   Dot in Node modal above name input visible with a theme
-   Outlook add-in file updates
-   Deep linking to Community Boards widget in Highlights app
-   Authors can no longer assign users to tasks they did not create
-   Authors and Readers can complete 'All Must Complete' tasks they are assigned to

---

2021-04-29
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-04-29)

Images:

```
iswkudos/kudos-boards:user-2021-04-29
iswkudos/kudos-boards:provider-2021-04-29
iswkudos/kudos-boards:licence-2021-04-29
iswkudos/kudos-boards:notification-2021-04-29
iswkudos/kudos-boards:webfront-2021-04-29
iswkudos/kudos-boards:core-2021-04-29
iswkudos/kudos-boards:boards-2021-04-29
iswkudos/kudos-boards:activity-migration-2021-04-29
iswkudos/kudos-boards:boards-event-2021-04-29
```

New:

-   Boards Event service

Fixes:

-   Allow editing of rich text when sockets fail
-   Opening cards with html imported from Outlook
-   Member assignment on click in menu
-   Remove card theme when deleting file set as card theme
-   Multiple assignments in rapid succession

---

2021-04-26
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-04-26)

Images:

```
iswkudos/kudos-boards:user-2021-04-26
iswkudos/kudos-boards:provider-2021-04-26
iswkudos/kudos-boards:licence-2021-04-26
iswkudos/kudos-boards:notification-2021-04-26
iswkudos/kudos-boards:webfront-2021-04-26
iswkudos/kudos-boards:core-2021-04-26
iswkudos/kudos-boards:boards-2021-04-26
iswkudos/kudos-boards:activity-migration-2021-04-26
```

Improvements:

-   Updates to Rich Text Editor & editor locking mechanism
-   Card icon for scheduled start/end dates
-   Admin revoke & anonymise user function
-   API for email to Card/Entry parsing
-   API for file upload as new Card

Fixes:

-   Highlights widget update for C7
-   Updated German translation

Activity Migration

-   Use Connections Shared Drive to load Activity long descriptions and files (new variables & volume/mount required in yaml)

---

2021-03-22
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-03-22)

Images:

```
iswkudos/kudos-boards:user-2021-03-22
iswkudos/kudos-boards:provider-2021-03-22
iswkudos/kudos-boards:licence-2021-03-22
iswkudos/kudos-boards:notification-2021-03-22
iswkudos/kudos-boards:webfront-2021-03-22
iswkudos/kudos-boards:core-2021-03-22
iswkudos/kudos-boards:boards-2021-03-22
iswkudos/kudos-boards:activity-migration-2021-03-22
```

Improvements:

-   Board loading performance

Fixes:

-   Locking of description when socket fails
-   Activity migration - protect against old public data

---

2021-03-16
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-03-16)

Images:

```
iswkudos/kudos-boards:user-2021-03-16
iswkudos/kudos-boards:provider-2021-03-16
iswkudos/kudos-boards:licence-2021-03-16
iswkudos/kudos-boards:notification-2021-03-16
iswkudos/kudos-boards:webfront-2021-03-16
iswkudos/kudos-boards:core-2021-03-16
iswkudos/kudos-boards:boards-2021-03-16
iswkudos/kudos-boards:activity-migration-2021-03-16
```

Improvements:

-   Handle legacy Boards WebSphere URL redirect (hashes)
-   Ability to [transition between providers](admin/transition-between-providers.md)

    -   Link User accounts by full email address
    -   Map Groups by CSV file
    -   Transfer Ownership & Unlink accounts

Fixes:

-   Verse integration

---

2021-03-10
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-03-10)

Images:

```
iswkudos/kudos-boards:user-2021-03-10
iswkudos/kudos-boards:provider-2021-03-10
iswkudos/kudos-boards:licence-2021-03-10
iswkudos/kudos-boards:notification-2021-03-10
iswkudos/kudos-boards:webfront-2021-03-10
iswkudos/kudos-boards:core-2021-03-10
iswkudos/kudos-boards:boards-2021-03-10
iswkudos/kudos-boards:activity-migration-2021-03-10
```

Fixes:

-   Groups not saving expanded members (affects imported Activities)
-   Issue where homepage didnt reload after login from secondary alias
-   Improved support for imported community owner + reader role

Activity Migration:

-   Updated Mongoose version to fix 'module exports inside circular dependency' warning

---

2021-03-05
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-03-05)

Images:

```
iswkudos/kudos-boards:user-2021-03-05
iswkudos/kudos-boards:provider-2021-03-05
iswkudos/kudos-boards:licence-2021-03-05
iswkudos/kudos-boards:notification-2021-03-05
iswkudos/kudos-boards:webfront-2021-03-05
iswkudos/kudos-boards:core-2021-03-05
iswkudos/kudos-boards:boards-2021-03-05
iswkudos/kudos-boards:activity-migration-2021-03-05
```

Features:

-   New Huddo branding!
-   [New API with docs!](https://boards.api.huddo.com)
-   API integrations with

    -   Zapier
    -   Power Automate

-   Leave a Board
-   Card description lock (one-at-a-time editing)
-   Embed Cards/Boards in third party apps (e.g. Sharepoint)

Fixes:

-   Prevent file upload with zero size
-   Support migrated folders

---

2021-03-04
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-03-04)

Images:

```
iswkudos/kudos-boards:user-2021-03-04
iswkudos/kudos-boards:provider-2021-03-04
iswkudos/kudos-boards:licence-2021-03-04
iswkudos/kudos-boards:notification-2021-03-04
iswkudos/kudos-boards:webfront-2021-03-04
iswkudos/kudos-boards:core-2021-03-04
iswkudos/kudos-boards:boards-2021-03-04
iswkudos/kudos-boards:activity-migration-2021-03-04
```

Fixes:

-   Connections login no longer sends redirect_uri (connections will use the one configred in wsadmin)

---

2021-03-03
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-03-03)

Images:

```
iswkudos/kudos-boards:user-2021-03-03
iswkudos/kudos-boards:provider-2021-03-03
iswkudos/kudos-boards:licence-2021-03-03
iswkudos/kudos-boards:notification-2021-03-03
iswkudos/kudos-boards:webfront-2021-03-03
iswkudos/kudos-boards:core-2021-03-03
iswkudos/kudos-boards:boards-2021-03-03
iswkudos/kudos-boards:activity-migration-2021-03-03
```

Improvements:

-   Ability to sync profiles from Connections & Microsoft (please follow the steps on the Admin page of each Client)
-   Ability to automatically link user aliases in 2 different clients (eg Connections & Microsoft)
-   Support for Activity URL with entryId

Fixes:

-   Redirect to login if required when accessing Activity URL
-   Board ACL updates for membership escallation

---

2021-02-19
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-02-19)

Images:

```
iswkudos/kudos-boards:user-2021-02-19
iswkudos/kudos-boards:provider-2021-02-19
iswkudos/kudos-boards:licence-2021-02-19
iswkudos/kudos-boards:notification-2021-02-19
iswkudos/kudos-boards:webfront-2021-02-19
iswkudos/kudos-boards:core-2021-02-19
iswkudos/kudos-boards:boards-2021-02-19
iswkudos/kudos-boards:activity-migration-2021-02-19
```

Improvements:

-   Todos view
    -   hide sub-cards which are not applicable
    -   hide multi-assigned tasks I have completed (assigned view)

Fixes:

-   Disable notification for Communities with 'owner-only' membership
-   Notifications when creating a Board & members at the same time
-   Protect against imported data for assignments without users & nodes without creator
-   Mindmap - expand/collapse icons
-   Redirect from Activity URL to Board URL in the Connections header frame
-   Show all public members when multiple

---

2021-01-19
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-01-19)

Images:

```
iswkudos/kudos-boards:user-2021-01-19
iswkudos/kudos-boards:provider-2021-01-19
iswkudos/kudos-boards:licence-2021-01-19
iswkudos/kudos-boards:notification-2021-01-19
iswkudos/kudos-boards:webfront-2021-01-19
iswkudos/kudos-boards:core-2021-01-19
iswkudos/kudos-boards:boards-2021-01-19
iswkudos/kudos-boards:activity-migration-2021-01-19
```

Improvements:

-   Show login page on file download when unauthorized
-   Login options for Verse/Outlook integration

Fixes:

-   Tile color popup positioning and scrolling for small screens
-   Protect against null assignment value after import
-   PDF downloads inside the community widget
-   Show new cards added in assignments view
-   Show assigned cards in Timeline view (only affects some users with multiple linked accounts)

---

### 2020

2020-12-14

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2020-12-14)

Images:

```
iswkudos/kudos-boards:user-2020-12-14
iswkudos/kudos-boards:provider-2020-12-14
iswkudos/kudos-boards:licence-2020-12-14
iswkudos/kudos-boards:notification-2020-12-14
iswkudos/kudos-boards:webfront-2020-12-14
iswkudos/kudos-boards:core-2020-12-14
iswkudos/kudos-boards:boards-2020-12-14
iswkudos/kudos-boards:activity-migration-2020-12-14
```

Features:

-   Updated migration service to support the new "Community Owners only" option
-   Added fix for Activities that had already been imported and used the equivalent permission set in Activities

    `boards.yaml`

    ```yaml
    migration:
        env:
            # test = report activities and board membership that can be updated
            # true = run the fix and report results
            FIX_COMMUNITY_OWNERS_ONLY: test|true
    ```

---

2020-12-12

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2020-12-12)

Images:

```
iswkudos/kudos-boards:user-2020-12-12
iswkudos/kudos-boards:provider-2020-12-12
iswkudos/kudos-boards:licence-2020-12-12
iswkudos/kudos-boards:notification-2020-12-12
iswkudos/kudos-boards:webfront-2020-12-12
iswkudos/kudos-boards:core-2020-12-12
iswkudos/kudos-boards:boards-2020-12-12
iswkudos/kudos-boards:activity-migration-2020-12-12
```

Features:

-   Added group membership option "Community Owners Only" which makes the community owners have owner rights in a board but does not allow any other community members access. This option is available for boards created in a community widget only.

---

2020-11-13

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2020-11-02)

Images:

```
iswkudos/kudos-boards:user-2020-11-13
iswkudos/kudos-boards:provider-2020-11-13
iswkudos/kudos-boards:licence-2020-11-13
iswkudos/kudos-boards:notification-2020-11-13
iswkudos/kudos-boards:webfront-2020-11-13
iswkudos/kudos-boards:core-2020-11-13
iswkudos/kudos-boards:boards-2020-11-13
iswkudos/kudos-boards:activity-migration-2020-11-13
```

Improvements:

-   Increase multi-lingual coverage

---

2020-11-02

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2020-11-02)

Images:

```
iswkudos/kudos-boards:user-2020-11-02
iswkudos/kudos-boards:provider-2020-11-02
iswkudos/kudos-boards:licence-2020-11-02
iswkudos/kudos-boards:notification-2020-11-02
iswkudos/kudos-boards:webfront-2020-11-02
iswkudos/kudos-boards:core-2020-11-02
iswkudos/kudos-boards:boards-2020-11-02
iswkudos/kudos-boards:activity-migration-2020-11-02
```

Improvements:

-   Increase multi-lingual coverage
-   Creating Board from template includes members/description
-   Option to disable Welcome emails (user.env.DISABLE_WELCOME_EMAIL)

Fixes:

-   Uploading file in iOS Safari

---

2020-10-14

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2020-10-14)

Images:

```
iswkudos/kudos-boards:user-2020-10-14
iswkudos/kudos-boards:provider-2020-10-14
iswkudos/kudos-boards:licence-2020-10-14
iswkudos/kudos-boards:notification-2020-10-14
iswkudos/kudos-boards:webfront-2020-10-14
iswkudos/kudos-boards:core-2020-10-14
iswkudos/kudos-boards:boards-2020-10-14
iswkudos/kudos-boards:activity-migration-2020-10-14
```

Improvements:

-   Updated Rich Text Editor

Fixes:

-   Re-open last board view
-   User trial reminder
-   Extension of user trials
-   Download linked files with .odt extension

---

2020-10-05

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2020-10-05)

Images:

```
iswkudos/kudos-boards:user-2020-10-05
iswkudos/kudos-boards:provider-2020-10-05
iswkudos/kudos-boards:licence-2020-10-05
iswkudos/kudos-boards:notification-2020-10-05
iswkudos/kudos-boards:webfront-2020-10-05
iswkudos/kudos-boards:core-2020-10-05
iswkudos/kudos-boards:boards-2020-10-05
iswkudos/kudos-boards:activity-migration-2020-10-05
```

Features:

-   Board Search
    -   Increase visibility of filters
    -   Maintain filters after page reload
    -   Hide Completed Todos
    -   Hide Empty Lists
-   Preview Files, support for
    -   Excel (xlsx, xls)
    -   PDF

Improvements:

-   Rich Text Editor - allow indenting paragraphs
-   Logging updates
-   Activity Migration - add default link type

Fixes:

-   Default handling of links from migrated Activities
-   User Avatar initials fallback
-   Include current user as option in user licence search & custom field person

---

2020-09-18

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2020-09-18)

Images:

```
iswkudos/kudos-boards:user-2020-09-18
iswkudos/kudos-boards:provider-2020-09-18
iswkudos/kudos-boards:licence-2020-09-18
iswkudos/kudos-boards:notification-2020-09-18
iswkudos/kudos-boards:webfront-2020-09-18
iswkudos/kudos-boards:core-2020-09-18
iswkudos/kudos-boards:boards-2020-09-18
iswkudos/kudos-boards:activity-migration-2020-09-18
```

Features:

-   New rich text editor with improved handling for
    -   tables
    -   whitepace
    -   paste from office
    -   font, font size, font color
    -   file upload feedback
-   Search Board by Custom Fields (Text & People)
-   Search improvements - show sub-tasks when parent match filter

Improvements:

-   UI feedback for Chrome Incognito third-party security exception
-   Microsoft Teams file preview
-   Microsoft Teams file links
-   Internal microservice communication (**Note**: this requires a new Helm Chart V2)
-   Updated HCL Connections icon

Fixes:

-   Issue where page reloads constantly in Connections frame
-   Outlook integration issue
-   File Preview in Safari
-   Board Properties toolbar 'more' menu
-   API update for completing a task already completed

---

2020-08-24

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2020-08-24)

Images:

```
iswkudos/kudos-boards:user-2020-08-24
iswkudos/kudos-boards:provider-2020-08-24
iswkudos/kudos-boards:licence-2020-08-24
iswkudos/kudos-boards:notification-2020-08-24
iswkudos/kudos-boards:webfront-2020-08-24
iswkudos/kudos-boards:core-2020-08-24
iswkudos/kudos-boards:boards-2020-08-24
iswkudos/kudos-boards:activity-migration-2020-08-24
```

Features:

-   Live Board Tile views (my/public/groups)
-   Export Board/Cards as CSV
-   Upload multiple files at once
-   Drag and drop multiple emails into an open card
-   Link to Board/List/Card - copies a direct URL to clipboard

Improvements:

-   Performance (loading times)
-   Use local font files (no external URLs)
-   Focused people search results in Connections
-   Previewing linked files has link to Connections file info
-   Loading Community images
-   Support nested comments imported from Activities
-   Support pasting images in comments
-   Support long board names in left sidenav
-   Scroll members area in right sidenav when long
-   Show summary numbers in Members dialog
-   UI feedback while saving custom fields
-   Cookie handling (SameSite)
-   Firefox scrollbar styling

Fixes:

-   Saving of description on reload & modal change
-   Comment duplicate while saving
-   Support non-english @mentions
-   @mention overflow issue
-   Recent boards in left sidenav
-   Move and not open page crash issue
-   Ordering of links in a card
-   Sharing my private file with a public folder
-   Previewing of linked Community files
-   Activities imported with unknown user assignments
-   Dragging color onto tiles
-   Allow unassigning users who are no longer members
-   Ordering issue on cards created using past

---

2020-07-10

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2020-07-10)

Images:

```
iswkudos/kudos-boards:user-2020-07-10
iswkudos/kudos-boards:provider-2020-07-10
iswkudos/kudos-boards:licence-2020-07-10
iswkudos/kudos-boards:notification-2020-07-10
iswkudos/kudos-boards:webfront-2020-07-10
iswkudos/kudos-boards:core-2020-07-10
iswkudos/kudos-boards:boards-2020-07-10
iswkudos/kudos-boards:activity-migration-2020-07-10
```

Improvements:

-   Activity Stream deep-linking to Community Boards
-   Community Boards - open board links in fullpage
-   Fix searching individual Activity imports
-   Update individual Activity import grouping of top level entries
-   Fix loading of some imported Activities

Activity Migration:

-   Support migration of Activity files with unicode & whitespace characters in name
-   Performance & stability improvements (large activities & filesets, rollback files on failure, extra logging, retry logic)

---

2020-06-17

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2020-06-17)

Images:

```
iswkudos/kudos-boards:user-2020-06-17
iswkudos/kudos-boards:provider-2020-06-17
iswkudos/kudos-boards:licence-2020-06-17
iswkudos/kudos-boards:notification-2020-06-17
iswkudos/kudos-boards:webfront-2020-06-17
iswkudos/kudos-boards:core-2020-06-17
iswkudos/kudos-boards:boards-2020-06-17
iswkudos/kudos-boards:activity-migration-2020-06-17
```

Fixes:

-   Show newly created comments in Todo view
-   Support Activity URL redirects
-   Community Boards loading issue

Activity Migration:

-   UI control options fix
-   Support migration of Activity files with special characters in name
-   Support for Activity links
-   Protect against system tenant IDs '-Ignore-Organization-ID-' etc
-   DB2 support for PEOPLEDB on secondary host

---

2020-06-05

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2020-06-05)

Images:

```
iswkudos/kudos-boards:user-2020-06-05
iswkudos/kudos-boards:provider-2020-06-05
iswkudos/kudos-boards:licence-2020-06-05
iswkudos/kudos-boards:notification-2020-06-05
iswkudos/kudos-boards:webfront-2020-06-05
iswkudos/kudos-boards:core-2020-06-05
iswkudos/kudos-boards:boards-2020-06-05
```

Please see our [Cloud blog](https://blog.huddo.com/weve-got-some-kudos-boards-changes-for-you)

Improvements:

-   Loading performance
-   Rendering performance
-   Reduce size of application
-   Node view UI refresh

New Features:

-   Card theme from uploaded images
-   Preview uploaded files (images, docx, pdf, html etc)
-   Todos Overview - [filtering to selected Boards](https://blog.huddo.com/part-3-weve-got-some-kudos-boards-changes-for-you)
-   Drag and drop Email into Cards (ie from HCL Notes)
-   Activity Stream Gadget for Boards - [config updates required](connections/widgets-on-prem.md)
-   Multiple Assignment options for Cards

Fixes:

-   Email notifications for invited collaborators

---

2020-04-09

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2020-04-09)

Images:

```
iswkudos/kudos-boards:user-2020-04-09
iswkudos/kudos-boards:provider-2020-04-09
iswkudos/kudos-boards:licence-2020-04-09
iswkudos/kudos-boards:notification-2020-04-09
iswkudos/kudos-boards:webfront-2020-04-09
iswkudos/kudos-boards:core-2020-04-09
iswkudos/kudos-boards:boards-2020-04-09
```

Fixes:

-   Connections OAuth issue - missing scope

---

2020-03-06

[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2020-03-06)

Images:

```
iswkudos/kudos-boards:user-2020-03-06
iswkudos/kudos-boards:provider-2020-03-06
iswkudos/kudos-boards:licence-2020-03-06
iswkudos/kudos-boards:notification-2020-03-06
iswkudos/kudos-boards:webfront-2020-03-06
iswkudos/kudos-boards:core-2020-03-06
iswkudos/kudos-boards:boards-2020-03-06
```

Fixes:

-   Updating cards permissions
-   Boards list - show completed & deleted
-   individual import of Activity with emails
-   member issue when moving card into new board
-   Archived cards appear twice
-   Powered by Huddo image

Language support:

```
  "supported": {
    "ar":[],
    "bg":[],
    "ca":[],
    "cs":[],
    "da":[],
    "de": [],
    "el":[],
    "en": ["US"],
    "es":[],
    "fi":[],
    "fr":[],
    "he":[],
    "hr":[],
    "hu":[],
    "it":[],
    "ja":[],
    "kk":[],
    "ko":[],
    "nb":[],
    "nl":[],
    "pl":[],
    "pt":[],
    "ro":[],
    "ru":[],
    "sk":[],
    "sl":[],
    "sv":[],
    "th":[],
    "tr":[],
    "zh":["TW"]
  },
    "default": "en"
```
