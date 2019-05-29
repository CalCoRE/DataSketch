define (require) ->
  DomView = require 'core/view/dom_view'
  Template = require 'text!./view.html'

  class MenuView extends DomView
    constructor: (model) ->
      super Template

      @_render model
      model.addEventListener 'Model.Change', @_onModelChange
      @$el.find(".menu-label").on 'click', @_requestAction
      @$el.attr 'id', model.get 'id'
      if model.get('action')?
        @$el.addClass 'actionable'
      if model.get('items').length
        @$el.addClass 'parent'

    _onModelChange: (evt) =>
      @_render evt.currentTarget

    _render: (model) =>
      while @_children.length
        @removeChild @_children.pop()

      @$el.find(".menu-label").html model.get('label')
      for item in model.get('items')
        @addChild item.view(), ".menu-items"

      @$el.toggleClass "disabled", model.get('disabled')

    _requestAction: (jqevt) =>
      @dispatchEvent "Menu.ActionRequest", {}
      jqevt.stopPropagation()