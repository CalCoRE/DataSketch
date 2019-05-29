define (require) ->
  Action = require 'modules/action/action'

  #Action for management of active object property.
  class ObjectPropertyManager extends Action
    constructor: (@canvas, @_objects) ->

    #Method for managemenet of active object property.
    execute: () =>
      Promise.resolve (() =>         
         @canvas.objectPropertymanager @_objects
      )()