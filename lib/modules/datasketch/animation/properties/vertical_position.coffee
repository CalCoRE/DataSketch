define (require) ->
  AnimationProperty = require './property'

  class VerticalPositionProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'y'
        name: 'Y'

    