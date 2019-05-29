define (require) ->
  Action = require 'modules/action/action'

  #Action for changing the width of a stroke of a pencil on canvas.
  class StrokeAction extends Action
    constructor: (@canvas, @_strokeWidth) ->

    #Method for updating the stroke width of pencil on canvas.
    execute: () =>
      Promise.resolve (() =>
        @_currentStrokeWidth = @canvas.getStrokeWidth()
        @canvas.setStrokeWidth @_strokeWidth
      )()

    #Method for revert the changes which are done by execute method.
    undo: () =>
      Promise.resolve (() =>
        @canvas.setStrokeWidth @_currentStrokeWidth
      )()