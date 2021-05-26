## Metrics Event ItemType Map

Below is a table displaying the _Item Types_ applicable for each _Event Type_ for each Connections _Application_. This is for advanced users who wish to further understand and take advantage of the _Source, Event Type_ and _Item Type_ filters provided in the reports query parameters. Please note that this is a guideline only. Event-ItemType associations may vary based on Connections version, environment variables, usage, installed applications etc.

### Activities

| Event       |  |
| ----------- | ---------- |
| COMPLETE    | Activity <br> ToDo |
| COPY        | Activity <br> Template |
| CREATE      | Activity <br> Attachment <br>Comment<br>Entry<br>Section<br>Tag<br>Template<br>Todo |
| DELETE      | Activity <br> Attachment <br>Comment<br>Entry<br>Section<br>Template<br>Todo |
| FOLLOW      | Activity |
| MOVE        | Section |
| READ        | Entry<br>Todo |
| TAG         | Activity <br>Comment<br>Entry<br>Section<br>Template<br>Todo |
| UNCOMPLETE  | Activity <br> ToDo |
| UNDELETE    | Activity <br>Comment<br>Entry<br>Section<br>Todo |
| UNFOLLOW    | Activity |
| UNTAG       | Activity <br>Comment<br>Entry<br>Section<br>Template<br>Todo |
| UPDATE      | Activity <br> Attachment <br>Comment<br>Entry<br>Membership<br>Section<br>Template<br>Todo |
| VISIT       | Activity <br> Default <br>Membership |
| VISIT_DUP   | Activity <br> Default |

**Not Relevant:** ADD, APPROVE, DECLINE, DOWNLOAD, EMPTY, GRADUATE, LOCK, PIN, PREVIEW, RECOMMEND, REJECT, REMOVE, RESTORE, UNLOCK, UNPIN, UNRECOMMEND, UNWATCH, VOTE, WATCH

### Blogs

| Event       |  |
| ----------- | ---------- |
| ADD         | Membership |
| APPROVE     | Comment <br> Entry |
| CREATE      | Blog <br> Comment <br> Entry <br> File <br> Tag <br> Trackback |
| DELETE      | Blog <br> Comment <br> Entry <br> File <br> Membership |
| FOLLOW      | Blog |
| READ        | Entry |
| RECOMMEND   | Comment <br> Entry |
| REJECT      | Comment <br> Entry |
| RESTORE     | Comment <br> Entry |
| TAG         | Blog <br> Comment <br> Entry |
| UNFOLLOW    | Blog |
| UNRECOMMEND | Entry |
| UNTAG       | Blog <br>Comment <br> Entry |
| UPDATE      | Blog <br> Entry <br> Membership |
| VISIT       | Administration <br> Blog <br> Default <br>ManageBlog |
| VISIT_DUP   | Blog <br> Default |

**Not Relevant:** COMPLETE, COPY, DECLINE, DOWNLOAD, EMPTY, GRADUATE, LOCK, MOVE, PIN, PREVIEW, REMOVE, UNCOMPLETE, UNDELETE, UNLOCK, UNPIN,, UNWATCH, VOTE, WATCH

### Bookmarks

| Event       |  |
| ----------- | ---------- |
| CREATE      | Bookmark <br> Tag |
| DELETE      | Bookmark |
| READ        | Bookmark |
| TAG         | Bookmark |
| UNTAG       | Bookmark |
| UNWATCH     | Person <br> Tag |
| UPDATE      | Bookmark |
| VISIT       | Bookmark <br> Default |
| VISIT_DUP   | Bookmark <br> Default |
| WATCH       | Person <br> Tag |

**Not Relevant:** ADD, APPROVE, COMPLETE, COPY, DECLINE, DOWNLOAD, EMPTY, FOLLOW, GRADUATE, LOCK, MOVE, PIN, PREVIEW, RECOMMEND, REJECT, REMOVE, RESTORE, UNCOMPLETE, UNDELETE, UNFOLLOW, UNLOCK, UNPIN, UNRECOMMEND, VOTE

### Communities

| Event       |  |
| ----------- | ---------- |
| ADD         | Invite <br> Membership |
| CREATE      | Bookmark <br> Comment <br>Community<br>Feed<br>Tag<br>Wallpost<br>Widget |
| DECLINE     | Invite |
| DELETE      | Bookmark <br> Comment <br>Community<br>Feed<br>Invite<br>Membership<br>Wallpost<br>Widget |
| FOLLOW      | Community |
| RECOMMEND   | Wall |
| RESTORE     | Community |
| TAG         | Bookmark <br> Community <br> Feed |
| UNFOLLOW    | Community |
| UNRECOMMEND | Wall |
| UNTAG       | Bookmark <br> Community <br> Feed <br> Membership |
| UPDATE      | Bookmark <br>Community<br>Feed<br>Membership |
| VISIT       | Communities <br> Community <br> Default |
| VISIT_DUP   | Communities <br> Community <br> Default |

