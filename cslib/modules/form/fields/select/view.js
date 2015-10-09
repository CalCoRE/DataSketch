(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var BaseFieldView, SelectFieldView, Template;
    BaseFieldView = require('modules/form/fields/base/view');
    Template = require('text!./selectfield.html');
    return SelectFieldView = (function(superClass) {
      extend(SelectFieldView, superClass);

      function SelectFieldView(model, tmpl) {
        this._onFieldChange = bind(this._onFieldChange, this);
        this.setFieldValue = bind(this.setFieldValue, this);
        this.render = bind(this.render, this);
        this.enable = bind(this.enable, this);
        this.disable = bind(this.disable, this);
        SelectFieldView.__super__.constructor.call(this, model, tmpl != null ? tmpl : Template);
        this.$el.find(".selectfield").on('change', this._onFieldChange);
      }

      SelectFieldView.prototype.disable = function() {
        return this.$el.find('.selectfield').prop('disabled', true);
      };

      SelectFieldView.prototype.enable = function() {
        return this.$el.find('.selectfield').prop('disabled', false);
      };

      SelectFieldView.prototype.render = function(model) {
        var i, len, opt, ref;
        this.$el.find('option').remove();
        ref = model.get('options');
        for (i = 0, len = ref.length; i < len; i++) {
          opt = ref[i];
          this.$el.find('.selectfield').append("<option value='" + opt.value + "'>" + opt.label + "</option>");
        }
        return SelectFieldView.__super__.render.call(this, model);
      };

      SelectFieldView.prototype.setFieldValue = function(model) {
        this.$el.find('.selectfield option').removeProp("selected");
        return this.$el.find(".selectfield option[val='" + (model.get('value')) + "']").prop("selected", true);
      };

      SelectFieldView.prototype._onFieldChange = function(jqevt) {
        return this.dispatchEvent('SelectField.RequestValueChange', {
          value: this.$el.find(".selectfield").val()
        });
      };

      return SelectFieldView;

    })(BaseFieldView);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/fields/select/view.js.map