define (require) ->
  $ = require 'jquery'
  DomView = require 'core/view/dom_view'
  Globals = require 'core/model/globals'
  Template = require 'text!./view.html'

  Group = require './objects/group'
  Path = require './objects/path'

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

    initCanvas: (model) =>
      @_fabric = new Fabric.Canvas @$el.find('.canvas-main')[0]
      @_fabric.isDrawingMode = true
      @_fabric.on 'path:created', @_onPathCreated
      @_fabric.on 'object:selected', @_onObjectSelected
      @_fabric.on 'selection:created', @_onSelectionCreated
      @_fabric.on 'selection:cleared', @_onSelectionCleared
      Globals.get('Relay').addEventListener 'Window.Resize', @updateDimensions
      @updateDimensions()

    _onPathCreated: (evt) =>
      path = new Path evt.path
      evt.path.set 'id', path.get('id')
      @dispatchEvent 'Path.Created',
        path: path

    _onSelectionCreated: (evt) =>
      @dispatchEvent 'Selection.Created',
        objects: evt.target.getObjects()
        objectIds: (obj.get('id') for obj in evt.target.getObjects())

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
      @_fabric.deactivateAll().renderAll()

    _onChange: (evt) =>
      switch evt.data.path
        when "mode"
          @_onChangeMode evt.data.value
        when "strokeWidth"
          @_fabric.freeDrawingBrush.width = evt.data.value
        when "strokeColor"
          @_fabric.freeDrawingBrush.color = evt.data.value
        when "selected"
          if evt.data.value?.length == 0
            @clearSelection()
          else if !@_fabric.getActiveGroup()?
            @_fabric.setActiveGroup new fabric.Group (obj.get('view') for obj in evt.data.value)

    _onChangeMode: (val) =>
      switch val
        when "select"
          @_fabric.isDrawingMode = false
        when "draw"
          @_fabric.isDrawingMode = true

    _onObjectRemoved: (evt) =>
      evt.data.object.get('view').remove()
      @clearSelection()

    _onObjectAdded: (evt) =>
      if evt.data.object instanceof Group and !evt.data.object.get('view')?
        objs = (obj.get('view') for obj in evt.data.object.getObjects())
        grp = new fabric.Group objs
        grp.set 'id', evt.data.object.get('id')
        evt.data.object.set 'view', grp
        @_fabric.clear().renderAll()
      @_fabric.add evt.data.object.get 'view'

    _onObjectsRemoved: (evt) =>
      for obj in evt.data.objects
        obj.get('view').remove()
      @clearSelection()

    _onObjectsAdded: (evt) =>
      for obj in evt.data.objects
        @_fabric.add obj
