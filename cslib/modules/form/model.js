(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var FormModel, Model, Utils, defaults;
    Model = require('core/model/model');
    Utils = require('core/util/utils');
    defaults = {
      id: '',
      fields: [],
      buttons: [],
      classes: []
    };
    return FormModel = (function(superClass) {
      extend(FormModel, superClass);

      function FormModel(config) {
        this.getValue = bind(this.getValue, this);
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        FormModel.__super__.constructor.call(this, config);
      }

      FormModel.prototype.getValue = function() {
        var field, i, len, ref, val;
        val = {};
        ref = this.get('fields');
        for (i = 0, len = ref.length; i < len; i++) {
          field = ref[i];
          val[field.id()] = field.value();
        }
        return val;
      };

      return FormModel;

    })(Model);
  });

}).call(this);

//# sourceMappingURL=../../maps/modules/form/model.js.map