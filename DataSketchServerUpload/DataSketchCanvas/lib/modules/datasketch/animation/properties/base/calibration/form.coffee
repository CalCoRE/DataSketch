define (require) ->
  Form = require 'modules/form/form'
  NumberField = require 'modules/form/fields/number/field'
  Button = require 'modules/form/fields/button/field'

  require 'link!./style.css'

  class CalibrationForm extends Form
    constructor: (settings = {}) ->
      settings.modelData ?= {}
      settings.modelData.classes ?= []
      settings.modelData.classes.push "form-calibration"      
      settings.modelData.fields ?= [
        NumberField.create
          label: "Minimum"
          id: "min"
        NumberField.create
          label: "Maximum"
          id: "max"         
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
          class: "btn-primary"        
      ]      

      super settings