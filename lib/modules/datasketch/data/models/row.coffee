define (require) ->
  Model = require 'core/model/model'

  class DataRow extends Model
    constructor: (rowData, headers) ->
      data =
        values: []
      for h in headers
        data.values.push
          key: h
          value: rowData[h]
      super
        data: data
        defaults: {}
