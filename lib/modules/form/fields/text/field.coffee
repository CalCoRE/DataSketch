define (require) ->
  BaseField = require 'modules/form/fields/base/field'
  Model = require './model'
  View = require './view'

  class TextField extends BaseField
    constructor: (settings = {}) ->
      settings.viewClass ?= View
      settings.modelClass ?= Model
      super settings

      @_view.addEventListener 'TextField.RequestValueChange', @_onValueChangeRequest

    _onValueChangeRequest: (evt) =>
      console.log evt.data.value
      if !@_model.get('disabled')
        @_model.set 'value', evt.data.value

  TextField.create = (data) ->
    new TextField
      modelData: data
  
  TextField