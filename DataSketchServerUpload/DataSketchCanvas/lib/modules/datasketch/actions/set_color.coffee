define (require) ->
  Action = require 'modules/action/action'

  #Action for changing the stroke color of an object or group which is active.
  class ColorAction extends Action
    constructor: (@canvas, @_strokeColor, @id) ->      

    #Method for updating the stroke color of an object or group on canvas.
    execute: () =>      
      Promise.resolve (() =>
        @_currentStrokeColor = @canvas.getStrokeColor()
        @canvas.setStrokeColor @_strokeColor
      )()

    #Method for undo the changes done by execute method.
    undo: () =>
      Promise.resolve (() =>
        @canvas.setStrokeColor @_currentStrokeColor
      )()