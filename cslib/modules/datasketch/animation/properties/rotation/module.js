(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var AnimationProperty, CalibrationForm, RotationProperty;
    AnimationProperty = require('../base/module');
    CalibrationForm = require('./calibration/form');
    return RotationProperty = (function(superClass) {
      extend(RotationProperty, superClass);

      function RotationProperty() {
        this.setPropertyValue = bind(this.setPropertyValue, this);
        this.getCalibrationForm = bind(this.getCalibrationForm, this);
        RotationProperty.__super__.constructor.call(this, {
          id: 'rotation',
          name: 'Rotation'
        });
      }

      RotationProperty.prototype.getCalibrationForm = function() {
        return new CalibrationForm;
      };

      RotationProperty.prototype.setPropertyValue = function(object, calibration, percent) {
        var val;
        val = calibration.min + (calibration.max - calibration.min) * percent;
        return object.setRotation(val);
      };

      return RotationProperty;

    })(AnimationProperty);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/animation/properties/rotation/module.js.map