# Huddo Boards Notifications

Below are the notifications that Huddo Boards sends it's users to keep them up to date with their content, we try not to send too many of these and keep them short and relevant.

| Notification   | Trigger                                           | Recipients                                                                                                         | Methods                            |
| -------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| New User       | First Sign in                                     | User                                                                                                               | Email                              |
| User Invite    | Inviting a user to a board by their email address | Invitee                                                                                                            | Email                              |
| Added to Board | Adding user/group to a board                      | Invitee                                                                                                            | Email, Teams bot, Community stream |
| Assigned Task  | Assigning a user to a card                        | Assignee                                                                                                           | Email                              |
| Assigned Task  | Assigning a user to a card                        | Groups that are members                                                                                            | Teams bot, Community stream        |
| Commented      | Adding a comment                                  | Commenter (if another user replies), Anyone assigned, The card creator, Anyone @Mentioned, Groups that are members | Email, Teams bot, Community stream |
| Mentioned      | Mentioning another member in a board description  | Anyone @Mentioned, Groups that are members                                                                         | Email, Teams bot, Community stream |

## Group Notifications

For boards that have groups as members, these notifications are sent to each group.

**Trigger** Creating a new card, Changing properties of a board/card, Completing a board/card<br>
**Recipients** Group<br>
**Methods** Teams bot, Community stream<br>

## Licence Notifications

**Trigger** Quote Request, Payment Success/Failure, Licence created/updated<br>
**Recipients** Organisation Admins<br>
**Methods** Email<br>
