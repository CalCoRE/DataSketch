define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  Globals = require 'core/model/globals'
  View = require './view'
  require 'link!./style.css'

  #Include action files for performing different operations.
  LoadFromDb = require 'modules/datasketch/actions/load_from_db'
  LoadFromFile = require 'modules/datasketch/actions/load_from_file'

  class LoadFileTool extends Tool    
    constructor: () ->
      super        
        viewClass: View

    generateAction: () =>
      #Condition for checking which radio button is active on load modal.
      if window.currentActionId == "rbtnDB"
        $('#FormatValidationMessage').hide() 
        $('#ddlLoadValidationMessage').hide()
        $('#LoadValidationMessage').hide()
        $('#FileList').prop('disabled',false)
        $('#fileUpload').prop('disabled',true)
      else if window.currentActionId == "rbtnFile"
        $('#LoadValidationMessage').hide()
        $('#ddlLoadValidationMessage').hide()
        $('#FileList').prop('disabled',true)
        $('#fileUpload').prop('disabled',false)
      
      #Event got triggered when "LoadFileModal" got open.
      $('#LoadFileModal').on 'shown.bs.modal',(e) =>
        $('#rbtnFile').prop('checked',true)
        $('#FileList').prop('disabled',true)
        $('#fileUpload').prop('disabled',false)
        e.stopImmediatePropagation()

      #Event got triggered when "LoadFileModal" got close.
      $('#LoadFileModal').on 'hidden.bs.modal',(e) =>
        $('#fmLoad')[0].reset();
        $('.modal-backdrop').hide();        
        $('#LoadValidationMessage').hide()
        $('#ddlLoadValidationMessage').hide()
        $('#rbtnFile').prop('checked',true)
        $('#FileList').prop('disabled',true)
        $('#fileUpload').prop('disabled',false)
        e.stopImmediatePropagation()

      #Event got triggered on submit action of a form.
      $('#fmLoad').on 'submit', (evt) =>           
        return false;
      
      #Condition for checking whether "LoadButton" got clicked or not.
      if window.currentActionId == "LoadButton" 
         if $('#rbtnDB').prop('checked')   
             $('#fileUpload').val("")
             if $('#FileList').val() && $('#FileList').val() != "default"
                $('#DisableBackground').show()
                $('#pageLoader').show()
                LoadFromDb loadFromDb = new LoadFromDb Globals.get('Canvas'),$('#FileList').val()
                loadFromDb.execute()
                $('#LoadFileModal').modal('hide'); 
                $('.modal-backdrop').hide();                
                $('#fmLoad')[0].reset();
             else
               $('#ddlLoadValidationMessage').show()
               $('#LoadValidationMessage').hide()
         else if $('#rbtnFile').prop('checked')
             inputFile = $('#fileUpload')[0].files[0]
             if inputFile
                 if inputFile.type == "text/plain"
                     $('#FormatValidationMessage').hide()
                     $('#LoadValidationMessage').hide()
                     reader = new FileReader(inputFile);
                     reader.readAsText(inputFile);
                     $('#LoadFileModal').modal('hide'); 
                     $('.modal-backdrop').hide();                 
                     $('#fileUpload').val("")
                     reader.onload = (e) =>
                        LoadFromFile loadFromFile = new LoadFromFile Globals.get('Canvas'),e.target.result
                        loadFromFile.execute()
                        $('#fmLoad')[0].reset();
                 else               
                   $('#FormatValidationMessage').show()
                   $('#fmLoad')[0].reset()
             else
               $('#ddlLoadValidationMessage').hide()
               $('#LoadValidationMessage').show()
