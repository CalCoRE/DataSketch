define (require) ->
  DomView = require 'core/view/dom_view'
  Template = require 'text!./modal.html'

  require 'link!./style.css'

  class ModalView extends DomView
    constructor: (model, tmpl) ->
      super if tmpl? then tmpl else Template

      @_pages = []
      model.addEventListener 'Model.Change', @_onChange
      @$el.find(".close").click @_onCloseClick

    _onChange: (evt) =>
      if evt.data.path == "pages"
        @render evt.currentTarget
      if evt.data.path == "isOpen"
        if evt.data.value
          @$el.fadeIn()
        else
          @$el.fadeOut()

    _onCloseClick: (jqevt) =>
      @dispatchEvent "Modal.CloseRequest", {}

    render: (model) =>
      while @_pages.length
        @removeChild @_pages.pop()

      for page in model.get 'pages'
        pageWrap = new DomView "<div class='page'></div>"
        pageWrap.addChild page.view()
        @addChild pageWrap, ".pages"
        @_pages.push pageWrap
