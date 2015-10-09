(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var BaseModel, TextFieldModel, Utils, defaults;
    BaseModel = require('modules/form/fields/base/model');
    Utils = require('core/util/utils');
    defaults = {
      prefix: '',
      postfix: ''
    };
    return TextFieldModel = (function(superClass) {
      extend(TextFieldModel, superClass);

      function TextFieldModel(config) {
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        TextFieldModel.__super__.constructor.call(this, config);
      }

      return TextFieldModel;

    })(BaseModel);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/fields/text/model.js.map