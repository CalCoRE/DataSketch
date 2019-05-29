define (require) ->
  
  class Action
    execute: () =>
      Promise.resolve true

    undo: () =>
      Promise.resolve true