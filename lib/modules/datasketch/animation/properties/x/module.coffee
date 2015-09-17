define (require) ->
  AnimationProperty = require '../base/module'

  class HorizontalPositionProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'x'
        name: 'X'

    