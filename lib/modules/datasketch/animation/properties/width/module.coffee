define (require) ->
  AnimationProperty = require '../base/module'

  class WidthProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'width'
        name: 'Width'

    