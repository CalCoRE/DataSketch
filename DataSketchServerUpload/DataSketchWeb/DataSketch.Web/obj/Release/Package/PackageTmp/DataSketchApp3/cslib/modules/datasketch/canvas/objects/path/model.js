(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var ObjectModel, PathModel, Utils, defaults;
    ObjectModel = require('modules/datasketch/canvas/objects/base/model');
    Utils = require('core/util/utils');
    defaults = {
      pathData: [],
      stroke: {
        width: 1,
        color: "#000"
      },
      fill: {
        color: null
      }
    };
    return PathModel = (function(superClass) {
      extend(PathModel, superClass);

      function PathModel(config) {
        this.restoreState = bind(this.restoreState, this);
        this.cacheState = bind(this.cacheState, this);
        this.parseFabric = bind(this.parseFabric, this);
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        PathModel.__super__.constructor.call(this, config);
      }

      PathModel.prototype.parseFabric = function(fabric) {
        this.set('pathData', fabric.path);
        this.set('position', {
          x: fabric.left,
          y: fabric.top
        });
        this.set('rotation', fabric.angle);
        this.set('scale', {
          x: fabric.scaleX,
          y: fabric.scaleY
        });
        this.set('stroke.width', fabric.strokeWidth);
        this.set('stroke.color', fabric.stroke);
        return this.set('fill.color', fabric.fill);
      };

      PathModel.prototype.cacheState = function() {
        PathModel.__super__.cacheState.call(this);
        this._cache.stroke = Utils.ensureDefaults(this.get('stroke'), {});
        return this._cache.fill = Utils.ensureDefaults(this.get('fill'), {});
      };

      PathModel.prototype.restoreState = function() {
        if (this._cache != null) {
          this.set('stroke.color', this._cache.stroke.color);
          this.set('fill.color', this._cache.fill.color);
          this.set('stroke.width', this._cache.stroke.width);
        }
        return PathModel.__super__.restoreState.call(this);
      };

      return PathModel;

    })(ObjectModel);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/canvas/objects/path/model.js.map
