define (require) ->
  Model = require 'core/model/model'
  
  defaults =
    mode: 'draw'
    strokeWidth: 1

  class DSCanvasModel extends Model
    constructor: (data) ->
      super
        data: data
        defaults: defaults