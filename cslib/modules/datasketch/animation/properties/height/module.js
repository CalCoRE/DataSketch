(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var AnimationProperty, HeightProperty;
    AnimationProperty = require('../base/module');
    return HeightProperty = (function(superClass) {
      extend(HeightProperty, superClass);

      function HeightProperty() {
        this.setPropertyValue = bind(this.setPropertyValue, this);
        HeightProperty.__super__.constructor.call(this, {
          id: 'height',
          name: 'Height'
        });
      }

      HeightProperty.prototype.setPropertyValue = function(object, calibration, percent) {
        var currScale;
        currScale = object.getScale();
        currScale.y = calibration.min + (calibration.max - calibration.min) * percent;
        return object.setScale(currScale);
      };

      return HeightProperty;

    })(AnimationProperty);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/animation/properties/height/module.js.map