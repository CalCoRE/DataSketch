define (require) ->
  $ = require 'jquery'
  DomView = require 'core/view/dom_view'
  Globals = require 'core/model/globals'
  Template = require 'text!./view.html'

  Fabric = require 'thirdparty/fabric'
  require 'link!./style.css'

  class DSCanvasView extends DomView
    constructor: () ->
      super Template

    startCanvas: () =>
      @_fabric = new Fabric.Canvas @$el.find('.canvas-main')[0]
      @_fabric.isDrawingMode = true
      Globals.get('Relay').addEventListener 'Window.Resize', @updateDimensions
      @updateDimensions()

    updateDimensions: () =>
      @_fabric.setDimensions
        width: $(window).width()
        height: $(window).height()
