(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, DrawMode, SaveCanvasAction;
    Action = require('modules/action/action');
    DrawMode = require('./set_mode');
    return SaveCanvasAction = (function(superClass) {
      extend(SaveCanvasAction, superClass);

      function SaveCanvasAction(canvas, _Action) {
        this.canvas = canvas;
        this._Action = _Action;
        this.execute = bind(this.execute, this);
      }

      SaveCanvasAction.prototype.execute = function() {
        return Promise.resolve(((function(_this) {
          return function() {
            var drawMode;
            drawMode = new DrawMode(_this.canvas, 'select');
            drawMode.execute();
            return _this.canvas.saveCanvas(_this._Action);
          };
        })(this))());
      };

      return SaveCanvasAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/save_canvas.js.map
