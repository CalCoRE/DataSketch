(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Button, Form, NumberField, TransparencyCalibrationForm;
    Form = require('modules/form/form');
    NumberField = require('modules/form/fields/number/field');
    Button = require('modules/form/fields/button/field');
    return TransparencyCalibrationForm = (function(superClass) {
      extend(TransparencyCalibrationForm, superClass);

      function TransparencyCalibrationForm(settings) {
        var base, base1, base2;
        if (settings == null) {
          settings = {};
        }
        if (settings.modelData == null) {
          settings.modelData = {};
        }
        if ((base = settings.modelData).classes == null) {
          base.classes = [];
        }
        settings.modelData.classes.push("form-calibration");
        settings.modelData.classes.push("form-transparency-calibration");
        if ((base1 = settings.modelData).fields == null) {
          base1.fields = [
            NumberField.create({
              label: "Minimum",
              id: "min",
              min: 0,
              max: 1
            }), NumberField.create({
              label: "Maximum",
              id: "max",
              min: 0,
              max: 1
            })
          ];
        }
        if ((base2 = settings.modelData).buttons == null) {
          base2.buttons = [
            Button.create({
              label: "Cancel",
              id: "cancel",
              value: "cancel",
              event: "Form.Cancel",
              "class": "btn-cancel"
            }), Button.create({
              label: "Submit",
              id: "submit",
              value: "submit",
              event: "Form.Submit",
              "class": "btn-primary"
            })
          ];
        }
        TransparencyCalibrationForm.__super__.constructor.call(this, settings);
      }

      return TransparencyCalibrationForm;

    })(Form);
  });

}).call(this);

//# sourceMappingURL=../../../../../../maps/modules/datasketch/animation/properties/transparency/calibration/form.js.map
