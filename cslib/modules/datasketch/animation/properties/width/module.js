(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var AnimationProperty, WidthProperty;
    AnimationProperty = require('../base/module');
    return WidthProperty = (function(superClass) {
      extend(WidthProperty, superClass);

      function WidthProperty() {
        this.setPropertyValue = bind(this.setPropertyValue, this);
        WidthProperty.__super__.constructor.call(this, {
          id: 'width',
          name: 'Width'
        });
      }

      WidthProperty.prototype.setPropertyValue = function(object, calibration, percent) {
        var currScale;
        currScale = object.getScale();
        currScale.x = calibration.min + (calibration.max - calibration.min) * percent;
        return object.setScale(currScale);
      };

      return WidthProperty;

    })(AnimationProperty);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/animation/properties/width/module.js.map