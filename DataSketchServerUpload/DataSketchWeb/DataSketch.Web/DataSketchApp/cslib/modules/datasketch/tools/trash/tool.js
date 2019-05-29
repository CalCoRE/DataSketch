(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, Tool, TrashAction, TrashTool;
    Tool = require('modules/toolkit/tool/tool');
    Globals = require('core/model/globals');
    require('link!./style.css');
    TrashAction = require('modules/datasketch/actions/delete_objects');
    return TrashTool = (function(superClass) {
      extend(TrashTool, superClass);

      function TrashTool() {
        this.generateAction = bind(this.generateAction, this);
        TrashTool.__super__.constructor.call(this, {
          modelData: {
            id: "trash",
            tooltip: "Trash"
          }
        });
      }

      TrashTool.prototype.generateAction = function() {
        if (Globals.get('Canvas')._view._fabric._objects.length > 0) {
          return new TrashAction(Globals.get('Canvas'));
        } else {
          return alert("Please select atleast one object for this feature.");
        }
      };

      return TrashTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/trash/tool.js.map
