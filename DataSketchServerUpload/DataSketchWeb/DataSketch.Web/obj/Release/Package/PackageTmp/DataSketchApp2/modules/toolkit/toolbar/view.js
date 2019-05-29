(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DomView, Template, ToolbarView;
    DomView = require('core/view/dom_view');
    Template = require('text!./view.html');
    require('link!./style.css');
    return ToolbarView = (function(superClass) {
      extend(ToolbarView, superClass);

      function ToolbarView(model) {
        this._render = bind(this._render, this);
        this._onChange = bind(this._onChange, this);
        ToolbarView.__super__.constructor.call(this, Template);
        this._render(model);
        model.addEventListener('Model.Change', this._onChange);
      }

      ToolbarView.prototype._onChange = function(evt) {
        return this._render(evt.currentTarget);
      };

      ToolbarView.prototype._render = function(model) {
        var id, ref, results, tool;
        this.$el.attr('id', model.get('id'));
        while (this._children.length) {
          this.removeChild(this._children.pop());
        }
        ref = model.get('tools');
        results = [];
        for (id in ref) {
          tool = ref[id];
          results.push(this.addChild(tool.view()));
        }
        return results;
      };

      return ToolbarView;

    })(DomView);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/toolkit/toolbar/view.js.map
