(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(function(require) {
    var CanvasObject, GroupObject, Matrix, Model, View;
    CanvasObject = require('modules/datasketch/canvas/objects/base/object');
    Model = require('./model');
    View = require('./view');
    Matrix = require('core/util/matrix');
    GroupObject = (function(superClass) {
      extend(GroupObject, superClass);

      function GroupObject(settings) {
        this.animate = bind(this.animate, this);
        this.setStrokeWidth = bind(this.setStrokeWidth, this);
        this.setStrokeColor = bind(this.setStrokeColor, this);
        this.disableControls = bind(this.disableControls, this);
        this.enableControls = bind(this.enableControls, this);
        this.enable = bind(this.enable, this);
        this.disable = bind(this.disable, this);
        this.clone = bind(this.clone, this);
        this.reform = bind(this.reform, this);
        this.isolate = bind(this.isolate, this);
        this.enforceTransform = bind(this.enforceTransform, this);
        this["break"] = bind(this["break"], this);
        this.removeObject = bind(this.removeObject, this);
        this.addObject = bind(this.addObject, this);
        this.getObjects = bind(this.getObjects, this);
        this._calculatePosition = bind(this._calculatePosition, this);
        var child, i, len, ref;
        if (settings.modelClass == null) {
          settings.modelClass = Model;
        }
        if (settings.viewClass == null) {
          settings.viewClass = View;
        }
        GroupObject.__super__.constructor.call(this, settings);
        ref = this._model.get('children');
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          child.disableControls();
        }
        this._calculatePosition();
        this._view.buildFabric(this._model);
      }

      GroupObject.prototype._calculatePosition = function() {
        var bounds, dim, dims, groupTrans, i, j, k, len, len1, len2, obj, objDims, position, ref, ref1, results, trans;
        dims = [];
        ref = this._model.get('children');
        for (i = 0, len = ref.length; i < len; i++) {
          obj = ref[i];
          obj.enforceTransform();
          objDims = obj.getBounds();
          dims.push({
            left: objDims.left,
            right: objDims.right,
            top: objDims.top,
            bottom: objDims.bottom
          });
        }
        bounds = null;
        for (j = 0, len1 = dims.length; j < len1; j++) {
          dim = dims[j];
          if (bounds == null) {
            bounds = dim;
          }
          bounds.left = Math.min(bounds.left, dim.left);
          bounds.right = Math.max(bounds.right, dim.right);
          bounds.top = Math.min(bounds.top, dim.top);
          bounds.bottom = Math.max(bounds.bottom, dim.bottom);
        }
        position = {
          x: (bounds.left + bounds.right) / 2,
          y: (bounds.top + bounds.bottom) / 2
        };
        this.setPosition(position);
        groupTrans = this.getTransform();
        ref1 = this._model.get('children');
        results = [];
        for (k = 0, len2 = ref1.length; k < len2; k++) {
          obj = ref1[k];
          trans = obj.getTransform();
          obj.setTransform(Matrix.multiplyTransformMatrices(Matrix.invert(groupTrans), trans));
          results.push(obj.enforceTransform());
        }
        return results;
      };

      GroupObject.prototype.getObjects = function() {
        return this._model.get('children');
      };

      GroupObject.prototype.addObject = function(obj) {
        var children;
        children = this._model.get("children");
        children.push(obj);
        if (!this._model.get('isolated')) {
          obj.disableControls();
        }
        return this._model.set('children', children);
      };

      GroupObject.prototype.removeObject = function(obj) {
        var children;
        children = this._model.get("children");
        if (indexOf.call(children, obj) >= 0) {
          children = children.splice(children.indexOf(obj), 1);
          return this._model.set('children', children);
        }
      };

      GroupObject.prototype["break"] = function() {
        var children, currTrans, groupTrans, i, len, obj;
        children = this._model.get('children');
        groupTrans = this.getTransform();
        for (i = 0, len = children.length; i < len; i++) {
          obj = children[i];
          currTrans = obj.getTransform();
          obj.setTransform(Matrix.multiplyTransformMatrices(groupTrans, currTrans));
          obj.enableControls();
        }
        this._model.set('children', []);
        return children;
      };

      GroupObject.prototype.enforceTransform = function() {
        var child, i, len, ref;
        ref = this._model.get('children');
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          child.enforceTransform();
        }
        return GroupObject.__super__.enforceTransform.call(this);
      };

      GroupObject.prototype.isolate = function() {
        var children, currTrans, groupTrans, i, len, obj;
        children = this._model.get('children');
        groupTrans = this.getTransform();
        for (i = 0, len = children.length; i < len; i++) {
          obj = children[i];
          currTrans = obj.getTransform();
          obj.setTransform(Matrix.multiplyTransformMatrices(groupTrans, currTrans));
          obj.enableControls();
        }
        return this._model.set('isolated', true);
      };

      GroupObject.prototype.reform = function() {
        var child, i, len, ref;
        ref = this._model.get('children');
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          child.disableControls();
        }
        this._calculatePosition();
        this._view.buildFabric(this._model);
        return this._model.set('isolated', false);
      };

      GroupObject.prototype.clone = function() {
        var child;
        return Promise.all((function() {
          var i, len, ref, results;
          ref = this._model.get('children');
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            results.push(child.clone());
          }
          return results;
        }).call(this)).then((function(_this) {
          return function(childClones) {
            var clone;
            clone = GroupObject.createFromObjects(childClones);
            clone.setTransform(_this.getTransform());
            return clone;
          };
        })(this));
      };

      GroupObject.prototype.disable = function() {
        var child, i, len, ref;
        ref = this._model.get('children');
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          child.disable();
        }
        return GroupObject.__super__.disable.call(this);
      };

      GroupObject.prototype.enable = function() {
        var child, i, len, ref;
        ref = this._model.get('children');
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          child.enable();
        }
        return GroupObject.__super__.enable.call(this);
      };

      GroupObject.prototype.enableControls = function() {
        var child, i, len, ref;
        ref = this._model.get('children');
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          child.enableControls();
        }
        return GroupObject.__super__.enableControls.call(this);
      };

      GroupObject.prototype.disableControls = function() {
        var child, i, len, ref;
        ref = this._model.get('children');
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          child.disableControls();
        }
        return GroupObject.__super__.disableControls.call(this);
      };

      GroupObject.prototype.setStrokeColor = function(color) {
        var child, i, len, ref, results;
        ref = this._model.get('children');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          results.push(child.setStrokeColor(color));
        }
        return results;
      };

      GroupObject.prototype.setStrokeWidth = function(width) {
        var child, i, len, ref, results;
        ref = this._model.get('children');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          results.push(child.setStrokeWidth(width));
        }
        return results;
      };

      GroupObject.prototype.animate = function(playhead, timeDelta, datastore) {
        var child, i, len, ref;
        ref = this._model.get('children');
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          child.animate(playhead, timeDelta, datastore);
        }
        return GroupObject.__super__.animate.call(this, playhead, timeDelta, datastore);
      };

      return GroupObject;

    })(CanvasObject);
    GroupObject.createFromObjects = function(objects) {
      var group;
      group = new GroupObject({
        modelData: {
          children: objects
        }
      });
      return group;
    };
    return GroupObject;
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/canvas/objects/group/object.js.map