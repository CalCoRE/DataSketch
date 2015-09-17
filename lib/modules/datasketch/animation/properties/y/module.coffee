define (require) ->
  AnimationProperty = require '../base/module'

  class VerticalPositionProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'y'
        name: 'Y'

    