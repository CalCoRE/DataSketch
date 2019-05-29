(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var HM, Module, ObjectPropertyManagerModule, ObjectPropertyManagerTool;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    ObjectPropertyManagerTool = require('./tool');
    return ObjectPropertyManagerModule = (function(superClass) {
      extend(ObjectPropertyManagerModule, superClass);

      function ObjectPropertyManagerModule() {
        this._toolbarTools = bind(this._toolbarTools, this);
        ObjectPropertyManagerModule.__super__.constructor.call(this);
        HM.hook('Toolbar.Tools', this._toolbarTools);
      }

      ObjectPropertyManagerModule.prototype._toolbarTools = function(list, meta) {
        if (meta.id === "objectpropertymanager") {
          list.push(new ObjectPropertyManagerTool("X"));
          list.push(new ObjectPropertyManagerTool("Y"));
          list.push(new ObjectPropertyManagerTool("Width"));
          list.push(new ObjectPropertyManagerTool("Height"));
          list.push(new ObjectPropertyManagerTool("originX"));
          list.push(new ObjectPropertyManagerTool("originY"));
        }
        return list;
      };

      return ObjectPropertyManagerModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/objectpropertymanager/module.js.map
