#File for generating action on click of mark center mechanism
define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  Globals = require 'core/model/globals'
  View = require './view'
  require 'link!./style.css'

  #Include action files for performing different operations.
  ObjectOverlay = require 'modules/datasketch/actions/object_overlay'

  class MarkAsOriginTool extends Tool
    constructor: () ->
      super
        viewClass: View
        modelData:
          id: "objectoverlay"
          tooltip: "Object Overlay"

    generateAction: () =>     
      if window.currentActionId == "toolObjectOverlay"
        if Globals.get('Canvas')._view._fabric._objects.length > 0
           $('#ObjectOverlayModal').modal({backdrop:false})
        else
           alert("Please select atleast one object for this feature.")
      else
        $('#ObjectOverlayModal').modal('hide')
        
        ObjectOverlay objectoverlay=new ObjectOverlay Globals.get('Canvas'),window.currentActionId
        objectoverlay.execute()

    _onCanvasChange: (evt) =>
        @toggleActiveDisplay evt.data.mode == @_targetMode