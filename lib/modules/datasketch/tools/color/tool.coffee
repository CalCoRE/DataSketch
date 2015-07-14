define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  ColorAction = require './action'
  Globals = require 'core/model/globals'
  View = require './view'

  require 'link!./style.css'

  class ColorTool extends Tool
    constructor: (color) ->
      super
        viewClass: View
        modelData:
          id: "color-#{color}"
          color: "##{color}"

      Globals.get('Canvas').addEventListener "Canvas.StrokeColorChange", @_onCanvasChange
      if cc = Globals.get('Canvas').getStrokeColor()
        @toggleActiveDisplay cc == @_model.get 'color'
      else
        @toggleActiveDisplay @_model.get('color') == "#000000"

    generateAction: () =>
      new ColorAction Globals.get('Canvas'), @_model.get 'color'

    _onCanvasChange: (evt) =>
      @toggleActiveDisplay @_model.get('color') == evt.data.color