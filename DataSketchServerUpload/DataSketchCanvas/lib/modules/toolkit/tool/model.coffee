define (require) ->
  Model = require 'core/model/model'
  Utils = require 'core/util/utils'

  defaults =
    id: ''
    activeContext: null

  class ToolModel extends Model
    constructor: (config) ->
      config.defaults = Utils.ensureDefaults config.defaults, defaults
      super config