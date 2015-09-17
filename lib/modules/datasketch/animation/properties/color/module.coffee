define (require) ->
  AnimationProperty = require '../base/module'
  CalibrationForm = require './calibration/form'

  class ColorProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'color'
        name: 'Color'

    getCalibrationForm: () =>
      new CalibrationForm

    