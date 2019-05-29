(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var HM, Module, savecanvasTool, savecanvasToolModule;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    savecanvasTool = require('./tool');
    return savecanvasToolModule = (function(superClass) {
      extend(savecanvasToolModule, superClass);

      function savecanvasToolModule() {
        this._toolbarTools = bind(this._toolbarTools, this);
        savecanvasToolModule.__super__.constructor.call(this);
        HM.hook('Toolbar.Tools', this._toolbarTools);
      }

      savecanvasToolModule.prototype._toolbarTools = function(list, meta) {
        if (meta.id === "savecanvas") {
          list.push(new savecanvasTool);
        }
        return list;
      };

      return savecanvasToolModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/savecanvas/module.js.map
