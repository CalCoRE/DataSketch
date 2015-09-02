define (require) ->
  Module = require 'core/app/module'
  Model = require 'core/model/model'
  HM = require 'core/event/hook_manager'

  class AnimationProperty extends Module
    constructor: (settings) ->
      super()
      @_model = new Model
        data: settings
      HM.hook 'DataMapping.ObjectProperties', @_hookObjectProperties

    getId: () =>
      @_model.get 'id'

    getName: () =>
      @_model.get 'name'

    _hookObjectProperties: (list, meta) =>
      list.push @
      list