define (require) ->
  DomView = require 'core/view/dom_view'
  Template = require 'text!./form.html'

  class FormView extends DomView
    constructor: (model) ->
      super Template

      @$el.attr 'id', model.get 'id'
      for cls in model.get 'classes'
        @$el.addClass cls
      @fieldViews = []
      @buttonViews = []

      @render model

    render: (model) =>
      while @fieldViews.length
        @removeChild @fieldViews.pop()
      while @buttonViews.length
        @removeChild @buttonViews.pop()

      for field in model.get('fields')
        @fieldViews.push field.view()
        @addChild field.view(), '.fields'
      for button in model.get('buttons')
        @buttonViews.push button.view()
        @addChild button.view(), '.modal-footer'