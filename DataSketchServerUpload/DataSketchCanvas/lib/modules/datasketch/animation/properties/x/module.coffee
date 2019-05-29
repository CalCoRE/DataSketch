define (require) ->
  AnimationProperty = require '../base/module'

  class HorizontalPositionProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'x'
        name: 'X'

    setPropertyValue: (object, calibration, percent) =>
      position = object.getPosition()
      #Replace the calibration property with model properties

      object.setPosition
        x: eval((eval(calibration.min) + eval(calibration.max - calibration.min) * eval(percent)))
        y: position.y
