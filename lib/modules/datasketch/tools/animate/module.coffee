define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  PlayTool = require './tools/play'

  class TrashToolModule extends Module
    constructor: () ->
      super()
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>
      if meta.id is "mode"
        list.push new PlayTool
      list