(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var CustomModel, ObjectModel, Utils, defaults;
    ObjectModel = require('modules/datasketch/canvas/objects/base/model');
    Utils = require('core/util/utils');
    defaults = {
      stroke: {
        width: 1,
        color: "#000000"
      },
      fill: {
        color: null
      }
    };
    return CustomModel = (function(superClass) {
      extend(CustomModel, superClass);

      function CustomModel(config) {
        this.restoreState = bind(this.restoreState, this);
        this.cacheState = bind(this.cacheState, this);
        this.parseFabric = bind(this.parseFabric, this);
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        CustomModel.__super__.constructor.call(this, config);
      }

      CustomModel.prototype.parseFabric = function(fabric) {
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
        return this.set('stroke.color', fabric.stroke);
      };

      CustomModel.prototype.cacheState = function() {
        CustomModel.__super__.cacheState.call(this);
        return this._cache.stroke = Utils.ensureDefaults(this.get('stroke'), {});
      };

      CustomModel.prototype.restoreState = function() {
        if (this._cache != null) {
          this.set('stroke.color', this._cache.stroke.color);
          this.set('stroke.width', this._cache.stroke.width);
        }
        return CustomModel.__super__.restoreState.call(this);
      };

      return CustomModel;

    })(ObjectModel);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/canvas/objects/custom/model.js.map
