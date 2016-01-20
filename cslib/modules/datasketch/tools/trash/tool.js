(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, Tool, TrashAction, TrashTool;
    Tool = require('modules/toolkit/tool/tool');
    TrashAction = require('modules/datasketch/actions/delete_objects');
    Globals = require('core/model/globals');
    require('link!./style.css');
    return TrashTool = (function(superClass) {
      extend(TrashTool, superClass);

      function TrashTool() {
        this.generateAction = bind(this.generateAction, this);
        TrashTool.__super__.constructor.call(this, {
          modelData: {
            id: "trash"
          }
        });
      }

      TrashTool.prototype.generateAction = function() {
        return new TrashAction(Globals.get('Canvas'), Globals.get('Canvas').getSelectedObjects());
      };

      return TrashTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/trash/tool.js.map