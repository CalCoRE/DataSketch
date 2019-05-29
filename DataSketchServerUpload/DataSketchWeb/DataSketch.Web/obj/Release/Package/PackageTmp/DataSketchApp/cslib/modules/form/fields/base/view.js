(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DomView, FieldView, Template;
    DomView = require('core/view/dom_view');
    Template = require('text!./field.html');
    return FieldView = (function(superClass) {
      extend(FieldView, superClass);

      function FieldView(model, tmpl) {
        this.enable = bind(this.enable, this);
        this.disable = bind(this.disable, this);
        this.setFieldValue = bind(this.setFieldValue, this);
        this.render = bind(this.render, this);
        this.onModelChange = bind(this.onModelChange, this);
        FieldView.__super__.constructor.call(this, tmpl != null ? tmpl : Template);
        model.addEventListener('Model.Change', this.onModelChange);
        this.render(model);
      }

      FieldView.prototype.onModelChange = function(evt) {
        switch (evt.data.path) {
          case "value":
            return this.render(evt.currentTarget);
          case "disabled":
            if (evt.data.value) {
              return this.disable();
            } else {
              return this.enable();
            }
        }
      };

      FieldView.prototype.render = function(model) {
        this.$el.find('.label').text(model.get('label'));
        return this.setFieldValue(model);
      };

      FieldView.prototype.setFieldValue = function(model) {
        return this.$el.find('input').val(model.get('value'));
      };

      FieldView.prototype.disable = function() {};

      FieldView.prototype.enable = function() {};

      return FieldView;

    })(DomView);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/fields/base/view.js.map
