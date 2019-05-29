define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  Globals = require 'core/model/globals'
  require 'link!./style.css'

  #Include action files for performing different operations.
  LoadSaveAction = require 'modules/datasketch/actions/load_save'
#Tool for detect which action got clicked save action or load action.
  class StrokeTool extends Tool
    constructor: (@_Action) ->
      super
        modelData:
          id: "#{@_Action}"
          tooltip: if @_Action == "SaveCanvas" then 'Save Canvas' else 'Load Canvas'

    generateAction: () =>      
      new LoadSaveAction Globals.get('Canvas'), @_Action