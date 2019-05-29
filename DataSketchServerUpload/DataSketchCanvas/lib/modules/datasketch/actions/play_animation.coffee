define (require) ->
  Action = require 'modules/action/action'

  #Action for start playing animation on object or group on canvas.
  class PlayAnimationAction extends Action
    constructor: (@_animator) ->

    #Method for calling animation play method on canvas.
    execute: () =>
      new Promise (resolve, reject) =>
        @_animator.reset()
        @_animator.play()
        resolve true

    undo : =>