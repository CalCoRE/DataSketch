define (require) ->
  AnimationProperty = require '../base/module'
  CalibrationForm = require './calibration/form'

  class RotationProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'rotation'
        name: 'Rotation'

    getCalibrationForm: () =>
      new CalibrationForm
    #Replace the calibration property with model properties
    setPropertyValue: (object, calibration, percent) =>
      val = eval(calibration.min) + eval(calibration.max - calibration.min) * eval(percent)
      object.setRotation val