define (require) ->
  Action = require 'modules/action/action'

  class RemoveCalibrationAction extends Action
    constructor: (@canvas) ->

    execute: () =>       
         @canvas.removeProperty()