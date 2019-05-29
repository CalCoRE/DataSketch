define (require) ->
  Action = require 'modules/action/action'

  #Action for mark as origin mechanism.
  class MarkAsOrigin extends Action
    constructor: (@canvas, @originX, @originY,@isMultiObject) ->

    #Method for set active object origin according to an input.
    execute: () =>        
       @canvas.updateObjectOrigin @originX, @originY, @isMultiObject