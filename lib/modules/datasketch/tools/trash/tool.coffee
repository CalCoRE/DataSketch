define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  TrashAction = require 'modules/datasketch/actions/delete_objects'
  Globals = require 'core/model/globals'

  require 'link!./style.css'

  class TrashTool extends Tool
    constructor: () ->
      super
        modelData:
          id: "trash"

    generateAction: () =>
      new TrashAction Globals.get('Canvas'), Globals.get('Canvas').getSelectedObjects()
