define (require) ->
  Action = require 'modules/action/action'

  class StrokeAction extends Action
    constructor: (@canvas, @_strokeWidth) ->

    execute: () =>
      Promise.resolve (() =>
        @_currentStrokeWidth = @canvas.getStrokeWidth()
        @canvas.setStrokeWidth @_strokeWidth
      )()

    undo: () =>
      Promise.resolve (() =>
        @canvas.setStrokeWidth @_currentStrokeWidth
      )()