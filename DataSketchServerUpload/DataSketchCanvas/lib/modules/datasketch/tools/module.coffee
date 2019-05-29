define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  Globals = require 'core/model/globals'
  Toolbar = require 'modules/toolkit/toolbar/toolbar'

  class DSToolsModule extends Module
    constructor: () ->
      super()

    buildToolbars: () =>      
      toolbars =
        stroke: new Toolbar
          modelData:
            id: "stroke"
        color: new Toolbar
          modelData:
            id: "color"
        mode: new Toolbar
          modelData:
            id: "mode"
        trash: new Toolbar
          modelData:
            id: "trash"
        objectoverlay: new Toolbar
          modelData:
            id: "objectoverlay"
        shape: new Toolbar
          modelData:
            id: "shape"
        snapgrid: new Toolbar
          modelData:
            id: "snapgrid"
        markAsOrigin: new Toolbar
          modelData:
            id: "markAsOrigin"
        LoadSave: new Toolbar
          modelData:
            id: "LoadSave"
        LoadFile: new Toolbar
          modelData:
            id: "LoadFile"
        ModalInput: new Toolbar
          modelData:
            id: "savecanvas"
        calibrationAndManipulation: new Toolbar
          modelData:
            id: "calibrationandmanipulation"
        ###CreateFile: new Toolbar
          modelData:
            id: "CreateFile"###

      toolbars

    buildViewToolbars: () =>      
      toolbars =
        mode: new Toolbar
          modelData:
            id: "mode"
      toolbars


    init: () =>
      if window.currentSketchMode == 'view'
         @toolbars = @buildViewToolbars()
      else
         @toolbars = @buildToolbars()
      appView = Globals.get('App.view')
      for id, tb of @toolbars
        appView.addChild tb.view()       

    run: () =>
      for id, tb of @toolbars
        tb.build()
      @_model = Globals.get('Canvas')._model;
      if @_model
         if @_model._data.objects.length>0
            $('.tool.SaveCanvas').show()
      if window.currentSketchMode == 'view'
        $('.tool.modeSelect-draw').hide()
        $('.tool.modeSelect-data').hide()
      