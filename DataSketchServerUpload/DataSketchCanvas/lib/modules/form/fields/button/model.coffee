define (require) ->
  BaseModel = require 'modules/form/fields/base/model'
  Utils = require 'core/util/utils'

  defaults =
    event: "Button.Click"

  class ButtonModel extends BaseModel
    constructor: (config) ->
      config.defaults = Utils.ensureDefaults config.defaults, defaults
      super config