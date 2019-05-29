define (require) ->
  Action = require 'modules/action/action'
  DrawMode = require './set_mode'

  #Action for saving canvas and animation of objects or group.
  class SaveCanvasAction extends Action
    constructor: (@canvas, @_Action) ->

    #Method for saving canvas and animation of objects or group.
    execute: () =>
      Promise.resolve (() =>        
        drawMode = new DrawMode @canvas, 'select'
        drawMode.execute()
        @canvas.saveCanvas @_Action
      )()