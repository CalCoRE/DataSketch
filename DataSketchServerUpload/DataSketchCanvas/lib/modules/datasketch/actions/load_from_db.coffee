define (require) ->
  Action = require 'modules/action/action'

  #Action for loading file from server.
  class LoadFromDbAction extends Action
    constructor: (@canvas, @_Action) ->

    #Method for loading file from server on canvas.
    execute: () =>
      Promise.resolve (() =>        
        @canvas.loadFromDb @_Action
      )()