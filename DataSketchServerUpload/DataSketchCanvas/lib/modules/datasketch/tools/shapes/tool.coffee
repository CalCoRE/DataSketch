#File for generating action for adding a shape in to canvas.
define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  ShapeAction = require 'modules/datasketch/actions/add_shapes'
  Globals = require 'core/model/globals'

  require 'link!./style.css'

  class ShapeTool extends Tool
    constructor: (@_shapeId) ->
      super
        modelData:
          id: "shape-#{@_shapeId}"          
          tooltip:switch @_shapeId
                    when @_shapeId = 1 then "Circle"
                    when @_shapeId = 2 then "Rectangle"
                    when @_shapeId = 3 then "Triangle"
                    when @_shapeId = 4 then "Horizontal Line"
                    when @_shapeId = 5 then "Vertical Line"
                    when @_shapeId = 6 then "Add Text"

    generateAction: () =>      
      new ShapeAction Globals.get('Canvas'), @_shapeId

    