(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DataModeAction, DataModeSelectTool, Globals, Tool;
    Tool = require('modules/toolkit/tool/tool');
    DataModeAction = require('./action');
    Globals = require('core/model/globals');
    return DataModeSelectTool = (function(superClass) {
      extend(DataModeSelectTool, superClass);

      function DataModeSelectTool() {
        this._onCanvasChange = bind(this._onCanvasChange, this);
        this.generateAction = bind(this.generateAction, this);
        DataModeSelectTool.__super__.constructor.call(this, {
          modelData: {
            id: "modeSelect-data"
          }
        });
        Globals.get('Canvas').addEventListener("Canvas.ModeChange", this._onCanvasChange);
        this.toggleActiveDisplay(Globals.get('Canvas').getMode() === this._targetMode);
      }

      DataModeSelectTool.prototype.generateAction = function() {
        return new DataModeAction(Globals.get('Canvas'));
      };

      DataModeSelectTool.prototype._onCanvasChange = function(evt) {
        return this.toggleActiveDisplay(evt.data.mode === this._targetMode);
      };

      return DataModeSelectTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/data/tool/tool.js.map
