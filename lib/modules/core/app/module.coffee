define (require) ->
  EventDispatcher = require 'core/event/dispatcher'
  Utils = require 'core/util/utils'

  class Module extends EventDispatcher
    load: () =>
      Utils.promiseRequire @listPreload()
        .then (loaded) =>
          @handlePreload.apply null, loaded

    listPreload: () =>
      []

    handlePreload: () =>

    init: () =>
      Promise.resolve(true)

    run: () =>