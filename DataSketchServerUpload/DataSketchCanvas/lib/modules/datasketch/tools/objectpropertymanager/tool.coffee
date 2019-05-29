#File for generating action for adding a shape in to canvas.
define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  Globals = require 'core/model/globals'
  require 'link!./style.css'

  ObjectPropertyManager = require 'modules/datasketch/actions/object_property_manager'
  #Tool for displaying object properties on bottom right corner of application in context menu.
  class ObjectPropertyManagerTool extends Tool
    constructor: (@_ObjectProperty) ->
      super
        modelData:
          id: "Object-#{@_ObjectProperty}"

    generateAction: () =>      
      new ObjectPropertyManager Globals.get('Canvas'), @_ObjectProperty