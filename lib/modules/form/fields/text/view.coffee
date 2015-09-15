define (require) ->
  BaseFieldView = require 'modules/form/fields/base/view'
  Template = require 'text!./textfield.html'

  class TextFieldView extends BaseFieldView
    constructor: (model, tmpl) ->
      super model, if tmpl? then tmpl else Template

      @$el.find(".field-prefix").text model.get('prefix')
      @$el.find(".field-postfix").text model.get('postfix')

      @$el.find("input.field").on 'change', @_onFieldChange

    disable: () =>
      @$el.find('input.field').prop 'disabled', true

    enable: () =>
      @$el.find('input.field').prop 'disabled', false

    _onFieldChange: (jqevt) =>
      @dispatchEvent 'TextField.RequestValueChange',
        value: @$el.find("input.field").val()