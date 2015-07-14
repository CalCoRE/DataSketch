define (require) ->
  Controller = require 'core/controller/controller'
  Model = require './model'
  View = require './view'
  Globals = require 'core/model/globals'

  class Tool extends Controller
    constructor: (config) ->
      config ?= {}
      config.modelClass ?= Model
      config.viewClass ?= View

      super config

      @view().addEventListener 'Tool.GenerateActionRequest', @_onActionRequest

    _onActionRequest: (evt) =>
      @view().dispatchEvent 'Action.RequestAction',
        action: @generateAction()
      , true

    generateAction: () =>


    toggleActiveDisplay: (bool) =>
      @view().$dom().toggleClass "active", bool
