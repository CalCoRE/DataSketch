define (require) ->
  CanvasObject = require 'modules/datasketch/canvas/objects/base/object'
  Model = require './model'
  View = require './view'
  
  class PathObject extends CanvasObject
    constructor: (settings = {}) ->
      settings.modelClass ?= Model
      settings.viewClass ?= View

      super settings

    buildFromFabric: (fabric) =>
      @_model.parseFabric fabric
      @_view.setFabric fabric, @_model
      fabric.set 'id', @_model.get('id')

    clone: () =>
      @_view.cloneFabric()
        .then (fabClone) =>
          clone = PathObject.createFromFabric fabClone
          clone.setTransform @getTransform()
          clone

    setStrokeColor: (color) =>
      @_model.set 'stroke.color', color

    setStrokeWidth: (width) =>
      @_model.set 'stroke.width', width

  PathObject.createFromFabric = (fabric) ->
    fabric.setCoords()
    path = new PathObject
    path.buildFromFabric fabric
    path

  PathObject