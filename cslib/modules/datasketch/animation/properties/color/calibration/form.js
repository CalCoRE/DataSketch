(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Button, ColorCalibrationForm, Form, SelectField;
    Form = require('modules/form/form');
    SelectField = require('modules/form/fields/select/field');
    Button = require('modules/form/fields/button/field');
    return ColorCalibrationForm = (function(superClass) {
      extend(ColorCalibrationForm, superClass);

      function ColorCalibrationForm(settings) {
        var base, base1, base2;
        if (settings == null) {
          settings = {};
        }
        this.value = bind(this.value, this);
        if (settings.modelData == null) {
          settings.modelData = {};
        }
        if ((base = settings.modelData).classes == null) {
          base.classes = [];
        }
        settings.modelData.classes.push("form-calibration");
        settings.modelData.classes.push("form-color-calibration");
        if ((base1 = settings.modelData).fields == null) {
          base1.fields = [
            SelectField.create({
              id: "color",
              label: "Color",
              options: [
                {
                  value: "#f7f7f7-#252525",
                  label: "Grayscale"
                }, {
                  value: "#b2182b-#2166ac",
                  label: "Red to Blue"
                }, {
                  value: "#8c510a-#01665e",
                  label: "Orange to Turquoise"
                }
              ]
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
        ColorCalibrationForm.__super__.constructor.call(this, settings);
      }

      ColorCalibrationForm.prototype.value = function() {
        var val;
        val = ColorCalibrationForm.__super__.value.call(this);
        val = val.color.split("-");
        return val = {
          min: val[0],
          max: val[1]
        };
      };

      return ColorCalibrationForm;

    })(Form);
  });

}).call(this);

//# sourceMappingURL=../../../../../../maps/modules/datasketch/animation/properties/color/calibration/form.js.map