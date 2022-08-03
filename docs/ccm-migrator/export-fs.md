# File-system export structure

This document describes the file structure used when either migrating to the file system,
or exporting metadata during migration to Connections Files.

## Rationale

There's a fair chance of files in different CCM libraries and/or folders having the same
file name. CCM files exported to the OS file system are therefore placed in separate
directories if they came from different libraries and/or folders, to minimise the chance
of filename conflicts.

The export process must create additional files to record metadata which isn't contained
in the CCM files themselves. Examples of metadata are tags, comments, names of file owners,
and create/update timestamps. Other files are also required for versions.

Metadata and version files must all be named in a way that unambiguously identifies the
files to which they relate, but there's a chance that any of these extra files could
conflict with other filenames from the same CCM folder. We create a separate file-system
directory for each CCM file to contain metadata related to that file, with the directory
name having ".meta" appended to the filename, and we also put all metadata directories
and files in a top-level directory separate to the current-version files. This removes
any chance of metadata filenames conflicting with CCM filenames, and the ".meta" suffix on
the directory name should minimise the chance of a directory-name conflict.

## Directory structure

When migrating to the file system, all folders in a library and the current version of
all files are placed in a directory structure like the following:<br>
**\<Community Name\>/files/\<Library Name\>/\<Folder\>/\<Subfolder\>**

When either migrating to the file system, or exporting metadata during a migration to
Connections Files, metadata files and folders will be placed in a directory structure like
the following:<br>
**\<Community Name\>/metadata/\<Library Name\>/\<Folder\>/\<Subfolder\>**

The metadata location is also used to export most file versions excluding the current
version, when migrating to the file system.

In both cases above, **\<Subfolder\>** may be repeated for as many subfolder levels as
were present in CCM.

Within the metadata structure, there will be:

- A **members.csv** file in each library directory, listing the library members;
- **members.csv** and **meta.csv** files for each folder, listing the folder members and
metadata; and
- Directories named like **\<Filename\>\<extension\>.meta** corresponding with each CCM
file. This directory will contain versions of the CCM file, along with **comments.csv**,
**members.csv**, and **meta.csv** files listing comments, members, and metadata for that file.

Versions of a CCM file have version numbers in their filename. Version numbers will be
exactly as reported by CCM, which typically uses a major/minor decimal format like "**1.0**".

The filename format for versions will be:<br>
**\<Original filename\>_v\<version number\>\<extension\>**

### Example:

If the current version is **Proposal.docx**, then version 1 (superseded) will be
**Proposal_v1.0.docx** in the **Proposal.docx.meta** subdirectory.

## User access

Files named **members.csv** list members (user access) for each community, library,
folder, and file.

These files will be formatted as comma-separated values with one record (user/group) per
line, with five fields per record. The fields will be:

-	User/group name;
-	Unique user id;
-	User email address;
-	Type (either "user" or "group"); and
-	Access level (one of "member" or "owner" for communities, or one of "owner",
"contributor", "editor", or "reader" for libraries, folders, and files).

The users/groups listed in **members.csv** will be those with explicit access, plus some
special user names as follows:

-	"\*Community Access\*", indicating the community access setting (one of "public",
"moderated", or "restricted");
-	"\*Community Members\*", indicating the access that community members have to a library,
folder, or file.
-	"\*Community Owners\*", indicating the access that community owners have to a library,
folder, or file.

## Comments, tags, and other metadata

The metadata directory for each CCM file (directory name ending with ".meta") contains
files named **comments.csv** and **meta.csv**. Directories representing CCM folders within
the metadata structure will also contain a **meta.csv** file.

**comments.csv** contains all comments for the file. Comma-separated fields for each
comment are:

- File version on which the comment was made.
-	Date/time, formatted as ISO 8601 in UTC (e.g. "2021-02-26T09:00:00.000Z");
-	Commenter user name;
-	Commenter unique user id;
-	Commenter email address; and
-	The comment text.

**meta.csv** contains any metadata which isn't comments or members. Comma-separated fields
for each line are:

-	The type of metadata, one of:
	- "uuid" - CCM file/folder uuid;
	- "comm_uuid" - Source community uuid;
	- "componentId" - CCM component id (appears in CCM URLs);
	- "name" - CCM file/folder name;
	- "renamed" - Migrated file/folder name (always present even if the name wasn't changed);
	- "created" - Creation date/time, formatted as ISO 8601 in UTC;
	- "author" - Display name of author/creator;
	- "modified" - Last-modified date/time, formatted as ISO 8601 in UTC;
	- "modifier" - Display name of user who last modified the file/folder;
	- "summary" - File description/summary;
	- "tag" - File tags (this metadata type is repeated if there are multiple tags);
	- "draft" - Has the value "true" if the current version is a draft, but is otherwise
	absent;
	- "likes" - Number of likes;
	- "downloads" - Number of downloads;
	- "link" - CCM file/folder URL as reported by CCM API (may redirect to another URL when
	used in a web browser);
	- "link_alt" - Alternate CCM file/folder URL;
	- "link_ibmscp" - CCM file/folder URL for the ibmscp protocol (Connections Mobile);
	- "link_content" - CCM file download URL;
	- "dest_uuid" - Connections file/folder uuid (if migrated to Connections Files);
	- "dest_comm_uuid" - Destination community uuid (if migrated to Connections Files);
	- "dest_link" - Connections file/folder URL (if migrated to Connections Files);
	- "dest_link_content" - Connections file download URL (if migrated to Connections Files);
	- "doc_type" - CCM document type display name;
	- "doc_type_uuid" - CCM document type uuid;
	- *Custom fields* - Any metadata types different from those above are custom fields
	defined as part of the CCM document type.
-	The version number to which the metadata applies. This will be blank for the current
version; and
-	The metadata value.

## General information - CSV files

CSV files created by CCM Migrator conform to Microsoft Excel's CSV format, with details
as follows:

-	Fields are separated by commas.
-	Text data is contained in double-quote characters.
-	Text data can contain commas without any type of "escape character", because the
enclosing double-quotes ensure those commas aren't interpreted as separators.
-	Literal double-quote characters can be included in text data by doubling them. I.e.
The double-quote character acts as an "escape character" for itself.
-	Text data can contain literal line breaks, therefore any single record can use multiple
lines. This is unlikely to occur in this application, but may be possible with metadata.
