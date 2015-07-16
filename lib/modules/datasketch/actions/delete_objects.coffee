define (require) ->
  Action = require 'modules/action/action'

  class DeleteObjectsAction extends Action
    constructor: (@canvas, @_objects) ->

    execute: () =>
      @canvas.removeObjects(@_objects)
      @canvas.selectObjects []

    undo: () =>
      @canvas.addObjects @_objects
      @canvas.selectObjects @_objects