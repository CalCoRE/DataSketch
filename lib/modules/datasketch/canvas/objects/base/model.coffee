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
    opacity: 1
    propertyMappings: []

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
