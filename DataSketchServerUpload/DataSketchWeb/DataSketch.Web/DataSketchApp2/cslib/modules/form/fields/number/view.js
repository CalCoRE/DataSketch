(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var BaseFieldView, NumberFieldView, Template;
    BaseFieldView = require('modules/form/fields/base/view');
    Template = require('text!./numberfield.html');
    return NumberFieldView = (function(superClass) {
      extend(NumberFieldView, superClass);

      function NumberFieldView(model, tmpl) {
        this._onFieldChange = bind(this._onFieldChange, this);
        this.enable = bind(this.enable, this);
        this.disable = bind(this.disable, this);
        NumberFieldView.__super__.constructor.call(this, model, tmpl != null ? tmpl : Template);
        this.$el.find(".field-prefix").html(model.get('prefix'));
        this.$el.find(".field-postfix").html(model.get('postfix'));
        if (model.get('min') != null) {
          this.$el.find("input.numberfield").attr("min", model.get('min'));
        }
        if (model.get('max') != null) {
          this.$el.find("input.numberfield").attr("max", model.get('max'));
        }
        this.$el.find("input.numberfield").attr("id", model.get('id'));
        this.$el.find("input.numberfield").on('change', this._onFieldChange);
      }

      NumberFieldView.prototype.disable = function() {
        return this.$el.find('input.numberfield').prop('disabled', true);
      };

      NumberFieldView.prototype.enable = function() {
        return this.$el.find('input.numberfield').prop('disabled', false);
      };

      NumberFieldView.prototype._onFieldChange = function(jqevt) {
        return this.dispatchEvent('NumberField.RequestValueChange', {
          value: parseFloat(this.$el.find("input.numberfield").val())
        });
      };

      return NumberFieldView;

    })(BaseFieldView);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/fields/number/view.js.map
