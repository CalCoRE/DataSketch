define (require) ->
  Model = require 'core/model/model'
  Utils = require 'core/util/utils'

  defaults =
    id: ""
    items: []
    label: ""
    action: null
    disabled: false

  class MenuModel extends Model
    constructor: (config) ->
      config.defaults = Utils.ensureDefaults config.defaults, defaults
      super config
