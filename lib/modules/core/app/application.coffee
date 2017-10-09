# # Application
# 
# Base class for an application. Handles module integration.
# 
# All modules are deal with in phases:
# 
# * `load`: All modules are loaded
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
# First, the application invoke the `Application.Modules` hook to obtain
# a set of all desired modules.
      moduleClasses = HM.invoke 'Application.Modules', new Set
# The set is then modified to ensure any first-level requirements
# TODO: make requirements check recursive
      for mc in moduleClasses.elements().slice(0)
        if mc.requires?
          moduleClasses.addMany mc.requires

# Then the modules are set to load, with the promises returned from their
# load functions stored in an array.
      @_modules = []
      for mc in moduleClasses.elements()
        module = new mc
        @_modules.push module
        promises.push module.load()
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

# Initializes all modules.
    init: () =>
      Promise.all(pi.init() for pi in @_modules)

# `run()`

# Runs the application by running all modules.
    run: () =>
      for pi in @_modules
        pi.run()
      codapHelper.init()
      @dispatchEvent 'Application.Run', {}