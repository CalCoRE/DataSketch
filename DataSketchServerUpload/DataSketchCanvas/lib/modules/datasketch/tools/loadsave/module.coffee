define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  LoadSaveTool = require './tool'

  class LoadSaveToolModule extends Module
    constructor: () ->
      super()
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>
      if meta.id is "LoadSave"
        list.push new LoadSaveTool "SaveCanvas"
        list.push new LoadSaveTool "LoadCanvas"
      list