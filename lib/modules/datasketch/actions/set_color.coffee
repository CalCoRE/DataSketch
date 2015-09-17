define (require) ->
  Action = require 'modules/action/action'

  class ColorAction extends Action
    constructor: (@canvas, @_strokeColor) ->

    execute: () =>
      Promise.resolve (() =>
        @_currentStrokeColor = @canvas.getStrokeColor()
        @canvas.setStrokeColor @_strokeColor
      )()

    undo: () =>
      Promise.resolve (() =>
        @canvas.setStrokeColor @_currentStrokeColor
      )()