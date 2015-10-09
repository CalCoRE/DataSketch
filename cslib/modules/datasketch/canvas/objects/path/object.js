(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var CanvasObject, Model, PathObject, View;
    CanvasObject = require('modules/datasketch/canvas/objects/base/object');
    Model = require('./model');
    View = require('./view');
    PathObject = (function(superClass) {
      extend(PathObject, superClass);

      function PathObject(settings) {
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
        PathObject.__super__.constructor.call(this, settings);
      }

      PathObject.prototype.buildFromFabric = function(fabric) {
        this._model.parseFabric(fabric);
        this._view.setFabric(fabric, this._model);
        return fabric.set('id', this._model.get('id'));
      };

      PathObject.prototype.clone = function() {
        return this._view.cloneFabric().then((function(_this) {
          return function(fabClone) {
            var clone;
            clone = PathObject.createFromFabric(fabClone);
            clone.setTransform(_this.getTransform());
            return clone;
          };
        })(this));
      };

      PathObject.prototype.setStrokeColor = function(color) {
        return this._model.set('stroke.color', color);
      };

      PathObject.prototype.setStrokeWidth = function(width) {
        return this._model.set('stroke.width', width);
      };

      return PathObject;

    })(CanvasObject);
    PathObject.createFromFabric = function(fabric) {
      var path;
      fabric.setCoords();
      path = new PathObject;
      path.buildFromFabric(fabric);
      return path;
    };
    return PathObject;
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/canvas/objects/path/object.js.map