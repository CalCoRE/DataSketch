(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, RemoveCalibrationAction;
    Action = require('modules/action/action');
    return RemoveCalibrationAction = (function(superClass) {
      extend(RemoveCalibrationAction, superClass);

      function RemoveCalibrationAction(canvas) {
        this.canvas = canvas;
        this.execute = bind(this.execute, this);
      }

      RemoveCalibrationAction.prototype.execute = function() {
        return this.canvas.removeProperty();
      };

      return RemoveCalibrationAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/remove_calibration.js.map
