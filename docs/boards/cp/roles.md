## Member Roles

Boards has the following membership roles

| Role                 | Description                                                                                                                                                      | Applicable for Community Membership |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Owner                | All members have full control over the Board.                                                                                                                    | Shared with <br> Owned by           |
| Editor               | All members have access to create new content, and edit all content.                                                                                             | Shared with                         |
| Author               | All members have access to create new content, and edit content they created.                                                                                    | Shared with                         |
| Reader               | All members can only read content (no create or edit). <br> Any tasks they are assigned to, they can comment on and complete.                                    | Shared with                         |
| Owners & Editors     | Owners of the Community have `Owner` role. <br>Members of the Community have `Editor` role                                                                       | Owned by                            |
| Owners & Authors     | Owners of the Community have `Owner` role. <br>Members of the Community have `Author` role                                                                       | Shared with <br> Owned by           |
| Owners & Readers     | Owners of the Community have `Owner` role. <br>Members of the Community have `Reader` role                                                                       | Owned by                            |
| Community Owner Only | Owners of the Community have `Owner` role. <br> **Note: Community Members will see the title of the Board in the main list, but not be able to open/view/edit.** | Owned by                            |

## Community Membership Types

| Type        | Description                                                 | Applicable Role Options                                                             |     |
| ----------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------- | --- |
| Owned by    | Boards created from inside a Community                      | ![activity shared](/assets/connections/roles/board-roles-in-community.png)          |
| Shared with | Boards created standalone, and then shared with a community | ![activity shared](/assets/connections/roles/board-roles-shared-with-community.png) |

## Migration Examples

When migrating from Activities, the permissions will be maintained. Below are some examples of permissions set in Activities and their equivalent in Boards / Activities Plus after migration.

### Activity in Community

| Activities                                                                                         | Boards                                                                                                 |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Owners & Members assigned the Owner role ![acl](/assets/connections/roles/activity-all-owners.png) | Owner role is assigned to the entire community ![acl](/assets/connections/roles/board-all-owners.png)  |
| Members are Authors ![acl](/assets/connections/roles/activity-owners-authors.png)                  | Role is `Owners & Authors` as per above ![acl](/assets/connections/roles/board-owners-authors.png)              |
| Members are Readers ![acl](/assets/connections/roles/activity-owners-readers.png)                  | Role is `Owners & Readers` as per above ![acl](/assets/connections/roles/board-owners-readers.png)     |
| As above, with users specified ![acl](/assets/connections/roles/activity-owners-readers-users.png) | Each user is migrated with their role ![acl](/assets/connections/roles/board-owners-readers-users.png) |
| Members have NO access ![acl](/assets/connections/roles/activity-owners-users.png)                 | Role is `Community Owners Only` as per above ![acl](/assets/connections/roles/board-owners-users.png)  |

### Standalone Activity

| Activities                                                          | Boards                                                           |
| ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| ![acl](/assets/connections/roles/activity-shared-with-as-owner.png) | ![acl](/assets/connections/roles/board-shared-with-as-owner.png) |
