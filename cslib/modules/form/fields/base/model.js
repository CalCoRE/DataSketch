(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var FieldModel, Model, Utils, defaults;
    Model = require('core/model/model');
    Utils = require('core/util/utils');
    defaults = {
      id: '',
      label: '',
      "class": '',
      value: null,
      disabled: false
    };
    return FieldModel = (function(superClass) {
      extend(FieldModel, superClass);

      function FieldModel(config) {
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        FieldModel.__super__.constructor.call(this, config);
      }

      return FieldModel;

    })(Model);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/fields/base/model.js.map