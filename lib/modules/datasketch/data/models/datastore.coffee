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

    getMinMax: (property) =>
      bounds =
        min: null
        max: null
      for row in @get 'rows'
        bounds.min ?= row.getValue(property.getId())
        bounds.max ?= row.getValue(property.getId())
        bounds.min = Math.min bounds.min, row.getValue(property.getId())
        bounds.max = Math.max bounds.max, row.getValue(property.getId())
      bounds