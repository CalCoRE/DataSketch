define (require) ->
  AnimationProperty = require './property'

  class ScaleProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'scale'
        name: 'Scale'

    