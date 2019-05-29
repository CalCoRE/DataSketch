(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, HM, ObjectManipulationAction, PropertyMap;
    Action = require('modules/action/action');
    PropertyMap = require('modules/datasketch/animation/property_map');
    HM = require('core/event/hook_manager');
    return ObjectManipulationAction = (function(superClass) {
      extend(ObjectManipulationAction, superClass);

      function ObjectManipulationAction(canvas) {
        this.canvas = canvas;
        this.execute = bind(this.execute, this);
      }

      ObjectManipulationAction.prototype.execute = function() {
        return this.canvas.onChangeMinMaxSlider();
      };

      return ObjectManipulationAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/object_manipulation.js.map
