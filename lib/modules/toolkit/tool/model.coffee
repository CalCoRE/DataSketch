define (require) ->
  Model = require 'core/model/model'

  defaults =
    id: ''
    activeContext: null

  class ToolModel extends Model
    constructor: (data) ->
      super
        data: data
        defaults: defaults