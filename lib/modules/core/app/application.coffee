# # Application
# 
# Base class for an application. Handles plugin integration.
# 
# All plugins are deal with in phases:
# 
# * `load`:
# * `init`:
# * `run`:

define (require) ->
  $ = require 'jquery'
  EventDispatcher = require 'core/event/dispatcher'
  Utils = require 'core/util/utils'
  HM = require 'core/event/hook_manager'
  Globals = require 'core/model/globals'
  Set = require 'core/util/set'

  class Application extends EventDispatcher
# `new Application(domRoot)`

# Constructor method. Accepts a single argument of the application's root
# DOM element.
    constructor: (domRoot) ->
      @_domRoot = $(domRoot)
      Globals.set 'App', @

# `load()`
    load: () =>
      promises = []
# First, the application invoke the `Application.Plugins` hook to obtain
# a set of all desired plugins.
      pluginClasses = HM.invoke 'Application.Plugins', new Set
# The set is then modified to ensure any first-level requirements
# TODO: make requirements check recursive
      for pic in pluginClasses.elements().slice(0)
        if pic.requires?
          pluginClasses.addMany pic.requires

# Then the plugins are set to load, with the promises returned from their
# load functions stored in an array.
      @_plugins = []
      for pic in pluginClasses.elements()
        plugin = new pic
        @_plugins.push plugin
        promises.push plugin.load()
# Finally, the View class load promise is created and added to the array.
      viewClassPath = HM.invoke 'Application.ViewClass', 'core/app/view'
      promises.push new Promise (resolve, reject) =>
# Once the View class is loaded, it is instantiated and appended to
# the dom root.
        require [viewClassPath], (viewClass) =>
          @view = new viewClass
          @_domRoot.append @view.$dom()
          @dispatchEvent 'Application.ViewReady', {}
          resolve(@view)
        , (err) =>
          reject(new Error("Could not load view class."))
      Promise.all(promises)

# `init()`

# Initializes all plugins.
    init: () =>
      Promise.all(pi.init() for pi in @_plugins)

# `run()`

# Runs the application by running all plugins.
    run: () =>
      for pi in @_plugins
        pi.run()
      @dispatchEvent 'Application.Run', {}