(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, StrokeAction, StrokeTool, Tool;
    Tool = require('modules/toolkit/tool/tool');
    StrokeAction = require('modules/datasketch/actions/set_stroke_width');
    Globals = require('core/model/globals');
    require('link!./style.css');
    return StrokeTool = (function(superClass) {
      extend(StrokeTool, superClass);

      function StrokeTool(_strokeWidth) {
        this._strokeWidth = _strokeWidth;
        this._onCanvasChange = bind(this._onCanvasChange, this);
        this.generateAction = bind(this.generateAction, this);
        StrokeTool.__super__.constructor.call(this, {
          modelData: {
            id: "stroke-" + this._strokeWidth
          }
        });
        Globals.get('Canvas').addEventListener("Canvas.StrokeWidthChange", this._onCanvasChange);
        this.toggleActiveDisplay(Globals.get('Canvas').getStrokeWidth() === this._strokeWidth);
      }

      StrokeTool.prototype.generateAction = function() {
        return new StrokeAction(Globals.get('Canvas'), this._strokeWidth);
      };

      StrokeTool.prototype._onCanvasChange = function(evt) {
        return this.toggleActiveDisplay(this._strokeWidth === evt.data.width);
      };

      return StrokeTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/stroke/tool.js.map