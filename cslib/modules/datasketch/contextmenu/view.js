(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var ContextMenuView, DomView, Template;
    DomView = require('core/view/dom_view');
    Template = require('text!./view.html');
    require('link!./style.css');
    return ContextMenuView = (function(superClass) {
      extend(ContextMenuView, superClass);

      function ContextMenuView(model) {
        this._render = bind(this._render, this);
        this._onModelChange = bind(this._onModelChange, this);
        ContextMenuView.__super__.constructor.call(this, Template);
        this._render(model);
        model.addEventListener("Model.Change", this._onModelChange);
      }

      ContextMenuView.prototype._onModelChange = function(evt) {
        return this._render(evt.currentTarget);
      };

      ContextMenuView.prototype._render = function(model) {
        this.$el.toggleClass('context-menu-open', (model.get('display') != null) && model.get('display'));
        if (model.get('menu') != null) {
          while (this._children.length) {
            this.removeChild(this._children.pop());
          }
          return this.addChild(model.get('menu').view());
        }
      };

      return ContextMenuView;

    })(DomView);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/contextmenu/view.js.map