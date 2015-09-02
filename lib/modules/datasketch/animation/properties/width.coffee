define (require) ->
  AnimationProperty = require './property'

  class WidthProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'width'
        name: 'Width'

    