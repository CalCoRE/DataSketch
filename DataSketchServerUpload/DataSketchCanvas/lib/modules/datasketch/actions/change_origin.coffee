define (require) ->
  Action = require 'modules/action/action'

  class changeoriginAction extends Action
    constructor: (@canvas, @_objects) ->

    execute: () =>
      Promise.resolve (() =>
        @canvas.updateOrigin "left","top"
      )()   