define (require) ->
  BaseModel = require 'modules/form/fields/base/model'
  Utils = require 'core/util/utils'

  defaults =
    prefix: ''
    postfix: ''
    min: null
    max: null    

  class NumberFieldModel extends BaseModel
    constructor: (config) ->
      config.defaults = Utils.ensureDefaults config.defaults, defaults
      super config