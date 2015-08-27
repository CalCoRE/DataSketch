define (require) ->
  CanvasObjectView = require 'modules/datasketch/canvas/objects/base/view'
  Fabric = require 'thirdparty/fabric'

  class PathView extends CanvasObjectView
    constructor: (model) ->
      super model

    buildFabric: () =>

    cloneFabric: () =>
      new Promise (resolve, reject) =>
        @_fabric.clone resolve