(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Button, CalibrationForm, Form, NumberField;
    Form = require('modules/form/form');
    NumberField = require('modules/form/fields/number/field');
    Button = require('modules/form/fields/button/field');
    require('link!./style.css');
    return CalibrationForm = (function(superClass) {
      extend(CalibrationForm, superClass);

      function CalibrationForm(settings) {
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
        if ((base1 = settings.modelData).fields == null) {
          base1.fields = [
            NumberField.create({
              label: "Minimum",
              id: "min"
            }), NumberField.create({
              label: "Maximum",
              id: "max"
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
              "class": "btn-submit"
            })
          ];
        }
        CalibrationForm.__super__.constructor.call(this, settings);
      }

      return CalibrationForm;

    })(Form);
  });

}).call(this);

//# sourceMappingURL=../../../../../../maps/modules/datasketch/animation/properties/base/calibration/form.js.map