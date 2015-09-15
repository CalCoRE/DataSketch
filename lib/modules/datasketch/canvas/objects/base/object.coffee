define (require) ->
  Controller = require 'core/controller/controller'
  Model = require './model'
  View = require './view'
  Matrix = require 'core/util/matrix'

  class CanvasObject extends Controller
    constructor: (settings = {}) ->
      CanvasObject._count += 1
      settings.modelData ?= {}
      settings.modelData.id = CanvasObject._count

      settings.modelClass ?= Model
      settings.viewClass ?= View

      super settings

      @_view.addEventListener "CanvasObject.Rotating", @_onRotating
      @_view.addEventListener "CanvasObject.Scaling", @_onScaling
      @_view.addEventListener "CanvasObject.Moving", @_onMoving

    getId: () =>
      @_model.get('id')

    getFabric: () =>
      @view().getFabric()

    enable: () =>
      @_model.enable()

    disable: () =>
      @_model.disable()

    enableControls: () =>
      @_model.set 'controllable', true, true

    disableControls: () =>
      @_model.set 'controllable', false, true

    getPosition: () =>
      @_model.get 'position'

    setPosition: (position) =>
      @_model.set 'position', position

    enforceTransform: () =>
      @_view.enforceTransform @_model

    extractTransform: () =>
      transform = @_view.extractTransform()
      @_model.set "position", transform.position
      @_model.set "rotation", transform.rotation
      @_model.set "scale", transform.scale

    getRotation: () =>
      @_model.get 'rotation'

    setRotation: (rotation) =>
      @_model.set 'rotation', rotation

    getScale: () =>
      @_model.get 'scale'

    setScale: (scale) =>
      @_model.set 'scale', scale

    getTransform: () =>
      transform =
        position: @getPosition()
        rotation: @getRotation() / 180 * Math.PI
        scale: @getScale()
      posMtx =
        [
          [1, 0, transform.position.x]
          [0, 1, transform.position.y]
          [0, 0, 1]
        ]
      rotMtx =
        [
          [Math.cos(transform.rotation), -Math.sin(transform.rotation), 0]
          [Math.sin(transform.rotation), Math.cos(transform.rotation), 0]
          [0, 0, 1]
        ]
      sclMtx =
        [
          [transform.scale.x, 0, 0]
          [0, transform.scale.y, 0]
          [0, 0, 1]
        ]
      Matrix.multiplyTransformMatrices posMtx, sclMtx, rotMtx

    setTransform: (mtx) =>
      radians = Math.atan2(-mtx[0][1], mtx[0][0])
      transform =
        position:
          x: mtx[0][2]
          y: mtx[1][2]
        rotation: radians / Math.PI * 180
        scale:
          x: (mtx[0][0] / Math.abs(mtx[0][0])) * Math.sqrt(Math.pow(mtx[0][0], 2) + Math.pow(mtx[0][1], 2))
          y: (mtx[1][1] / Math.abs(mtx[1][1])) * Math.sqrt(Math.pow(mtx[1][0], 2) + Math.pow(mtx[1][1], 2))
      transform.scale.x *= Math.cos(radians) / Math.abs(Math.cos(radians))
      transform.scale.y *= Math.cos(radians) / Math.abs(Math.cos(radians))

      @setPosition transform.position
      @setRotation transform.rotation
      @setScale transform.scale

    getBounds: () =>
      rect = @getFabric().getBoundingRect()
      bounds =
        left: rect.left
        right: rect.left + rect.width
        top: rect.top
        bottom: rect.top + rect.height

    clone: () =>

    addPropertyMapping: (objectProperty, dataProperty, calibration) =>
      @_model.addPropertyMapping objectProperty, dataProperty, calibration

    removePropertyMapping: (objectProperty, dataProperty, calibration) =>
      @_model.removePropertyMapping objectProperty, dataProperty, calibration

    getPropertyMappings: () =>
      @_model.get 'propertyMappings'

    _onRotating: (evt) =>
      @setRotation evt.data.rotation

    _onScaling: (evt) =>
      @setScale evt.data.scale
      @setPosition evt.data.position

    _onMoving: (evt) =>
      @setPosition evt.data.position

  CanvasObject._count = 0
  CanvasObject