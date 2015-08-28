define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  DataModeAction = require './action'
  # DrawModeAction = require 'modules/datasketch/actions/set_mode'
  Globals = require 'core/model/globals'

  # require 'link!./style.css'

  class DataModeSelectTool extends Tool
    constructor: () ->
      super
        modelData:
          id: "modeSelect-data"

      Globals.get('Canvas').addEventListener "Canvas.ModeChange", @_onCanvasChange
      @toggleActiveDisplay Globals.get('Canvas').getMode() == @_targetMode

    generateAction: () =>
      # new DrawModeAction Globals.get('Canvas'), @_targetMode
      new DataModeAction Globals.get('Canvas')

    _onCanvasChange: (evt) =>
      @toggleActiveDisplay evt.data.mode == @_targetMode