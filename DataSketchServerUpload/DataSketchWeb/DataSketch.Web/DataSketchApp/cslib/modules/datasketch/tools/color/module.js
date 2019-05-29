(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var ColorTool, ColorToolModule, HM, Module, colors;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    ColorTool = require('./tool');
    colors = ["stroke", "fill"];
    return ColorToolModule = (function(superClass) {
      extend(ColorToolModule, superClass);

      function ColorToolModule() {
        this._toolbarTools = bind(this._toolbarTools, this);
        ColorToolModule.__super__.constructor.call(this);
        HM.hook('Toolbar.Tools', this._toolbarTools);
      }

      ColorToolModule.prototype._toolbarTools = function(list, meta) {
        var i, id, len;
        if (meta.id === "color") {
          for (i = 0, len = colors.length; i < len; i++) {
            id = colors[i];
            list.push(new ColorTool(id, "#000"));
          }
        }
        return list;
      };

      return ColorToolModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/color/module.js.map
