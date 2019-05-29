define (require) ->
  CanvasObjectView = require 'modules/datasketch/canvas/objects/base/view'
  Fabric = require 'thirdparty/fabric'

  class CustomView extends CanvasObjectView
    constructor: (model) ->
      super model

    _onChange: (evt) =>
      super evt

      switch evt.data.path
        when "stroke.width"
          @_fabric?.strokeWidth = evt.data.value
        when "stroke.color"
          @_fabric?.stroke = evt.data.value

    buildFabric: () =>

    cloneFabric: () =>
      new Promise (resolve, reject) =>
        @_fabric.clone resolve