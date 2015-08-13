define (require) ->
  Model = require 'core/model/model'
  
  defaults =
    mode: 'draw'
    strokeWidth: 1
    strokeColor: "#000000"
    objects: []
    selected: []
    isolated: []

  class DSCanvasModel extends Model
    constructor: (data) ->
      super
        data: data
        defaults: defaults

    addObject: (object, silent=false) =>
      if @get('isolated').length
        @get('isolated')[0].addObject object
      else
        objs = @get('objects')
        objs.push object
        @set 'objects', objs

      if !silent
        @dispatchEvent 'Canvas.ObjectAdded',
          object: object
          container: @get('isolated')

    addObjects: (objects, silent=false) =>
      for obj in objects
        @addObject obj
      if !silent
        @dispatchEvent 'Canvas.ObjectsAdded',
          objects: objects
          container: @get('isolated')

    removeObject: (object, silent=false) =>
      if @get('isolated').length
        @get('isolated')[0].removeObject object
      else
        objs = @get('objects')
        if object in objs
          objs.splice objs.indexOf(object), 1
          @set 'objects', objs

      if !silent
        @dispatchEvent 'Canvas.ObjectRemoved',
          object: object
          container: @get('isolated')

    removeObjects: (objects, silent=false) =>
      for obj in objects
        @removeObject obj, true
      if !silent
        @dispatchEvent 'Canvas.ObjectsRemoved',
          objects: objects
          container: @get('isolated')

    removeSelected: () =>
      @removeObjects @get('selected')
      @set 'selected', []

    isolate: (group) =>
      isoGroups = (grp.getObjects() for grp in @get('isolated'))
      isoGroups.push @get('objects')
      collection = if !group? then isoGroups[1] else isoGroups[0]
      for obj in collection when obj != group
        if group?
          obj.disable()
        else
          obj.enable()
      if group?
        @get('isolated').unshift group
      else
        @get('isolated').shift()
      @set 'isolated', @get('isolated')
