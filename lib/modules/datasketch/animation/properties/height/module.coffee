define (require) ->
  AnimationProperty = require '../base/module'

  class HeightProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'height'
        name: 'Height'

    setPropertyValue: (object, calibration, percent) =>
      currScale = object.getScale()
      object.setScale
        x: currScale.x
        y: calibration.min + (calibration.max - calibration.min) * percent
    