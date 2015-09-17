define (require) ->
  AnimationProperty = require '../base/module'

  class ColorProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'color'
        name: 'Color'

    