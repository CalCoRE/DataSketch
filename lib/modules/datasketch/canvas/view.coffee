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
      # console.log evt, @_fabric.getActiveGroup()
      @dispatchEvent 'Selection.Created',
        # objects: @_fabric.getActiveGroup().getObjects()
        objects: evt.target.getObjects()
        # objectIds: (obj.get('id') for obj in @_fabric.getActiveGroup().getObjects())
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
      @_fabric.deactivateAllWithDispatch().renderAll()

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
          # else if !@_fabric.getActiveGroup()?
          #   @_fabric.setActiveGroup new fabric.Group (obj.get('view') for obj in evt.data.value)

    _onChangeMode: (val) =>
      switch val
        when "select"
          @_fabric.isDrawingMode = false
        when "draw"
          @_fabric.isDrawingMode = true

    _onObjectRemoved: (evt) =>
      if evt.data.object instanceof Group
        fbgrp = evt.data.object.get('view')
        fbgrp._restoreObjectsState()
        items = fbgrp._objects.slice(0)
        for itm in items
          itm.hasControls = true
        @_fabric.remove fbgrp
      else
        @_fabric.remove evt.data.object.get('view')
      @_fabric.renderAll()
      @clearSelection()

    _onObjectAdded: (evt) =>
      if evt.data.object instanceof Group and !evt.data.object.get('view')?
        grp = new fabric.Group
        grp.originX = "center"
        grp.originY = "center"
        center = null
        for obj in evt.data.object.getObjects()
          v = obj.get('view')
          center = v.group.getCenterPoint()
          grp.addWithUpdate v
          @_fabric.remove v
        grp.set 'id', evt.data.object.get('id')
        evt.data.object.set 'view', grp
        @_fabric.setActiveGroup grp
        @_fabric.add grp
        @_fabric.renderAll()
        # in order to avoid order of operation issues, we need to set position
        # in a timeout
        window.requestAnimationFrame () =>
          grp.set 'left', center.x
          grp.set 'top', center.y
          grp.setCoords()
          @_fabric.renderAll()
      else
        evt.data.object.get('view').setCoords()

    _onObjectsRemoved: (evt) =>
      for obj in evt.data.objects
        @_fabric.remove obj.get('view')
      @clearSelection()

    _onObjectsAdded: (evt) =>
      for obj in evt.data.objects
        v = obj.get('view')
        @_fabric.add v
        v.setCoords()
