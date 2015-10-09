(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var HM, Module, StrokeTool, StrokeToolModule;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    StrokeTool = require('./tool');
    return StrokeToolModule = (function(superClass) {
      extend(StrokeToolModule, superClass);

      function StrokeToolModule() {
        this._toolbarTools = bind(this._toolbarTools, this);
        StrokeToolModule.__super__.constructor.call(this);
        HM.hook('Toolbar.Tools', this._toolbarTools);
      }

      StrokeToolModule.prototype._toolbarTools = function(list, meta) {
        if (meta.id === "stroke") {
          list.push(new StrokeTool(1));
          list.push(new StrokeTool(3));
          list.push(new StrokeTool(5));
          list.push(new StrokeTool(7));
        }
        return list;
      };

      return StrokeToolModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/stroke/module.js.map