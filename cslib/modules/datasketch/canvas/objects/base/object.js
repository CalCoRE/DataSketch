(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var CanvasObject, Controller, Matrix, Model, View;
    Controller = require('core/controller/controller');
    Model = require('./model');
    View = require('./view');
    Matrix = require('core/util/matrix');
    CanvasObject = (function(superClass) {
      extend(CanvasObject, superClass);

      function CanvasObject(settings) {
        if (settings == null) {
          settings = {};
        }
        this.restoreState = bind(this.restoreState, this);
        this.cacheState = bind(this.cacheState, this);
        this.animate = bind(this.animate, this);
        this._onMoving = bind(this._onMoving, this);
        this._onScaling = bind(this._onScaling, this);
        this._onRotating = bind(this._onRotating, this);
        this.getPropertyMappings = bind(this.getPropertyMappings, this);
        this.removePropertyMapping = bind(this.removePropertyMapping, this);
        this.addPropertyMapping = bind(this.addPropertyMapping, this);
        this.clone = bind(this.clone, this);
        this.getBounds = bind(this.getBounds, this);
        this.setTransform = bind(this.setTransform, this);
        this.getTransform = bind(this.getTransform, this);
        this.setOpacity = bind(this.setOpacity, this);
        this.getOpacity = bind(this.getOpacity, this);
        this.setScale = bind(this.setScale, this);
        this.getScale = bind(this.getScale, this);
        this.setRotation = bind(this.setRotation, this);
        this.getRotation = bind(this.getRotation, this);
        this.extractTransform = bind(this.extractTransform, this);
        this.enforceTransform = bind(this.enforceTransform, this);
        this.setPosition = bind(this.setPosition, this);
        this.getPosition = bind(this.getPosition, this);
        this.disableControls = bind(this.disableControls, this);
        this.enableControls = bind(this.enableControls, this);
        this.disable = bind(this.disable, this);
        this.enable = bind(this.enable, this);
        this.getFabric = bind(this.getFabric, this);
        this.getId = bind(this.getId, this);
        CanvasObject._count += 1;
        if (settings.modelData == null) {
          settings.modelData = {};
        }
        settings.modelData.id = CanvasObject._count;
        if (settings.modelClass == null) {
          settings.modelClass = Model;
        }
        if (settings.viewClass == null) {
          settings.viewClass = View;
        }
        CanvasObject.__super__.constructor.call(this, settings);
        this._view.addEventListener("CanvasObject.Rotating", this._onRotating);
        this._view.addEventListener("CanvasObject.Scaling", this._onScaling);
        this._view.addEventListener("CanvasObject.Moving", this._onMoving);
      }

      CanvasObject.prototype.getId = function() {
        return this._model.get('id');
      };

      CanvasObject.prototype.getFabric = function() {
        return this.view().getFabric();
      };

      CanvasObject.prototype.enable = function() {
        return this._model.enable();
      };

      CanvasObject.prototype.disable = function() {
        return this._model.disable();
      };

      CanvasObject.prototype.enableControls = function() {
        return this._model.set('controllable', true, true);
      };

      CanvasObject.prototype.disableControls = function() {
        return this._model.set('controllable', false, true);
      };

      CanvasObject.prototype.getPosition = function() {
        return this._model.get('position');
      };

      CanvasObject.prototype.setPosition = function(position) {
        return this._model.set('position', {
          x: position.x,
          y: position.y
        });
      };

      CanvasObject.prototype.enforceTransform = function() {
        return this._view.enforceTransform(this._model);
      };

      CanvasObject.prototype.extractTransform = function() {
        var transform;
        transform = this._view.extractTransform();
        this._model.set("position", transform.position);
        this._model.set("rotation", transform.rotation);
        return this._model.set("scale", transform.scale);
      };

      CanvasObject.prototype.getRotation = function() {
        return this._model.get('rotation');
      };

      CanvasObject.prototype.setRotation = function(rotation) {
        return this._model.set('rotation', rotation);
      };

      CanvasObject.prototype.getScale = function() {
        return this._model.get('scale');
      };

      CanvasObject.prototype.setScale = function(scale) {
        return this._model.set('scale', {
          x: scale.x,
          y: scale.y
        });
      };

      CanvasObject.prototype.getOpacity = function() {
        return this._model.get('opacity');
      };

      CanvasObject.prototype.setOpacity = function(val) {
        return this._model.set('opacity', val);
      };

      CanvasObject.prototype.getTransform = function() {
        var posMtx, rotMtx, sclMtx, transform;
        transform = {
          position: this.getPosition(),
          rotation: this.getRotation() / 180 * Math.PI,
          scale: this.getScale()
        };
        posMtx = [[1, 0, transform.position.x], [0, 1, transform.position.y], [0, 0, 1]];
        rotMtx = [[Math.cos(transform.rotation), -Math.sin(transform.rotation), 0], [Math.sin(transform.rotation), Math.cos(transform.rotation), 0], [0, 0, 1]];
        sclMtx = [[transform.scale.x, 0, 0], [0, transform.scale.y, 0], [0, 0, 1]];
        return Matrix.multiplyTransformMatrices(posMtx, sclMtx, rotMtx);
      };

      CanvasObject.prototype.setTransform = function(mtx) {
        var radians, transform;
        radians = Math.atan2(-mtx[0][1], mtx[0][0]);
        transform = {
          position: {
            x: mtx[0][2],
            y: mtx[1][2]
          },
          rotation: radians / Math.PI * 180,
          scale: {
            x: (mtx[0][0] / Math.abs(mtx[0][0])) * Math.sqrt(Math.pow(mtx[0][0], 2) + Math.pow(mtx[0][1], 2)),
            y: (mtx[1][1] / Math.abs(mtx[1][1])) * Math.sqrt(Math.pow(mtx[1][0], 2) + Math.pow(mtx[1][1], 2))
          }
        };
        transform.scale.x *= Math.cos(radians) / Math.abs(Math.cos(radians));
        transform.scale.y *= Math.cos(radians) / Math.abs(Math.cos(radians));
        this.setPosition(transform.position);
        this.setRotation(transform.rotation);
        return this.setScale(transform.scale);
      };

      CanvasObject.prototype.getBounds = function() {
        var bounds, rect;
        rect = this.getFabric().getBoundingRect();
        return bounds = {
          left: rect.left,
          right: rect.left + rect.width,
          top: rect.top,
          bottom: rect.top + rect.height
        };
      };

      CanvasObject.prototype.clone = function() {};

      CanvasObject.prototype.addPropertyMapping = function(objectProperty, dataProperty, calibration) {
        return this._model.addPropertyMapping(objectProperty, dataProperty, calibration);
      };

      CanvasObject.prototype.removePropertyMapping = function(objectProperty) {
        return this._model.removePropertyMapping(objectProperty);
      };

      CanvasObject.prototype.getPropertyMappings = function() {
        return this._model.get('propertyMappings');
      };

      CanvasObject.prototype._onRotating = function(evt) {
        return this.setRotation(evt.data.rotation);
      };

      CanvasObject.prototype._onScaling = function(evt) {
        this.setScale(evt.data.scale);
        return this.setPosition(evt.data.position);
      };

      CanvasObject.prototype._onMoving = function(evt) {
        return this.setPosition(evt.data.position);
      };

      CanvasObject.prototype.animate = function(playhead, timeDelta, datastore) {
        var i, len, map, ref, results;
        ref = this._model.get('propertyMappings');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          map = ref[i];
          results.push(map.applyMapping(this, playhead, timeDelta, datastore));
        }
        return results;
      };

      CanvasObject.prototype.cacheState = function() {
        return this._model.cacheState();
      };

      CanvasObject.prototype.restoreState = function() {
        return this._model.restoreState();
      };

      return CanvasObject;

    })(Controller);
    CanvasObject._count = 0;
    return CanvasObject;
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/canvas/objects/base/object.js.map