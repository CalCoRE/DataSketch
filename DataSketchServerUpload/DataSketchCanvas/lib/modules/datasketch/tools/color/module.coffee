define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  ColorTool = require './tool'

  colors = [
    "stroke",
    "fill"
  ]

  class ColorToolModule extends Module
    constructor: () ->      
      super()      
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>
      if meta.id is "color"
        for id in colors
          list.push new ColorTool id, "#000"
      list   