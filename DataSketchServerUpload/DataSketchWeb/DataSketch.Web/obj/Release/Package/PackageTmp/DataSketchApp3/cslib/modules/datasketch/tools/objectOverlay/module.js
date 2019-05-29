(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var HM, MarkAsOriginToolModule, Module, ObjectOverlay;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    ObjectOverlay = require('./tool');
    return MarkAsOriginToolModule = (function(superClass) {
      extend(MarkAsOriginToolModule, superClass);

      function MarkAsOriginToolModule() {
        this._toolbarTools = bind(this._toolbarTools, this);
        MarkAsOriginToolModule.__super__.constructor.call(this);
        HM.hook('Toolbar.Tools', this._toolbarTools);
      }

      MarkAsOriginToolModule.prototype._toolbarTools = function(list, meta) {
        if (meta.id === "objectoverlay") {
          list.push(new ObjectOverlay);
        }
        return list;
      };

      return MarkAsOriginToolModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/objectoverlay/module.js.map
