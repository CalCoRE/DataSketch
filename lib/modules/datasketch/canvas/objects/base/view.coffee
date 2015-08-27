define (require) ->
  View = require 'core/view/view'

  class CanvasObjectView extends View
    constructor: (model) ->
      super()

      model.addEventListener 'Model.Change', @_onChange

    _onChange: (evt) =>
      switch evt.data.path
        when "rotation"
          @_fabric?.set 'angle', evt.data.value
        when "scale"
          @_fabric?.set 'scaleX', evt.data.value.x
          @_fabric?.set 'scaleY', evt.data.value.y
        when "position"
          @_fabric?.set 'left', evt.data.value.x
          @_fabric?.set 'top', evt.data.value.y
        when "controllable"
          @_fabric?.hasControls = evt.data.value
          @_fabric?.hasBorders = evt.data.value
          @_fabric?.selectable = evt.data.value
          @_fabric.setCoords()
        when "disabled"
          @_fabric.opacity = if evt.data.value then 0.25 else 1

    buildFabric: () =>

    getFabric: () =>
      @_fabric

    setFabric: (fabric, model) =>
      @_fabric = fabric
      @_fabric.set 'left', model.get 'position.x'
      @_fabric.set 'top', model.get 'position.y'
      @_fabric.set 'angle', model.get 'rotation'
      @_fabric.set 'scaleX', model.get 'scale.x'
      @_fabric.set 'scaleY', model.get 'scale.y'
      @_fabric.on "rotating", @_onRotating
      @_fabric.on "scaling", @_onScaling
      @_fabric.on "moving", @_onMoving

    enforceTransform: (model) =>
      @_fabric?.left = model.get('position.x')
      @_fabric?.top = model.get('position.y')
      @_fabric?.angle = model.get('rotation')
      @_fabric?.scaleX = model.get('scale.x')
      @_fabric?.scaleY = model.get('scale.y')
      @_fabric.setCoords()

    extractTransform: () =>
      transform =
        position:
          x: @_fabric.left
          y: @_fabric.top
        rotation: @_fabric.angle
        scale:
          x: @_fabric.scaleX
          y: @_fabric.scaleY

    _onRotating: (e) =>
      @dispatchEvent 'CanvasObject.Rotating',
        rotation: @_fabric.angle

    _onScaling: (e) =>
      @dispatchEvent 'CanvasObject.Scaling',
        scale:
          x: @_fabric.scaleX
          y: @_fabric.scaleY
        position:
          x: @_fabric.left
          y: @_fabric.top

    _onMoving: (e) =>
      @dispatchEvent 'CanvasObject.Moving',
        position:
          x: @_fabric.left
          y: @_fabric.top
