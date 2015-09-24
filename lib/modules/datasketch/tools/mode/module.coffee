define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  ModeSelectTool = require './tool'
  Globals = require 'core/model/globals'

  class ModeToolModule extends Module
    constructor: () ->
      super()
      HM.hook 'Toolbar.Tools', @_toolbarTools

    run: () =>
      Globals.get('Canvas').addEventListener 'Canvas.ModeChange', @_onModeChange

    _toolbarTools: (list, meta) =>
      if meta.id is "mode"
        list.push new ModeSelectTool 'draw'
        list.push new ModeSelectTool 'select'
      list

    _onModeChange: (evt) =>
      if evt.data.mode in ['draw', 'select']
        Globals.get('Canvas').enableControls()
