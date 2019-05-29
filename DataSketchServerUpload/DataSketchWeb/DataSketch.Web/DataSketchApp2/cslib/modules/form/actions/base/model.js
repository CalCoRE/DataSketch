(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var FormActionModel, Model, Utils, defaults;
    Model = require('core/model/model');
    Utils = require('core/util/utils');
    defaults = {
      id: '',
      label: ''
    };
    return FormActionModel = (function(superClass) {
      extend(FormActionModel, superClass);

      function FormActionModel(config) {
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        FormActionModel.__super__.constructor.call(this, config);
      }

      return FormActionModel;

    })(Model);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/actions/base/model.js.map
