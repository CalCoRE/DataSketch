(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, DataModeAction;
    Action = require('modules/action/action');
    return DataModeAction = (function(superClass) {
      extend(DataModeAction, superClass);

      function DataModeAction(canvas) {
        this.canvas = canvas;
        this.undo = bind(this.undo, this);
        this.execute = bind(this.execute, this);
      }

      DataModeAction.prototype.execute = function() {
        this._currentMode = this.canvas.getMode();
        return this.canvas.setMode("data");
      };

      DataModeAction.prototype.undo = function() {
        return this.canvas.setMode(this._currentMode);
      };

      return DataModeAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/data/tool/action.js.map
