(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(function(require) {
    var $, DSCanvasView, DomView, Fabric, Globals, Group, Template;
    $ = require('jquery');
    DomView = require('core/view/dom_view');
    Globals = require('core/model/globals');
    Template = require('text!./view.html');
    Group = require('./objects/group/object');
    Fabric = require('thirdparty/fabric');
    require('link!./style.css');
    return DSCanvasView = (function(superClass) {
      extend(DSCanvasView, superClass);

      function DSCanvasView(model) {
        this._onObjectsAdded = bind(this._onObjectsAdded, this);
        this._onObjectsRemoved = bind(this._onObjectsRemoved, this);
        this._onObjectAdded = bind(this._onObjectAdded, this);
        this._onObjectRemoved = bind(this._onObjectRemoved, this);
        this._onChangeMode = bind(this._onChangeMode, this);
        this._onChange = bind(this._onChange, this);
        this.clearSelection = bind(this.clearSelection, this);
        this.updateDimensions = bind(this.updateDimensions, this);
        this._onObjectSelected = bind(this._onObjectSelected, this);
        this._onSelectionCleared = bind(this._onSelectionCleared, this);
        this._onSelectionModified = bind(this._onSelectionModified, this);
        this._beforeSelectionCleared = bind(this._beforeSelectionCleared, this);
        this._onSelectionCreated = bind(this._onSelectionCreated, this);
        this._onPathCreated = bind(this._onPathCreated, this);
        this._renderObjects = bind(this._renderObjects, this);
        this.dryRender = bind(this.dryRender, this);
        this.render = bind(this.render, this);
        this.initCanvas = bind(this.initCanvas, this);
        DSCanvasView.__super__.constructor.call(this, Template);
        model.addEventListener('Model.Change', this._onChange);
        model.addEventListener('Canvas.ObjectRemoved', this._onObjectRemoved);
        model.addEventListener('Canvas.ObjectAdded', this._onObjectAdded);
        model.addEventListener('Canvas.ObjectsRemoved', this._onObjectsRemoved);
        model.addEventListener('Canvas.ObjectsAdded', this._onObjectsAdded);
      }

      DSCanvasView.prototype.initCanvas = function(model) {
        this._fabric = new Fabric.Canvas(this.$el.find('.canvas-main')[0]);
        this._fabric.isDrawingMode = true;
        this._fabric.on('path:created', this._onPathCreated);
        this._fabric.on('object:selected', this._onObjectSelected);
        this._fabric.on('selection:created', this._onSelectionCreated);
        this._fabric.on('before:selection:cleared', this._beforeSelectionCleared);
        this._fabric.on('selection:cleared', this._onSelectionCleared);
        Globals.get('Relay').addEventListener('Window.Resize', this.updateDimensions);
        return this.updateDimensions();
      };

      DSCanvasView.prototype.render = function(model) {
        if (this._fabric != null) {
          this._fabric.clear();
          this._renderObjects(model.get('objects'), model.get('isolated'));
          this._fabric.discardActiveGroup();
          return this._fabric.renderAll();
        }
      };

      DSCanvasView.prototype.dryRender = function() {
        return this._fabric.renderAll();
      };

      DSCanvasView.prototype._renderObjects = function(objects, isolations) {
        var i, len, obj, results;
        results = [];
        for (i = 0, len = objects.length; i < len; i++) {
          obj = objects[i];
          this._fabric.discardActiveGroup();
          if (indexOf.call(isolations, obj) >= 0) {
            results.push(this._renderObjects(obj.getObjects(), isolations));
          } else {
            if (obj instanceof Group) {
              this._fabric.setActiveGroup(obj.view().getFabric());
            }
            obj.enforceTransform();
            results.push(this._fabric.add(obj.view().getFabric()));
          }
        }
        return results;
      };

      DSCanvasView.prototype._onPathCreated = function(evt) {
        return this.dispatchEvent('Path.Created', {
          path: evt.path
        });
      };

      DSCanvasView.prototype._onSelectionCreated = function(evt) {
        var obj;
        this._fabricSelection = evt.target;
        this._fabricSelectionMetaCache = {
          position: {
            x: this._fabricSelection.left,
            y: this._fabricSelection.top
          },
          rotation: this._fabricSelection.angle,
          scale: {
            x: this._fabricSelection.scaleX,
            y: this._fabricSelection.scaleY
          }
        };
        this._fabricSelection.on('modified', this._onSelectionModified);
        return this.dispatchEvent('Selection.Created', {
          objectIds: (function() {
            var i, len, ref, results;
            ref = evt.target.getObjects();
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              obj = ref[i];
              results.push(obj.get('id'));
            }
            return results;
          })()
        });
      };

      DSCanvasView.prototype._beforeSelectionCleared = function(evt) {
        var ref;
        if ((ref = this._fabricSelection) != null) {
          ref.off('modified', this._onSelectionModified);
        }
        return this._fabricSelection = null;
      };

      DSCanvasView.prototype._onSelectionModified = function(evt) {
        var delta;
        if (this._fabricSelection != null) {
          delta = {
            position: {
              x: this._fabricSelection.left - this._fabricSelectionMetaCache.position.x,
              y: this._fabricSelection.top - this._fabricSelectionMetaCache.position.y
            },
            rotation: this._fabricSelection.angle - this._fabricSelectionMetaCache.rotation,
            scale: {
              x: this._fabricSelection.scaleX - this._fabricSelectionMetaCache.scale.x,
              y: this._fabricSelection.scaleY - this._fabricSelectionMetaCache.scale.y
            }
          };
          return this.dispatchEvent('Selection.Modified', {
            delta: delta
          });
        }
      };

      DSCanvasView.prototype._onSelectionCleared = function(evt) {
        return this.dispatchEvent('Selection.Cleared', {});
      };

      DSCanvasView.prototype._onObjectSelected = function(evt) {
        var group, obj, objects;
        if (group = this._fabric.getActiveGroup()) {
          objects = group.getObjects();
        } else {
          objects = [this._fabric.getActiveObject()];
        }
        return this.dispatchEvent('Selection.Created', {
          objectIds: (function() {
            var i, len, results;
            results = [];
            for (i = 0, len = objects.length; i < len; i++) {
              obj = objects[i];
              results.push(obj.get('id'));
            }
            return results;
          })()
        });
      };

      DSCanvasView.prototype.updateDimensions = function() {
        return this._fabric.setDimensions({
          width: $(window).width(),
          height: $(window).height()
        });
      };

      DSCanvasView.prototype.clearSelection = function() {
        return this._fabric.deactivateAllWithDispatch().renderAll();
      };

      DSCanvasView.prototype._onChange = function(evt) {
        var ref;
        switch (evt.data.path) {
          case "mode":
            return this._onChangeMode(evt.data.value);
          case "strokeWidth":
            this._fabric.freeDrawingBrush.width = evt.data.value;
            return this._fabric.renderAll();
          case "strokeColor":
            this._fabric.freeDrawingBrush.color = evt.data.value;
            return this._fabric.renderAll();
          case "selected":
            if (((ref = evt.data.value) != null ? ref.length : void 0) === 0) {
              return this.clearSelection();
            }
            break;
          case "isolated":
            return this.render(evt.currentTarget);
          case "disabled":
            this._fabric.selection = !evt.data.value;
            return this.render(evt.currentTarget);
        }
      };

      DSCanvasView.prototype._onChangeMode = function(val) {
        switch (val) {
          case "draw":
            return this._fabric.isDrawingMode = true;
          default:
            return this._fabric.isDrawingMode = false;
        }
      };

      DSCanvasView.prototype._onObjectRemoved = function(evt) {
        return this.clearSelection();
      };

      DSCanvasView.prototype._onObjectAdded = function(evt) {};

      DSCanvasView.prototype._onObjectsRemoved = function(evt) {
        return this.clearSelection();
      };

      DSCanvasView.prototype._onObjectsAdded = function(evt) {};

      return DSCanvasView;

    })(DomView);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/canvas/view.js.map