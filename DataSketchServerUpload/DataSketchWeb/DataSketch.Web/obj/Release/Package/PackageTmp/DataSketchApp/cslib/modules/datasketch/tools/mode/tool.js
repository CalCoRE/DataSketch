(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DrawModeAction, Globals, ModeSelectTool, Tool;
    Tool = require('modules/toolkit/tool/tool');
    DrawModeAction = require('modules/datasketch/actions/set_mode');
    Globals = require('core/model/globals');
    require('link!./style.css');
    return ModeSelectTool = (function(superClass) {
      extend(ModeSelectTool, superClass);

      function ModeSelectTool(_targetMode) {
        this._targetMode = _targetMode;
        this._onCanvasChange = bind(this._onCanvasChange, this);
        this.generateAction = bind(this.generateAction, this);
        ModeSelectTool.__super__.constructor.call(this, {
          modelData: {
            id: "modeSelect-" + this._targetMode,
            tooltip: this._targetMode.substr(0, 1).toUpperCase() + this._targetMode.substr(1)
          }
        });
        Globals.get('Canvas').addEventListener("Canvas.ModeChange", this._onCanvasChange);
        this.toggleActiveDisplay(Globals.get('Canvas').getMode() === this._targetMode);
      }

      ModeSelectTool.prototype.generateAction = function() {
        return new DrawModeAction(Globals.get('Canvas'), this._targetMode);
      };

      ModeSelectTool.prototype._onCanvasChange = function(evt) {
        return this.toggleActiveDisplay(evt.data.mode === this._targetMode);
      };

      return ModeSelectTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/mode/tool.js.map
