define (require) ->
  BaseFieldView = require 'modules/form/fields/base/view'
  Template = require 'text!./textfield.html'

  class TextFieldView extends BaseFieldView
    constructor: (model, tmpl) ->
      super model, if tmpl? then tmpl else Template

      @$el.find(".field-prefix").html model.get('prefix')
      @$el.find(".field-postfix").html model.get('postfix')

      @$el.find("input.textfield").on 'change', @_onFieldChange

    disable: () =>
      @$el.find('input.textfield').prop 'disabled', true

    enable: () =>
      @$el.find('input.textfield').prop 'disabled', false

    _onFieldChange: (jqevt) =>
      @dispatchEvent 'TextField.RequestValueChange',
        value: @$el.find("input.textfield").val()