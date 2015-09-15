define (require) ->
  DomView = require 'core/view/dom_view'
  Template = require 'text!./field.html'

  class FieldView extends DomView
    constructor: (model, tmpl) ->
      super if tmpl? then tmpl else Template

      model.addEventListener 'Model.Change', @onModelChange
      @render model

    onModelChange: (evt) =>
      switch evt.data.path
        when "value"
          @render evt.currentTarget
        when "disabled"
          if evt.data.value
            @disable()
          else
            @enable()

    render: (model) =>
      @$el.find('.label').text model.get('label')
      @setFieldValue model

    setFieldValue: (model) =>
      @$el.find('input').val model.get('value')

    disable: () =>

    enable: () =>