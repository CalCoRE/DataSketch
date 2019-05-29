define (require) ->
  Action = require 'modules/action/action'
  PropertyMap = require 'modules/datasketch/animation/property_map'
  HM = require 'core/event/hook_manager'

  #Action for applying animation property to an object or group on canvas.
  class ObjectManipulationAction extends Action    
    constructor: (@canvas) ->

    #Method for applying animation on group or object of canvas.
    execute: () =>     
      @canvas.onChangeMinMaxSlider()     