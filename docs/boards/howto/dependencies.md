<img style="float: right" src="/assets/images/boards-logo.jpg" width="200" alt="My Boards" />

# Task Dependencies in Huddo Boards

Huddo Boards supports the use of task dependencies within boards. A task dependency is where a task relies on another task or tasks to be completed before it can be completed itself.
A single task can be dependant on multiple tasks and multiple tasks can be dependant on a single task.

<center>![](/assets/boards/dependencies/dependencies-example.png)</center>

## Creating a Task Dependency
Task dependencies can be created in several ways:

### Within an open task
1. Click on a task to open its details.
2. Find and click the `Add Dependency` button in the task bar:

    <center>![](/assets/boards/dependencies/add-dependency-node1.png)</center>
    
    - Note that depending on your screen size, you may need to use the *More...* menu to access the `Add Dependency` Button:

    <center>![](/assets/boards/dependencies/add-dependency-node2.png)</center>

    - Once dependencies have been added to a task, `Add Dependency` buttons will also be available within the task details view here:

    <center>![](/assets/boards/dependencies/add-dependency-node3.png)</center>


3. The Add Dependency Dialog will be shown:

    <center>![](/assets/boards/dependencies/add-dependency-dialog.png)</center>

4. Select a task that you want to add as a dependency for the current task. The dependency you choose will need to be completed before the current task can be completed. 
    - Note that this relationship can be reversed by clicking the `Swap Direction` button 
5. Click the `Add` button to create the task dependency.

### Drag from task to task in the Timeline view


1. Open the `Timeline` view of your board.
2. Ensure that the parent and child tasks for the dependency you want to create are scheduled and appear on the timeline.
3. Dependencies can be created in either direction. To create a dependency from the parent to the child (parent waits for child to be completed first), first hover the cursor over the parent of the intended dependency to see the add dependency drag icons.
4. Hover over the left red icon, click and drag the icon to the intended dependency child task. An arrow will be drawn as you drag, and the task you have dragged onto will have a red highlighted border:
5. Drop the icon onto the intended task and the dependency relationship will be created.
    - Note that if the icon is dragged and dropped onto a task that is already a dependency of the originating task, then nothing will happen.

    <center>![](/assets/boards/dependencies/add-dependency-timeline-drag.gif)</center>
6. Once the dependency has been created then dependency icons can be observed on both the parent and child of the dependency.

    <center>![](/assets/boards/dependencies/add-dependency-timeline-icons.png)</center>



## Showing dependencies on a task

Opening a (either a child or parent) task with dependencies will list those dependencies on the task details view.

<center>![](/assets/boards/dependencies/show-dependencies-in-task.png)</center>

- From this view, it is possible to remove a dependency by clicking the remove icon .

<center>![](/assets/boards/dependencies/remove-dependency.png)</center>

- Dependant tasks can be completed in this view by clicking the complete task checkbox.

<center>![](/assets/boards/dependencies/complete-dependency.png)</center>

- Clicking anywhere else on the dependant task will open up its task details.

## Visualising task dependencies on a board
Dependencies for a particular task can be displayed/visualised in various ways depending on what view you are using to display your board.

### Board view
- Hover on the dependencies icon on a task card for a moment to highlight its dependencies.
![](/assets/boards/dependencies/show-dependencies-kanban.gif)

### Activity view
- Hover on the dependencies icon on a task card for a moment to highlight its dependencies.
![](/assets/boards/dependencies/show-dependencies-activity.gif)

### Mindmap
- Hover on the dependencies icon on a task card for a moment to highlight its dependencies.
![](/assets/boards/dependencies/show-dependencies-mindmap.gif)

### Timeline
- Hover anywhere on a card with dependencies for a moment to highlight its dependencies and also visualise the dependency links as arrows to and from the dependant cards.
![](/assets/boards/dependencies/show-dependencies-timeline.gif)

![](/assets/boards/dependencies/timeline-show-dependencies-checkbox.png){: style="float: left"} Using the controls in the right sidebar, dependency visualisations can be turned off by unchecking `Show Dependencies`. The arrow display depth slider can be used to increase the number of "levels" (backwards and forwards) to show a chain of dependency link arrows in the Timeline view, originating from the card that is being hovered on. See the image below as an example.

<br/><br/><br/><br/><br/><br/>
![](/assets/boards/dependencies/show-dependencies-timeline-3-levels.png)

## Completing a task that has dependencies
Attempting to complete a task that has incomplete dependencies will trigger the following dialog:
<center>![](/assets/boards/dependencies/incomplete-dependencies-dialog.png)</center>

Note that individual tasks cannot be completed from this view.

### Available actions
#### Complete all Task Dependencies
Click this to complete **all** preceding dependencies as displayed in the dialog. After performing this action the current task can then be completed successfully.

#### Force Complete
This action will ignore all preceding dependencies and force the task to complete.

#### Cancel
Close the dialog without taking an action.
