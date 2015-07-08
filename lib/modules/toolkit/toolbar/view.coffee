define (require) ->
  DomView = require 'core/view/dom_view'
  Template = require 'text!./view.html'
  require 'link!./style.css'

  class ToolbarView extends DomView
    constructor: (model) ->
      super Template

      @_render model
      model.addEventListener 'Model.Change', @_onChange

    _onChange: (evt) =>
      @_render evt.currentTarget

    _render: (model) =>
      @$el.attr 'id', model.get('id')
      while @_children.length
        @removeChild @_children.pop()

      for id, tool of model.get('tools')
        @addChild tool.view()