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
        obj.enforceTransform()
        objDims = obj.getBounds()
        dims.push
          left: objDims.left
          right: objDims.right
          top: objDims.top
          bottom: objDims.bottom
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
        obj.enforceTransform()

    getObjects: () =>
      @_model.get('children')

    addObject: (obj) =>
      children = @_model.get("children")
      children.push obj
      if !@_model.get 'isolated'
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
        obj.enableControls()
      @_model.set 'children', []
      children

    enforceTransform: () =>
      for child in @_model.get('children')
        child.enforceTransform()
      super()

    isolate: () =>
      children = @_model.get 'children'
      groupTrans = @getTransform()
      for obj in children
        currTrans = obj.getTransform()
        obj.setTransform Matrix.multiplyTransformMatrices groupTrans, currTrans
        obj.enableControls()
      @_model.set 'isolated', true

    reform: () =>
      for child in @_model.get 'children'
        child.disableControls()
      @_calculatePosition()
      @_view.buildFabric @_model
      @_model.set 'isolated', false

    clone: () =>
      Promise.all (child.clone() for child in @_model.get('children'))
        .then (childClones) =>
          clone = GroupObject.createFromObjects childClones
          clone.setTransform @getTransform()
          clone

    disable: () =>
      for child in @_model.get 'children'
        child.disable()
      super()

    enable: () =>
      for child in @_model.get 'children'
        child.enable()
      super()

    enableControls: () =>
      for child in @_model.get 'children'
        child.enableControls()
      super()

    disableControls: () =>
      for child in @_model.get 'children'
        child.disableControls()
      super()

    setStrokeColor: (color) =>
      for child in @_model.get 'children'        
        child.setStrokeColor color

    ###setFillColor: (color) =>
      for child in @_model.get 'children'        
        child.setFillColor color###

    setStrokeWidth: (width) =>
      for child in @_model.get 'children'
        child.setStrokeWidth width

    animate: (playhead, timeDelta, datastore) =>
      for child in @_model.get('children')
        child.animate playhead, timeDelta, datastore
      super playhead, timeDelta, datastore

  GroupObject.createFromObjects = (objects) ->
    group = new GroupObject
      modelData:
        children: objects
    group

  GroupObject