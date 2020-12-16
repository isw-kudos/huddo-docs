##Boards Tours


You can create your own tours by calling the `boards.setTours()` function in console.

> Open dev tools with `Cmd-Shift-I` or `Ctrl-Shift-I` then got to the console tab

> Tours are currently disabled by default, to enable them type `boards.enableTours()` then press Enter, now reload your page and the tours will be available.

###Tour Definition
| Field | Description | required |
| --- | --- | --- |
| id | unique identifier | yes |
| routes | the URLs which make the tour applicable (\* is a wildcard) | yes |
| sizes | Supported screen sizes | no |
| disabled | Disables this tour | no |
| disableAnimation | Disables animation for this tour | no |
| steps | the parts of the tour to step through | yes |

###Step Definition
| Field | Description | required |
| --- | --- | --- |
| spotlight | query selector identifying the element on the page to highlight | yes |
| when | query selector looking for an element on the page, when the element is present we will automatically move to this step | no |
| title | tour popup title | yes |
| body | the paragraphs to show below that | yes |
| actions | any urls to link to | no |
| placement | defines where to place the tour step in relation to the spotlighted element | no |
| hideArrow | hides the arrow pointing to the spotlighted element | no |

###Placement options
- top, top-start, top-end
- bottom, bottom-start, bottom-end
- left, left-start, left-end
- right, right-start, right-end
- auto (it will choose the best position)
- center (set the target to body)

###Full example

```javascript
boards.setTours([{
  id: 'create-first-board-mobile',
  routes: ['/', '/my', '/public'],
  sizes: ['isMobile'],
  disabled: false,
  disableAnimation: false,
  steps: [
    {
      spotlight: '.create-board-fab button',
      title: 'Welcome to Boards',
      body: ["Let's get started", 'Click here'],
      actions: [
        { title: 'More information', url: 'https://docs.kudosapps.com' },
      ],
    },
    {
      spotlight: '.template-dialog .MuiPaper-root',
      when: '.template-dialog .MuiPaper-root .step-1',
      title: 'Pick a template',
      body: "Boards can have a template. Select one and click 'Next'",
      hideArrow: true,
      placement: 'bottom-end',
    },
    {
      spotlight: '.template-dialog .MuiPaper-root',
      when: '.template-dialog .MuiPaper-root .step-2',
      title: 'Name the Board',
      body: 'Invite other members to collaborate with you in this Board.',
    },
  ],
}])
```

