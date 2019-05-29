define (require) ->
  Action = require 'modules/action/action'
  PropertyMap = require 'modules/datasketch/animation/property_map'
  HM = require 'core/event/hook_manager'

  #Action for applying animation property to an object or group on canvas.
  class MappingAssignmentAction extends Action    
    constructor: (@_object, @_objectProperty, @_dataProperty) ->

    #Method for applying animation on group or object of canvas.
    execute: () =>
      if @_dataProperty?
           calibration= {}
           if @_objectProperty._model._data.id == "transparency"
             #calibration.max = if eval(window.objectPropertyMaximum / 100) == 0 then 1 else eval(window.objectPropertyMaximum / 100)
             #calibration.min = if eval(window.objectPropertyMinimum / 100) == 0 then 1 else eval(window.objectPropertyMinimum / 100)
             calibration.max = eval(window.objectPropertyMaximum / 100)
             calibration.min = eval(window.objectPropertyMinimum / 100)
           else
             calibration.max = window.objectPropertyMaximum
             calibration.min = window.objectPropertyMinimum

           window.objectProperty = @_objectProperty
           window.dataProperty = @_dataProperty
           window.calibration = calibration

           @_map = new PropertyMap
              objectProperty: @_objectProperty
              dataProperty: @_dataProperty
              calibration: calibration
           @_object.addPropertyMapping @_map
      else        
        Promise.resolve @_object.removePropertyMapping @_objectProperty
    
    #Method for removing animation property of object or group from canvas.
    undo: () =>
      if @_dataProperty?
        Promise.resolve @_object.removePropertyMapping @_objectProperty
      