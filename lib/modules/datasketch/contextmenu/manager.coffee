define (require) ->
  Controller = require 'core/controller/controller'
  View = require './view'
  Model = require 'core/model/model'

  class ContextMenuManager extends Controller
    constructor: (settings = {}) ->
      settings.viewClass ?= View
      settings.modelClass ?= Model
      settings.modelData ?=
        display: false
        menu: null

      super settings

    display: (menu) =>
      @_model.set 'menu', menu
      @_model.set 'display', true

    close: () =>
      @_model.set 'display', false
