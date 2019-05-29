define (require) ->
  EventDispatcher = require 'core/event/dispatcher'
  Utils = require 'core/util/utils'

  defaults =
    modelClass: null
    viewClass: null
    modelData: {}

  class Controller extends EventDispatcher
    constructor: (settings) ->      
      config = Utils.ensureDefaults settings, defaults
      if config.modelClass?
        @_model = new config.modelClass
          data: config.modelData
      if config.viewClass?
        @_view = new config.viewClass @_model

    view: () =>
      @_view