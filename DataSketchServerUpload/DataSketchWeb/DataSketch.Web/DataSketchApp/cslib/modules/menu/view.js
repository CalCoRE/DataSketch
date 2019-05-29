(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DomView, MenuView, Template;
    DomView = require('core/view/dom_view');
    Template = require('text!./view.html');
    return MenuView = (function(superClass) {
      extend(MenuView, superClass);

      function MenuView(model) {
        this._requestAction = bind(this._requestAction, this);
        this._render = bind(this._render, this);
        this._onModelChange = bind(this._onModelChange, this);
        MenuView.__super__.constructor.call(this, Template);
        this._render(model);
        model.addEventListener('Model.Change', this._onModelChange);
        this.$el.find(".menu-label").on('click', this._requestAction);
        this.$el.attr('id', model.get('id'));
        if (model.get('action') != null) {
          this.$el.addClass('actionable');
        }
        if (model.get('items').length) {
          this.$el.addClass('parent');
        }
      }

      MenuView.prototype._onModelChange = function(evt) {
        return this._render(evt.currentTarget);
      };

      MenuView.prototype._render = function(model) {
        var i, item, len, ref;
        while (this._children.length) {
          this.removeChild(this._children.pop());
        }
        this.$el.find(".menu-label").html(model.get('label'));
        ref = model.get('items');
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          this.addChild(item.view(), ".menu-items");
        }
        return this.$el.toggleClass("disabled", model.get('disabled'));
      };

      MenuView.prototype._requestAction = function(jqevt) {
        this.dispatchEvent("Menu.ActionRequest", {});
        return jqevt.stopPropagation();
      };

      return MenuView;

    })(DomView);
  });

}).call(this);

//# sourceMappingURL=../../maps/modules/menu/view.js.map
