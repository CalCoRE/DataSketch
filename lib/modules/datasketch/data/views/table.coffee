define (require) ->
  DomView = require 'core/view/dom_view'
  Template = require 'text!./table.html'

  RowView = require './row'

  require 'link!./style.css'

  class DataTableView extends DomView
    constructor: (model) ->
      super Template

      for property in model.get('properties')
        @addChild new DomView("<div class='table-header property table-cell'>#{property.getName()}</div>"), ".properties"

      for row, ind in model.get('rows')
        rv = new RowView row
        @addChild rv, ".rows"
        @addChild new DomView("<div class='table-header row-header table-cell'>T #{ind}</div>"), ".row-headers"

      window.requestAnimationFrame @onScreen

    onScreen: () =>
      width = @$el.find(".properties").outerWidth()
      if width
        @$el.find(".table-wrap").css
          "padding-left": @$el.find(".properties").outerWidth()
      else
        window.requestAnimationFrame @onScreen