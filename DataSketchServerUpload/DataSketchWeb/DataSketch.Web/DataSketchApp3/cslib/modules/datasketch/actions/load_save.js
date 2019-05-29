(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, LoadSaveAction;
    Action = require('modules/action/action');
    return LoadSaveAction = (function(superClass) {
      extend(LoadSaveAction, superClass);

      function LoadSaveAction(canvas, _Action) {
        this.canvas = canvas;
        this._Action = _Action;
        this.execute = bind(this.execute, this);
      }

      LoadSaveAction.prototype.execute = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            if (_this._Action === "SaveCanvas") {
              return _this.canvas.saveObject();
            } else {
              return _this.canvas.showLoadModal();
            }
          };
        })(this))());
      };

      return LoadSaveAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/load_save.js.map
