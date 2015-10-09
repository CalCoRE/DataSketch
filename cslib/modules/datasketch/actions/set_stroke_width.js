(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, StrokeAction;
    Action = require('modules/action/action');
    return StrokeAction = (function(superClass) {
      extend(StrokeAction, superClass);

      function StrokeAction(canvas, _strokeWidth) {
        this.canvas = canvas;
        this._strokeWidth = _strokeWidth;
        this.undo = bind(this.undo, this);
        this.execute = bind(this.execute, this);
      }

      StrokeAction.prototype.execute = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            _this._currentStrokeWidth = _this.canvas.getStrokeWidth();
            return _this.canvas.setStrokeWidth(_this._strokeWidth);
          };
        })(this))());
      };

      StrokeAction.prototype.undo = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            return _this.canvas.setStrokeWidth(_this._currentStrokeWidth);
          };
        })(this))());
      };

      return StrokeAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/set_stroke_width.js.map