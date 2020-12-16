<!-- TOC START min:3 max:3 link:true update:true -->
- [Create a Board](#create-a-board)
- [Create a List](#create-a-list)
- [Create a Card](#create-a-card)
- [Browse Boards, Lists and Cards](#browse-boards-lists-and-cards)
- [View the Current Board, Lists and Cards](#view-the-current-board-lists-and-cards)
- [Rename, Archive and Share Boards, Lists and Cards](#rename-archive-and-share-boards-lists-and-cards)
- [Explore Templates](#explore-templates)
- [Card Actions](#card-actions)
- [Help with Slash Commands](#help-with-slash-commands)

<!-- TOC END -->



# Watson Workspace Commands
Huddo Boards adds 4 different commands to Watson Workspace - `/boards`, `/lists`, `/cards`, `/templates`.
   
To run a command:
1. Make sure you have added the Huddo Boards app to the Workspace
2. Type any of the above prefixes in the chat and select the command from the popup window, by either clicking on it or pressing `Tab`.
3. Add a sub-command and any parameters if applicable as below.
4. Voilà!

---

### Create a Board
Create a Board in a workspace by using the `/boards create` command as below with the name for your Board.
```
/boards create My New Board
```
This will create a simple _Todo, Doing, Done_ board with the title _My New Board_. To create boards from templates, see [Explore Templates](#explore-templates).

---

### Create a List
Create a List in a workspace by using the `/lists create` command as below with the name of your list.
```
/lists create My New List
```
This will create a list with the title _My New List_ in the current board. If there is no current board selected, it will create a new board first and then create the list. For more details on the current selection, see [View the Current Board, Lists and Cards](#view-the-current-board-lists-and-cards).

---

### Create a Card
Create a Card (task) in a workspace by using the `/cards create` command as below with a brief title for the card.
```
/cards create My New Todo
```
This will create a card with the title _My New Todo_ in the current list in the current board. If there is no current board or list selected, it will first create them as required and then create the card. For more details on the current selection see [View the Current Board, Lists and Cards](#view-the-current-board-lists-and-cards).

---

### Browse Boards, Lists and Cards
Use the `all` and `search` commands in conjunction with any of `/boards`, `/lists` or `/cards` commands to browse items in that space.   
  
Examples:
```
/boards all
```
This will show all the boards in the workspace
```
/boards search meetings
```
This will search the boards in the current workspace for the keyword 'meetings'
```
/cards search documentation
```
This will search the cards in the current board for the keyword 'documentation'

---

### View the Current Board, Lists and Cards
To help you be more efficient, Huddo Boards remembers the card, list and board you last interacted with in each space. Use `current` with the `/boards`, `/lists` or `/cards` commands to view the current selection.  
  
Examples:
```
/boards current
/lists current
/cards current
```
To change the current selection, simply browse for the items using `all`, or `search` and click the *Select* button.

---

### Rename, Archive and Share Boards, Lists and Cards
Use `rename`, `archive` or `share` sub-commands with any of the `/boards`, `/lists` or `/cards` commands to perform the action on the current item.  
Examples:
```
/lists rename This is my new list name
```
This will rename the current list to _This is my new list name_.
```
/cards archive
```
This will archive the current card.
```
/boards share
```
This will post a message to the space with a link to the current board

For more on the current selections see [View the Current Board, Lists and Cards](#view-the-current-board-lists-and-cards).

---

### Explore Templates
Use the `/templates` command to explore templates. You may either use the sub-command `search` to find templates by keywords or `all` to see a list of all available templates.
Example:
```
/templates search project
```
This will show all the templates that contain the keyword `project`. To create a board from a template, simply click the *Create Board* button. You may also *Preview* or *Share* the template using the controls provided.

---

### Card Actions
The command `/cards` has some special sub-commands that allow you to interact with the current card.
`/cards complete` - Toggle completion status of the current card
`/cards comment My comment on the card` - Comment on the current card
`/cards assign @John Doe` - Assign the current card to John Doe

---

### Help with Slash Commands
Run the `help` command as per below to get a more detailed summary of Huddo Boards' commands.
```
/boards help
```
