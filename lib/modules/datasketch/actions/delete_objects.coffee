define (require) ->
  Action = require 'modules/action/action'

  class DeleteObjectsAction extends Action
    constructor: (@canvas, @_objects) ->

    execute: () =>
      Promise.resolve (() =>
        @canvas.removeObjects(@_objects)
        @canvas.selectObjects []
      )()

    undo: () =>
      Promise.resolve (() =>
        @canvas.addObjects @_objects
        @canvas.selectObjects @_objects
      )()