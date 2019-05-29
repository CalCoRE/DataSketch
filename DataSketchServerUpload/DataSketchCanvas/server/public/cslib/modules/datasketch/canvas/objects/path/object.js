(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var CanvasObject, Globals, Model, PathObject, View;
    CanvasObject = require('modules/datasketch/canvas/objects/base/object');
    Model = require('./model');
    View = require('./view');
    Globals = require('core/model/globals');
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
        var id;
        this._model.parseFabric(fabric);
        this._view.setFabric(fabric, this._model);
        if (window.currentId > this._model.get('id')) {
          id = window.currentId + 1;
        } else {
          id = this._model.get('id');
        }
        if (window.currentId < id) {
          window.currentId = id;
          this._model.set('id', id);
        }
        if (!fabric.newId && window.currentId < fabric.newId) {
          window.currentId = fabric.newId;
          this._model.set('id', fabric.newId);
        }
        if (fabric.id !== "grid" && !fabric.newId) {
          fabric.set('id', id);
        } else {
          fabric.set('id', fabric.newId);
        }
        if (fabric.id === "grid") {
          return this._model.set('id', 'grid');
        }
      };

      PathObject.prototype.clone = function(_ObjectType) {
        var clone, fabClone;
        this._ObjectType = _ObjectType;
        if (this._view._fabric.type === "path") {
          return this._view.cloneFabric(this._ObjectType).then((function(_this) {
            return function(fabClone) {
              var clone;
              clone = PathObject.createFromFabric(fabClone);
              clone.setTransform(_this.getTransform());
              return clone;
            };
          })(this));
        } else {
          fabClone = this._view.cloneFabric(this._ObjectType);
          clone = PathObject.createFromFabric(fabClone);
          clone.setTransform(this.getTransform());
          return clone;
        }
      };

      PathObject.prototype.setStrokeColor = function(color) {
        var jsonObj, pathObj;
        if (Array.isArray(color)) {
          if (color[0].id === "color-fill") {
            return this._model.set('fill.color', color[1]);
          } else {
            return this._model.set('stroke.color', color[1]);
          }
        } else {
          jsonObj = Globals.get('Canvas').getObjects();
          pathObj = jsonObj.filter((function(_this) {
            return function(data) {
              return data._view._fabric.id === _this._model._data.id;
            };
          })(this));
          if (pathObj[0]._view._fabric.type !== "path") {
            this._model.set('stroke.color', color);
            return this._model.set('fill.color', color);
          } else {
            return this._model.set('stroke.color', color);
          }
        }
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
