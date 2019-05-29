(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, snaptogrid;
    Action = require('modules/action/action');
    return snaptogrid = (function(superClass) {
      extend(snaptogrid, superClass);

      function snaptogrid(canvas) {
        this.canvas = canvas;
        this.execute = bind(this.execute, this);
      }

      snaptogrid.prototype.execute = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            return _this.canvas.snapToGrid();
          };
        })(this))());
      };

      return snaptogrid;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/snap_to_grid.js.map
