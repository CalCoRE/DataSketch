define (require) ->
  DSObject = require './object'

  defaults =
    id: 0
    objects: []
    view: null

  class Group extends DSObject
    constructor: (objects) ->
      DSObject._count += 1
      
      super
        data:
          id: DSObject._count
          objects: objects
        defaults: defaults

    getObjects: () =>
      @get 'objects'
