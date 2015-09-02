define (require) ->
  Model = require 'core/model/model'

  class DataRow extends Model
    constructor: (rowData, headers) ->
      data =
        values: []
      for h in headers
        data.values.push
          key: h.getId()
          value: rowData[h.getName()]
      super
        data: data
        defaults: {}
