define (require) ->
  AnimationProperty = require '../base/module'

  class ScaleProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'scale'
        name: 'Scale'

    