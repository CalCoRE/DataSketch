(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DomView, Template, ToolView;
    DomView = require('core/view/dom_view');
    Template = require('text!./view.html');
    require('link!./style.css');
    return ToolView = (function(superClass) {
      extend(ToolView, superClass);

      function ToolView(model, tmpl) {
        this._render = bind(this._render, this);
        this._onClick = bind(this._onClick, this);
        this._onChange = bind(this._onChange, this);
        ToolView.__super__.constructor.call(this, tmpl != null ? tmpl : Template);
        this._render(model);
        model.addEventListener('Model.Change', this._onChange);
        this.$el.on('click', this._onClick);
      }

      ToolView.prototype._onChange = function(evt) {
        return this._render(evt.currentTarget);
      };

      ToolView.prototype._onClick = function(jqevt) {
        return this.dispatchEvent('Tool.GenerateActionRequest', {});
      };

      ToolView.prototype._render = function(model) {
        this.$el.addClass(model.get('id'));
        return this.$el.attr('title', model.get('id'));
      };

      return ToolView;

    })(DomView);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/toolkit/tool/view.js.map