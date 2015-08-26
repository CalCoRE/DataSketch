define (require) ->
  DSObject = require './object'

  defaults =
    id: 0
    pathData: null
    view: null
  
  class Path extends DSObject
    constructor: (pathData) ->
      DSObject._count += 1

      super
        data:
          id: DSObject._count
          view: pathData
        defaults: defaults

    clone: () =>
      new Promise (resolve, reject) =>
        @get('view').clone resolve
      .then (cloneView) =>
        path = new Path cloneView
        cloneView.set 'id', path.get('id')
        path