(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var ColorAction, ColorTool, Globals, Tool, View;
    Tool = require('modules/toolkit/tool/tool');
    ColorAction = require('modules/datasketch/actions/set_color');
    Globals = require('core/model/globals');
    View = require('./view');
    require('link!./style.css');
    return ColorTool = (function(superClass) {
      extend(ColorTool, superClass);

      function ColorTool(_id, color) {
        var cc;
        this._id = _id;
        this._onCanvasChange = bind(this._onCanvasChange, this);
        this.generateAction = bind(this.generateAction, this);
        ColorTool.__super__.constructor.call(this, {
          viewClass: View,
          modelData: {
            id: "color-" + this._id,
            color: "" + color,
            tooltip: "color-" + this._id
          }
        });
        if (this._id === "stroke") {
          Globals.get('Canvas').addEventListener("Canvas.StrokeColorChange", this._onCanvasChange);
        } else {
          Globals.get('Canvas').addEventListener("Canvas.FillColorChange", this._onCanvasChange);
        }
        if (cc = Globals.get('Canvas').getStrokeColor()) {
          this.toggleActiveDisplay(cc === this._model.get('color'));
        } else {
          this.toggleActiveDisplay(this._model.get('color') === "#000000");
        }
      }

      ColorTool.prototype.generateAction = function() {
        return new ColorAction(Globals.get('Canvas'), this._model.get('color', this._id));
      };

      ColorTool.prototype._onCanvasChange = function(evt) {
        if (evt.currentTarget._view._fabric._activeObject) {
          if (this._id === "stroke") {
            this._color = evt.currentTarget._view._fabric._activeObject.stroke;
            this._model.set('color', this._color);
          } else {
            this._color = evt.currentTarget._view._fabric._activeObject.fill;
            this._model.set('color', this._color);
          }
          return this.toggleActiveDisplay(this._model.get('color') === this._color);
        }
      };

      return ColorTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/color/tool.js.map
