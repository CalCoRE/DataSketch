(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var CanvasObject, CustomObject, Model, View;
    CanvasObject = require('modules/datasketch/canvas/objects/base/object');
    Model = require('./model');
    View = require('./view');
    CustomObject = (function(superClass) {
      extend(CustomObject, superClass);

      function CustomObject(settings) {
        if (settings == null) {
          settings = {};
        }
        this.setStrokeWidth = bind(this.setStrokeWidth, this);
        this.setStrokeColor = bind(this.setStrokeColor, this);
        this.clone = bind(this.clone, this);
        this.buildFromFabric = bind(this.buildFromFabric, this);
        if (settings.modelClass == null) {
          settings.modelClass = Model;
        }
        if (settings.viewClass == null) {
          settings.viewClass = View;
        }
        CustomObject.__super__.constructor.call(this, settings);
      }

      CustomObject.prototype.buildFromFabric = function(fabric) {
        return this._model.parseFabric(fabric);
      };

      CustomObject.prototype.clone = function() {
        return this._view.cloneFabric().then((function(_this) {
          return function(fabClone) {
            var clone;
            clone = PathObject.createFromFabric(fabClone);
            clone.setTransform(_this.getTransform());
            return clone;
          };
        })(this));
      };

      CustomObject.prototype.setStrokeColor = function(color) {
        this._model.set('stroke.color', color);
        return this._model.set('fill.color', color);
      };

      CustomObject.prototype.setStrokeWidth = function(width) {
        return this._model.set('stroke.width', width);
      };

      return CustomObject;

    })(CanvasObject);
    CustomObject.createUsingFabric = function(shape) {
      var customShape;
      customShape = new CustomObject;
      customShape.buildFromFabric(shape);
      return customShape;
    };
    return CustomObject;
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/canvas/objects/custom/object.js.map
