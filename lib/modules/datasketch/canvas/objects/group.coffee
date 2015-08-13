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

    addObject: (obj) =>
      objects = @get 'objects'
      objects.push obj
      @set 'objects', objects

    removeObject: (object) =>
      objects = @get 'objects'
      if object in objects
        objects.splice objects.indexOf(obj), 1
      @set 'objects', objects

    setStrokeWidth: (width) =>
      for obj in @get('objects')
        obj.setStrokeWidth width

    setStrokeColor: (color) =>
      for obj in @get('objects')
        obj.setStrokeColor color
