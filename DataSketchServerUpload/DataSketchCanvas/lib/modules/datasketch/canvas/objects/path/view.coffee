define (require) ->
  CanvasObjectView = require 'modules/datasketch/canvas/objects/base/view'
  Fabric = require 'thirdparty/fabric'

  class PathView extends CanvasObjectView
    constructor: (model) ->
      super model

    _onChange: (evt) =>
      super evt      
      switch evt.data.path
        when "stroke.width"
          @_fabric?.strokeWidth = evt.data.value
        when "stroke.color"          
          @_fabric?.stroke = evt.data.value
        #set the value of an color of an object when fill.color event got triggered.
        when "fill.color"          
          if @_fabric
             @_fabric?.fill = evt.data.value
             @_fabric.setCoords()
          ##@_fabric?.active = true
          ##@_fabric.canvas.setActiveObject @_fabric

    buildFabric: () =>

    #Method got called for cloning of an object on canvas from object.coffee.
    cloneFabric: (@_ObjectType) =>
    #condition for checking the type of object we have to clone.
      if @_fabric.type == "path"        
        new Promise (resolve, reject) =>
            @_fabric.clone resolve
      else if @_fabric.type != "path"        
        @_fabric.clone()
     