define (require) ->
  Model = require 'core/model/model'

  class DSObject extends Model
    constructor: (settings) ->
      super settings

      @addEventListener 'Model.Change', @_onChange
      @_bindViewEvents()

    _onChange: (evt) =>
      if evt.data.path == "view"
        @_bindViewEvents()
      if evt.data.path == "disabled"
        v = @get('view')
        v.selectable = !evt.data.value
        v.hasControls = !evt.data.value
        v.hasRotatingPoint = !evt.data.value
        v.opacity = if evt.data.value then 0.5 else 1

    _bindViewEvents: () =>
      if @get('view')?
        @get('view').on("rotating", @_onRotation)
        @get('view').on("scaling", @_onScale)
        @get('view').on("moving", @_onMove)

    _onRotation: (evt) =>
      @set 'rotation', @get('view.angle')

    _onScale: (evt) =>
      @set 'scale.x', @get('view.scaleX')
      @set 'scale.y', @get('view.scaleY')

    _onMove: (evt) =>
      @set 'position.x', @get('view').getLeft()
      @set 'position.y', @get('view').getTop()

    getWidth: () =>
      @get('view').getWidth()

    getHeight: () =>
      @get('view').getHeight()

    disable: () =>
      @set 'disabled', true

    enable: () =>
      @set 'disabled', false
    
    setStrokeWidth: (width) =>
      @get('view').setStrokeWidth width

    setStrokeColor: (color) =>
      @get('view').setStroke color

    clone: () =>
      

  DSObject._count = 0
  DSObject