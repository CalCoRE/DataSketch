define (require) ->
  Model = require 'core/model/model'

  Row = require './row'
  Property = require './property'

  defaults =
    rows: []
    properties: []

  class DataStore extends Model
    constructor: (data) ->
      rows = []
      properties = []
      
      for p in data.properties
        properties.push new Property p
      data.properties = properties

      for r in data.rows
        rows.push new Row r, data.properties
      data.rows = rows

      super
        data: data
        defaults: defaults