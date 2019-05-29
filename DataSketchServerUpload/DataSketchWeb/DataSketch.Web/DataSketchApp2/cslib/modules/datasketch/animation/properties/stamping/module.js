(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var AnimationProperty, StampingEffectProperty;
    AnimationProperty = require('../base/module');
    return StampingEffectProperty = (function(superClass) {
      extend(StampingEffectProperty, superClass);

      function StampingEffectProperty() {
        StampingEffectProperty.__super__.constructor.call(this, {
          id: 'stamping',
          name: 'Stamping'
        });
      }

      return StampingEffectProperty;

    })(AnimationProperty);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/animation/properties/stamping/module.js.map
