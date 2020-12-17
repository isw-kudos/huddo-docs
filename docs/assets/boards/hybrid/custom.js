/* global XCC */
/**
 * TIMETOACT Web CMS Extension for IBM Connections (XCC) - {custom}.js
 */
(function(W) {
  XCC.X = XCC.X || {
    init: function() {
      function render(container$, widgetData) {
        var data = {};
        if (widgetData.communitiesContentString) {
          var array = JSON.parse(widgetData.communitiesContentString || '{}') || [];
          data = array.pop();
        }

        var frame = document.createElement('iframe');
        var boardsURL = 'https://boards.huddo.com/auth/connections/' + btoa(location.hostname);
        if (data.type==='community')
          frame.src = boardsURL+'?redirect_to=/group/connections/' + data.uid+'&nav=false';
        else
          frame.src = boardsURL;
        
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

      function saveConfig(container, widget) {
        widget.title = container.find('input[name=title]').val();
        widget.height = container.find('input[name=height]').val();
      }

      XCC.W.registerCustomWidget(
        'Huddo Boards',
        'th-large',
        render,
        editConfig,
        saveConfig
      );
    },
  };
})(window);
