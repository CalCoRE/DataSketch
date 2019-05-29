(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var HM, LoadSaveTool, LoadSaveToolModule, Module;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    LoadSaveTool = require('./tool');
    return LoadSaveToolModule = (function(superClass) {
      extend(LoadSaveToolModule, superClass);

      function LoadSaveToolModule() {
        this._toolbarTools = bind(this._toolbarTools, this);
        LoadSaveToolModule.__super__.constructor.call(this);
        HM.hook('Toolbar.Tools', this._toolbarTools);
      }

      LoadSaveToolModule.prototype._toolbarTools = function(list, meta) {
        if (meta.id === "LoadSave") {
          list.push(new LoadSaveTool("SaveCanvas"));
          list.push(new LoadSaveTool("LoadCanvas"));
        }
        return list;
      };

      return LoadSaveToolModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/loadsave/module.js.map
