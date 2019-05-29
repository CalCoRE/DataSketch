(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, changeoriginAction;
    Action = require('modules/action/action');
    return changeoriginAction = (function(superClass) {
      extend(changeoriginAction, superClass);

      function changeoriginAction(canvas, _objects) {
        this.canvas = canvas;
        this._objects = _objects;
        this.execute = bind(this.execute, this);
      }

      changeoriginAction.prototype.execute = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            return _this.canvas.updateOrigin("left", "top");
          };
        })(this))());
      };

      return changeoriginAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/change_origin.js.map
