define (require) ->
  ToolView = require 'modules/toolkit/tool/view'
  Template = require 'text!./view.html'
  require 'link!./style.css'

  class ColorToolView extends ToolView
    constructor: (model) ->
      super model, Template

    _render: (model) =>
      super model
      @$el.find('.palette-well').css
        "background-color": model.get('color')
       @$el.find('#valueInput').on 'change' ,(evt) =>
         model.set('color',"##{evt.target.value}")
         @dispatchEvent 'Tool.GenerateActionRequest', {}