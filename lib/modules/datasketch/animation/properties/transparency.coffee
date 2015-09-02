define (require) ->
  AnimationProperty = require './property'

  class TransparencyProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'transparency'
        name: 'Transparency'

    