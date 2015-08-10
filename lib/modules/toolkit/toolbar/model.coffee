define (require) ->
  Model = require 'core/model/model'

  defaults =
    id: ""
    tools: []

  class ToolbarModel extends Model
    constructor: (settings) ->
      super
        data: settings
        defaults: defaults