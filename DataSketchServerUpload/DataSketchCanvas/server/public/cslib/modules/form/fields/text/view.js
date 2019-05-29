(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var BaseFieldView, Template, TextFieldView;
    BaseFieldView = require('modules/form/fields/base/view');
    Template = require('text!./textfield.html');
    return TextFieldView = (function(superClass) {
      extend(TextFieldView, superClass);

      function TextFieldView(model, tmpl) {
        this._onFieldChange = bind(this._onFieldChange, this);
        this.enable = bind(this.enable, this);
        this.disable = bind(this.disable, this);
        TextFieldView.__super__.constructor.call(this, model, tmpl != null ? tmpl : Template);
        this.$el.find(".field-prefix").html(model.get('prefix'));
        this.$el.find(".field-postfix").html(model.get('postfix'));
        this.$el.find("input.textfield").on('change', this._onFieldChange);
      }

      TextFieldView.prototype.disable = function() {
        return this.$el.find('input.textfield').prop('disabled', true);
      };

      TextFieldView.prototype.enable = function() {
        return this.$el.find('input.textfield').prop('disabled', false);
      };

      TextFieldView.prototype._onFieldChange = function(jqevt) {
        return this.dispatchEvent('TextField.RequestValueChange', {
          value: this.$el.find("input.textfield").val()
        });
      };

      return TextFieldView;

    })(BaseFieldView);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/fields/text/view.js.map
