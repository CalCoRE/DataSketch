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
            value: "#000000-#FFFFFF"
            label: "Grayscale"
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
      console.log val
      val = val.color.split "-"
      val =
        min: val[0]
        max: val[1]