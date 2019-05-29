define (require) ->
  Action = require 'modules/action/action'

  #Action for removing group or object from canvas.
  class DeleteObjectsAction extends Action
    constructor: (@canvas) ->

    #Method for removing group or object from canvas.
    execute: () =>
      Promise.resolve (() =>
        @canvas.deleteObject(@canvas.getSelectedObjects())
        @canvas.selectObjects []
      )()

    #Method for undo the remove group action from canvas.
    undo: () =>
      Promise.resolve (() =>
        @canvas.addObjects @_objects
        @canvas.selectObjects @_objects
      )()