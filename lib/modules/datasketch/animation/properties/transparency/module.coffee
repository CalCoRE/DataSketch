define (require) ->
  AnimationProperty = require '../base/module'
  CalibrationForm = require './calibration/form'

  class TransparencyProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'transparency'
        name: 'Transparency'

    getCalibrationForm: () =>
      new CalibrationForm

    setPropertyValue: (object, calibration, percent) =>
      val = calibration.min + (calibration.max - calibration.min) * percent
      object.setOpacity val