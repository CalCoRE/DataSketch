define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  savecanvasTool = require './tool'
  class savecanvasToolModule extends Module
    constructor: () ->      
      super()      
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>
      if meta.id is "savecanvas"
          list.push new savecanvasTool 
      list   