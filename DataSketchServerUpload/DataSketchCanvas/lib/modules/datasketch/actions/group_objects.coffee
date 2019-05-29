define (require) ->
  Action = require 'modules/action/action'

  #Action for forming group of multiple object on canvas.
  class GroupAction extends Action
    constructor: (@canvas, @_objects) ->

    #Method for creating group from objects on canvas.
    execute: () =>
      Promise.resolve (() => 
        @_group = @canvas.createGroup @_objects
      )()

    #Method for reverting the objects from group.
    undo: () =>
      Promise.resolve (() =>
        @canvas.breakGroup @_group
      )()
