(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var CanvasObjectView, View;
    View = require('core/view/view');
    return CanvasObjectView = (function(superClass) {
      extend(CanvasObjectView, superClass);

      function CanvasObjectView(model) {
        this._onMoving = bind(this._onMoving, this);
        this._onScaling = bind(this._onScaling, this);
        this._onRotating = bind(this._onRotating, this);
        this.extractTransform = bind(this.extractTransform, this);
        this.enforceTransform = bind(this.enforceTransform, this);
        this.setFabric = bind(this.setFabric, this);
        this.getFabric = bind(this.getFabric, this);
        this.buildFabric = bind(this.buildFabric, this);
        this._onChange = bind(this._onChange, this);
        CanvasObjectView.__super__.constructor.call(this);
        model.addEventListener('Model.Change', this._onChange);
      }

      CanvasObjectView.prototype._onChange = function(evt) {
        var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8;
        switch (evt.data.path) {
          case "rotation":
            return (ref = this._fabric) != null ? ref.set('angle', evt.data.value) : void 0;
          case "scale":
            if ((ref1 = this._fabric) != null) {
              ref1.set('scaleX', evt.data.value.x);
            }
            return (ref2 = this._fabric) != null ? ref2.set('scaleY', evt.data.value.y) : void 0;
          case "position":
            if ((ref3 = this._fabric) != null) {
              ref3.set('left', evt.data.value.x);
            }
            return (ref4 = this._fabric) != null ? ref4.set('top', evt.data.value.y) : void 0;
          case "controllable":
            if ((ref5 = this._fabric) != null) {
              ref5.hasControls = evt.data.value;
            }
            if ((ref6 = this._fabric) != null) {
              ref6.hasBorders = evt.data.value;
            }
            if ((ref7 = this._fabric) != null) {
              ref7.selectable = evt.data.value;
            }
            return this._fabric.setCoords();
          case "disabled":
            return this._fabric.opacity = evt.data.value ? 0.25 : 1;
          case "opacity":
            return (ref8 = this._fabric) != null ? ref8.set('opacity', evt.data.value) : void 0;
        }
      };

      CanvasObjectView.prototype.buildFabric = function() {};

      CanvasObjectView.prototype.getFabric = function() {
        return this._fabric;
      };

      CanvasObjectView.prototype.setFabric = function(fabric, model) {
        this._fabric = fabric;
        this._fabric.set('left', model.get('position.x'));
        this._fabric.set('top', model.get('position.y'));
        this._fabric.set('angle', model.get('rotation'));
        this._fabric.set('scaleX', model.get('scale.x'));
        this._fabric.set('scaleY', model.get('scale.y'));
        this._fabric.on("rotating", this._onRotating);
        this._fabric.on("scaling", this._onScaling);
        return this._fabric.on("moving", this._onMoving);
      };

      CanvasObjectView.prototype.enforceTransform = function(model) {
        var ref, ref1, ref2, ref3, ref4;
        if ((ref = this._fabric) != null) {
          ref.left = model.get('position.x');
        }
        if ((ref1 = this._fabric) != null) {
          ref1.top = model.get('position.y');
        }
        if ((ref2 = this._fabric) != null) {
          ref2.angle = model.get('rotation');
        }
        if ((ref3 = this._fabric) != null) {
          ref3.scaleX = model.get('scale.x');
        }
        if ((ref4 = this._fabric) != null) {
          ref4.scaleY = model.get('scale.y');
        }
        return this._fabric.setCoords();
      };

      CanvasObjectView.prototype.extractTransform = function() {
        var transform;
        return transform = {
          position: {
            x: this._fabric.left,
            y: this._fabric.top
          },
          rotation: this._fabric.angle,
          scale: {
            x: this._fabric.scaleX,
            y: this._fabric.scaleY
          }
        };
      };

      CanvasObjectView.prototype._onRotating = function(e) {
        return this.dispatchEvent('CanvasObject.Rotating', {
          rotation: this._fabric.angle
        });
      };

      CanvasObjectView.prototype._onScaling = function(e) {
        return this.dispatchEvent('CanvasObject.Scaling', {
          scale: {
            x: this._fabric.scaleX,
            y: this._fabric.scaleY
          },
          position: {
            x: this._fabric.left,
            y: this._fabric.top
          }
        });
      };

      CanvasObjectView.prototype._onMoving = function(e) {
        return this.dispatchEvent('CanvasObject.Moving', {
          position: {
            x: this._fabric.left,
            y: this._fabric.top
          }
        });
      };

      return CanvasObjectView;

    })(View);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/canvas/objects/base/view.js.map