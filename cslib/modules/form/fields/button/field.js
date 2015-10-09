(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var BaseField, ButtonField, Model, View;
    BaseField = require('modules/form/fields/base/field');
    View = require('./view');
    Model = require('./model');
    ButtonField = (function(superClass) {
      extend(ButtonField, superClass);

      function ButtonField(settings) {
        this._onClick = bind(this._onClick, this);
        if (settings.viewClass == null) {
          settings.viewClass = View;
        }
        if (settings.modelClass == null) {
          settings.modelClass = Model;
        }
        ButtonField.__super__.constructor.call(this, settings);
        this._view.addEventListener('Button.Clicked', this._onClick);
      }

      ButtonField.prototype._onClick = function(evt) {
        if (this.isActive()) {
          return this.view().dispatchEvent(this._model.get('event'), {}, true);
        }
      };

      return ButtonField;

    })(BaseField);
    ButtonField.create = function(data) {
      return new ButtonField({
        modelData: data
      });
    };
    return ButtonField;
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/fields/button/field.js.map