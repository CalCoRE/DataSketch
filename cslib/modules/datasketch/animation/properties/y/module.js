(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var AnimationProperty, VerticalPositionProperty;
    AnimationProperty = require('../base/module');
    return VerticalPositionProperty = (function(superClass) {
      extend(VerticalPositionProperty, superClass);

      function VerticalPositionProperty() {
        this.setPropertyValue = bind(this.setPropertyValue, this);
        VerticalPositionProperty.__super__.constructor.call(this, {
          id: 'y',
          name: 'Y'
        });
      }

      VerticalPositionProperty.prototype.setPropertyValue = function(object, calibration, percent) {
        var position;
        position = object.getPosition();
        return object.setPosition({
          x: position.x,
          y: calibration.min + (calibration.max - calibration.min) * percent
        });
      };

      return VerticalPositionProperty;

    })(AnimationProperty);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/animation/properties/y/module.js.map