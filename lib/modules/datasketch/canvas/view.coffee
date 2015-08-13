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
      @_isolated = []

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
      if evt.data.object instanceof Group
        fbgrp = evt.data.object.get('view')
        @_breakGroup fbgrp
      else
        @_fabric.remove evt.data.object.get('view')
      @_fabric.renderAll()
      @clearSelection()

    _onObjectAdded: (evt) =>
      if evt.data.object instanceof Group and !evt.data.object.get('view')?
        @_generateGroupView evt.data.object
      else
        evt.data.object.get('view').setCoords()

    _generateGroupView: (group) =>
      grp = new fabric.Group
      grp.originX = "center"
      grp.originY = "center"
      center = null
      dims =
        left: null
        right: null
        top: null
        bottom: null
      for obj in group.getObjects()
        v = obj.get('view')
        if v.group?
          center ?= v.group.getCenterPoint()
        else
          bb = v.getBoundingRect()
          dims.left = if dims.left? then Math.min(bb.left, dims.left) else bb.left
          dims.right = if dims.right? then Math.max(bb.left + bb.width, dims.right) else bb.left + bb.width
          dims.top = if dims.top? then Math.min(bb.top, dims.top) else bb.top
          dims.bottom = if dims.bottom? then Math.max(bb.top + bb.height, dims.bottom) else bb.top + bb.height
        grp.addWithUpdate v
        @_fabric.remove v
      if !center?
        center =
          x: (dims.left + dims.right) / 2
          y: (dims.top + dims.bottom) / 2
        for obj in group.getObjects()
          v = obj.get('view')
          v.left -= center.x
          v.top -= center.y
          v.setCoords()
      grp.set 'id', group.get('id')
      group.set 'view', grp
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
      grp

    _breakGroup: (group) =>
      group._restoreObjectsState()
      items = group._objects.slice(0)
      for itm in items
        itm.hasControls = true
      @_fabric.remove group

    _onObjectsRemoved: (evt) =>
      for obj in evt.data.objects
        @_fabric.remove obj.get('view')
      @clearSelection()

    _onObjectsAdded: (evt) =>
      for obj in evt.data.objects
        v = obj.get('view')
        @_fabric.add v
        v.setCoords()

    _isolateGroup: (grp) =>
      @_breakGroup grp.get('view')
      for obj in grp.getObjects()
        v = obj.get('view')
        @_fabric.add v
        v.setCoords()
      @_isolated.unshift grp

    _reformGroup: (grp) =>
      @_generateGroupView grp
      @_fabric.renderAll()
      @_isolated.shift()