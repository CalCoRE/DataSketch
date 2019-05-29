(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Animator, BaseField, Globals, Model, NumberField, View;
    BaseField = require('modules/form/fields/base/field');
    Model = require('./model');
    View = require('./view');
    Globals = require('core/model/globals');
    Animator = require('../../../datasketch/animation/animator');
    NumberField = (function(superClass) {
      extend(NumberField, superClass);

      function NumberField(settings) {
        if (settings == null) {
          settings = {};
        }
        this._onValueChangeRequest = bind(this._onValueChangeRequest, this);
        if (settings.viewClass == null) {
          settings.viewClass = View;
        }
        if (settings.modelClass == null) {
          settings.modelClass = Model;
        }
        NumberField.__super__.constructor.call(this, settings);
        this._view.addEventListener('NumberField.RequestValueChange', this._onValueChangeRequest);
      }

      NumberField.prototype._onValueChangeRequest = function(evt) {
        var val;
        if (!this._model.get('disabled')) {
          val = evt.data.value;
          if ((this._model.get('min') != null) && val < this._model.get('min')) {
            val = Math.max(this._model.get('min'), val);
          }
          if ((this._model.get('max') != null) && val > this._model.get('max')) {
            val = Math.min(this._model.get('max'), val);
          }
          return this._model.set('value', val);
        }
      };

      return NumberField;

    })(BaseField);
    NumberField.create = function(data) {
      return new NumberField({
        modelData: data
      });
    };
    return NumberField;
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/fields/number/field.js.map
