define (require) ->
  CanvasObject = require 'modules/datasketch/canvas/objects/base/object'
  Model = require './model'
  View = require './view'
  Globals = require 'core/model/globals'
  class PathObject extends CanvasObject
    constructor: (settings = {}) ->
      settings.modelClass ?= Model
      settings.viewClass ?= View

      super settings

    buildFromFabric: (fabric) =>      
      @_model.parseFabric fabric
      @_view.setFabric fabric, @_model
      #Restrict fabric from set id of an object if an object is of a grid type.
      #window.currentId for checking new generated id of an object.            
      if window.currentId > @_model.get('id')
         id = window.currentId + 1         
      else
         id = @_model.get('id')   

      if window.currentId < id
         window.currentId = id
         @_model.set 'id', id   

      if !fabric.newId && window.currentId < fabric.newId
         window.currentId = fabric.newId  
         @_model.set 'id', fabric.newId
  
      if fabric.id != "grid" && !fabric.newId
         fabric.set 'id', id
      else 
         fabric.set 'id', fabric.newId

      if fabric.id == "grid"
         @_model.set 'id', 'grid'     

    #object cloning function for making clone of an object.
    clone: (@_ObjectType) =>
     #Checking the type of object we have to clone for calling clone method.
      if @_view._fabric.type == "path"
         @_view.cloneFabric(@_ObjectType)
            .then (fabClone) =>
               clone = PathObject.createFromFabric fabClone
               clone.setTransform @getTransform()
               clone
      else
        fabClone = @_view.cloneFabric(@_ObjectType) 
        clone = PathObject.createFromFabric fabClone
        clone.setTransform @getTransform()
        clone
    

    setStrokeColor: (color) =>
      if Array.isArray(color)
        if color[0].id == "color-fill"
          @_model.set 'fill.color', color[1]            
        else            
          @_model.set 'stroke.color', color[1]
      else 
        jsonObj = Globals.get('Canvas').getObjects()
        pathObj = jsonObj.filter((data) => return data._view._fabric.id == @_model._data.id)
        if pathObj[0]._view._fabric.type != "path"
          @_model.set 'stroke.color', color
          @_model.set 'fill.color', color
        else
          @_model.set 'stroke.color', color
      
    setStrokeWidth: (width) =>
      @_model.set 'stroke.width', width

  #Method for creating path object from fabric object.
  PathObject.createFromFabric = (fabric) ->
    fabric.setCoords()    
    path = new PathObject
    path.buildFromFabric fabric
    path

  PathObject