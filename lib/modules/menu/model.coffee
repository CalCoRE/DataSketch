define (require) ->
  Model = require 'core/model/model'

  defaults =
    items: []
    label: ""
    action: null

  class MenuModel extends Model
    constructor: (data) ->
      super
        data: data
        defaults: defaults