define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  CalibrationAndManipulationTool = require './tool' 

  class ModalToolModule extends Module
    constructor: () ->      
      super()      
      HM.hook 'Toolbar.Tools', @_toolbarTools

    _toolbarTools: (list, meta) =>
      if meta.id is "calibrationandmanipulation"
         list.push new CalibrationAndManipulationTool 
      list