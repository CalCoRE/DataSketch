define (require) ->
  AnimationProperty = require '../base/module'

  class HorizontalPositionProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'x'
        name: 'X'

    setPropertyValue: (object, calibration, percent) =>
      position = object.getPosition()
      object.setPosition
        x: calibration.min + (calibration.max - calibration.min) * percent
        y: position.y
