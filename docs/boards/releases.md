# Boards Docker Releases (change log)

## How To Upgrade

> **Note:** to upgrade from images in the Component Pack download to the latest images hosted by us on Dockerhub please follow [this guide](/boards/cp/dockerhub/).

Please use the appropriate update command. For example:

Huddo Boards in Kubernetes
```
helm upgrade boards https://docs.huddo.com/assets/config/kubernetes/kudos-boards-5.0.0.tgz -i -f ./boards.yaml --namespace boards --recreate-pods
```

Component Pack (Activities Plus)
```
helm upgrade kudos-boards-cp https://docs.huddo.com/assets/config/kubernetes/kudos-boards-cp-3.0.0.tgz -i -f ./boards-cp.yaml --namespace connections --recreate-pods
```

> **Note:** `--recreate-pods` ensures all images are up to date. This will cause downtime.

> **Note:** if your Kubernetes version is pre 1.13, you must uncomment "global.legacyKube: true" in the yaml config file

## Important update (CP v3)

> **New Event Service: ** as of the Component Pack chart v3.0.0 there is a new Boards service. In order to use the image from our repository with the component pack v3 chart you must add the new image tag.

> **Note as of release 2021-06-09:** please move all your NOTIFIER_* environment variables from `core` to `events`. See [our documentation](/boards/env/common/) for all supported options.

For example:

```yaml
events:
  image:
    name: ""
    tag: boards-event
  env:
    NOTIFIER_EMAIL_HOST: <smtp-email-host>
    NOTIFIER_EMAIL_USERNAME: <smtp-email-username>
    NOTIFIER_EMAIL_PASSWORD: <smtp-email-password>
    # plus all other NOTIFIER options previously defined in core
```


## Releases

### 2021-09-17
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-09-17)

Images:

```
iswkudos/kudos-boards:user-2021-09-17
iswkudos/kudos-boards:provider-2021-09-17
iswkudos/kudos-boards:licence-2021-09-17
iswkudos/kudos-boards:notification-2021-09-17
iswkudos/kudos-boards:webfront-2021-09-17
iswkudos/kudos-boards:core-2021-09-17
iswkudos/kudos-boards:boards-2021-09-17
iswkudos/kudos-boards:activity-migration-2021-09-17
```

> **Note:** this update performs several schema changes on start-up as a once-off. Board content may be temporarily unavailable for a few minutes. Also be aware that downgrading to a previous release will cause access issues in Community boards with role 'inherit'. Please contact us if you have any issues at support@huddo.com

Features:

- Private Cards

Improvements:

- Board load performance
- User/Group search performance
- more granular user permissions for group membership
- ability to set group permissions for a Board on create in the group
- Community name search improvements (handling of names with special characters)
- added missing German translations
- MongoDB - refined and reduced total indexes. Be aware that this update will cause a heavy re-index.

Fixes:

- issue where you could not change level of community members
- issue assigning colours in quick succession
- issue when removing filters on ToDo view
- teams notifications turning back on when they are disabled
- issue accepting email invites for guest/external users

---

### 2021-06-24
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-06-24)

Images:

```
iswkudos/kudos-boards:user-2021-06-24
iswkudos/kudos-boards:provider-2021-06-24
iswkudos/kudos-boards:licence-2021-06-24
iswkudos/kudos-boards:notification-2021-06-24
iswkudos/kudos-boards:webfront-2021-06-24
iswkudos/kudos-boards:core-2021-06-24
iswkudos/kudos-boards:boards-2021-06-24
iswkudos/kudos-boards:activity-migration-2021-06-24
```

Fixes:

- Added environment variable `FORCE_POLLING` in webfront to avoid issues seen when using IHS as reverse proxy
- API documentation should now work for cp releases, see `/api-boards/`

---

