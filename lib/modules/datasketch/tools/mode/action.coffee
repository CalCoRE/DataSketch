define (require) ->
  Action = require 'modules/action/action'

  class DrawModeAction extends Action
    constructor: (@canvas, @_targetMode) ->

    execute: () =>
      @_currentMode = @canvas.getMode()
      @canvas.setMode @_targetMode

    undo: () =>
      @canvas.setMode @_currentMode