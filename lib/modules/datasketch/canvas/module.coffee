define (require) ->
  Module = require 'core/app/module'
  Globals = require 'core/model/globals'

  class DSCanvas extends Module
    constuctor: () ->

    listPreload: () =>
      list = super()
      list.push 'modules/action/history'
      list.push 'modules/datasketch/canvas/view'
      list

    handlePreload: (ActionHistory, CanvasView) =>
      Globals.set 'ActionHistory', new ActionHistory
      @_view = new CanvasView

    init: () =>
      Globals.get('App.view').addChild @_view

    run: () =>
      @_view.startCanvas()