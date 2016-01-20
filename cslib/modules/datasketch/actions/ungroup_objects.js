(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, UngroupAction;
    Action = require('modules/action/action');
    return UngroupAction = (function(superClass) {
      extend(UngroupAction, superClass);

      function UngroupAction(canvas, _group) {
        this.canvas = canvas;
        this._group = _group;
        this.undo = bind(this.undo, this);
        this.execute = bind(this.execute, this);
      }

      UngroupAction.prototype.execute = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            return _this._objects = _this.canvas.breakGroup(_this._group);
          };
        })(this))());
      };

      UngroupAction.prototype.undo = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            return _this.canvas.createGroup(_this._objects);
          };
        })(this))());
      };

      return UngroupAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/ungroup_objects.js.map