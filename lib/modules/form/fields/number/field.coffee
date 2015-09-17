define (require) ->
  BaseField = require 'modules/form/fields/base/field'
  Model = require './model'
  View = require './view'

  class NumberField extends BaseField
    constructor: (settings = {}) ->
      settings.viewClass ?= View
      settings.modelClass ?= Model
      super settings

      @_view.addEventListener 'NumberField.RequestValueChange', @_onValueChangeRequest

    _onValueChangeRequest: (evt) =>
      if !@_model.get('disabled')
        val = evt.data.value
        if @_model.get('min')? and val < @_model.get('min')
          val = Math.max @_model.get('min'), val
        if @_model.get('max')? and val > @_model.get('max')
          val = Math.min @_model.get('max'), val
        @_model.set 'value', val

  NumberField.create = (data) ->
    new NumberField
      modelData: data
  
  NumberField