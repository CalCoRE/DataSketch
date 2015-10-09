(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, MappingAssignmentAction, PropertyMap;
    Action = require('modules/action/action');
    PropertyMap = require('modules/datasketch/animation/property_map');
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
        if (this._dataProperty != null) {
          return this._objectProperty.calibrate(this._object, this._dataProperty).then((function(_this) {
            return function(calibration) {
              _this._map = new PropertyMap({
                objectProperty: _this._objectProperty,
                dataProperty: _this._dataProperty,
                calibration: calibration
              });
              return _this._object.addPropertyMapping(_this._map);
            };
          })(this))["catch"]((function(_this) {
            return function(error) {
              if (error.name !== "FormCanceledError") {
                throw error;
              }
            };
          })(this));
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