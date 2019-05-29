(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var AnimationProperty, CalibrationForm, ColorProperty, Utils;
    AnimationProperty = require('../base/module');
    CalibrationForm = require('./calibration/form');
    Utils = require('core/util/utils');
    return ColorProperty = (function(superClass) {
      extend(ColorProperty, superClass);

      function ColorProperty() {
        this.setPropertyValue = bind(this.setPropertyValue, this);
        this.getCalibrationForm = bind(this.getCalibrationForm, this);
        ColorProperty.__super__.constructor.call(this, {
          id: 'color',
          name: 'Color'
        });
      }

      ColorProperty.prototype.getCalibrationForm = function() {
        return new CalibrationForm;
      };

      ColorProperty.prototype.setPropertyValue = function(object, calibration, percent) {
        var blue, blueVal, green, greenVal, hexre, maxSplit, minSplit, red, redVal;
        hexre = /^\#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
        minSplit = hexre.exec(calibration.min);
        maxSplit = hexre.exec(calibration.max);
        red = {
          min: parseInt(minSplit[1], 16),
          max: parseInt(maxSplit[1], 16)
        };
        green = {
          min: parseInt(minSplit[2], 16),
          max: parseInt(maxSplit[2], 16)
        };
        blue = {
          min: parseInt(minSplit[3], 16),
          max: parseInt(maxSplit[3], 16)
        };
        redVal = Utils.zeropad(Math.round(red.min + percent * (red.max - red.min)).toString(16), 2);
        greenVal = Utils.zeropad(Math.round(green.min + percent * (green.max - green.min)).toString(16), 2);
        blueVal = Utils.zeropad(Math.round(blue.min + percent * (blue.max - blue.min)).toString(16), 2);
        return object.setStrokeColor("#" + redVal + greenVal + blueVal);
      };

      return ColorProperty;

    })(AnimationProperty);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/animation/properties/color/module.js.map
