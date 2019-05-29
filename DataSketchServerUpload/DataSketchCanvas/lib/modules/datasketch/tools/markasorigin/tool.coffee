#File for generating action on click of mark center mechanism
define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  Globals = require 'core/model/globals'
  View = require './view'
  require 'link!./style.css'

  #Include action files for performing different operations.
  MarkAsOrigin = require 'modules/datasketch/actions/mark_as_origin'

  class MarkAsOriginTool extends Tool
    constructor: () ->
      super
        viewClass: View
        modelData:
          id: "markAsOrigin"
          tooltip: "Mark as Origin"

    generateAction: () =>     
      if window.currentActionId == "MarkAsOriginModal"
        $('#MarkAsOriginModal').modal('hide')
      else if window.currentActionId == "toolMarkAsOrigin"
        if Globals.get('Canvas')._view._fabric._objects.length > 0
           $('#MarkAsOriginModal').modal({backdrop:false})
        else
           alert("Please select atleast one object for this feature.")
      else if window.currentActionId != "markasorigin"
        isMultiObject = false;
        $('#MarkAsOriginModal').modal('hide')
        originX = $('#'+window.currentActionId).attr('data-originx')
        originY = $('#'+window.currentActionId).attr('data-originy')
        if Globals.get('Canvas').getSelectedObjects().length > 1
           isMultiObject = true
        MarkAsOrigin markasorigin=new MarkAsOrigin Globals.get('Canvas'),originX,originY,isMultiObject
        markasorigin.execute()

    _onCanvasChange: (evt) =>
        @toggleActiveDisplay evt.data.mode == @_targetMode