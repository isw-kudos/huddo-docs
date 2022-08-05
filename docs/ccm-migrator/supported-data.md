## Data Supported in Migrations

This document is intended to be a comprehensive list of every piece of metadata
in CCM that CCM Migrator can extract and whether is is supported when migrating
to Connections Community Files or to a Filesystem.

If you want to know more, something is missing or if something has been
completed, you're very welcome to [open an issue on
GitHub](https://github.com/isw-kudos/huddo-docs/issues/new?labels=ccm-migrator)
or contact your favorite Huddo team member.

|CCM Data               |Connections Community Files|Filesystem|
|-----------------------|:-------------------------:|:--------:|
|File Data              |             ✅             |    ✅     |
|File Name              |             ✅             |    ✅     |
|Folders                |             ✅             |    ✅     |
|Versions               |             ✅             |    ✅     |
|Version Filenames      |             ✅             |    ✅     |
|Drafts                 |             ✅             |    ✅     |
|Tags                   |             ✅             |    ✅     |
|Description            |             ✅             |    ✅     |
|Comments               |             ✅             |    ✅     |
|Comment Related Version|             ✅             |    ✅     |
|Total Likes            |             ✅             |    ✅     |
|Liked by               |             ✅             |    ❌     |
|Follows                |             ✅             |    ❌     |
|Created by             |             ✅             |    ✅     |
|Created date           |             ✅             |    ✅     |
|Updated by             |             ✅             |    ✅     |
|Updated date           |             ✅             |    ✅     |
|Custom Metadata        |            🗃             |    ✅     |
|Document Types         |            🗃             |    ✅     |
|Total Downloads        |             ❌             |    ✅     |
|Downloaded by          |             ❌             |    ❌     |
|Sharing permissions    |             ❌             |    ✅     |

🗃 - Exported to file system