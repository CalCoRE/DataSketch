(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, HM, ModeSelectTool, ModeToolModule, Module;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    ModeSelectTool = require('./tool');
    Globals = require('core/model/globals');
    return ModeToolModule = (function(superClass) {
      extend(ModeToolModule, superClass);

      function ModeToolModule() {
        this._onModeChange = bind(this._onModeChange, this);
        this._toolbarTools = bind(this._toolbarTools, this);
        this.run = bind(this.run, this);
        ModeToolModule.__super__.constructor.call(this);
        HM.hook('Toolbar.Tools', this._toolbarTools);
      }

      ModeToolModule.prototype.run = function() {
        return Globals.get('Canvas').addEventListener('Canvas.ModeChange', this._onModeChange);
      };

      ModeToolModule.prototype._toolbarTools = function(list, meta) {
        if (meta.id === "mode") {
          list.push(new ModeSelectTool('draw'));
          list.push(new ModeSelectTool('select'));
        }
        return list;
      };

      ModeToolModule.prototype._onModeChange = function(evt) {
        var ref;
        if ((ref = evt.data.mode) === 'draw' || ref === 'select') {
          return Globals.get('Canvas').enableControls();
        }
      };

      return ModeToolModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/mode/module.js.map
