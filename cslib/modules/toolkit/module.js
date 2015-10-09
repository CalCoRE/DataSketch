(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Module, ToolbarModule;
    Module = require('core/app/module');
    return ToolbarModule = (function(superClass) {
      extend(ToolbarModule, superClass);

      function ToolbarModule() {
        return ToolbarModule.__super__.constructor.apply(this, arguments);
      }

      return ToolbarModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../maps/modules/toolkit/module.js.map