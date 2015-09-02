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

    addPropertyMapping: (objectProperty, dataProperty) =>
      map = @get 'propertyMappings'
      newMap = true
      for m in map when m.objectProperty == objectProperty
        if m.dataProperty == dataProperty
          return
        else
          m.dataProperty = dataProperty
          newMap = false
      if newMap
        map.push
          objectProperty: objectProperty
          dataProperty: dataProperty
      @set 'propertyMappings', map, true

    removePropertyMapping: (objectProperty, dataProperty) =>
      map = @get 'propertyMappings'
      ind = null
      for m, i in map when m.objectProperty == objectProperty and m.dataProperty == dataProperty
        ind = i
        break
      map.splice i, 1
      @set 'propertyMappings', map
