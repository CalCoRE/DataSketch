define (require) ->
  Form = require 'modules/form/form'
  SelectField = require 'modules/form/fields/select/field'
  Button = require 'modules/form/fields/button/field'

  class ColorCalibrationForm extends Form
    constructor: (settings = {}) ->
      settings.modelData ?= {}
      settings.modelData.classes ?= []
      settings.modelData.classes.push "form-calibration"
      settings.modelData.classes.push "form-color-calibration"
      settings.modelData.fields ?= [
        SelectField.create
          id: "color"
          label: "Color"
          options: [
            value: "#f7f7f7-#252525"
            label: "Grayscale"
          ,
            value: "#b2182b-#2166ac"
            label: "Red to Blue"
          ,
            value: "#8c510a-#01665e"
            label: "Orange to Turquoise"
          ]
      ]
      settings.modelData.buttons ?= [
        Button.create
          label: "Cancel"
          id: "cancel"
          value: "cancel"
          event: "Form.Cancel"
          class: "btn-cancel"
        Button.create
          label: "Submit"
          id: "submit"
          value: "submit"
          event: "Form.Submit"
          class: "btn-submit"
      ]

      super settings

    value: () =>
      val = super()
      val = val.color.split "-"
      val =
        min: val[0]
        max: val[1]