/* global XCC */
/**
 * TIMETOACT Web CMS Extension for IBM Connections (XCC) - {custom}.js
 */
(function(W) {
  function HuddoBoards() {
    function render(container$, widgetData) {
      var data = {};
      if (widgetData.communitiesContentString) {
        var array = JSON.parse(widgetData.communitiesContentString || '{}') || [];
        data = array.pop();
      }

      var source;
      var frame = document.createElement('iframe');
      var boardsURL = 'https://boards.huddo.com/auth/connections/' + btoa(location.hostname);
      var url = boardsURL;
      if (data.type==='community') {
        url = boardsURL+'?redirect_to=/group/connections/' + data.uid+'&nav=false';
        source = {
          resourceType: 'community',
          resourceId: data.uid,
          resourceName: data.communityName,
          widgetInstanceId: '' + widgetData.id,
        };
      }

      window.addEventListener('message', function (event) {
        // wrong window asked
        if (event.source !== frame.contentWindow) return;
        if (event.data === 'appReady') {
          var user = window.widgetUserInfo;
          frame.contentWindow.postMessage({
            context: { highlights: true },
            source,
            user,
            extraContent: {
              canPersonalize: user.canPersonalize,
            },
          }, '*');
        }
      }, false);
      
      frame.src = url;
      frame.title = 'Huddo Boards';
      container$.append(frame);

      frame.style.border = "0 none";
      frame.style.width = "100%",
      frame.style.height = (widgetData.height==='auto' ? null : widgetData.height) || '600px';

      // fix the styling above us
      frame.parentElement.parentElement.style.margin = 0;
      frame.parentElement.parentElement.parentElement.style.height = 'auto';
    }

    function editConfig(container$, widgetData) {
      return [
        XCC.U.createTextInputOnTheFly('Title', widgetData.title, 'title'),
        XCC.U.createTextInputOnTheFly('Height', widgetData.height, 'height'),
      ];
    }

    function saveConfig(container$, widgetData) {
      widgetData.title = container$.find('input[name=title]').val();
      widgetData.height = container$.find('input[name=height]').val();
    }

    XCC.W.registerCustomWidget({
      id: 'boards',
      name: 'Huddo Boards',
      icon: 'th-large',
      createCustomWidget: render,
      customEditor: editConfig,
      synchUiToWidgetDataObject: saveConfig,
    });
  }

  XCC.X = XCC.X || {
    init: function() {
      HuddoBoards();
    },
  };
})(window);
