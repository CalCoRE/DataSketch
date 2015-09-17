define (require) ->
  Controller = require 'core/controller/controller'
  Model = require './model'
  View = require './view'
  Globals = require 'core/model/globals'

  class Menu extends Controller
    constructor: (config) ->
      config ?= {}
      config.modelClass ?= Model
      config.viewClass ?= View

      if config.modelData?.items?
        items = []

        # ensure that every menu item is wrapped as a Menu object
        for item in config.modelData.items
          items.push Menu.wrapMenu item

        config.modelData.items = items

      super config

      @view().addEventListener "Menu.ActionRequest", @_onActionRequest

    addItem: (item) =>
      items = @_model.get 'items'
      items.push Menu.wrapMenu item
      @_model.set 'items', items

    _onActionRequest: (evt) =>
      if @_model.get 'action'
        Globals.get('Relay').dispatchEvent 'Action.RequestAction',
          action: @_model.get 'action'
        @dispatchEvent 'Menu.ActionRequested', {}

  Menu.wrapMenu = (item) =>
    if item instanceof Menu
      return item
    Menu.createMenu item

  Menu.createMenu = (data) =>
    new Menu
      modelData: data

  Menu