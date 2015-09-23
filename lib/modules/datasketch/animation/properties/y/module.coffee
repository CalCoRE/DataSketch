define (require) ->
  AnimationProperty = require '../base/module'

  class VerticalPositionProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'y'
        name: 'Y'

    setPropertyValue: (object, calibration, percent) =>
      position = object.getPosition()
      object.setPosition
        x: position.x
        y: calibration.min + (calibration.max - calibration.min) * percent
        