define (require) ->
  Action = require 'modules/action/action'

  #Action for separate out objects from group.
  class UngroupAction extends Action
    constructor: (@canvas, @_group) ->

    #Method for separate out objects from group.
    execute: () =>
      Promise.resolve (() =>
        @_objects = @canvas.breakGroup @_group
      )()

    #Method for revert the changes which are done by execute method.
    undo: () =>
      Promise.resolve (() =>
        @canvas.createGroup @_objects
      )()