define (require) ->
  Action = require 'modules/action/action'

  #Action for load file from user side.
  class LoadFromFileAction extends Action
    constructor: (@canvas, @_Action) ->

    #Method for load file from user side.
    execute: () =>
      Promise.resolve (() =>        
        @canvas.loadFromFile @_Action
      )()