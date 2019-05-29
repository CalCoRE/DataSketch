define (require) ->
  AnimationProperty = require '../base/module'

  class ScaleProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'scale'
        name: 'Scale'

    #Replace the calibration property with model properties
    setPropertyValue: (object, calibration, percent) =>
      val = eval(calibration.min) + eval(calibration.max - calibration.min) * eval(percent)
      object.setScale
        x: val
        y: val
        