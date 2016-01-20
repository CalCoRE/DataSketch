(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var CanvasObjectModel, Model, Utils, defaults;
    Model = require('core/model/model');
    Utils = require('core/util/utils');
    defaults = {
      id: null,
      position: {
        x: 0,
        y: 0
      },
      rotation: 0,
      scale: {
        x: 1,
        y: 1
      },
      controllable: true,
      disabled: false,
      opacity: 1,
      propertyMappings: []
    };
    return CanvasObjectModel = (function(superClass) {
      extend(CanvasObjectModel, superClass);

      function CanvasObjectModel(config) {
        this.restoreState = bind(this.restoreState, this);
        this.cacheState = bind(this.cacheState, this);
        this.removePropertyMapping = bind(this.removePropertyMapping, this);
        this.addPropertyMapping = bind(this.addPropertyMapping, this);
        this.enable = bind(this.enable, this);
        this.disable = bind(this.disable, this);
        this.getHeight = bind(this.getHeight, this);
        this.getWidth = bind(this.getWidth, this);
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        CanvasObjectModel.__super__.constructor.call(this, config);
      }

      CanvasObjectModel.prototype.getWidth = function() {
        return this.get('view').getWidth();
      };

      CanvasObjectModel.prototype.getHeight = function() {
        return this.get('view').getHeight();
      };

      CanvasObjectModel.prototype.disable = function() {
        this.set('disabled', true);
        return this.set('controllable', false);
      };

      CanvasObjectModel.prototype.enable = function() {
        this.set('disabled', false);
        return this.set('controllable', true);
      };

      CanvasObjectModel.prototype.addPropertyMapping = function(map) {
        var j, len, m, maps, newMap;
        maps = this.get('propertyMappings');
        newMap = true;
        for (j = 0, len = maps.length; j < len; j++) {
          m = maps[j];
          if (!(m.objectProperty === map.objectProperty)) {
            continue;
          }
          m.dataProperty = map.dataProperty;
          m.calibration = map.calibration;
          newMap = false;
        }
        if (newMap) {
          maps.push(map);
        }
        return this.set('propertyMappings', maps);
      };

      CanvasObjectModel.prototype.removePropertyMapping = function(objectProperty) {
        var i, ind, j, len, m, map;
        map = this.get('propertyMappings');
        ind = null;
        for (i = j = 0, len = map.length; j < len; i = ++j) {
          m = map[i];
          if (!(m.objectProperty === objectProperty)) {
            continue;
          }
          ind = i;
          break;
        }
        map.splice(i, 1);
        return this.set('propertyMappings', map);
      };

      CanvasObjectModel.prototype.cacheState = function() {
        return this._cache = {
          position: Utils.ensureDefaults(this.get('position'), {}),
          rotation: this.get('rotation'),
          scale: Utils.ensureDefaults(this.get('scale'), {}),
          opacity: this.get('opacity')
        };
      };

      CanvasObjectModel.prototype.restoreState = function() {
        if (this._cache != null) {
          this.set('position', this._cache.position);
          this.set('rotation', this._cache.rotation);
          this.set('scale', this._cache.scale);
          return this.set('opacity', this._cache.opacity);
        }
      };

      return CanvasObjectModel;

    })(Model);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/canvas/objects/base/model.js.map