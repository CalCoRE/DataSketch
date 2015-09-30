define (require) ->
  Action = require 'modules/action/action'

  class UngroupAction extends Action
    constructor: (@canvas, @_group) ->

    execute: () =>
      Promise.resolve (() =>
        @_objects = @canvas.breakGroup @_group
      )()

    undo: () =>
      Promise.resolve (() =>
        @canvas.createGroup @_objects
      )()