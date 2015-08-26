define (require) ->
  CanvasObject = require 'modules/datasketch/canvas/objects/base/object'
  Model = require './model'
  View = require './view'
  Matrix = require 'core/util/matrix'

  class GroupObject extends CanvasObject
    constructor: (settings) ->
      settings.modelClass ?= Model
      settings.viewClass ?= View

      super settings
      for child in @_model.get 'children'
        child.disableControls()
      @_calculatePosition()
      @_view.buildFabric @_model

    _calculatePosition: () =>
      dims = []
      for obj in @_model.get 'children'
        objDims = obj.getBounds()
        dims.push
          left: objDims.left + @_model.get('position.x')
          right: objDims.right + @_model.get('position.x')
          top: objDims.top + @_model.get('position.y')
          bottom: objDims.bottom + @_model.get('position.y')
      bounds = null
      for dim in dims
        bounds ?= dim
        bounds.left = Math.min(bounds.left, dim.left)
        bounds.right = Math.max(bounds.right, dim.right)
        bounds.top = Math.min(bounds.top, dim.top)
        bounds.bottom = Math.max(bounds.bottom, dim.bottom)

      position =
        x: (bounds.left + bounds.right) / 2
        y: (bounds.top + bounds.bottom) / 2
      @setPosition position
      groupTrans = @getTransform()
      for obj in @_model.get 'children'
        trans = obj.getTransform()
        obj.setTransform Matrix.multiplyTransformMatrices Matrix.invert(groupTrans), trans

    getObjects: () =>
      @_model.get('children')

    addObject: (obj) =>
      children = @_model.get("children")
      children.push obj
      obj.disableControls()
      @_model.set('children', children)

    removeObject: (obj) =>
      children = @_model.get("children")
      if obj in children
        children = children.splice children.indexOf(obj), 1
        @_model.set('children', children)

    break: () =>
      children = @_model.get 'children'
      groupTrans = @getTransform()
      for obj in children
        currTrans = obj.getTransform()
        obj.setTransform Matrix.multiplyTransformMatrices groupTrans, currTrans
      @_model.set 'children', []
      children

    enforcePosition: () =>
      for child in @_model.get('children')
        child.enforcePosition()
      super()

    enforceTransform: () =>
      for child in @_model.get('children')
        child.enforceTransform()
      super()

  GroupObject.createFromObjects = (objects) ->
    group = new GroupObject
      modelData:
        children: objects
    group

  GroupObject