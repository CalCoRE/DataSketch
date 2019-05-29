define (require) ->
  Action = require 'modules/action/action'

  #Action for change of grid size on slider input.
  class SliderInput extends Action
    constructor: (@canvas,@Value) ->

    #Method for changing the size of a grid on change of slider input value.
    execute: () =>
      Promise.resolve (() =>         
         @canvas.manageGrid(@Value)
      )()   