define (require) ->
  Action = require 'modules/action/action'
  #Action for changing the mode of an tool.

  class DrawModeAction extends Action
    constructor: (@canvas, @_targetMode) ->

    #Method for changing the mode of canvas.
    execute: () =>
      Promise.resolve (() =>
        @_currentMode = @canvas.getMode()
        @canvas.setMode @_targetMode
      )()

    #Method for revert changes done by execute method.
    undo: () =>
      Promise.resolve (() =>
        @canvas.setMode @_currentMode
      )()