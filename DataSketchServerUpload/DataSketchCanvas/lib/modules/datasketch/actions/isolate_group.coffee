define (require) ->
  Action = require 'modules/action/action'

  #Action for transforming group in to isolation mode.
  class IsolateGroupAction extends Action
    constructor: (@canvas, @_group) ->

    #Method for creating a isolation of group on canvas.
    execute: () =>
      Promise.resolve (() =>
        @_last = @canvas.getIsolation()
        @canvas.isolate @_group
      )()

    #Method for exit isolation mode of a group on canvas.
    undo: () =>
      Promise.resolve (() =>
        @canvas.setIsolation @_last
      )()