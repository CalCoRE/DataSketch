define (require) ->
  Model = require 'core/model/model'

  Row = require './row'

  defaults =
    rows: []
    headers: []

  class DataStore extends Model
    constructor: (data) ->
      rows = []
      for r in data.rows
        rows.push new Row r, data.headers
      data.rows = rows

      super
        data: data
        defaults: defaults