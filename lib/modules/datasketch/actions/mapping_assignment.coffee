define (require) ->
  Action = require 'modules/action/action'

  class MappingAssignmentAction extends Action
    constructor: (@_object, @_objectProperty, @_dataProperty) ->

    execute: () =>
      if @_dataProperty?
        @_objectProperty.calibrate @_object, @_dataProperty
          .then (calibration) =>
            @_object.addPropertyMapping @_objectProperty, @_dataProperty, calibration
          .catch (error) =>
            if error.name != "FormCanceledError"
              throw error
      else
        Promise.resolve @_object.removePropertyMapping @_objectProperty

    undo: () =>
      if @_dataProperty?
        Promise.resolve @_object.removePropertyMapping @_objectProperty, @_dataProperty
      