**Not Relevant:**  APPROVE, COMPLETE, COPY, DOWNLOAD, EMPTY, FOLLOW, GRADUATE, LOCK, MOVE, PIN, PREVIEW, READ, REJECT, REMOVE, UNCOMPLETE, UNDELETE, UNLOCK, UNPIN, UNWATCH, VOTE, WATCH

### Files

| Event       |  |
| ----------- | ---------- |
| ADD         | CommunityFile <br> Share |
| CREATE      | Collection <br> Comment <br>File<br>Library<br>Mediafile<br>Tag |
| DELETE      | Collection <br> Comment <br>File<br>Fileversion<br>Library<br>Mediafile |
| DOWNLOAD    | File <br> Mediafile |
| EMPTY       | Trash |
| FOLLOW      | Collection <br> File <br> Mediafile |
| READ        | File |
| RECOMMEND   | File |
| REJECT      | Comment <br> File |
| REMOVE      | Collection <br> CommunityFile |
| RESTORE     | Comment <br> File <br> Filerversion |
| TAG         | Collection <br> Comment <br> File <br> Library |
| UNDELETE    | File |
| UNFOLLOW    | Collection <br> File |
| UNRECOMMEND | File |
| UNTAG       | Collection <br> Comment <br> File <br> Library |
| UPDATE      | Collection <br> Comment <br>File<br>Library<br>Mediafile<br>Membership |
| VISIT       | Default <br> Folder <br> Library |
| VISIT_DUP   | Default <br> Library |

**Not Relevant:**  APPROVE, COMPLETE, COPY, DECLINE, GRADUATE, LOCK, MOVE, PIN, PREVIEW, UNCOMPLETE, UNLOCK, UNPIN, UNWATCH, VISIT, VISIT_DUP

### Forums

| Event       |  |
| ----------- | ---------- |
| CREATE      | Attachment <br>Forum<br>Reply<br>Tag<br>Topic |
| DELETE      | Attachment <br>Forum<br>Reply<br>Topic |
| FOLLOW      | Forum <br> Topic |
| LOCK        | Forum <br> Topic |
| MOVE        | Forum <br> Topic |
| PIN         | Topic |
| READ        | Reply <br> Topic |
| REJECT      | Forum <br> Topic |
| TAG         | Forum <br> Reply <br> Topic |
| UNDELETE    | Forum <br> Topic |
| UNFOLLOW    | Forum <br> Topic |
| UNLOCK      | Forum <br> Topic |
| UNPIN       | Topic |
| UNTAG       | Forum <br> Reply <br> Topic |
| UPDATE      | Reply <br> Topic |
| VISIT       | Activity <br> Default <br>Membership |

**Not Relevant:**  ADD, APPROVE, COMPLETE, COPY, DECLINE, DOWNLOAD, EMPTY, GRADUATE, PREVIEW, READ, REMOVE, RESTORE, UNCOMPLETE, UNRECOMMEND, UNWATCH, VISIT_DUP, VOTE, WATCH

### Homepage

| Event       |  |
| ----------- | ---------- |
| CREATE      | Tag <br> Widget |
| DELETE      | Widget |
| TAG         | Watchlist |
| UNTAG       | Watchlist |
| VISIT       | Activitystream <br> Activitystream.actionrequired <br> Activitystream.atmentions <br> Activitystream.discover <br> Activitystream.imfollowing <br> Activitystream.mynotifications <br> Activitystream.saved <br> Activitystream.statusupdates <br> Default <br> Gettingstarted <br> Widgets  |
| VISIT_DUP   | Activitystream <br> Activitystream.atmentions <br> Activitystream.discover <br> Activitystream.imfollowing <br> Activitystream.mynotifications <br> Activitystream.statusupdates <br> Default <br> Gettingstarted <br> Widgets |

**Not Relevant:**  ADD, APPROVE, COMPLETE, COPY, DECLINE, DOWNLOAD, EMPTY, FOLLOW, GRADUATE, LOCK, MOVE, PIN, PREVIEW, READ, RECOMMEND, REJECT, REMOVE, RESTORE, UNCOMPLETE, UNDELETE, UNFOLLOW, UNLOCK, UNPIN, UNRECOMMEND, UNWATCH, UPDATE, VOTE, WATCH

