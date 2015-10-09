(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(function(require) {
    var Controller, DSCanvas, Globals, Group, Model, Path, View;
    Controller = require('core/controller/controller');
    View = require('./view');
    Model = require('./model');
    Globals = require('core/model/globals');
    Path = require('./objects/path/object');
    Group = require('./objects/group/object');
    return DSCanvas = (function(superClass) {
      extend(DSCanvas, superClass);

      function DSCanvas(config) {
        this.enableControls = bind(this.enableControls, this);
        this.disableControls = bind(this.disableControls, this);
        this.enable = bind(this.enable, this);
        this.disable = bind(this.disable, this);
        this.initCanvas = bind(this.initCanvas, this);
        this._onSelectionCleared = bind(this._onSelectionCleared, this);
        this._onSelectionModified = bind(this._onSelectionModified, this);
        this._onSelectionCreated = bind(this._onSelectionCreated, this);
        this._onPathCreated = bind(this._onPathCreated, this);
        this._manageContextMenu = bind(this._manageContextMenu, this);
        this._onModelChange = bind(this._onModelChange, this);
        this.setIsolation = bind(this.setIsolation, this);
        this.getIsolation = bind(this.getIsolation, this);
        this.isolate = bind(this.isolate, this);
        this.breakGroup = bind(this.breakGroup, this);
        this.createGroup = bind(this.createGroup, this);
        this.removeSelected = bind(this.removeSelected, this);
        this.removeObjects = bind(this.removeObjects, this);
        this.removeObject = bind(this.removeObject, this);
        this.addObjects = bind(this.addObjects, this);
        this.addObject = bind(this.addObject, this);
        this.selectObjects = bind(this.selectObjects, this);
        this.getSelectedObjects = bind(this.getSelectedObjects, this);
        this.setStrokeColor = bind(this.setStrokeColor, this);
        this.getStrokeColor = bind(this.getStrokeColor, this);
        this.setStrokeWidth = bind(this.setStrokeWidth, this);
        this.getStrokeWidth = bind(this.getStrokeWidth, this);
        this.setMode = bind(this.setMode, this);
        this.getMode = bind(this.getMode, this);
        this.getObjects = bind(this.getObjects, this);
        this.dryRender = bind(this.dryRender, this);
        this.render = bind(this.render, this);
        if (config == null) {
          config = {};
        }
        if (config.modelClass == null) {
          config.modelClass = Model;
        }
        if (config.viewClass == null) {
          config.viewClass = View;
        }
        DSCanvas.__super__.constructor.call(this, config);
        this._model.addEventListener('Model.Change', this._onModelChange);
        this.view().addEventListener('Selection.Created', this._onSelectionCreated);
        this.view().addEventListener('Selection.Modified', this._onSelectionModified);
        this.view().addEventListener('Selection.Cleared', this._onSelectionCleared);
        this.view().addEventListener('Path.Created', this._onPathCreated);
      }

      DSCanvas.prototype.render = function() {
        return this._view.render(this._model);
      };

      DSCanvas.prototype.dryRender = function() {
        return this._view.dryRender();
      };

      DSCanvas.prototype.getObjects = function() {
        return this._model.get('objects');
      };

      DSCanvas.prototype.getMode = function() {
        return this._model.get('mode');
      };

      DSCanvas.prototype.setMode = function(mode) {
        return this._model.set('mode', mode);
      };

      DSCanvas.prototype.getStrokeWidth = function() {
        return this._model.get('strokeWidth');
      };

      DSCanvas.prototype.setStrokeWidth = function(width) {
        var i, len, obj, ref;
        if (this._model.get('selected')) {
          ref = this._model.get('selected');
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            obj.setStrokeWidth(width);
          }
        }
        return this._model.set('strokeWidth', width);
      };

      DSCanvas.prototype.getStrokeColor = function() {
        return this._model.get('strokeColor');
      };

      DSCanvas.prototype.setStrokeColor = function(color) {
        var i, len, obj, ref;
        if (this._model.get('selected')) {
          ref = this._model.get('selected');
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            obj.setStrokeColor(color);
          }
        }
        return this._model.set('strokeColor', color);
      };

      DSCanvas.prototype.getSelectedObjects = function() {
        return this._model.get('selected');
      };

      DSCanvas.prototype.selectObjects = function(objects) {
        var obj, objectIds;
        objectIds = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = objects.length; i < len; i++) {
            obj = objects[i];
            results.push(obj.getId());
          }
          return results;
        })();
        return this._model.set('selected', (function() {
          var i, len, ref, ref1, results;
          ref = this._model.getActiveObjects();
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            if (ref1 = obj.getId(), indexOf.call(objectIds, ref1) >= 0) {
              results.push(obj);
            }
          }
          return results;
        }).call(this));
      };

      DSCanvas.prototype.addObject = function(object, silent) {
        if (silent == null) {
          silent = false;
        }
        return this._model.addObject(object, silent);
      };

      DSCanvas.prototype.addObjects = function(objects) {
        return this._model.addObjects(objects);
      };

      DSCanvas.prototype.removeObject = function(object) {
        return this._model.removeObject(object);
      };

      DSCanvas.prototype.removeObjects = function(objects) {
        return this._model.removeObjects(objects);
      };

      DSCanvas.prototype.removeSelected = function() {
        return this._model.removeSelected();
      };

      DSCanvas.prototype.createGroup = function(objects) {
        var group, i, len, obj;
        this._view.clearSelection();
        if (objects == null) {
          objects = this._model.get('selected');
        }
        if (objects == null) {
          return null;
        }
        for (i = 0, len = objects.length; i < len; i++) {
          obj = objects[i];
          obj.extractTransform();
        }
        group = Group.createFromObjects(objects);
        this.addObject(group);
        this.removeObjects(objects);
        return group;
      };

      DSCanvas.prototype.breakGroup = function(group) {
        var i, len, obj, objects;
        objects = group["break"]();
        this.removeObject(group);
        for (i = 0, len = objects.length; i < len; i++) {
          obj = objects[i];
          this.addObject(obj);
          obj.enforceTransform();
          obj.enableControls();
        }
        this.render();
        return group.getObjects();
      };

      DSCanvas.prototype.isolate = function(group) {
        this._model.isolate(group);
        return this.render();
      };

      DSCanvas.prototype.getIsolation = function() {
        return this._model.get('isolated');
      };

      DSCanvas.prototype.setIsolation = function(isolation) {
        return this._model.set('isolated', isolation);
      };

      DSCanvas.prototype._onModelChange = function(evt) {
        switch (evt.data.path) {
          case "strokeWidth":
            return this.dispatchEvent("Canvas.StrokeWidthChange", {
              width: evt.data.value
            });
          case "mode":
            return this.dispatchEvent("Canvas.ModeChange", {
              mode: evt.data.value,
              last: evt.data.old
            });
          case "strokeColor":
            return this.dispatchEvent("Canvas.StrokeColorChange", {
              color: evt.data.value
            });
          case "isolated":
            return this._manageContextMenu();
          case "selected":
            return this._manageContextMenu();
          case "objects":
            return this.render();
        }
      };

      DSCanvas.prototype._manageContextMenu = function() {
        return Globals.get('Relay').dispatchEvent('ContextMenu.ContextChange', {
          context: {
            selection: this._model.get('selected'),
            isolation: this._model.get('isolated')
          }
        });
      };

      DSCanvas.prototype._onPathCreated = function(evt) {
        var path;
        path = Path.createFromFabric(evt.data.path);
        return this._model.addObject(path, true);
      };

      DSCanvas.prototype._onSelectionCreated = function(evt) {
        var obj;
        return this.selectObjects((function() {
          var i, len, ref, ref1, results;
          ref = this._model.getActiveObjects();
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            if (ref1 = obj.getId(), indexOf.call(evt.data.objectIds, ref1) >= 0) {
              results.push(obj);
            }
          }
          return results;
        }).call(this));
      };

      DSCanvas.prototype._onSelectionModified = function(evt) {};

      DSCanvas.prototype._onSelectionCleared = function(evt) {
        return this.selectObjects([]);
      };

      DSCanvas.prototype.initCanvas = function() {
        return this._view.initCanvas(this._model);
      };

      DSCanvas.prototype.disable = function() {
        return this._model.disable();
      };

      DSCanvas.prototype.enable = function() {
        return this._model.enable();
      };

      DSCanvas.prototype.disableControls = function() {
        return this._model.disableControls();
      };

      DSCanvas.prototype.enableControls = function() {
        return this._model.enableControls();
      };

      return DSCanvas;

    })(Controller);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/canvas/canvas.js.map