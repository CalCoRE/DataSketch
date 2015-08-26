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

    enable: () =>
      @set 'disabled', false
