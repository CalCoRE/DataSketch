define (require) ->
  Model = require 'core/model/model'

  class DSObject extends Model

  DSObject._count = 0
  DSObject