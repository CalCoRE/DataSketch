define (require) ->
  ObjectModel = require 'modules/datasketch/canvas/objects/base/model'
  Utils = require 'core/util/utils'
  
  defaults =
    children: []

  class GroupModel extends ObjectModel
    constructor: (config) ->
      config.defaults = Utils.ensureDefaults config.defaults, defaults
      super config

    cacheState: () =>
      super()
      for child in @get 'children'
        child.cacheState()

    restoreState: () =>
      for child in @get 'children'
        child.restoreState()
      super()
