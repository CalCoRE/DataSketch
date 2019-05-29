(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Template, ToolView, savecanvasToolView;
    ToolView = require('modules/toolkit/tool/view');
    Template = require('text!./view.html');
    require('link!./style.css');
    return savecanvasToolView = (function(superClass) {
      extend(savecanvasToolView, superClass);

      function savecanvasToolView(model) {
        savecanvasToolView.__super__.constructor.call(this, model, Template);
      }

      return savecanvasToolView;

    })(ToolView);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/savecanvas/view.js.map
