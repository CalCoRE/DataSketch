define (require) ->
  Model = require 'core/model/model'
  Utils = require 'core/util/utils'

  defaults =
    id: ''
    fields: []
    buttons: []
    classes: []

  class FormModel extends Model
    constructor: (config) ->
      config.defaults = Utils.ensureDefaults config.defaults, defaults
      super config

    getValue: () =>
      val = {}
      for field in @get 'fields'
        val[field.id()] = field.value()
      val