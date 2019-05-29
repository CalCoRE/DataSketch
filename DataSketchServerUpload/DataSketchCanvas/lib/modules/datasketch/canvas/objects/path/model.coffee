define (require) ->
  ObjectModel = require 'modules/datasketch/canvas/objects/base/model'
  Utils = require 'core/util/utils'
  
  defaults =
    pathData: []
    stroke:
      width: 1
      color: "#000"
    fill: 
      color: null  
    
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
      @set 'stroke.width', fabric.strokeWidth
      @set 'stroke.color', fabric.stroke      
      @set 'fill.color', fabric.fill

    cacheState: () =>
      super()
      @_cache.stroke = Utils.ensureDefaults @get('stroke'), {}
      @_cache.fill = Utils.ensureDefaults @get('fill'), {}  

    restoreState: () =>
      if @_cache?
        @set 'stroke.color', @_cache.stroke.color
        @set 'fill.color', @_cache.fill.color
        @set 'stroke.width', @_cache.stroke.width
      super()
