define (require) ->
  ToolView = require 'modules/toolkit/tool/view'
  Template = require 'text!./view.html'
  require 'link!./style.css'

  class ColorToolView extends ToolView
    constructor: (model) ->
      super model, Template

    _render: (model) =>
      super      
      if model.get('id') == "color-stroke"
         colorId = "Stroke"
      else
         colorId = "Fill"
            
      @$el.find('input')[0].id = colorId
      @$el.find('.jscolor')[0].innerText = colorId
      @$el.find('.jscolor')[0].value = colorId
      @$el.find('button').attr('class', @$el.find('button').attr('class').replace('valueInput', colorId)) 
      @$el.find('.palette-well').css
        "background-color": model.get('color')
       @$el.find('input').on 'change' ,(evt) =>         
         model.set('color',"##{evt.target.value}")         
         @dispatchEvent 'Tool.GenerateActionRequest', {}

    setPickerColor: (id, color) =>      
      @$el.find('#'+id).next()[0].innerText = color
      @$el.find('#'+id).next()[0].value = color
      @$el.find('#'+id).next().attr('class', @$el.find('#'+id).next().attr('class').replace('valueInput', color)) 
      @$el.find('#'+id).parent().css
        "background-color": color