(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, GroupAction;
    Action = require('modules/action/action');
    return GroupAction = (function(superClass) {
      extend(GroupAction, superClass);

      function GroupAction(canvas, _objects) {
        this.canvas = canvas;
        this._objects = _objects;
        this.undo = bind(this.undo, this);
        this.execute = bind(this.execute, this);
      }

      GroupAction.prototype.execute = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            return _this._group = _this.canvas.createGroup(_this._objects);
          };
        })(this))());
      };

      GroupAction.prototype.undo = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            return _this.canvas.breakGroup(_this._group);
          };
        })(this))());
      };

      return GroupAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/group_objects.js.map