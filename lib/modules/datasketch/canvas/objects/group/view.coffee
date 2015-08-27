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

      positions = {}
      for obj in model.get 'children'
        v = obj.getFabric()
        positions[obj.getId()] = obj.getPosition()
        if v.group?
          center ?= v.group.getCenterPoint()
        else
          bb = v.getBoundingRect()
          dims.left = if dims.left? then Math.min(bb.left, dims.left) else bb.left
          dims.right = if dims.right? then Math.max(bb.left + bb.width, dims.right) else bb.left + bb.width
          dims.top = if dims.top? then Math.min(bb.top, dims.top) else bb.top
          dims.bottom = if dims.bottom? then Math.max(bb.top + bb.height, dims.bottom) else bb.top + bb.height
        fabric.addWithUpdate v
        v.remove()
      if !center?
        center =
          x: (dims.left + dims.right) / 2
          y: (dims.top + dims.bottom) / 2
      for obj in model.get 'children'
        obj.getFabric().setCoords()
      fabric.set 'id', model.get('id')

      @setFabric fabric, model
      @dispatchEvent "CanvasObject.FabricGenerated",
        fabric: fabric
        old_fabric: old
