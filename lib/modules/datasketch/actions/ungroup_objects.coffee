define (require) ->
  Action = require 'modules/action/action'

  class UngroupAction extends Action
    constructor: (@canvas, @_group) ->

    execute: () =>
      @_objects = @canvas.breakGroup @_group

    undo: () =>
      @canvas.createGroup @_objects
