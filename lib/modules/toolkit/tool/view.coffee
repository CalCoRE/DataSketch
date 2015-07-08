define (require) ->
  DomView = require 'core/view/dom_view'
  Template = require 'text!./view.html'
  require 'link!./style.css'

  class ToolView extends DomView
    constructor: (model) ->
      super Template

      @_render model
      model.addEventListener 'Model.Change', @_onChange
      @$el.on 'click', @_onClick

    _onChange: (evt) =>
      @_render evt.currentTarget

    _onClick: (jqevt) =>
      @dispatchEvent 'Tool.GenerateActionRequest', {}

    _render: (model) =>
      @$el.addClass model.get('id')
      @$el.attr 'title', model.get('id')