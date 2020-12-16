# Activity Migration User Interface

![example](/assets/boards/cp/migration-ui.png)

---

## Remaining Tab

The REMAINING tab is where you can select from Activities that have not been migrated and initiate the process for migrating them into Huddo Boards.

### Activities Table

Select Activities to migrate by clicking the checkboxs next to each activity.

The table can be sorted by clicking the headers for each column.

The number of rows per page can be increased using the `Rows` dropdown.

### Filters

There are multiple filters that can be applied that will remove activities from the table **and the activities included when choosing MIGRATE ALL**.

Notice that when filters are applied, the total number in the table and MIGRATE ALL button changes.

### Options

Near the MIGRATE buttons, there is an Options panel to for enabling features that will affect this migration.

> **WARNING:** These options will irreversibly modify your Activities.</span>

| Option                 | Description                                                                                                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add Link to Activity   | This will create an entry in each activity that provides a link to the new Huddo Board. This corresponds to the `CREATE_LINK_IN_ACTIVITY_AFTER_MIGRATED` environment variable when running a headless migration. |
| Mark Activity Complete | This will mark the Activity as complete after migrating it to Huddo Boards. This corresponds to the `COMPLETE_ACTIVITY_AFTER_MIGRATED` environment variable when running a headless migration.                   |

### Control Buttons

| Button           | Description                                                                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Migrate Selected | This will process all Activities which are checked in the view                                                                                                  |
| Migrate ALL      | All currently visible Activities (on all pages) will be migrated. **Note:** filters affect how many are visible. For example, completed/deleted can be ignored. |

---

## Done Tab

This tab shows all of the activities that have been migrated into Huddo Boards.
The `Activity Name` is a link to the Activity. The `Board` column has links to each Board in Huddo Boards.

---

## Boards User Data Tab

If you're migrating from an environment that has previously been using Huddo Boards WebSphere, you can use this tab to start the process of migrating Boards User Data into Huddo Boards Docker.

Each user who has used Huddo Boards WebSphere is likely to have created some of this data. It includes:

- The labels a user has assigned to colors which they apply to Board Tiles.
- The Categories a user has created which they apply to Board Tiles.

If the user already exists in Huddo Boards Docker:

- Their color labels will be deleted and replaced with the labels from Boards WebSphere.
- Imported Categories will be added to their existing list of categories.

This process only needs to be run once. Subsequent runs will import any data for new Boards WebSphere users and overwrite the previously imported data from the last run.
