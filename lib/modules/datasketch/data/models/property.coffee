define (require) ->
  Model = require 'core/model/model'
  Utils = require 'core/util/utils'

  class DataProperty extends Model
    constructor: (header) ->
      super
        data:
          id: Utils.slugify header
          name: header

    getName: () =>
      @get 'name'

    getId: () =>
      @get 'id'