define (require) ->
  AnimationProperty = require '../base/module'

  class StampingEffectProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'stamping'
        name: 'Stamping'
