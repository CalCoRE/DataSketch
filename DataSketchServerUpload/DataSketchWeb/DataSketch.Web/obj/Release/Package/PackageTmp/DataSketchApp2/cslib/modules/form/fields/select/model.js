(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var BaseModel, SelectFieldModel, Utils, defaults;
    BaseModel = require('modules/form/fields/base/model');
    Utils = require('core/util/utils');
    defaults = {
      options: {}
    };
    return SelectFieldModel = (function(superClass) {
      extend(SelectFieldModel, superClass);

      function SelectFieldModel(config) {
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        SelectFieldModel.__super__.constructor.call(this, config);
      }

      return SelectFieldModel;

    })(BaseModel);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/fields/select/model.js.map
