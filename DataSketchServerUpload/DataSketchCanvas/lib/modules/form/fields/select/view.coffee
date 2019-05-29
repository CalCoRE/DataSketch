define (require) ->
  BaseFieldView = require 'modules/form/fields/base/view'
  Template = require 'text!./selectfield.html'  

  class SelectFieldView extends BaseFieldView
    constructor: (model, tmpl) ->
      super model, if tmpl? then tmpl else Template

      @$el.find(".selectfield").on 'change', @_onFieldChange

    disable: () =>
      @$el.find('.selectfield').prop 'disabled', true

    enable: () =>
      @$el.find('.selectfield').prop 'disabled', false

    render: (model) =>
      @$el.find('option').remove()
      for opt in model.get('options')
        @$el.find('.selectfield').append "<option value='#{opt.value}'>#{opt.label}</option>"
      super model

    setFieldValue: (model) =>      
      @$el.find('.selectfield option').removeProp "selected"
      @$el.find(".selectfield option[value='#{model.get('value')}']").prop "selected", true

    _onFieldChange: (jqevt) =>      
      @dispatchEvent 'SelectField.RequestValueChange',
        value: @$el.find(".selectfield").val()