(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var ButtonFieldView, FieldView, Template;
    FieldView = require('modules/form/fields/base/view');
    Template = require('text!./button.html');
    require('link!./style.css');
    return ButtonFieldView = (function(superClass) {
      extend(ButtonFieldView, superClass);

      function ButtonFieldView(model, tmpl) {
        this._onClick = bind(this._onClick, this);
        this.enable = bind(this.enable, this);
        this.disable = bind(this.disable, this);
        this.render = bind(this.render, this);
        ButtonFieldView.__super__.constructor.call(this, model, tmpl != null ? tmpl : Template);
        this.$el.find('button').click(this._onClick);
      }

      ButtonFieldView.prototype.render = function(model) {
        return this.$el.find(".btn").text(model.get('label')).val(model.get('value')).addClass(model.get('class'));
      };

      ButtonFieldView.prototype.disable = function() {
        return this.$el.find('.btn').prop('disabled', true);
      };

      ButtonFieldView.prototype.enable = function() {
        return this.$el.find('.btn').prop('disabled', false);
      };

      ButtonFieldView.prototype._onClick = function(jqevt) {
        this.dispatchEvent('Button.Clicked', {});
        return false;
      };

      return ButtonFieldView;

    })(FieldView);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/form/fields/button/view.js.map
