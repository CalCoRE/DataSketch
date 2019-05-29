define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  LoadFileTool = require './tool' 

  class ModalToolModule extends Module
    constructor: () ->      
      super()      
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>
      if meta.id is "LoadFile"
         list.push new LoadFileTool 
      list