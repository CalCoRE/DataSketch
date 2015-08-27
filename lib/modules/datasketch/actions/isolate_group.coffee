define (require) ->
  Action = require 'modules/action/action'

  class IsolateGroupAction extends Action
    constructor: (@canvas, @_group) ->

    execute: () =>
      @_last = @canvas.getIsolation()
      @canvas.isolate @_group

    undo: () =>
      @canvas.setIsolation @_last
