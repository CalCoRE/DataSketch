(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, IsolateGroupAction;
    Action = require('modules/action/action');
    return IsolateGroupAction = (function(superClass) {
      extend(IsolateGroupAction, superClass);

      function IsolateGroupAction(canvas, _group) {
        this.canvas = canvas;
        this._group = _group;
        this.undo = bind(this.undo, this);
        this.execute = bind(this.execute, this);
      }

      IsolateGroupAction.prototype.execute = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            _this._last = _this.canvas.getIsolation();
            return _this.canvas.isolate(_this._group);
          };
        })(this))());
      };

      IsolateGroupAction.prototype.undo = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            return _this.canvas.setIsolation(_this._last);
          };
        })(this))());
      };

      return IsolateGroupAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/isolate_group.js.map