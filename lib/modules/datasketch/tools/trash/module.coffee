define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  TrashTool = require './tool'

  class TrashToolModule extends Module
    constructor: () ->
      super()
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>
      if meta.id is "trash"
        list.push new TrashTool
      list