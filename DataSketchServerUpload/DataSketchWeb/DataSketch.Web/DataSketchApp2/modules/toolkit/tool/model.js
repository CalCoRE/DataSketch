(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Model, ToolModel, Utils, defaults;
    Model = require('core/model/model');
    Utils = require('core/util/utils');
    defaults = {
      id: '',
      activeContext: null
    };
    return ToolModel = (function(superClass) {
      extend(ToolModel, superClass);

      function ToolModel(config) {
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        ToolModel.__super__.constructor.call(this, config);
      }

      return ToolModel;

    })(Model);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/toolkit/tool/model.js.map
