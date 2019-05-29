(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var HM, LoadFileTool, ModalToolModule, Module;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    LoadFileTool = require('./tool');
    return ModalToolModule = (function(superClass) {
      extend(ModalToolModule, superClass);

      function ModalToolModule() {
        this._toolbarTools = bind(this._toolbarTools, this);
        ModalToolModule.__super__.constructor.call(this);
        HM.hook('Toolbar.Tools', this._toolbarTools);
      }

      ModalToolModule.prototype._toolbarTools = function(list, meta) {
        if (meta.id === "LoadFile") {
          list.push(new LoadFileTool);
        }
        return list;
      };

      return ModalToolModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/loadfile/module.js.map
