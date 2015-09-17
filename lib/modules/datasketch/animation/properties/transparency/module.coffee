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