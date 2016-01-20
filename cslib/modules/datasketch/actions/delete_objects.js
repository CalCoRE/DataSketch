(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, DeleteObjectsAction;
    Action = require('modules/action/action');
    return DeleteObjectsAction = (function(superClass) {
      extend(DeleteObjectsAction, superClass);

      function DeleteObjectsAction(canvas, _objects) {
        this.canvas = canvas;
        this._objects = _objects;
        this.undo = bind(this.undo, this);
        this.execute = bind(this.execute, this);
      }

      DeleteObjectsAction.prototype.execute = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            _this.canvas.removeObjects(_this._objects);
            return _this.canvas.selectObjects([]);
          };
        })(this))());
      };

      DeleteObjectsAction.prototype.undo = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            _this.canvas.addObjects(_this._objects);
            return _this.canvas.selectObjects(_this._objects);
          };
        })(this))());
      };

      return DeleteObjectsAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/delete_objects.js.map