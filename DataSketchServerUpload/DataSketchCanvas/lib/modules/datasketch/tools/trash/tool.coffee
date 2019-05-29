define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  Globals = require 'core/model/globals'
  require 'link!./style.css'

  TrashAction = require 'modules/datasketch/actions/delete_objects'
  class TrashTool extends Tool
    constructor: () ->
      super
        modelData:
          id: "trash"
          tooltip: "Trash"

    generateAction: () =>
      if Globals.get('Canvas')._view._fabric._objects.length > 0
         new TrashAction Globals.get('Canvas')
      else
         alert("Please select atleast one object for this feature.")

