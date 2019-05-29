define (require) ->
  Model = require 'core/model/model'
  Utils = require 'core/util/utils'

  defaults =
    id: null
    position:
      x: 0
      y: 0
    rotation: 0
    scale:
      x: 1
      y: 1
    controllable: true
    disabled: false
    selectable: true
    opacity: 1
    propertyMappings: []
    isStamping:false

  class CanvasObjectModel extends Model
    constructor: (config) ->
      config.defaults = Utils.ensureDefaults config.defaults, defaults
      super config

    getWidth: () =>
      @get('view').getWidth()

    getHeight: () =>
      @get('view').getHeight()

    disable: () =>
      @set 'disabled', true
      @set 'controllable', false
    
    selectable: (isSelectable) =>
      @set 'selectable', isSelectable      

    enable: () =>
      @set 'disabled', false
      @set 'controllable', true

    addPropertyMapping: (map) => 
      maps = @get 'propertyMappings'
      newMap = true
      for m in maps when m.objectProperty == map.objectProperty
        m.dataProperty = map.dataProperty
        m.calibration = map.calibration
        newMap = false
      if newMap
        maps.push map
      @set 'propertyMappings', maps

    removePropertyMapping: (objectProperty) =>        
      map = @get 'propertyMappings'
      ind = null
      for m, i in map when m.objectProperty == objectProperty
        ind = i
        break
      map.splice i, 1
      @set 'propertyMappings', map

    cacheState: () =>
      @_cache =
        position: Utils.ensureDefaults @get('position'), {}
        rotation: @get 'rotation'
        scale: Utils.ensureDefaults @get('scale'), {}
        opacity: @get 'opacity'

    restoreState: () =>      
      if @_cache?
        @set 'position', @_cache.position
        @set 'rotation', @_cache.rotation
        @set 'scale', @_cache.scale
        @set 'opacity', @_cache.opacity
