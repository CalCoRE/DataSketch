define (require) ->
  Action = require 'modules/action/action'

  class PlayAnimationAction extends Action
    constructor: (@_animator) ->

    execute: () =>
      new Promise (resolve, reject) =>
        @_animator.reset()
        @_animator.play()
        resolve true

    undo: () =>
    
