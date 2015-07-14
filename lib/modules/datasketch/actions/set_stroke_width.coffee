define (require) ->
  Action = require 'modules/action/action'

  class StrokeAction extends Action
    constructor: (@canvas, @_strokeWidth) ->

    execute: () =>
      @_currentStrokeWidth = @canvas.getStrokeWidth()
      @canvas.setStrokeWidth @_strokeWidth

    undo: () =>
      @canvas.setStrokeWidth @_currentStrokeWidth