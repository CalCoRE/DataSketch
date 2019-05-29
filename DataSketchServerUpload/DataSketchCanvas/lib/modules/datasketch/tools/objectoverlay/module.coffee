#File for adding mark as center tool in to toolbar.
define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  ObjectOverlay = require './tool'

  class MarkAsOriginToolModule extends Module
    constructor: () ->
      super()
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>      
      if meta.id is "objectoverlay"  
         list.push new ObjectOverlay
      list