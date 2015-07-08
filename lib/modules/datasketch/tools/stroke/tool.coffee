define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  StrokeAction = require './action'
  Globals = require 'core/model/globals'

  require 'link!./style.css'

  class StrokeTool extends Tool
    constructor: (@_strokeWidth) ->
      super
        modelData:
          id: "stroke-#{@_strokeWidth}"

      Globals.get('Canvas').addEventListener "Canvas.StrokeWidthChange", @_onCanvasChange
      @toggleActiveDisplay Globals.get('Canvas').getStrokeWidth() == @_strokeWidth

    generateAction: () =>
      new StrokeAction Globals.get('Canvas'), @_strokeWidth

    _onCanvasChange: (evt) =>
      @toggleActiveDisplay @_strokeWidth == evt.data.width