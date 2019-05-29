(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, objectoverlay;
    Action = require('modules/action/action');
    return objectoverlay = (function(superClass) {
      extend(objectoverlay, superClass);

      function objectoverlay(canvas, operation) {
        this.canvas = canvas;
        this.operation = operation;
        this.execute = bind(this.execute, this);
      }

      objectoverlay.prototype.execute = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            return _this.canvas.overlayObject(_this.operation);
          };
        })(this))());
      };

      return objectoverlay;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/object_overlay.js.map
