(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var AnimationProperty, Animator, CalibrationForm, Canvas, Globals, HM, MappingAssignmentAction, Modal, Model, Module;
    Module = require('core/app/module');
    Model = require('core/model/model');
    HM = require('core/event/hook_manager');
    Globals = require('core/model/globals');
    Canvas = require('modules/datasketch/canvas/canvas');
    CalibrationForm = require('./calibration/form');
    Modal = require('modules/modal/modal');
    Animator = require('../../animator');
    MappingAssignmentAction = require('modules/datasketch/actions/mapping_assignment');
    return AnimationProperty = (function(superClass) {
      extend(AnimationProperty, superClass);

      function AnimationProperty(settings) {
        this.removeTempPlayAnimation = bind(this.removeTempPlayAnimation, this);
        this.tempPlayAnimation = bind(this.tempPlayAnimation, this);
        this.setPropertyValue = bind(this.setPropertyValue, this);
        this.getCalibrationForm = bind(this.getCalibrationForm, this);
        this.calibrate = bind(this.calibrate, this);
        this._hookObjectProperties = bind(this._hookObjectProperties, this);
        this.getName = bind(this.getName, this);
        this.getId = bind(this.getId, this);
        AnimationProperty.__super__.constructor.call(this);
        this._model = new Model({
          data: settings
        });
        HM.hook('DataMapping.ObjectProperties', this._hookObjectProperties);
      }

      AnimationProperty.prototype.getId = function() {
        return this._model.get('id');
      };

      AnimationProperty.prototype.getName = function() {
        return this._model.get('name');
      };

      AnimationProperty.prototype._hookObjectProperties = function(list, meta) {
        list.push(this);
        return list;
      };

      AnimationProperty.prototype.calibrate = function() {
        return new Promise((function(_this) {
          return function(resolve, reject) {
            var form;
            form = _this.getCalibrationForm();
            Modal._view.addEventListener('Form.Modal.CloseRequest', function() {});
            form.addEventListener('Form.Submit', function() {
              Modal.close();
              return resolve(form.value());
            });
            form.addEventListener('Form.Cancel', function() {
              var e;
              Modal.close();
              e = new Error("Calibration canceled");
              e.name = "FormCanceledError";
              return reject(e);
            });
            return Modal.display(form);

            /*
            #Event got triggered on change of max field        
            $('#max').change () =>          
              resolve form.value()
              #Set the min max value for animation in to model.          
              @_model.set 'max', form.value().max
              @_model.set 'min', form.value().min
              this.tempPlayAnimation()
            
            #Event got triggered on change of min field
            $('#min').change () =>          
              resolve form.value()
              #Set the min max value for animation in to model.
              @_model.set 'max', form.value().max
              @_model.set 'min', form.value().min
              this.tempPlayAnimation()
             */
          };
        })(this));
      };

      AnimationProperty.prototype.getCalibrationForm = function() {
        var canvas;
        canvas = new Canvas;
        return new CalibrationForm;
      };

      AnimationProperty.prototype.setPropertyValue = function(object, calibration, percent) {};

      AnimationProperty.prototype.tempPlayAnimation = function() {
        this._animator = new Animator({
          canvas: Globals.get('Canvas'),
          datastore: Globals.get('DataStore')
        });
        this._animator.cache();
        this._animator._isLoop = false;
        this._animator.reset();
        this._animator.restore();
        return this._animator.play();
      };

      AnimationProperty.prototype.removeTempPlayAnimation = function(_this) {
        var object, objectProperty;
        object = _this._animator.settings.canvas.getSelectedObjects();
        objectProperty = _this;
        return object[0].removePropertyMapping(objectProperty);
      };

      return AnimationProperty;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/animation/properties/base/module.js.map
