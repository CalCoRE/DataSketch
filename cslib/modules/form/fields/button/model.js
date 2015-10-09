(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var BaseModel, ButtonModel, Utils, defaults;
    BaseModel = require('modules/form/fields/base/model');
    Utils = require('core/util/utils');
    defaults = {
      event: "Button.Click"
    };
    return ButtonModel = (function(superClass) {
      extend(ButtonModel, superClass);

      function ButtonModel(config) {
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        ButtonModel.__super__.constructor.call(this, config);
      }

      return ButtonModel;

    })(BaseModel);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/fields/button/model.js.map