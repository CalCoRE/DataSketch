(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var ColorToolView, Template, ToolView;
    ToolView = require('modules/toolkit/tool/view');
    Template = require('text!./view.html');
    require('link!./style.css');
    return ColorToolView = (function(superClass) {
      extend(ColorToolView, superClass);

      function ColorToolView(model) {
        this._render = bind(this._render, this);
        ColorToolView.__super__.constructor.call(this, model, Template);
      }

      ColorToolView.prototype._render = function(model) {
        ColorToolView.__super__._render.call(this, model);
        return this.$el.find('.palette-well').css({
          "background-color": model.get('color')
        });
      };

      return ColorToolView;

    })(ToolView);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/color/view.js.map