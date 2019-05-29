define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  Globals = require 'core/model/globals'
  HM  = require 'core/event/hook_manager'  
  View = require './view'
  require 'link!./style.css'

  #Include action files for performing different operations.
  MappingAssignmentAction = require 'modules/datasketch/actions/mapping_assignment'
  ObjectManipulationAction = require 'modules/datasketch/actions/object_manipulation'
  RemoveCalibrationAction = require 'modules/datasketch/actions/remove_calibration' 
  StampingEffect = require 'modules/datasketch/actions/stamping_effect' 

  class CalibrationAndManipulationTool extends Tool    
    constructor: () ->
      super                
        viewClass: View      

    generateAction: () =>
      dataStore = Globals.get 'DataStore'
      #Array for storing minimum and maximum value of calibration of selected property
      minMaxofProperty=[]
      
      
      #Condition for checking whether reset button of "CalibrationAndManipulationModal" modal is triggered or not.
      if window.currentActionId == "calibrationRemoveButton"
         $('#maxRangeInput, #minRangeInput').val(0)        
         $('#maxInput, #minInput').html(0)                 
         RemoveCalibrationAction removeCalibrationAction= new RemoveCalibrationAction Globals.get 'Canvas'
         removeCalibrationAction.execute()
         $('#colorProperty')[0].selectedIndex = 0

      #Condition for checking whether Apply button of "CalibrationAndManipulation" modal is triggered or not.
      if window.currentActionId == "calibrationApplyButton"
         @_objectProperty = HM.invoke 'DataMapping.ObjectProperties', []
         ObjectProperty = @_objectProperty.filter((data)=>return data.getId() == $('.activeMenu')[0].id)
         $('#CalibrationAndManipulationModal').modal('hide')
         canvas = Globals.get 'Canvas'
         animationDataProperty = []
         CsvProperty = Globals.get 'DataStore'
         objectDataProperty = null
         if window.objectPropertyId == "color"
           objectDataProperty = $('#csvPropertyColor').val()
           window.objectPropertyMinimum = $('#colorProperty').val().split('-')[0]
           window.objectPropertyMaximum = $('#colorProperty').val().split('-')[1]
         else if window.objectPropertyId == "stamping"
           StampingEffect stampingEffect = new StampingEffect canvas,canvas._model._data.selected[0],$('#isStamp')[0].checked
           stampingEffect.execute()
         else
           objectDataProperty = $('#csvProperty').val()
           window.objectPropertyMinimum = $('#minRangeInput').val()
           window.objectPropertyMaximum = $('#maxRangeInput').val()
         if window.objectPropertyId != "stamping"
             for obj in CsvProperty._data.properties
               if obj._data.id == objectDataProperty
                  animationDataProperty = obj        
             MappingAssignmentAction mappingAssignmentAction = new MappingAssignmentAction canvas._model._data.selected[0],ObjectProperty[0],animationDataProperty
             mappingAssignmentAction.execute()
              
      #Event got triggered on closing of "CalibrationAndManipulationModal" modal.
      $('#CalibrationAndManipulationModal').on 'hidden.bs.modal',(e) =>        
        $('#shape')[0].style.pointerEvents = 'auto'
        $('#isStamp')[0].checked = false
        $('.objectproperty-menu .menu-item').removeClass('activeMenu')
        $("input[name=minMaxValue][value='minValue']").prop("checked",true);
        $('#colorProperty').val("#f7f7f7-#252525")
        Globals.get('Canvas').applyOriginalProperty()
        $(this).off('hide.bs.modal');                       
        e.stopImmediatePropagation()

      for obj in dataStore._data.properties
          if obj._data.id == $('#csvProperty').val()
              minMaxofProperty = obj
      
      if $('#csvProperty').val()
         minMax = dataStore.getMinMax minMaxofProperty         
         $('#propertyMaxValue').html(minMax.max)
         $('#propertyMinValue').html(minMax.min)
      
      #Condition for checking whether input sliders value got changed.
      if window.currentActionId == "minRangeInput"
         if window.objectPropertyId == "width" || window.objectPropertyId == "height" || window.objectPropertyId == "scale"
           $('#minInput').html(eval($('#minRangeInput').val()).toFixed(1))
         else
           $('#minInput').html(eval($('#minRangeInput').val()))
         ObjectManipulationAction objectManipulationAction = new ObjectManipulationAction Globals.get 'Canvas'
         objectManipulationAction.execute()
         $("input[name=minMaxValue][value='minValue']").prop("checked",true)
      else if window.currentActionId == "maxRangeInput"
         if window.objectPropertyId == "width" || window.objectPropertyId == "height" || window.objectPropertyId == "scale"
            $('#maxInput').html(eval($('#maxRangeInput').val()).toFixed(1))
         else
           $('#maxInput').html(eval($('#maxRangeInput').val()))
         ObjectManipulationAction objectManipulationAction = new ObjectManipulationAction Globals.get 'Canvas'
         objectManipulationAction.execute()
         $("input[name=minMaxValue][value='maxValue']").prop("checked",true)