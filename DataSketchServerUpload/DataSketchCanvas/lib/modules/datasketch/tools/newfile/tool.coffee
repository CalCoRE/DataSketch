define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  NewFileAction = require 'modules/datasketch/actions/new_file'
  Globals = require 'core/model/globals'

  require 'link!./style.css'

  class StrokeTool extends Tool
    constructor: (@_Action) ->
      super
        modelData:
          id: "#{@_Action}"
          tooltip: "CreateFile"

    generateAction: () =>
      new NewFileAction Globals.get('Canvas')
