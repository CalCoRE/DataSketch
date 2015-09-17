define (require) ->
  AnimationProperty = require '../base/module'

  class HeightProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'height'
        name: 'Height'

    