define (require) ->
  Action = require 'modules/action/action'

  class MappingAssignmentAction extends Action
    constructor: (@_object, @_objectProperty, @_dataProperty) ->

    execute: () =>
      @_object.addPropertyMapping @_objectProperty, @_dataProperty

    undo: () =>
      @_object.removePropertyMapping @_objectProperty, @_dataProperty
