define (require) ->
  Module = require 'core/app/module'
  Globals = require 'core/model/globals'
  Canvas = require './canvas'

  class DSCanvas extends Module
    constuctor: () ->

    listPreload: () =>
      list = super()
      list.push 'modules/action/history'
      list.push 'modules/datasketch/canvas/view'
      list

    handlePreload: (ActionHistory, CanvasView) =>
      Globals.set 'ActionHistory', new ActionHistory
      @canvas = new Canvas

    init: () =>
      Globals.get('App.view').addChild @canvas.view()
      Globals.get('Relay').addEventListener 'Action.RequestAction', @_onActionRequest
      Globals.set 'Canvas', @canvas
      @canvas.initCanvas()
      
    run: () =>

    _onActionRequest: (evt) =>
      Globals.get('ActionHistory').execute evt.data.action
