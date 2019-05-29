define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  ColorAction = require 'modules/datasketch/actions/set_color'
  Globals = require 'core/model/globals'
  View = require './view'

  require 'link!./style.css'

  class ColorTool extends Tool
    constructor: (@_id,color) ->
      super        
        viewClass: View
        modelData:
          id: "color-#{@_id}"
          color: "#{color}"
          tooltip: "color-#{@_id}"
            
      if @_id == "stroke"
        Globals.get('Canvas').addEventListener "Canvas.StrokeColorChange", @_onCanvasChange
      else
        Globals.get('Canvas').addEventListener "Canvas.FillColorChange", @_onCanvasChange

      if cc = Globals.get('Canvas').getStrokeColor()
        @toggleActiveDisplay cc == @_model.get 'color'
      else
        @toggleActiveDisplay @_model.get('color') == "#000000"

    generateAction: () =>      
      new ColorAction Globals.get('Canvas'), @_model.get 'color', @_id

    _onCanvasChange: (evt) =>      
      if evt.currentTarget._view._fabric._activeObject  
          if @_id == "stroke"      
             @_color = evt.currentTarget._view._fabric._activeObject.stroke
             @_model.set 'color',@_color
          else        
            @_color = evt.currentTarget._view._fabric._activeObject.fill
            @_model.set 'color',@_color
          @toggleActiveDisplay @_model.get('color') == @_color  