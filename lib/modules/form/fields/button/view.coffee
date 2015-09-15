define (require) ->
  FieldView = require 'modules/form/fields/base/view'
  Template = require 'text!./button.html'

  class ButtonFieldView extends FieldView
    constructor: (model, tmpl) ->
      super model, if tmpl? then tmpl else Template

      @$el.find('button').click @_onClick

    render: (model) =>
      @$el.find("button")
        .text model.get('label')
        .val model.get('value')
        .addClass model.get('class')

    disable: () =>
      @$el.find('button').prop 'disabled', true

    enable: () =>
      @$el.find('button').prop 'disabled', false

    _onClick: (jqevt) =>
      @dispatchEvent 'Button.Clicked', {}
      false