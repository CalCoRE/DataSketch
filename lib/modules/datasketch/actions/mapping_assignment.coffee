define (require) ->
  Action = require 'modules/action/action'

  class MappingAssignmentAction extends Action
    constructor: (@_object, @_objectProperty, @_dataProperty) ->

    execute: () =>
      @_objectProperty.calibrate @_object, @_dataProperty
        .then (calibration) =>
          console.log calibration
          @_object.addPropertyMapping @_objectProperty, @_dataProperty, calibration
        .catch (error) =>
          if error.name != "FormCanceledError"
            throw error

    undo: () =>
      @_object.removePropertyMapping @_objectProperty, @_dataProperty
