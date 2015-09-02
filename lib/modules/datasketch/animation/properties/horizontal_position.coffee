define (require) ->
  AnimationProperty = require './property'

  class HorizontalPositionProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'x'
        name: 'X'

    