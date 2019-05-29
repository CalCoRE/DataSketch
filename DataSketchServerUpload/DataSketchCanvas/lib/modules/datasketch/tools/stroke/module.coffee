define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  StrokeTool = require './tool'

  class StrokeToolModule extends Module
    constructor: () ->
      super()
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>
      if meta.id is "stroke"
        list.push new StrokeTool 1
        list.push new StrokeTool 3
        list.push new StrokeTool 5
        list.push new StrokeTool 7
        list.push new StrokeTool 9
      list