define (require) ->
  $ = require 'jquery'
  DomView = require 'core/view/dom_view'
  Globals = require 'core/model/globals'
  Template = require 'text!./view.html'

  Fabric = require 'thirdparty/fabric'
  require 'link!./style.css'

  class DSCanvasView extends DomView
    constructor: (model) ->
      super Template
      model.addEventListener 'Model.Change', @_onChange

    initCanvas: (model) =>
      @_fabric = new Fabric.Canvas @$el.find('.canvas-main')[0]
      @_fabric.isDrawingMode = true
      Globals.get('Relay').addEventListener 'Window.Resize', @updateDimensions
      @updateDimensions()

    updateDimensions: () =>
      @_fabric.setDimensions
        width: $(window).width()
        height: $(window).height()

    _onChange: (evt) =>
      switch evt.data.path
        when "mode"
          @_onChangeMode evt.data.value
        when "strokeWidth"
          @_fabric.freeDrawingBrush.width = evt.data.value
        when "strokeColor"
          @_fabric.freeDrawingBrush.color = evt.data.value

    _onChangeMode: (val) =>
      switch val
        when "select"
          @_fabric.isDrawingMode = false
        when "draw"
          @_fabric.isDrawingMode = true
