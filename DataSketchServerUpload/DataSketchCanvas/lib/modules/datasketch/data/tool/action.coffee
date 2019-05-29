define (require) ->
  Action = require 'modules/action/action'

  class DataModeAction extends Action
    constructor: (@canvas) ->

    execute: () =>
      @_currentMode = @canvas.getMode()
      @canvas.setMode "data"

    undo: () =>
      @canvas.setMode @_currentMode