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
        this.setPickerColor = bind(this.setPickerColor, this);
        this._render = bind(this._render, this);
        ColorToolView.__super__.constructor.call(this, model, Template);
      }

      ColorToolView.prototype._render = function(model) {
        var colorId;
        ColorToolView.__super__._render.apply(this, arguments);
        if (model.get('id') === "color-stroke") {
          colorId = "Stroke";
        } else {
          colorId = "Fill";
        }
        this.$el.find('input')[0].id = colorId;
        this.$el.find('.jscolor')[0].innerText = colorId;
        this.$el.find('.jscolor')[0].value = colorId;
        this.$el.find('button').attr('class', this.$el.find('button').attr('class').replace('valueInput', colorId));
        this.$el.find('.palette-well').css({
          "background-color": model.get('color')
        });
        return this.$el.find('input').on('change', (function(_this) {
          return function(evt) {
            model.set('color', "#" + evt.target.value);
            return _this.dispatchEvent('Tool.GenerateActionRequest', {});
          };
        })(this));
      };

      ColorToolView.prototype.setPickerColor = function(id, color) {
        this.$el.find('#' + id).next()[0].innerText = color;
        this.$el.find('#' + id).next()[0].value = color;
        this.$el.find('#' + id).next().attr('class', this.$el.find('#' + id).next().attr('class').replace('valueInput', color));
        return this.$el.find('#' + id).parent().css({
          "background-color": color
        });
      };

      return ColorToolView;

    })(ToolView);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/color/view.js.map
