define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  ModeSelectTool = require './tool'

  class ModeToolModule extends Module
    constructor: () ->
      super()
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>
      if meta.id is "mode"
        list.push new ModeSelectTool 'draw'
        list.push new ModeSelectTool 'select'
      list