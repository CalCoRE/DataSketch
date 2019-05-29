#File for adding snap to grid tool in to toolbar
define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  SnapGridTool = require './tool'

  class SnapGridToolModule extends Module
    constructor: () ->
      super()
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>      
      if meta.id is "snapgrid"  
         list.push new SnapGridTool 1
      list