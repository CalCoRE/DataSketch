define (require) ->
  BaseField = require 'modules/form/fields/base/field'
  View = require './view'
  Model = require './model'

  class ButtonField extends BaseField
    constructor: (settings) ->
      settings.viewClass ?= View
      settings.modelClass ?= Model
      super settings

      @_view.addEventListener 'Button.Clicked', @_onClick

    _onClick: (evt) =>      
      if @isActive()
        @view().dispatchEvent @_model.get('event'), {}, true

  ButtonField.create = (data) ->
    new ButtonField
      modelData: data

  ButtonField