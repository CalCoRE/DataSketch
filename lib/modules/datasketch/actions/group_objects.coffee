define (require) ->
  Action = require 'modules/action/action'

  class GroupAction extends Action
    constructor: (@canvas, @_objects) ->

    execute: () =>
      Promise.resolve (() =>
        @_group = @canvas.createGroup @_objects
      )()

    undo: () =>
      Promise.resolve (() =>
        @canvas.breakGroup @_group
      )()
