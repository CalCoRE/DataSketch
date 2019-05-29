define (require) ->
  FieldView = require 'modules/form/fields/base/view'
  Template = require 'text!./button.html'

  require 'link!./style.css'

  class ButtonFieldView extends FieldView
    constructor: (model, tmpl) ->
      super model, if tmpl? then tmpl else Template

      @$el.find('button').click @_onClick

    render: (model) =>
      @$el.find(".btn")
        .text model.get('label')
        .val model.get('value')
        .addClass model.get('class')

    disable: () =>
      @$el.find('.btn').prop 'disabled', true

    enable: () =>
      @$el.find('.btn').prop 'disabled', false

    _onClick: (jqevt) =>
      @dispatchEvent 'Button.Clicked', {}
      false