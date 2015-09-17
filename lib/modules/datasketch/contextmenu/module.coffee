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
      Globals.get('Relay').addEventListener 'ContextMenu.RefreshRequest', @_onRefreshRequest
      Globals.get('ActionHistory').addEventListener 'ActionHistory.ActionAdded', @_onAction
      Globals.get('ActionHistory').addEventListener 'ActionHistory.ActionUndone', @_onAction

    _onContextChange: (evt) =>
      @_currentContext = evt.data.context
      @_buildMenu()

    _onDisplayRequest: (evt) =>
      @_currentContext = evt.data.context
      @_buildMenu()

    _onCloseRequest: (evt) =>
      @_currentContext = null
      @_manager.close()

    _onAction: (evt) =>
      @_buildMenu()

    _buildMenu: () =>
      if @_currentContext?
        items = HM.invoke "ContextMenu.MenuItems", [],
          context: @_currentContext

        if items.length
          @_manager.display Menu.createMenu
            items: items
        else
          @_manager.close()
      else
        @_manager.close()