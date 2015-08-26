define (require) ->
  CanvasObjectView = require 'modules/datasketch/canvas/objects/base/view'
  Fabric = require 'thirdparty/fabric'

  class PathView extends CanvasObjectView
    constructor: (model) ->
      super model

    buildFabric: () =>

