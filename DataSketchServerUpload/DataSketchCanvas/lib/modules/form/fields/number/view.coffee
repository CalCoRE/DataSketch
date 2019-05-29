define (require) ->
  BaseFieldView = require 'modules/form/fields/base/view'
  Template = require 'text!./numberfield.html'

  class NumberFieldView extends BaseFieldView
    constructor: (model, tmpl) ->
      super model, if tmpl? then tmpl else Template
      @$el.find(".field-prefix").html model.get('prefix')
      @$el.find(".field-postfix").html model.get('postfix')

      if model.get('min')?
        @$el.find("input.numberfield").attr "min", model.get('min')
      if model.get('max')?
        @$el.find("input.numberfield").attr "max", model.get('max')
      
      @$el.find("input.numberfield").attr "id", model.get('id')
      @$el.find("input.numberfield").on 'change', @_onFieldChange

    disable: () =>
      @$el.find('input.numberfield').prop 'disabled', true

    enable: () =>
      @$el.find('input.numberfield').prop 'disabled', false

    _onFieldChange: (jqevt) =>
      @dispatchEvent 'NumberField.RequestValueChange',
        value: parseFloat @$el.find("input.numberfield").val()