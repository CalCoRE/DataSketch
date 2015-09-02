define (require) ->
  AnimationProperty = require './property'

  class HeightProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'height'
        name: 'Height'

    