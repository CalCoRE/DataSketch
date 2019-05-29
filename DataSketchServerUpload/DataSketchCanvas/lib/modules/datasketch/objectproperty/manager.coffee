define (require) ->
  Controller = require 'core/controller/controller'
  View = require './view'
  Model = require 'core/model/model'
  Globals = require 'core/model/globals'

  class ContextMenuManager extends Controller
    constructor: (settings = {}) ->
      settings.viewClass ?= View
      settings.modelClass ?= Model
      settings.modelData ?=
        display: false
        menu: null
      super settings

    display: (menu) =>      
      @_model.set 'menu', menu
      @_model.set 'display', true
      canvas = Globals.get('Canvas')
      $('#x .menu-label').on 'click', -> canvas.objectPropertyMenu("X")
      $('#y .menu-label').on 'click', -> canvas.objectPropertyMenu("Y")
      $('#width .menu-label').on 'click', -> canvas.objectPropertyMenu("Width")
      $('#height .menu-label').on 'click', -> canvas.objectPropertyMenu("Height")
      $('#rotation .menu-label').on 'click', -> canvas.objectPropertyMenu("Rotation")
      $('#scale .menu-label').on 'click', -> canvas.objectPropertyMenu("Scale")
      $('#color .menu-label').on 'click', -> canvas.objectPropertyMenu("Color")
      $('#transparency .menu-label').on 'click', -> canvas.objectPropertyMenu("Transparency")
      $('#stamping .menu-label').on 'click', -> canvas.objectPropertyMenu("Stamping")
      

    close: () =>
      @_model.set 'display', false