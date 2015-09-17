define (require) ->
  EventDispatcher = require 'core/event/dispatcher'

  class ActionHistory extends EventDispatcher
    constructor: () ->
      @_history = []

    execute: (action) =>
      action.execute()
        .then () =>
          @_history.push action
          @dispatchEvent 'ActionHistory.ActionAdded',
            action: action

    undo: () =>
      action = @_history.pop()
      action.undo()
        .then () =>
          @dispatchEvent 'ActionHistory.ActionUndone',
            action: action