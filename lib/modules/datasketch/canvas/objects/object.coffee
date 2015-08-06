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

  DSObject._count = 0
  DSObject