### 2021-06-09
[Dockerhub](https://hub.docker.com/repository/docker/iswkudos/kudos-boards/tags?page=1&name=2021-06-09)

#### Breaking change
> Emails are now sent by the `events` service. You must move the NOTIFIER_* environment variables from `core` to `events` as [shown above](/boards/releases/#important-update-cp-v3)

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

- Due Date reminder emails
- Email notification controls
- Product Tours

Improvements:

- New email styling & full Card/Board representation

Fixes

- Visibility of assignment completion (ticks) when multi-complete
- Issue where description was hidden if other card attribute updated
- UI feedback when completing task on Todos view
- Completion logic when completing last assignment
- Missing description when post comment, export Board as CSV, create Board from Template (since 06-02)
- Logout issue (since 06-02)

---

### 2021-06-02
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

- Only load Descriptions when required (less data, faster loading times)
- Styling/positioning of Date selection

Fixes

- Missing Boards when viewed by Color (if never opened)

---

### 2021-05-31
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

- Microsoft (Teams & Sharepoint) - detect owners vs members (authors)
- Creating board in Sharepoint sites
- Comment create/delete UI performance
- Card completion performance

Fixes:

- ACL for Readers/Commenters
- Protect against removing an assignment while still creating
- Showing image pasted in description with no text
- Linking to files in folders
- Description lock issues when framed (Connections, Sharepoint etc)
- Wrap long comments instead of sideways scrolling

---

### 2021-05-13
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

- Link to Files / Upload to Files

    - Show options for all member Groups (Communities)
    - Updated defaults for private Boards
    - Alphabetic ordering of Connections files
    - Type to filter

- Allow custom NodeMailer email options (insecure tls etc)

    `core.env.NOTIFIER_EMAIL_OPTIONS: "{\"ignoreTLS\": true,\"tls\":{\"rejectUnauthorized\":false}}"`

Fixes:

- Color tag menu positioning on small screen
- Boards image on file uploads (context root)

---

### 2021-05-04
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

- User feedback when assigning tasks to multiple users (no flickering)
- Reconnect live events after service updates
- API docs only at root, send 404 for missing/incorrect routes
- Reduce height of background event loading progress bar

Fixes:

- Archive view loading animation
- Adding an Admin by email search
- Dot in Node modal above name input visible with a theme
- Outlook add-in file updates
- Deep linking to Community Boards widget in Highlights app
- Authors can no longer assign users to tasks they did not create
- Authors and Readers can complete 'All Must Complete' tasks they are assigned to

---

### 2021-04-29
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

- Boards Event service

Fixes:

- Allow editing of rich text when sockets fail
- Opening cards with html imported from Outlook
- Member assignment on click in menu
- Remove card theme when deleting file set as card theme
- Multiple assignments in rapid succession

---

### 2021-04-26
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

- Updates to Rich Text Editor & editor locking mechanism
- Card icon for scheduled start/end dates
- Admin revoke & anonymise user function
- API for email to Card/Entry parsing
- API for file upload as new Card

Fixes:

- Highlights widget update for C7
- Updated German translation

Activity Migration

- Use Connections Shared Drive to load Activity long descriptions and files (new variables & volume/mount required in yaml)

---
### 2021-03-22
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

- Board loading performance

Fixes:

- Locking of description when socket fails
- Activity migration - protect against old public data

---

### 2021-03-16
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

- Handle legacy Boards WebSphere URL redirect (hashes)
- Ability to [transition between providers](/boards/howto/admin/transition-between-providers/)

    - Link User accounts by full email address
    - Map Groups by CSV file
    - Transfer Ownership & Unlink accounts

Fixes:

- Verse integration

---

### 2021-03-10
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

- Groups not saving expanded members (affects imported Activities)
- Issue where homepage didnt reload after login from secondary alias
- Improved support for imported community owner + reader role

Activity Migration:

- Updated Mongoose version to fix 'module exports inside circular dependency' warning

---

### 2021-03-05
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

- New Huddo branding!
- [New API with docs!](https://boards.api.huddo.com)
- API integrations with

    - Zapier
    - Power Automate
- Leave a Board
- Card description lock (one-at-a-time editing)
- Embed Cards/Boards in third party apps (e.g. Sharepoint)

Fixes:

- Prevent file upload with zero size
- Support migrated folders

---

### 2021-03-04
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

- Connections login no longer sends redirect_uri (connections will use the one configred in wsadmin)

---

### 2021-03-03
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

- Ability to sync profiles from Connections & Microsoft (please follow the steps on the Admin page of each Client)
- Ability to automatically link user aliases in 2 different clients (eg Connections & Microsoft)
- Support for Activity URL with entryId

Fixes:

- Redirect to login if required when accessing Activity URL
- Board ACL updates for membership escallation

---

### 2021-02-19
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

- Todos view
    - hide sub-cards which are not applicable
    - hide multi-assigned tasks I have completed (assigned view)

Fixes:

- Disable notification for Communities with 'owner-only' membership
- Notifications when creating a Board & members at the same time
- Protect against imported data for assignments without users & nodes without creator
- Mindmap - expand/collapse icons
- Redirect from Activity URL to Board URL in the Connections header frame
- Show all public members when multiple

---

### 2021-01-19
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

- Show login page on file download when unauthorized
- Login options for Verse/Outlook integration

Fixes:

- Tile color popup positioning and scrolling for small screens
- Protect against null assignment value after import
- PDF downloads inside the community widget
- Show new cards added in assignments view
- Show assigned cards in Timeline view (only affects some users with multiple linked accounts)

---

### 2020-12-14
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

- Updated migration service to support the new "Community Owners only" option
- Added fix for Activities that had already been imported and used the equivalent permission set in Activities

    `boards.yaml`

    ```yaml
    migration:
      env:
        # test = report activities and board membership that can be updated
        # true = run the fix and report results
        FIX_COMMUNITY_OWNERS_ONLY: test|true
    ```

---

### 2020-12-12
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

- Added group membership option "Community Owners Only" which makes the community owners have owner rights in a board but does not allow any other community members access. This option is available for boards created in a community widget only.

---

### 2020-11-13
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

- Increase multi-lingual coverage

---

### 2020-11-02
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

- Increase multi-lingual coverage
- Creating Board from template includes members/description
- Option to disable Welcome emails (user.env.DISABLE_WELCOME_EMAIL)

Fixes:

- Uploading file in iOS Safari

---

### 2020-10-14
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

- Updated Rich Text Editor

Fixes:

- Re-open last board view
- User trial reminder
- Extension of user trials
- Download linked files with .odt extension
---

### 2020-10-05
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

- Board Search
    - Increase visibility of filters
    - Maintain filters after page reload
    - Hide Completed Todos
    - Hide Empty Lists
- Preview Files, support for
    - Excel (xlsx, xls)
    - PDF

Improvements:

- Rich Text Editor - allow indenting paragraphs
- Logging updates
- Activity Migration - add default link type

Fixes:

- Default handling of links from migrated Activities
- User Avatar initials fallback
- Include current user as option in user licence search & custom field person

---

### 2020-09-18
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

- New rich text editor with improved handling for
    - tables
    - whitepace
    - paste from office
    - font, font size, font color
    - file upload feedback
- Search Board by Custom Fields (Text & People)
- Search improvements - show sub-tasks when parent match filter

Improvements:

- UI feedback for Chrome Incognito third-party security exception
- Microsoft Teams file preview
- Microsoft Teams file links
- Internal microservice communication (**Note**: this requires a new Helm Chart V2)
- Updated HCL Connections icon

Fixes:

- Issue where page reloads constantly in Connections frame
- Outlook integration issue
- File Preview in Safari
- Board Properties toolbar 'more' menu
- API update for completing a task already completed


---

### 2020-08-24

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

- Live Board Tile views (my/public/groups)
- Export Board/Cards as CSV
- Upload multiple files at once
- Drag and drop multiple emails into an open card
- Link to Board/List/Card - copies a direct URL to clipboard

Improvements:

- Performance (loading times)
- Use local font files (no external URLs)
- Focused people search results in Connections
- Previewing linked files has link to Connections file info
- Loading Community images
- Support nested comments imported from Activities
- Support pasting images in comments
- Support long board names in left sidenav
- Scroll members area in right sidenav when long
- Show summary numbers in Members dialog
- UI feedback while saving custom fields
- Cookie handling (SameSite)
- Firefox scrollbar styling

Fixes:

- Saving of description on reload & modal change
- Comment duplicate while saving
- Support non-english @mentions
- @mention overflow issue
- Recent boards in left sidenav
- Move and not open page crash issue
- Ordering of links in a card
- Sharing my private file with a public folder
- Previewing of linked Community files
- Activities imported with unknown user assignments
- Dragging color onto tiles
- Allow unassigning users who are no longer members
- Ordering issue on cards created using past
---

### 2020-07-10

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

- Activity Stream deep-linking to Community Boards
- Community Boards - open board links in fullpage
- Fix searching individual Activity imports
- Update individual Activity import grouping of top level entries
- Fix loading of some imported Activities

Activity Migration:

- Support migration of Activity files with unicode & whitespace characters in name
- Performance & stability improvements (large activities & filesets, rollback files on failure, extra logging, retry logic)

---

### 2020-06-17

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

- Show newly created comments in Todo view
- Support Activity URL redirects
- Community Boards loading issue

Activity Migration:

- UI control options fix
- Support migration of Activity files with special characters in name
- Support for Activity links
- Protect against system tenant IDs '-Ignore-Organization-ID-' etc
- DB2 support for PEOPLEDB on secondary host

---

### 2020-06-05

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

- Loading performance
- Rendering performance
- Reduce size of application
- Node view UI refresh

New Features:

- Card theme from uploaded images
- Preview uploaded files (images, docx, pdf, html etc)
- Todos Overview - [filtering to selected Boards](https://blog.huddo.com/part-3-weve-got-some-kudos-boards-changes-for-you)
- Drag and drop Email into Cards (ie from HCL Notes)
- Activity Stream Gadget for Boards - [config updates required](/boards/connections/widgets-on-prem/)
- Multiple Assignment options for Cards

Fixes:

- Email notifications for invited collaborators

---

### 2020-04-09

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

- Connections OAuth issue - missing scope

---

### 2020-03-06

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

- Updating cards permissions
- Boards list - show completed & deleted
- individual import of Activity with emails
- member issue when moving card into new board
- Archived cards appear twice
- Powered by Huddo image
 
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
