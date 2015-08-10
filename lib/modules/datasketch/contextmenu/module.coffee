define (require) ->
  Module = require 'core/app/module'
  ContextMenuManager = require './manager'
  HM = require 'core/event/hook_manager'
  Menu = require 'modules/menu/menu'
  Globals = require 'core/model/globals'

  class ContextMenuModule extends Module
    constructor: () ->
      super

    init: () =>
      @_manager = new ContextMenuManager
      Globals.get('App.view').addChild @_manager.view()
      Globals.get('Relay').addEventListener 'ContextMenu.RequestDisplay', @_onDisplayRequest
      Globals.get('Relay').addEventListener 'ContextMenu.RequestClose', @_onCloseRequest
      Globals.get('Relay').addEventListener 'ContextMenu.ContextChange', @_onContextChange

    _onContextChange: (evt) =>
      items = HM.invoke "ContextMenu.MenuItems", [],
        context: evt.data.context

      if items.length
        @_manager.display Menu.createMenu
          items: items
      else
        @_manager.close()

    _onDisplayRequest: (evt) =>
      items = HM.invoke "ContextMenu.MenuItems", [],
        context: evt.data.context

      @_manager.display Menu.createMenu
        items: items

    _onCloseRequest: (evt) =>
      @_manager.close()