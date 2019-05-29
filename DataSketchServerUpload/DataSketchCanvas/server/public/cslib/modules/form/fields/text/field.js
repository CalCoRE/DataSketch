(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var BaseField, Model, TextField, View;
    BaseField = require('modules/form/fields/base/field');
    Model = require('./model');
    View = require('./view');
    TextField = (function(superClass) {
      extend(TextField, superClass);

      function TextField(settings) {
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
        TextField.__super__.constructor.call(this, settings);
        this._view.addEventListener('TextField.RequestValueChange', this._onValueChangeRequest);
      }

      TextField.prototype._onValueChangeRequest = function(evt) {
        if (!this._model.get('disabled')) {
          return this._model.set('value', evt.data.value);
        }
      };

      return TextField;

    })(BaseField);
    TextField.create = function(data) {
      return new TextField({
        modelData: data
      });
    };
    return TextField;
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/fields/text/field.js.map
