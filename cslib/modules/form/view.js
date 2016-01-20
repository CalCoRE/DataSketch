(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DomView, FormView, Template;
    DomView = require('core/view/dom_view');
    Template = require('text!./form.html');
    return FormView = (function(superClass) {
      extend(FormView, superClass);

      function FormView(model) {
        this.render = bind(this.render, this);
        var cls, i, len, ref;
        FormView.__super__.constructor.call(this, Template);
        this.$el.attr('id', model.get('id'));
        ref = model.get('classes');
        for (i = 0, len = ref.length; i < len; i++) {
          cls = ref[i];
          this.$el.addClass(cls);
        }
        this.fieldViews = [];
        this.buttonViews = [];
        this.render(model);
      }

      FormView.prototype.render = function(model) {
        var button, field, i, j, len, len1, ref, ref1, results;
        while (this.fieldViews.length) {
          this.removeChild(this.fieldViews.pop());
        }
        while (this.buttonViews.length) {
          this.removeChild(this.buttonViews.pop());
        }
        ref = model.get('fields');
        for (i = 0, len = ref.length; i < len; i++) {
          field = ref[i];
          this.fieldViews.push(field.view());
          this.addChild(field.view(), '.fields');
        }
        ref1 = model.get('buttons');
        results = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          button = ref1[j];
          this.buttonViews.push(button.view());
          results.push(this.addChild(button.view(), '.buttons'));
        }
        return results;
      };

      return FormView;

    })(DomView);
  });

}).call(this);

//# sourceMappingURL=../../maps/modules/form/view.js.map