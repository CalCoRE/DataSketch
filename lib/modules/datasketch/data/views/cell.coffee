define (require) ->
  DomView = require 'core/view/dom_view'
  Template = require 'text!./cell.html'

  class DataCellView extends DomView
    constructor: (value) ->
      super Template

      @$el.text value