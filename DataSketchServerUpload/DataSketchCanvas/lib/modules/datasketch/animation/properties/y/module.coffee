define (require) ->
  AnimationProperty = require '../base/module'

  class VerticalPositionProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'y'
        name: 'Y'

    setPropertyValue: (object, calibration, percent) =>
      position = object.getPosition()
      #Replace the calibration property with model properties
      object.setPosition
        x: position.x
        y: eval(eval(calibration.min) + eval(calibration.max - calibration.min) * eval(percent))
        