define (require) ->
  AnimationProperty = require './property'

  class ColorProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'color'
        name: 'Color'

    