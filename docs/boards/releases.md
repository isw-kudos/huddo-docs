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

#### 2024-02-14

Fixes:

-   Connections SSO header scripts - Notifications panel
-   Missing translations caused by load race condition
-   Translation of timeline months headers

#### 2024-02-07

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

-   Support for Domino by [REST API](./domino/on-prem.md)

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
