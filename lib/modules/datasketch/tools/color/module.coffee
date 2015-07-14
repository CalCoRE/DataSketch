define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  ColorTool = require './tool'

  colors = [
    "000000"
    "ffffff"
    "ff0000"
    "00ff00"
    "0000ff"
    "ffff00"
    "ff00ff"
    "00ffff"
  ]

  class ColorToolModule extends Module
    constructor: () ->
      super()
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>
      if meta.id is "color"
        for color in colors
          list.push new ColorTool color
      list