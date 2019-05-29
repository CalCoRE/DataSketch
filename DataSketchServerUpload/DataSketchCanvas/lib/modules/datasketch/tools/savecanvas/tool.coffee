define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  Globals = require 'core/model/globals'
  View = require './view'  
  require 'link!./style.css'

  #Include action files for performing different operations.
  SaveCanvas = require 'modules/datasketch/actions/save_canvas'
  class savecanvasTool extends Tool    
    constructor: () ->
      super        
        viewClass: View
    root = exports ? this
    root.Counter = 0

    generateAction: () =>     
      ModalValue = $('#txtFileName').val()

      #Event got triggered on closing of "SaveCanvasModal" modal.
      $('#SaveCanvasModal').on 'hidden.bs.modal',(e) =>
          #$('.modal-backdrop').hide();          
          $('#txtFileName').val("")
          $('#chkIsDownload').prop('checked',false)
          $('#SaveValidationMessage').hide()
          $('#PatternValidationMessage').hide()
          e.stopImmediatePropagation()

      #Condition for checking whether savebutton got clicked or not.
      if window.currentActionId == "SaveButton"            
            #$('#DisableBackground').show()
            #$('#pageLoader').show()
            root.Counter=0
            regexname = /^([a-zA-Z0-9_-])*$/;
            if ModalValue && regexname.test(ModalValue)
               SaveCanvas savecanvas = new SaveCanvas Globals.get('Canvas'),ModalValue
               savecanvas.execute()
               $('#txtFileName').val("")
               $('#SaveCanvasModal').modal('hide');
               #$('.modal-backdrop').hide();               
            else if ModalValue == ""
               $('#PatternValidationMessage').hide()
               $('#SaveValidationMessage').show()
            else if !regexname.test(ModalValue)
               $('#SaveValidationMessage').hide()
               $('#PatternValidationMessage').show()