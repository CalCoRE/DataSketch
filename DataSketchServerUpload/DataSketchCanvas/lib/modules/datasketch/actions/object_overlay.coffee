define (require) ->
  Action = require 'modules/action/action'

  #Action for changing the mode between simple and grid mode.
  class objectoverlay extends Action
    constructor: (@canvas,@operation) ->

    #Method for switch mode between simple and grid.
    execute: () =>
      Promise.resolve (() =>         
         @canvas.overlayObject(@operation)
      )()   