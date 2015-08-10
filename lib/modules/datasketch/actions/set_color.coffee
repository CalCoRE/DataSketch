define (require) ->
  Action = require 'modules/action/action'

  class ColorAction extends Action
    constructor: (@canvas, @_strokeColor) ->

    execute: () =>
      @_currentStrokeColor = @canvas.getStrokeColor()
      @canvas.setStrokeColor @_strokeColor

    undo: () =>
      @canvas.setStrokeColor @_currentStrokeColor