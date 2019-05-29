(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var AnimationProperty, ScaleProperty;
    AnimationProperty = require('../base/module');
    return ScaleProperty = (function(superClass) {
      extend(ScaleProperty, superClass);

      function ScaleProperty() {
        this.setPropertyValue = bind(this.setPropertyValue, this);
        ScaleProperty.__super__.constructor.call(this, {
          id: 'scale',
          name: 'Scale'
        });
      }

      ScaleProperty.prototype.setPropertyValue = function(object, calibration, percent) {
        var val;
        val = eval(calibration.min) + eval(calibration.max - calibration.min) * eval(percent);
        return object.setScale({
          x: val,
          y: val
        });
      };

      return ScaleProperty;

    })(AnimationProperty);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/animation/properties/scale/module.js.map
