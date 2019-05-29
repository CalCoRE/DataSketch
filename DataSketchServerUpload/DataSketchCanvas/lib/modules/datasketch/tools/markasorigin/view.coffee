define (require) ->
  ToolView = require 'modules/toolkit/tool/view'
  Template = require 'text!./view.html'
  require 'link!./style.css'

  class SnapGridToolView extends ToolView
    constructor: (model) ->
      super model, Template
