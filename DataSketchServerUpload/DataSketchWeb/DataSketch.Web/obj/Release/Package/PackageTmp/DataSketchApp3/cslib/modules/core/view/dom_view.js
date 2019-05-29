(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var $, DomView, View;
    View = require('./view');
    $ = require('jquery');
    return DomView = (function(superClass) {
      extend(DomView, superClass);

      function DomView(tmpl) {
        this.bounds = bind(this.bounds, this);
        this.hide = bind(this.hide, this);
        this.show = bind(this.show, this);
        this.dom = bind(this.dom, this);
        this.$dom = bind(this.$dom, this);
        this.removeChild = bind(this.removeChild, this);
        this.addChild = bind(this.addChild, this);
        DomView.__super__.constructor.call(this);
        this.$el = typeof tmpl === "string" ? $($.parseHTML(tmpl)) : $(tmpl);
      }

      DomView.prototype.addChild = function(child, destination) {
        var target;
        DomView.__super__.addChild.call(this, child);
        target = destination != null ? this.$el.find(destination).first() : this.$el;
        return target.append(child.$dom());
      };

      DomView.prototype.removeChild = function(child) {
        DomView.__super__.removeChild.call(this, child);
        if ($.contains(this.dom(), child.dom())) {
          return child.$dom().detach();
        }
      };

      DomView.prototype.$dom = function() {
        return this.$el;
      };

      DomView.prototype.dom = function() {
        return this.$el[0];
      };

      DomView.prototype.show = function() {
        return this.$el.show();
      };

      DomView.prototype.hide = function() {
        return this.$el.hide();
      };

      DomView.prototype.bounds = function() {
        var bounds;
        bounds = this.$el.offset();
        bounds.width = this.$el.outerWidth();
        bounds.height = this.$el.outerHeight();
        return bounds;
      };

      return DomView;

    })(View);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/view/dom_view.js.map
