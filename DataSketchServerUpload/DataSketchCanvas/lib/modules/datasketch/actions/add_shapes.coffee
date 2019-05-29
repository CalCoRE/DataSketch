define (require) ->
  Action = require 'modules/action/action'

  #Action for adding shapes to canvas.
  class AddShapesAction extends Action
    constructor: (@canvas, @_objects) ->

    #Method for adding shapes to canvas.
    execute: () =>
      Promise.resolve (() =>         
         @canvas.addShape @_objects
      )()   