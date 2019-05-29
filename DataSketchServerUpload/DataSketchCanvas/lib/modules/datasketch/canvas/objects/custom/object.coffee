define (require) ->
  CanvasObject = require 'modules/datasketch/canvas/objects/base/object'
  Model = require './model'
  View = require './view'
  
  class CustomObject extends CanvasObject
    constructor: (settings = {}) ->
      settings.modelClass ?= Model
      settings.viewClass ?= View

      super settings

    buildFromFabric: (fabric) =>
      @_model.parseFabric fabric
      ##@_view.setFabric fabric, @_model
      ##fabric.date._set 'id', @_model.get('id')

    clone: () =>
      @_view.cloneFabric()
        .then (fabClone) =>
          clone = PathObject.createFromFabric fabClone
          clone.setTransform @getTransform()
          clone

    setStrokeColor: (color) =>
      @_model.set 'stroke.color', color
      @_model.set 'fill.color', color
    
    #setFillColor: (color) =>
       
      

    setStrokeWidth: (width) =>
      @_model.set 'stroke.width', width

  CustomObject.createUsingFabric = (shape) ->
    ##shape.setCoords()
    customShape = new CustomObject
    customShape.buildFromFabric shape
    customShape        

  CustomObject