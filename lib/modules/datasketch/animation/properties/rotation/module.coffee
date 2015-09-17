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
    