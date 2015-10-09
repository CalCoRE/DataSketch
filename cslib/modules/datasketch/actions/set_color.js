(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, ColorAction;
    Action = require('modules/action/action');
    return ColorAction = (function(superClass) {
      extend(ColorAction, superClass);

      function ColorAction(canvas, _strokeColor) {
        this.canvas = canvas;
        this._strokeColor = _strokeColor;
        this.undo = bind(this.undo, this);
        this.execute = bind(this.execute, this);
      }

      ColorAction.prototype.execute = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            _this._currentStrokeColor = _this.canvas.getStrokeColor();
            return _this.canvas.setStrokeColor(_this._strokeColor);
          };
        })(this))());
      };

      ColorAction.prototype.undo = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            return _this.canvas.setStrokeColor(_this._currentStrokeColor);
          };
        })(this))());
      };

      return ColorAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/set_color.js.map