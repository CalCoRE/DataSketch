(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, ShapeAction, ShapeTool, Tool;
    Tool = require('modules/toolkit/tool/tool');
    ShapeAction = require('modules/datasketch/actions/add_shapes');
    Globals = require('core/model/globals');
    require('link!./style.css');
    return ShapeTool = (function(superClass) {
      extend(ShapeTool, superClass);

      function ShapeTool(_shapeId) {
        this._shapeId = _shapeId;
        this.generateAction = bind(this.generateAction, this);
        ShapeTool.__super__.constructor.call(this, {
          modelData: {
            id: "shape-" + this._shapeId,
            tooltip: (function() {
              switch (this._shapeId) {
                case this._shapeId = 1:
                  return "Circle";
                case this._shapeId = 2:
                  return "Rectangle";
                case this._shapeId = 3:
                  return "Triangle";
                case this._shapeId = 4:
                  return "Horizontal Line";
                case this._shapeId = 5:
                  return "Vertical Line";
                case this._shapeId = 6:
                  return "Add Text";
              }
            }).call(this)
          }
        });
      }

      ShapeTool.prototype.generateAction = function() {
        return new ShapeAction(Globals.get('Canvas'), this._shapeId);
      };

      return ShapeTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/shapes/tool.js.map
