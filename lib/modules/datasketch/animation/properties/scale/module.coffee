define (require) ->
  AnimationProperty = require '../base/module'

  class ScaleProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'scale'
        name: 'Scale'


    setPropertyValue: (object, calibration, percent) =>
      val = calibration.min + (calibration.max - calibration.min) * percent
      object.setScale
        x: val
        y: val
        