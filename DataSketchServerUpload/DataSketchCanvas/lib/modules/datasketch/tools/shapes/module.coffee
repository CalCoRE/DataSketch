#File for adding shape tools in to toolbar.
define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  ShapeTool = require './tool'

  class ShapeToolModule extends Module
    constructor: () ->
      super()
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>
      if meta.id is "shape"
        list.push new ShapeTool 1
        list.push new ShapeTool 2
        list.push new ShapeTool 3
        list.push new ShapeTool 4
        list.push new ShapeTool 5
        list.push new ShapeTool 6
      list