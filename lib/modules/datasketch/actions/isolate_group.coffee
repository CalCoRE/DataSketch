define (require) ->
  Action = require 'modules/action/action'

  class IsolateGroupAction extends Action
    constructor: (@canvas, @_group) ->

    execute: () =>
      Promise.resolve (() =>
        @_last = @canvas.getIsolation()
        @canvas.isolate @_group
      )()

    undo: () =>
      Promise.resolve (() =>
        @canvas.setIsolation @_last
      )()