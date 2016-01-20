(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var BaseField, Model, SelectField, View;
    BaseField = require('modules/form/fields/base/field');
    Model = require('./model');
    View = require('./view');
    SelectField = (function(superClass) {
      extend(SelectField, superClass);

      function SelectField(settings) {
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
        SelectField.__super__.constructor.call(this, settings);
        if ((this._model.get('value') == null) && (this._model.get('options') != null) && this._model.get('options').length) {
          this._model.set('value', this._model.get('options')[0].value);
        }
        this._view.addEventListener('SelectField.RequestValueChange', this._onValueChangeRequest);
      }

      SelectField.prototype._onValueChangeRequest = function(evt) {
        if (!this._model.get('disabled')) {
          return this._model.set('value', evt.data.value);
        }
      };

      return SelectField;

    })(BaseField);
    SelectField.create = function(data) {
      return new SelectField({
        modelData: data
      });
    };
    return SelectField;
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/fields/select/field.js.map