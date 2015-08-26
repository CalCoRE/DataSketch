define (require) ->
  ObjectModel = require 'modules/datasketch/canvas/objects/base/model'
  Utils = require 'core/util/utils'
  
  defaults =
    pathData: []
    stroke:
      width: 1
      color: "#000000"
    fill: null
    
  class PathModel extends ObjectModel
    constructor: (config) ->
      config.defaults = Utils.ensureDefaults config.defaults, defaults
      super config

    parseFabric: (fabric) =>
      @set 'pathData', fabric.path
      @set 'position',
        x: fabric.left
        y: fabric.top
      @set 'rotation', fabric.angle
      @set 'scale',
        x: fabric.scaleX
        y: fabric.scaleY