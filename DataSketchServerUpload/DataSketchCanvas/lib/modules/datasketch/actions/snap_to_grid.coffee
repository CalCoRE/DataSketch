define (require) ->
  Action = require 'modules/action/action'

  #Action for changing the mode between simple and grid mode.
  class snaptogrid extends Action
    constructor: (@canvas) ->

    #Method for switch mode between simple and grid.
    execute: () =>
      Promise.resolve (() =>         
         @canvas.snapToGrid()
      )()   