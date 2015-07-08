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
      toolbars

    init: () =>
      @toolbars = @buildToolbars()
      appView = Globals.get('App.view')
      for id, tb of @toolbars
        appView.addChild tb.view()

    run: () =>
      for id, tb of @toolbars
        tb.build()