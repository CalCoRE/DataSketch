(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Model, ToolbarModel, Utils, defaults;
    Model = require('core/model/model');
    Utils = require('core/util/utils');
    defaults = {
      id: "",
      tools: []
    };
    return ToolbarModel = (function(superClass) {
      extend(ToolbarModel, superClass);

      function ToolbarModel(config) {
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        ToolbarModel.__super__.constructor.call(this, config);
      }

      return ToolbarModel;

    })(Model);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/toolkit/toolbar/model.js.map
