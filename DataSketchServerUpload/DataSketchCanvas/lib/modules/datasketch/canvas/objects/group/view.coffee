define (require) ->
  CanvasObjectView = require 'modules/datasketch/canvas/objects/base/view'
  Fabric = require 'thirdparty/fabric'

  class GroupView extends CanvasObjectView
    constructor: (model) ->
      super model

    buildFabric: (model) =>      
      old = @_fabric
      fabric = new Fabric.Group

      fabric.originX = "center"
      fabric.originY = "center"
      center = null
      dims =
        left: null
        right: null
        top: null
        bottom: null
        stroke:null
      for obj in model.get 'children'
        v = obj.getFabric()
        bb = v.getBoundingRect()
        dims.left = if dims.left? then Math.min(bb.left, dims.left) else bb.left
        dims.right = if dims.right? then Math.max(bb.left + bb.width, dims.right) else bb.left + bb.width
        dims.top = if dims.top? then Math.min(bb.top, dims.top) else bb.top
        dims.bottom = if dims.bottom? then Math.max(bb.top + bb.height, dims.bottom) else bb.top + bb.height
        #dims.stroke = if dims.stroke? then bb.stroke
        fabric.addWithUpdate v
        v.remove() if v.canvas?
      if !center?
        center =
          x: (dims.left + dims.right) / 2
          y: (dims.top + dims.bottom) / 2
      for obj in model.get 'children'
        obj.getFabric().setCoords()
      #window.currentId for checking new generated id of an object.            
      if window.currentId > model.get('id')
         id = window.currentId + 1         
      else
         id = model.get('id')

      if window.currentId < id
         window.currentId = id
         model.set 'id', id   

      if !fabric.newId && window.currentId < fabric.newId
         window.currentId = fabric.newId  
         model.set 'id', fabric.newId

      if fabric.id != "grid" && !fabric.newId
         fabric.set 'id', id
      else
         fabric.set 'id', fabric.newId

      @setFabric fabric, model
      @dispatchEvent "CanvasObject.FabricGenerated",
        fabric: fabric
        old_fabric: old
