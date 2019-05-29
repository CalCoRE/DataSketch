(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, LoadFromFileAction;
    Action = require('modules/action/action');
    return LoadFromFileAction = (function(superClass) {
      extend(LoadFromFileAction, superClass);

      function LoadFromFileAction(canvas, _Action) {
        this.canvas = canvas;
        this._Action = _Action;
        this.execute = bind(this.execute, this);
      }

      LoadFromFileAction.prototype.execute = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            return _this.canvas.loadFromFile(_this._Action);
          };
        })(this))());
      };

      return LoadFromFileAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/load_from_file.js.map
