define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  NewFileTool = require './tool'

  class StrokeToolModule extends Module
    constructor: () ->
      super()
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>
      if meta.id is "CreateFile"
        list.push new NewFileTool "CreateFile"
      list