### Ideation Blog

| Event       |  |
| ----------- | ---------- |
| APPROVE     | Comment <br> Idea |
| CREATE      | Comment <br> File <br> Idea <br> IdeationBlog <br> Tag <br> Trackback |
| DELETE      | Comment <br> File <br> Idea <br> IdeationBlog |
| GRADUATE    | Idea |
| READ        | Idea |
| RECOMMEND   | Comment |
| REJECT      | Comment <br> Idea |
| RESTORE     | Comment <br> Idea |
| TAG         | Comment <br> Idea <br> IdeationBlog |
| UNTAG       | Comment <br> Idea <br> IdeationBlog |
| UPDATE      | Idea <br> IdeationBlog |
| VISIT       | Default <br> Ideationblog <br> Manageblog |
| VISIT_DUP   | Default <br> Ideationblog |
| VOTE        | Idea |

**Not Relevant:**  ADD, COMPLETE, COPY, DECLINE, DOWNLOAD, EMPTY, FOLLOW, LOCK, MOVE, PIN, PREVIEW, REMOVE, UNCOMPLETE, UNDELETE, UNFOLLOW, UNLOCK, UNPIN, UNRECOMMEND, UNWATCH, UPDATE, WATCH

### Media Gallery

| Event       |  |
| ----------- | ---------- |
| CREATE      | Mediafile |
| DELETE      | Mediafile |
| DOWNLOAD    | Mediafile |
| FOLLOW      | Mediafile |
| PREVIEW     | Mediafile |
| READ        | Mediafile |
| UPDATE      | Mediafile |
| VISIT       | Default <br>Library |

**Not Relevant:**  ADD, APPROVE, COMPLETE, COPY, DECLINE, EMPTY, GRADUATE, LOCK, MOVE, PIN, RECOMMEND, REJECT, REMOVE, RESTORE, TAG, UNCOMPLETE, UNDELETE, UNFOLLOW, UNLOCK, UNPIN, UNRECOMMEND, UNTAG, UNWATCH, VISIT_DUP, VOTE, WATCH

### Profiles

| Event       |  |
| ----------- | ---------- |
| ADD         | Invitation <br> Link |
| CREATE      | Collegue <br> Comment <br> Status <br> Tag <br> Wallpost |
| DELETE      | Collegue <br> Comment <br> Person <br> Profile.audio <br> Profile.photo <br> Status <br> Wallpost |
| FOLLOW      | Person |
| RECOMMEND   | Wall |
| TAG         | Person <br> Profile |
| UNFOLLOW    | Person |
| UNRECOMMEND | Wall |
| UNTAG       | Person <br> Profile |
| UPDATE      | Profile <br> Profile.about <br> Profile.audio <br> Profile.photo |
| VISIT       | Default <br> Network <br> Profiles <br> Search |
| VISIT_DUP   | Default |

**Not Relevant:**  APPROVE, COMPLETE, COPY, DECLINE, DOWNLOAD, EMPTY, GRADUATE, LOCK, MOVE, PIN, PREVIEW, READ, REJECT, REMOVE, RESTORE, UNCOMPLETE, UNDELETE, UNLOCK, UNPIN, UNWATCH, VOTE, WATCH

### Wikis

| Event       |  |
| ----------- | ---------- |
| CREATE      | Attachment <br> Comment <br> Library <br> Page <br> Tag |
| DELETE      | Attachment <br> Comment <br> Library <br> Page <br> PageVersion |
| FOLLOW      | Library <br> Page |
| READ        | Page |
| RECOMMEND   | Page |
| TAG         | Comment <br> Library <br> Page |
| UNDELETE    | Page |
| UNFOLLOW    | Library <br> Page |
| UNRECOMMEND | Page |
| UNTAG       | Comment <br> Library <br> Page |
| UPDATE      | Attachment <br> Comment <br> Library <br> Membership <br> Page |
| VISIT       | Default <br> Library <br> Membership |
| VISIT_DUP   | Default <br> Library|

**Not Relevant:**  ADD, APPROVE, COMPLETE, COPY, DECLINE, DOWNLOAD, EMPTY, GRADUATE, LOCK, MOVE, PIN, PREVIEW, REJECT, REMOVE, RESTORE, UNCOMPLETE, UNLOCK, UNPIN, UNWATCH, VOTE, WATCH