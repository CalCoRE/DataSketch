define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  Globals = require 'core/model/globals'

  class ObjectSummaryModule extends Module
    constructor: () ->
      super

    init: () =>
      HM.hook 'ContextMenu.MenuItems', @_hookMenuItems
    
    root = exports ? this
    
    ObjectProperty : (activeObject) =>
     $("#Object-Width").text("Width "+ Math.round(activeObject.width * activeObject.scaleX));
     $("#Object-Height").text("Height "+ Math.round(activeObject.height * activeObject.scaleY));
     $("#Object-X").text("X "+ Math.round(activeObject.left));
     $("#Object-Y").text("Y "+ Math.round(activeObject.top));
     $("#Object-Angle").text("Angle "+ Math.round(activeObject.angle));
     $("#Object-originX").text("originX "+ activeObject.originX);
     $("#Object-originY").text("originY "+ activeObject.originY );
     
    _hookMenuItems : (list, meta) =>
      if meta.context.selection?.length == 1        
        list.push
          id: 'Object-originY'
          label: "originY:"
        list.push
          id: 'Object-originX'
          label: "originX:"                  
        list.push
          id: 'Object-Angle'
          label: "Angle:"         
        list.push
          id: 'Object-Y'
          label: "Y:"
        list.push
          id: 'Object-X'
          label: "X:"
        list.push
          id: 'Object-Height'
          label: "Height:"
        list.push
          id: 'Object-Width'
          label: "Width:"
      list
