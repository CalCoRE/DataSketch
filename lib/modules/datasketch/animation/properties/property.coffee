define (require) ->
  Module = require 'core/app/module'
  Model = require 'core/model/model'
  HM = require 'core/event/hook_manager'

  Form = require 'modules/form/form'
  TextField = require 'modules/form/fields/text/field'
  Button = require 'modules/form/fields/button/field'
  Modal = require 'modules/modal/modal'

  class AnimationProperty extends Module
    constructor: (settings) ->
      super()
      @_model = new Model
        data: settings
      HM.hook 'DataMapping.ObjectProperties', @_hookObjectProperties

    getId: () =>
      @_model.get 'id'

    getName: () =>
      @_model.get 'name'

    _hookObjectProperties: (list, meta) =>
      list.push @
      list

    calibrate: () =>
      new Promise (resolve, reject) =>
        form = @getCalibrationForm()
        form.addEventListener 'Form.Submit', () =>
          Modal.close()
          resolve form.value()
        form.addEventListener 'Form.Cancel', () =>
          Modal.close()
          e = new Error "Calibration canceled"
          e.name = "FormCanceledError"
          reject e
        Modal.display form

    getCalibrationForm: () =>
      form = Form.create
        fields: [
          TextField.create
            label: "Minimum"
            id: 'min'
          TextField.create
            label: "Maximum"
            id: 'max'
        ]
        buttons: [
          Button.create
            label: "Cancel"
            id: "cancel"
            event: "Form.Cancel"
            class: 'btn-cancel'
          Button.create
            label: "Submit"
            id: "submit"
            event: "Form.Submit"
            class: 'btn-submit'
        ]