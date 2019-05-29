define (require) ->
  Controller = require 'core/controller/controller'
  Model = require './model'
  View = require './view'
  HM = require 'core/event/hook_manager'

  class Toolbar extends Controller
    constructor: (config) ->
      config.modelClass ?= Model
      config.viewClass ?= View
      
      super config

    build: () =>
      tools = HM.invoke 'Toolbar.Tools', [],
        id: @_model.get 'id'

      @_model.set 'tools', tools
