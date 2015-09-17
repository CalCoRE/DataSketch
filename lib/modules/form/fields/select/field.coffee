define (require) ->
  BaseField = require 'modules/form/fields/base/field'
  Model = require './model'
  View = require './view'

  class SelectField extends BaseField
    constructor: (settings = {}) ->
      settings.viewClass ?= View
      settings.modelClass ?= Model
      super settings

      if !@_model.get('value')? and @_model.get('options')? and @_model.get('options').length
        @_model.set 'value', @_model.get('options')[0].value
      @_view.addEventListener 'SelectField.RequestValueChange', @_onValueChangeRequest

    _onValueChangeRequest: (evt) =>
      if !@_model.get('disabled')
        @_model.set 'value', evt.data.value

  SelectField.create = (data) ->
    new SelectField
      modelData: data
  
  SelectField