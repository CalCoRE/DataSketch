define (require) ->
  EventDispatcher = require 'core/event/dispatcher'

  class ActionHistory extends EventDispatcher
    constructor: () ->
      @_history = []

    execute: (action) =>
      action.execute()
      @_history.push action

    undo: () =>
      @_history.pop().undo()