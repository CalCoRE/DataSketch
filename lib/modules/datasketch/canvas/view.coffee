define (require) ->
  $ = require 'jquery'
  DomView = require 'core/view/dom_view'
  Globals = require 'core/model/globals'
  Template = require 'text!./view.html'

  Group = require './objects/group/object'

  Fabric = require 'thirdparty/fabric'
  require 'link!./style.css'

  class DSCanvasView extends DomView
    constructor: (model) ->
      super Template
      model.addEventListener 'Model.Change', @_onChange
      model.addEventListener 'Canvas.ObjectRemoved', @_onObjectRemoved
      model.addEventListener 'Canvas.ObjectAdded', @_onObjectAdded
      model.addEventListener 'Canvas.ObjectsRemoved', @_onObjectsRemoved
      model.addEventListener 'Canvas.ObjectsAdded', @_onObjectsAdded
      @_isolated = []

    initCanvas: (model) =>
      @_fabric = new Fabric.Canvas @$el.find('.canvas-main')[0]
      @_fabric.isDrawingMode = true
      @_fabric.on 'path:created', @_onPathCreated
      @_fabric.on 'object:selected', @_onObjectSelected
      @_fabric.on 'selection:created', @_onSelectionCreated
      @_fabric.on 'before:selection:cleared', @_beforeSelectionCleared
      @_fabric.on 'selection:cleared', @_onSelectionCleared
      Globals.get('Relay').addEventListener 'Window.Resize', @updateDimensions
      @updateDimensions()

    render: (model) =>
      if @_fabric?
        @_fabric.clear()
        for obj in model.get('objects')
          @_fabric.discardActiveGroup()
          if obj instanceof Group
            @_fabric.setActiveGroup obj.view().getFabric()
          # obj.enforcePosition()
          obj.enforceTransform()
          @_fabric.add obj.view().getFabric()
        @_fabric.discardActiveGroup()
        @_fabric.renderAll()

    _onPathCreated: (evt) =>
      @dispatchEvent 'Path.Created',
        path: evt.path

    _onSelectionCreated: (evt) =>
      @_fabricSelection = evt.target
      @_fabricSelectionMetaCache =
        position:
          x: @_fabricSelection.left
          y: @_fabricSelection.top
        rotation: @_fabricSelection.angle
        scale:
          x: @_fabricSelection.scaleX
          y: @_fabricSelection.scaleY
      @_fabricSelection.on 'modified', @_onSelectionModified
      @dispatchEvent 'Selection.Created',
        objectIds: (obj.get('id') for obj in evt.target.getObjects())

    _beforeSelectionCleared: (evt) =>
      @_fabricSelection?.off 'modified', @_onSelectionModified
      @_fabricSelection = null

    _onSelectionModified: (evt) =>
      if @_fabricSelection?
        delta =
          position:
            x: @_fabricSelection.left - @_fabricSelectionMetaCache.position.x
            y: @_fabricSelection.top - @_fabricSelectionMetaCache.position.y
          rotation: @_fabricSelection.angle - @_fabricSelectionMetaCache.rotation
          scale:
            x: @_fabricSelection.scaleX - @_fabricSelectionMetaCache.scale.x
            y: @_fabricSelection.scaleY - @_fabricSelectionMetaCache.scale.y
        @dispatchEvent 'Selection.Modified',
          delta: delta

    _onSelectionCleared: (evt) =>
      @dispatchEvent 'Selection.Cleared', {}

    _onObjectSelected: (evt) =>
      if group = @_fabric.getActiveGroup()
        objects = group.getObjects()
      else
        objects = [@_fabric.getActiveObject()]

      @dispatchEvent 'Selection.Created',
        objects: objects
        objectIds: (obj.get('id') for obj in objects)

    updateDimensions: () =>
      @_fabric.setDimensions
        width: $(window).width()
        height: $(window).height()

    clearSelection: () =>
      @_fabric.deactivateAllWithDispatch().renderAll()

    _onChange: (evt) =>
      switch evt.data.path
        when "mode"
          @_onChangeMode evt.data.value
        when "strokeWidth"
          @_fabric.freeDrawingBrush.width = evt.data.value
          @_fabric.renderAll()
        when "strokeColor"
          @_fabric.freeDrawingBrush.color = evt.data.value
          @_fabric.renderAll()
        when "selected"
          if evt.data.value?.length == 0
            @clearSelection()
          # else if !@_fabric.getActiveGroup()?
          #   @_fabric.setActiveGroup new fabric.Group (obj.get('view') for obj in evt.data.value)
        when "isolated"
          if evt.data.value.length > @_isolated.length
            @_isolateGroup evt.data.value[0]
          else if evt.data.value.length < @_isolated.length
            @_reformGroup @_isolated[0]

    _onChangeMode: (val) =>
      switch val
        when "select"
          @_fabric.isDrawingMode = false
        when "draw"
          @_fabric.isDrawingMode = true

    _onObjectRemoved: (evt) =>
      @clearSelection()

    _onObjectAdded: (evt) =>

    _breakGroup: (group) =>
      # group._restoreObjectsState()
      # items = group._objects.slice(0)
      # for itm in items
      #   itm.hasControls = true
      # @_fabric.remove group

    _onObjectsRemoved: (evt) =>
      @clearSelection()

    _onObjectsAdded: (evt) =>

    _isolateGroup: (grp) =>
      @_breakGroup grp
      for obj in grp.getObjects()
        v = obj.get('view')
        @_fabric.add v
        v.setCoords()
      @_isolated.unshift grp

    _reformGroup: (grp) =>
      @_generateGroupView grp
      # @_fabric.renderAll()
      @_isolated.shift()