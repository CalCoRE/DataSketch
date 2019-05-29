(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var MenuModel, Model, Utils, defaults;
    Model = require('core/model/model');
    Utils = require('core/util/utils');
    defaults = {
      id: "",
      items: [],
      label: "",
      action: null,
      disabled: false
    };
    return MenuModel = (function(superClass) {
      extend(MenuModel, superClass);

      function MenuModel(config) {
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        MenuModel.__super__.constructor.call(this, config);
      }

      return MenuModel;

    })(Model);
  });

}).call(this);

//# sourceMappingURL=../../maps/modules/menu/model.js.map
