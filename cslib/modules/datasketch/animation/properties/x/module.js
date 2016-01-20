(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var AnimationProperty, HorizontalPositionProperty;
    AnimationProperty = require('../base/module');
    return HorizontalPositionProperty = (function(superClass) {
      extend(HorizontalPositionProperty, superClass);

      function HorizontalPositionProperty() {
        this.setPropertyValue = bind(this.setPropertyValue, this);
        HorizontalPositionProperty.__super__.constructor.call(this, {
          id: 'x',
          name: 'X'
        });
      }

      HorizontalPositionProperty.prototype.setPropertyValue = function(object, calibration, percent) {
        var position;
        position = object.getPosition();
        return object.setPosition({
          x: calibration.min + (calibration.max - calibration.min) * percent,
          y: position.y
        });
      };

      return HorizontalPositionProperty;

    })(AnimationProperty);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/animation/properties/x/module.js.map