define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  DrawModeAction = require 'modules/datasketch/actions/set_mode'
  Globals = require 'core/model/globals'

  require 'link!./style.css'

  class ModeSelectTool extends Tool
    constructor: (@_targetMode) ->
      super
        modelData:
          id: "modeSelect-#{@_targetMode}"

      Globals.get('Canvas').addEventListener "Canvas.ModeChange", @_onCanvasChange
      @toggleActiveDisplay Globals.get('Canvas').getMode() == @_targetMode

    generateAction: () =>
      new DrawModeAction Globals.get('Canvas'), @_targetMode

    _onCanvasChange: (evt) =>
      @toggleActiveDisplay evt.data.mode == @_targetMode