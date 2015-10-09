(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(function(require) {
    var DSCanvasModel, Model, Utils, defaults;
    Model = require('core/model/model');
    Utils = require('core/util/utils');
    defaults = {
      mode: 'draw',
      strokeWidth: 1,
      strokeColor: "#000000",
      objects: [],
      selected: [],
      isolated: [],
      disabled: false,
      controllable: true
    };
    return DSCanvasModel = (function(superClass) {
      extend(DSCanvasModel, superClass);

      function DSCanvasModel(config) {
        this.enableControls = bind(this.enableControls, this);
        this.disableControls = bind(this.disableControls, this);
        this.enable = bind(this.enable, this);
        this.disable = bind(this.disable, this);
        this.isolate = bind(this.isolate, this);
        this.removeSelected = bind(this.removeSelected, this);
        this.removeObjects = bind(this.removeObjects, this);
        this.removeObject = bind(this.removeObject, this);
        this.getActiveObjects = bind(this.getActiveObjects, this);
        this.addObjects = bind(this.addObjects, this);
        this.addObject = bind(this.addObject, this);
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        DSCanvasModel.__super__.constructor.call(this, config);
      }

      DSCanvasModel.prototype.addObject = function(object, silent) {
        var objs;
        if (silent == null) {
          silent = false;
        }
        if (this.get('isolated').length) {
          this.get('isolated')[0].addObject(object);
        } else {
          objs = this.get('objects');
          objs.push(object);
          this.set('objects', objs);
        }
        if (!silent) {
          return this.dispatchEvent('Canvas.ObjectAdded', {
            object: object,
            container: this.get('isolated')
          });
        }
      };

      DSCanvasModel.prototype.addObjects = function(objects, silent) {
        var i, len, obj;
        if (silent == null) {
          silent = false;
        }
        for (i = 0, len = objects.length; i < len; i++) {
          obj = objects[i];
          this.addObject(obj, true);
        }
        if (!silent) {
          return this.dispatchEvent('Canvas.ObjectsAdded', {
            objects: objects,
            container: this.get('isolated')
          });
        }
      };

      DSCanvasModel.prototype.getActiveObjects = function() {
        if (this.get('isolated').length) {
          return this.get('isolated')[0].getObjects();
        } else {
          return this.get('objects');
        }
      };

      DSCanvasModel.prototype.removeObject = function(object, silent) {
        var objs;
        if (silent == null) {
          silent = false;
        }
        if (this.get('isolated').length) {
          this.get('isolated')[0].removeObject(object);
        } else {
          objs = this.get('objects');
          if (indexOf.call(objs, object) >= 0) {
            objs.splice(objs.indexOf(object), 1);
            this.set('objects', objs);
          }
        }
        if (!silent) {
          return this.dispatchEvent('Canvas.ObjectRemoved', {
            object: object,
            container: this.get('isolated')
          });
        }
      };

      DSCanvasModel.prototype.removeObjects = function(objects, silent) {
        var i, len, obj;
        if (silent == null) {
          silent = false;
        }
        for (i = 0, len = objects.length; i < len; i++) {
          obj = objects[i];
          this.removeObject(obj, true);
        }
        if (!silent) {
          return this.dispatchEvent('Canvas.ObjectsRemoved', {
            objects: objects,
            container: this.get('isolated')
          });
        }
      };

      DSCanvasModel.prototype.removeSelected = function() {
        this.removeObjects(this.get('selected'));
        return this.set('selected', []);
      };

      DSCanvasModel.prototype.isolate = function(group) {
        var collection, grp, i, isoGroups, isolated, len, obj;
        isolated = this.get('isolated');
        if (group != null) {
          group.isolate();
        } else if (isolated.length) {
          isolated[0].reform();
        }
        isoGroups = (function() {
          var i, len, ref, results;
          ref = this.get('isolated');
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            grp = ref[i];
            results.push(grp.getObjects());
          }
          return results;
        }).call(this);
        isoGroups.push(this.get('objects'));
        collection = group == null ? isoGroups[1] : isoGroups[0];
        for (i = 0, len = collection.length; i < len; i++) {
          obj = collection[i];
          if (obj !== group) {
            if (group != null) {
              obj.disable();
            } else {
              obj.enable();
            }
          }
        }
        if (group != null) {
          this.get('isolated').unshift(group);
        } else {
          this.get('isolated').shift();
        }
        return this.set('isolated', this.get('isolated'));
      };

      DSCanvasModel.prototype.disable = function() {
        var i, len, obj, ref;
        ref = this.getActiveObjects();
        for (i = 0, len = ref.length; i < len; i++) {
          obj = ref[i];
          obj.disable();
        }
        return this.set('disabled', true);
      };

      DSCanvasModel.prototype.enable = function() {
        var i, len, obj, ref;
        ref = this.getActiveObjects();
        for (i = 0, len = ref.length; i < len; i++) {
          obj = ref[i];
          obj.enable();
        }
        return this.set('disabled', false);
      };

      DSCanvasModel.prototype.disableControls = function() {
        var i, len, obj, ref;
        ref = this.getActiveObjects();
        for (i = 0, len = ref.length; i < len; i++) {
          obj = ref[i];
          obj.disableControls();
        }
        return this.set('controllable', true);
      };

      DSCanvasModel.prototype.enableControls = function() {
        var i, len, obj, ref;
        ref = this.getActiveObjects();
        for (i = 0, len = ref.length; i < len; i++) {
          obj = ref[i];
          obj.enableControls();
        }
        return this.set('controllable', false);
      };

      return DSCanvasModel;

    })(Model);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/canvas/model.js.map