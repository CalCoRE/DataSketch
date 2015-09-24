define (require) ->
  Action = require 'modules/action/action'
  PropertyMap = require 'modules/datasketch/animation/property_map'

  class MappingAssignmentAction extends Action
    constructor: (@_object, @_objectProperty, @_dataProperty) ->

    execute: () =>
      if @_dataProperty?
        @_objectProperty.calibrate @_object, @_dataProperty
          .then (calibration) =>
            @_map = new PropertyMap
              objectProperty: @_objectProperty
              dataProperty: @_dataProperty
              calibration: calibration
            @_object.addPropertyMapping @_map
          .catch (error) =>
            if error.name != "FormCanceledError"
              throw error
      else
        Promise.resolve @_object.removePropertyMapping @_objectProperty

    undo: () =>
      if @_dataProperty?
        Promise.resolve @_object.removePropertyMapping @_objectProperty
      