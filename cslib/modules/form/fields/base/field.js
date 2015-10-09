(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Controller, Field, Model, View;
    Controller = require('core/controller/controller');
    Model = require('./model');
    View = require('./view');
    return Field = (function(superClass) {
      extend(Field, superClass);

      function Field(settings) {
        if (settings == null) {
          settings = {};
        }
        this.isActive = bind(this.isActive, this);
        this.disable = bind(this.disable, this);
        this.enable = bind(this.enable, this);
        this.isValidValue = bind(this.isValidValue, this);
        this.validate = bind(this.validate, this);
        this.setValue = bind(this.setValue, this);
        this.id = bind(this.id, this);
        this.value = bind(this.value, this);
        if (settings.modelClass == null) {
          settings.modelClass = Model;
        }
        if (settings.viewClass == null) {
          settings.viewClass = View;
        }
        Field.__super__.constructor.call(this, settings);
      }

      Field.prototype.value = function() {
        return this._model.get('value');
      };

      Field.prototype.id = function() {
        return this._model.get('id');
      };

      Field.prototype.setValue = function(val) {
        if (this.isValidValue(val)) {
          return this._model.set('value', val);
        }
      };

      Field.prototype.validate = function() {
        return this.isValidValue(this.value());
      };

      Field.prototype.isValidValue = function(val) {
        return true;
      };

      Field.prototype.enable = function() {
        return this._model.set('disabled', false);
      };

      Field.prototype.disable = function() {
        return this._model.set('disabled', true);
      };

      Field.prototype.isActive = function() {
        return !this._model.get('disabled');
      };

      return Field;

    })(Controller);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/fields/base/field.js.map