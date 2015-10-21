define (require) ->
  AnimationProperty = require '../base/module'

  class WidthProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'width'
        name: 'Width'

    setPropertyValue: (object, calibration, percent) =>
      currScale = object.getScale()
      object.setScale
        x: calibration.min + (calibration.max - calibration.min) * percent
        y: currScale.y
        