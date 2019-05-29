#File for adding shape tools in to toolbar.
define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  ObjectPropertyManagerTool = require './tool'

  class ObjectPropertyManagerModule extends Module
    constructor: () ->
      super()
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>
      if meta.id is "objectpropertymanager"
        list.push new ObjectPropertyManagerTool "X"
        list.push new ObjectPropertyManagerTool "Y"
        list.push new ObjectPropertyManagerTool "Width"
        list.push new ObjectPropertyManagerTool "Height"
        list.push new ObjectPropertyManagerTool "originX"
        list.push new ObjectPropertyManagerTool "originY"
      list