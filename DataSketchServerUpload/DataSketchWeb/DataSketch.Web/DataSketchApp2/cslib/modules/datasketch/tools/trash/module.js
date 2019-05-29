(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var HM, Module, TrashTool, TrashToolModule;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    TrashTool = require('./tool');
    return TrashToolModule = (function(superClass) {
      extend(TrashToolModule, superClass);

      function TrashToolModule() {
        this._toolbarTools = bind(this._toolbarTools, this);
        TrashToolModule.__super__.constructor.call(this);
        HM.hook('Toolbar.Tools', this._toolbarTools);
      }

      TrashToolModule.prototype._toolbarTools = function(list, meta) {
        if (meta.id === "trash") {
          list.push(new TrashTool);
        }
        return list;
      };

      return TrashToolModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/trash/module.js.map
