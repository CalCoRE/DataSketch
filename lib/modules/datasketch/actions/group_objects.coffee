define (require) ->
  Action = require 'modules/action/action'

  class GroupAction extends Action
    constructor: (@canvas, @_objects) ->

    execute: () =>
      @_group = @canvas.createGroup @_objects

    undo: () =>
      @canvas.breakGroup @_group
      # @canvas.removeObjects @_group
      # @canvas.addObjects @_objects