define (require) ->
  AnimationProperty = require '../base/module'

  class WidthProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'width'
        name: 'Width'

    setPropertyValue: (object, calibration, percent) =>
      currScale = object.getScale()
      #Replace the calibration property with model properties
      object.setScale
        x: eval(calibration.min) + eval(calibration.max - calibration.min) * eval(percent)
        y: currScale.y
        