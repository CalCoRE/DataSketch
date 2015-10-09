(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, DrawModeAction;
    Action = require('modules/action/action');
    return DrawModeAction = (function(superClass) {
      extend(DrawModeAction, superClass);

      function DrawModeAction(canvas, _targetMode) {
        this.canvas = canvas;
        this._targetMode = _targetMode;
        this.undo = bind(this.undo, this);
        this.execute = bind(this.execute, this);
      }

      DrawModeAction.prototype.execute = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            _this._currentMode = _this.canvas.getMode();
            return _this.canvas.setMode(_this._targetMode);
          };
        })(this))());
      };

      DrawModeAction.prototype.undo = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            return _this.canvas.setMode(_this._currentMode);
          };
        })(this))());
      };

      return DrawModeAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/set_mode.js.map