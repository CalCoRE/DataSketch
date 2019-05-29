(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, MarkAsOrigin;
    Action = require('modules/action/action');
    return MarkAsOrigin = (function(superClass) {
      extend(MarkAsOrigin, superClass);

      function MarkAsOrigin(canvas, originX, originY, isMultiObject) {
        this.canvas = canvas;
        this.originX = originX;
        this.originY = originY;
        this.isMultiObject = isMultiObject;
        this.execute = bind(this.execute, this);
      }

      MarkAsOrigin.prototype.execute = function() {
        return this.canvas.updateObjectOrigin(this.originX, this.originY, this.isMultiObject);
      };

      return MarkAsOrigin;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/mark_as_origin.js.map
