(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, HM, MappingAssignmentAction, PropertyMap;
    Action = require('modules/action/action');
    PropertyMap = require('modules/datasketch/animation/property_map');
    HM = require('core/event/hook_manager');
    return MappingAssignmentAction = (function(superClass) {
      extend(MappingAssignmentAction, superClass);

      function MappingAssignmentAction(_object, _objectProperty, _dataProperty) {
        this._object = _object;
        this._objectProperty = _objectProperty;
        this._dataProperty = _dataProperty;
        this.undo = bind(this.undo, this);
        this.execute = bind(this.execute, this);
      }

      MappingAssignmentAction.prototype.execute = function() {
        var calibration;
        if (this._dataProperty != null) {
          calibration = {};
          if (this._objectProperty._model._data.id === "transparency") {
            calibration.max = eval(window.objectPropertyMaximum / 100);
            calibration.min = eval(window.objectPropertyMinimum / 100);
          } else {
            calibration.max = window.objectPropertyMaximum;
            calibration.min = window.objectPropertyMinimum;
          }
          window.objectProperty = this._objectProperty;
          window.dataProperty = this._dataProperty;
          window.calibration = calibration;
          this._map = new PropertyMap({
            objectProperty: this._objectProperty,
            dataProperty: this._dataProperty,
            calibration: calibration
          });
          return this._object.addPropertyMapping(this._map);
        } else {
          return Promise.resolve(this._object.removePropertyMapping(this._objectProperty));
        }
      };

      MappingAssignmentAction.prototype.undo = function() {
        if (this._dataProperty != null) {
          return Promise.resolve(this._object.removePropertyMapping(this._objectProperty));
        }
      };

      return MappingAssignmentAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/mapping_assignment.js.map
