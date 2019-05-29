define (require) ->
  DomView = require 'core/view/dom_view'
  Template = require 'text!./view.html'

  require 'link!./style.css'

  class ContextMenuView extends DomView
    constructor: (model) ->
      super Template

      @_render model
      model.addEventListener "Model.Change", @_onModelChange

    _onModelChange: (evt) =>
      @_render evt.currentTarget

    _render: (model) =>
      @$el.toggleClass 'objectproperty-menu-open', model.get('display')? and model.get('display')

      if model.get('menu')?
        while @_children.length
          @removeChild @_children.pop()
        @addChild model.get('menu').view()