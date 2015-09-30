define (require) ->
  Controller = require 'core/controller/controller'
  Model = require './model'
  View = require './view'

  class Field extends Controller
    constructor: (settings = {}) ->
      settings.modelClass ?= Model
      settings.viewClass ?= View

      super settings

    value: () =>
      @_model.get 'value'

    id: () =>
      @_model.get 'id'

    setValue: (val) =>
      if @isValidValue val
        @_model.set 'value', val

    validate: () =>
      @isValidValue @value()

    isValidValue: (val) =>
      true

    enable: () =>
      @_model.set 'disabled', false

    disable: () =>
      @_model.set 'disabled', true

    isActive: () =>
      !@_model.get 'disabled'
