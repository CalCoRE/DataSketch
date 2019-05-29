#File for generating action for an snap to grid mechanism
define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  SnapGridAction = require 'modules/datasketch/actions/snap_to_grid'
  SliderInput = require 'modules/datasketch/actions/slider_input'
  Globals = require 'core/model/globals'
  View = require './view'

  require 'link!./style.css'

  class SnapGridTool extends Tool
    constructor: (@_Id) ->
      super
        viewClass: View
        modelData:
          id: "snapgrid-#{@_Id}"
          tooltip: "Snap to Grid"
        
    generateAction: () =>
  
      if document.getElementsByClassName("snapgrid-1")[0].className == "tool snapgrid-1"
         @toggleActiveDisplay true
         $('#SliderInputModal').modal({backdrop:false})
         $('#SliderInputModal').show()
         $('.modal-backdrop').hide()
         SliderInput sliderinput = new SliderInput Globals.get('Canvas'),$('#GridSizeSlider').val()
         sliderinput.execute()
      else if window.currentActionId == "OnInputOfSlider" || window.currentActionId == "GridSizeSlider" && parseInt($('#GridSizeSlider').val()) != 0
         SliderInput sliderinput = new SliderInput Globals.get('Canvas'),$('#GridSizeSlider').val()
         sliderinput.execute()   
      else
         @toggleActiveDisplay false
         $('#SliderInputModal').hide()
         $('#SliderInputModal').modal({backdrop:true})
      $('#SliderValue').html($('#GridSizeSlider').val())  

    _onCanvasChange: (evt) =>
        @toggleActiveDisplay evt.data.mode == @_targetMode