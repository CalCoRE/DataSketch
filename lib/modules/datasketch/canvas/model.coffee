define (require) ->
  Model = require 'core/model/model'
  
  defaults =
    mode: 'draw'
    strokeWidth: 1
    strokeColor: "#000000"
    objects: []
    selected: []

  class DSCanvasModel extends Model
    constructor: (data) ->
      super
        data: data
        defaults: defaults

    addObject: (object, silent=false) =>
      objs = @get('objects')
      objs.push object
      @set 'objects', objs

      if !silent
        @dispatchEvent 'Canvas.ObjectAdded',
          object: object

    addObjects: (objects, silent=false) =>
      for obj in objects
        addPath obj
      if !silent
        @dispatchEvent 'Canvas.ObjectsAdded',
          objects: objects

    removeObject: (object, silent=false) =>
      objs = @get('objects')
      objs.splice objs.indexOf(object), 1
      @set 'objects', objs
      if !silent
        @dispatchEvent 'Canvas.ObjectRemoved',
          object: object

    removeObjects: (objects, silent=false) =>
      for obj in objects
        @removeObject obj, true
      if !silent
        @dispatchEvent 'Canvas.ObjectsRemoved',
          objects: objects

    removeSelected: () =>
      @removeObjects @get('selected')
      @set 'selected', []
