define (require) ->
  ObjectModel = require 'modules/datasketch/canvas/objects/base/model'
  Utils = require 'core/util/utils'
  
  defaults =    
    stroke:
      width: 1
      color: "#000000"
    fill: 
      color: null
    
  class CustomModel extends ObjectModel
    constructor: (config) ->
      config.defaults = Utils.ensureDefaults config.defaults, defaults
      super config

    parseFabric: (fabric) =>      
      @set 'position',
        x: fabric.left
        y: fabric.top
      @set 'rotation', fabric.angle
      @set 'scale',
        x: fabric.scaleX
        y: fabric.scaleY
      @set 'stroke.width', fabric.strokeWidth
      @set 'stroke.color', fabric.stroke

    cacheState: () =>
      super()
      @_cache.stroke = Utils.ensureDefaults @get('stroke'), {}

    restoreState: () =>
      if @_cache?
        @set 'stroke.color', @_cache.stroke.color
        @set 'stroke.width', @_cache.stroke.width
      super()