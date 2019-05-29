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
    #Replace the calibration property with model properties
    setPropertyValue: (object, calibration, percent) =>
      val = eval(calibration.min) + (calibration.max - calibration.min) * eval(percent)
      object.setOpacity val