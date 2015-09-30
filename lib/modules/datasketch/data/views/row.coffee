define (require) ->
  DomView = require 'core/view/dom_view'
  Template = require 'text!./row.html'

  class DataRowView extends DomView
    constructor: (model) ->
      super Template

      @_cells = {}

      for val in model.get 'values'
        @$el.append "<div class='table-cell'>#{if val.value != '' then val.value else "&nbsp;"}</div>"
