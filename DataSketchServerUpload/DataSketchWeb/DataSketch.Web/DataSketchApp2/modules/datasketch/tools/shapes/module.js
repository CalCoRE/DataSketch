(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var HM, Module, ShapeTool, ShapeToolModule;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    ShapeTool = require('./tool');
    return ShapeToolModule = (function(superClass) {
      extend(ShapeToolModule, superClass);

      function ShapeToolModule() {
        this._toolbarTools = bind(this._toolbarTools, this);
        ShapeToolModule.__super__.constructor.call(this);
        HM.hook('Toolbar.Tools', this._toolbarTools);
      }

      ShapeToolModule.prototype._toolbarTools = function(list, meta) {
        if (meta.id === "shape") {
          list.push(new ShapeTool(1));
          list.push(new ShapeTool(2));
          list.push(new ShapeTool(3));
          list.push(new ShapeTool(4));
          list.push(new ShapeTool(5));
          list.push(new ShapeTool(6));
        }
        return list;
      };

      return ShapeToolModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/shapes/module.js.map
