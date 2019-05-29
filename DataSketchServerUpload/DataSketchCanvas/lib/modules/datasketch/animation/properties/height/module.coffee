define (require) ->
  AnimationProperty = require '../base/module'

  class HeightProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'height'
        name: 'Height'
    #Replace the calibration property with model properties
    setPropertyValue: (object, calibration, percent) =>               
      currScale = object.getScale()
      object.setScale
        x: currScale.x
        y: eval(calibration.min) + eval(calibration.max - calibration.min) * eval(percent)