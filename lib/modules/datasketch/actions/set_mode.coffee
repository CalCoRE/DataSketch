define (require) ->
  Action = require 'modules/action/action'

  class DrawModeAction extends Action
    constructor: (@canvas, @_targetMode) ->

    execute: () =>
      Promise.resolve (() =>
        @_currentMode = @canvas.getMode()
        @canvas.setMode @_targetMode
      )()

    undo: () =>
      Promise.resolve (() =>
        @canvas.setMode @_currentMode
      )()