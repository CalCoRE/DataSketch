define (require) ->
  AnimationProperty = require './property'

  class RotationProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'rotation'
        name: 'Rotation'

    