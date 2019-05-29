(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var AnimationProperty, CalibrationForm, TransparencyProperty;
    AnimationProperty = require('../base/module');
    CalibrationForm = require('./calibration/form');
    return TransparencyProperty = (function(superClass) {
      extend(TransparencyProperty, superClass);

      function TransparencyProperty() {
        this.setPropertyValue = bind(this.setPropertyValue, this);
        this.getCalibrationForm = bind(this.getCalibrationForm, this);
        TransparencyProperty.__super__.constructor.call(this, {
          id: 'transparency',
          name: 'Transparency'
        });
      }

      TransparencyProperty.prototype.getCalibrationForm = function() {
        return new CalibrationForm;
      };

      TransparencyProperty.prototype.setPropertyValue = function(object, calibration, percent) {
        var val;
        val = eval(calibration.min) + (calibration.max - calibration.min) * eval(percent);
        return object.setOpacity(val);
      };

      return TransparencyProperty;

    })(AnimationProperty);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/animation/properties/transparency/module.js.map
