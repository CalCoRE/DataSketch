define (require) ->
  Controller = require 'core/controller/controller'
  View = require './view'
  Model = require './model'

  class DSCanvas extends Controller
    constructor: (config) ->
      config ?= {}
      config.modelClass ?= Model
      config.viewClass ?= View

      super config

      @_model.addEventListener 'Model.Change', @_onModelChange

    getMode: () =>
      @_model.get 'mode'

    setMode: (mode) =>
      @_model.set 'mode', mode

    getStrokeWidth: () =>
      @_model.get 'strokeWidth'

    setStrokeWidth: (width) =>
      @_model.set 'strokeWidth', width

    getStrokeColor: () =>
      @_model.get 'strokeColor'

    setStrokeColor: (color) =>
      @_model.set 'strokeColor', color

    _onModelChange: (evt) =>
      switch evt.data.path
        when "strokeWidth"
          @dispatchEvent "Canvas.StrokeWidthChange",
            width: evt.data.value
        when "mode"
          @dispatchEvent "Canvas.ModeChange",
            mode: evt.data.value
        when "strokeColor"
          @dispatchEvent "Canvas.StrokeColorChange",
            color: evt.data.value

    initCanvas: () =>
      @_view.initCanvas @_model