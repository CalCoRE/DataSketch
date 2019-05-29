#File for adding mark as center tool in to toolbar.
define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  MarkAsOrigin = require './tool'

  class MarkAsOriginToolModule extends Module
    constructor: () ->
      super()
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>      
      if meta.id is "markAsOrigin"  
         list.push new MarkAsOrigin
      list