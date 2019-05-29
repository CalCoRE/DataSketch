define (require) -> 
  #Standard library
  require 'link!./style.css' 

  #Third party library
  $                       = require 'jquery'
  Fabric                  = require 'thirdparty/fabric'

  #Local imports
  DomView                 = require 'core/view/dom_view'
  Globals                 = require 'core/model/globals'
  HM                      = require 'core/event/hook_manager'
  Model                   = require './model'
  Template                = require 'text!./view.html'
  Path                    = require './objects/path/object'
  Group                   = require './objects/group/object'    
  PropertyMap             = require 'modules/datasketch/animation/property_map'
  DataPropertyAction      = require 'modules/datasketch/data/module'
  AnimationObject         = require 'modules/datasketch/animation/animator'
  ObjectProperty          = require 'modules/datasketch/canvas/objects/base/object'
  MappingAssignmentAction = require 'modules/datasketch/actions/mapping_assignment'

  
  
  
  class DSCanvasView extends DomView
    ###*
       * Funtion to initialize model class.
       * @param {model} Instance of model.
    ###
    constructor : (model) ->
      super Template
      @_model = model
      model.addEventListener 'Model.Change', @_onChange
      model.addEventListener 'Canvas.ObjectRemoved', @_onObjectRemoved
      model.addEventListener 'Canvas.ObjectAdded', @_onObjectAdded
      model.addEventListener 'Canvas.ObjectsRemoved', @_onObjectsRemoved
      model.addEventListener 'Canvas.ObjectsAdded', @_onObjectsAdded
      model.addEventListener 'Canvas.ObjectsAdded', @_onObjectsAdded

    ###*
       * Funtion to create canvas and initialize the fabric js events and key press events and also for loadig sketch from local storage.
       * @param {model} Instance of model.
    ###
    initCanvas : (model) =>
      window.isViewMode = 0
      @_fabric = new Fabric.Canvas @$el.find('.canvas-main')[0],renderOnAddRemove: false
      @_fabric.isDrawingMode = true
      @_fabric.on 'path:created', @_onPathCreated
      @_fabric.on 'object:selected', @_onObjectSelected
      @_fabric.on 'object:scaling', @_onObjectScaling
      @_fabric.on 'object:moving', @_onObjectScaling
      @_fabric.on 'object:rotating', @_onObjectScaling
      @_fabric.on 'mouse:up',@_onMouseUp
      @_fabric.on 'selection:created', @_onSelectionCreated
      @_fabric.on 'before:selection:cleared', @_beforeSelectionCleared
      @_fabric.on 'selection:cleared', @_onSelectionCleared
      Globals.get('Relay').addEventListener 'Window.Resize', @updateDimensions
      @updateDimensions()            
      fileData = localStorage.getItem('SaveCanvasToLocal');
      
      if this.decodeUriComponent('id') != null && this.decodeUriComponent('sketchName') != null && this.decodeUriComponent('mode') != null
        window.currentSketchMode = this.decodeUriComponent('mode')
        Globals.get('Canvas').loadFromQueryString this.decodeUriComponent('id'), this.decodeUriComponent('sketchName')
      if fileData != null && fileData != ''
        this.loadFromJson(fileData);
        localStorage.removeItem('SaveCanvasToLocal');

      _this = this;
      $(window).on 'keydown', (e) ->
        _this.keyRemover e
              
    ###*
       * Function for parsing query string or url.
       * @param {name} query string key value.
       * @param {url} url.
       * @return {string} query string value.
    ###
    decodeUriComponent:(name,url)=>
      if (!url)
        url = window.location.href
      name = name.replace(/[\[\]]/g, "\\$&")
      regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
      results = regex.exec(url)
      if (!results)
        return null
      if (!results[2]) 
        return ''
      return decodeURIComponent(results[2].replace(/\+/g, " "))

    ###*
       * Function for rendering object on canvas.
       * @param {model} Instance of model.
    ###
    render: (model) =>      
      if @_fabric?
        @_fabric.clear()
        @_renderObjects model.get('objects'), model.get('isolated')
        @_fabric.discardActiveGroup()
        @_fabric.renderAll()

    #Global variable instance declaration.
    root = exports ? this

    ###*
       * Function for getting the object property from an object property array.
       * @param {propertyId} id of an animation property.
       * @return {Animation property} Animation property.
    ###
    getObjectProperty: (propertyId) =>
      @_objectProperty = HM.invoke 'DataMapping.ObjectProperties', []
      propertyId = propertyId.substr(0,1).toLowerCase()+propertyId.substr(1)
      window.objectPropertyId = propertyId
      objProperty = @_objectProperty.filter((data)=> return data.getId() == propertyId)
      objProperty

    ###*
       * Function for removing animation property from an active object.
    ###
    deleteCurrentProperty: () =>
      Globals.get('Canvas').getSelectedObjects()[0].removePropertyMapping root.objectProperty

    ###*
       * Function for getting the object animation property data.
       * @param {objProperty} animation property name.
    ###
    getAvailableProperty: (objProperty) =>    
      activeObject = Globals.get('Canvas').getSelectedObjects() 
      if activeObject[0].getPropertyMappings().length > 0
        for obj in activeObject[0].getPropertyMappings()
          if obj.objectProperty._model._data.id == objProperty
            root.objectProperty = obj.objectProperty
            minCalibration = obj.calibration.min
            maxCalibration = obj.calibration.max
            minRangeInput = $('#minRangeInput')
            maxRangeInput = $('#maxRangeInput')
            minInput = $('#minInput')
            maxInput = $('#maxInput')

            if objProperty == "transparency"
              minInput.html(Math.round(eval(minCalibration*100)))
              maxInput.html(Math.round(eval(maxCalibration*100)))
              maxRangeInput.val(Math.round(eval(maxCalibration*100)))
              minRangeInput.val(Math.round(eval(minCalibration*100)))
              CsvProperty = obj.dataProperty._data.id
              document.getElementById('csvProperty').value = CsvProperty
            else if objProperty == "color"
              colorCode = minCalibration + "-" + maxCalibration
              document.getElementById('colorProperty').value = colorCode
              CsvProperty = obj.dataProperty._data.id
              document.getElementById('csvPropertyColor').value = CsvProperty
            else if objProperty != "stamping"
              minInput.html(minCalibration)
              maxInput.html(maxCalibration)
              maxRangeInput.val(eval(maxCalibration))
              minRangeInput.val(eval(minCalibration))
              CsvProperty = obj.dataProperty._data.id
              document.getElementById('csvProperty').value = CsvProperty

    ###*
       * Function for loading sketch from json and render it on the canvas.
       * @param {FileData} sketch file content.
    ###    
    loadFromJson: (FileData) =>
      window.currentId = 0
      $('#pageLoader').show();
      $('#DisableBackground').show()
      $(".modeSelect-select").click();        

      try 
        FileData = JSON.parse(FileData)
        if FileData[0] != window.csvName
            alert"CSV Mismatched!"
        else              
            totalObj = JSON.parse(FileData[1]).objects.length
            root.FileData = FileData[1]
            root.AnimationData = FileData
            @_objectProperty = HM.invoke 'DataMapping.ObjectProperties', []
            @_dataProperty = HM.invoke 'DataMapping.DataProperties', []                       
            DataPropertyAction dataPropertyAction = new DataPropertyAction()
            
            if @_dataProperty.length == 0
              dataPropertyAction.initDataProperty()                 
              @_dataProperty = HM.invoke 'DataMapping.DataProperties', []                
            @_fabric.loadFromJSON FileData[1], @callbackFunction
            for LoadedObjects in Globals.get('Canvas').getObjects()
              if LoadedObjects._view._fabric.type == 'group'
                 debugger
                 for fabricObject in JSON.parse(FileData[1]).objects
                   currentPathObject = @_model._data.objects.filter((data) => return data.getId() == fabricObject.newId)
                   currentPathObject[0]._view._fabric.originX = fabricObject.originX
                   currentPathObject[0]._view._fabric.originY = fabricObject.originY
                   point = currentPathObject[0]._view._fabric.getPointByOrigin fabricObject.originX,fabricObject.originY
                   newPoint = currentPathObject[0]._view._fabric.translateToGivenOrigin point,currentPathObject[0]._view._fabric.originX,currentPathObject[0]._view._fabric.originY,fabricObject.originX,fabricObject.originY
                   currentPathObject[0].setPosition
                      x: newPoint.x,
                      y: newPoint.y
                # currentPathObject = JSON.parse(FileData[1])._data.objects.filter((data) => return data.id == LoadedObjects.getId())
            for obj in FileData
              if FileData.indexOf(obj) > 1
                  pathObject = pathObj = @_model._data.objects.filter((data) => return data.getId() == obj.id)
                  if pathObject.length > 0
                    pathObject[0]._model._data.isStamping = obj.isStamping
      catch e 
        alert "File is not supported or is invalid."               

    ###*
       * Function executed after load from json execution got finish and convert fabric to pathobject.
    ###
    callbackFunction: () =>
      @_fabric.renderAll.bind(@_fabric)
      root.finalGrpIds = []
      root.allSingleObjects = []
      root.arrGroupIds = []        
      root.allObjectsGroup = []
      root.allAnimationObjGrp = []        
      @getAllSingleObjects(@_fabric._objects)
      @getAllAnimationObjects(root.AnimationData)

      for obj in root.allSingleObjects            
        pathObject = Path.createFromFabric obj
        pathObject._model._data.id = obj.newId
        pathObject._view._fabric.id = obj.newId
        @_model.addObject pathObject
        root.allObjectsGroup.push pathObject
      
      @createAllNestedGroup()

    ###*
       * Function got executed after callback function and it is for creating nested group of objects.
    ###
    createAllNestedGroup: () =>    
      for ids in root.arrGroupIds
        objects = []            
        for objId in ids.ids.split(',')                
          pathObj = @_model._data.objects.filter((data) => return data.getId() == eval(objId))                
          if pathObj.length > 0
             objects.push pathObj[0]            
        if objects.length == ids.ids.split(',').length
          if window.currentId < ids.gid
            window.currentId = ids.gid 
          masterObject = Globals.get('Canvas').createGroup(objects)
          masterObject._model._data.id = ids.gid
          masterObject._view._fabric.id = ids.gid
          
          masterObject.setPosition
            x: ids.gleft,
            y: ids.gtop
          masterObject.setScale
            x: ids.gscaleX,
            y: ids.gscaleY
          root.finalGrpIds.push ids.gid
          root.allObjectsGroup.push masterObject
              
      if root.arrGroupIds.length > 0
        for ids in root.arrGroupIds                
          grpObj = root.finalGrpIds.filter((data) => return data == eval(ids.gid))
          if grpObj.length == 0 
            @createAllNestedGroup()
            break            
          if root.arrGroupIds.indexOf(ids) == root.arrGroupIds.length - 1
            @render(@_model)
            @applyAnimation()                   
      else
        @applyAnimation()            

    ###*
       * Function got executed after create all nested group and for applying animation to an objects.
    ###
    applyAnimation: ()  =>
      $('#DisableBackground').hide()
      $('#pageLoader').hide()
      for obj in root.allAnimationObjGrp
        isBreak = false            
        pathObj = root.allObjectsGroup.filter((data) => return data.getId() == obj.id)            
        if pathObj.length > 0
          for animationItem in obj.propertyMappings
            objProperty = @_objectProperty.filter((data)=> return data.getId() == animationItem.objectProperty._model._data.id)
            dataProperty = @_dataProperty.filter((data)=> return data.getId() == animationItem.dataProperty._data.id)
            if dataProperty.length == 0
              Globals.get('Canvas').createNewFile()
              alert "CSV Mismatched!"
              isBreak = true  
              break                                            
            @_map = new PropertyMap
              objectProperty: objProperty[0]
              dataProperty: dataProperty[0]
              calibration: animationItem.calibration                                    
            pathObj[0].addPropertyMapping @_map
          if isBreak
            break
      setTimeout(@disableLoader,15000);
    
    ###*
       * Function for remove the loader and backdrop from canvas and render it.
    ###
    disableLoader: () =>        
      $('#pageLoader').hide();
      $('#DisableBackground').hide();
      @render(@_model)

    ###*
       * Function for getting the object which are applied an animation on it.
       * @param {allObjects} list of path objects.
    ###
    getAllAnimationObjects: (allObjects) =>
      for obj in allObjects
        propertyMappings = {}
        if obj.propertyMappings && obj.propertyMappings.length > 0                
          propertyMappings["id"] = obj.id
          propertyMappings["propertyMappings"] = obj.propertyMappings
          root.allAnimationObjGrp.push propertyMappings
        if obj.children && obj.children.length > 0
          @getAllAnimationObjects obj.children
        if obj._model && obj._model._data.propertyMappings && obj._model._data.propertyMappings.length > 0
          propertyMappings = {}                    
          propertyMappings["id"] = obj._model._data.id
          propertyMappings["propertyMappings"] = obj._model._data.propertyMappings
          root.allAnimationObjGrp.push propertyMappings
        if obj._model && obj._model._data.children && obj._model._data.children.length > 0
          @getAllAnimationObjects obj._model._data.children

    ###*
       * Function for getting the single object in path object list.
       * @param {allObjects} list of path objects.
    ###
    getAllSingleObjects: (allObjects) =>
      for obj in allObjects
        if obj.type == 'group'                
          groupIds = {} 
          groupIds["gid"] = obj.newId
          groupIds["gtop"] = obj.top
          groupIds["gleft"] = obj.left
          groupIds["gscaleX"] = obj.scaleX
          groupIds["gscaleY"] = obj.scaleY
          ids = obj._objects.map((data) => return data.newId).join(',');               
          groupIds['ids'] = ids
          root.arrGroupIds.push groupIds               
          @getAllSingleObjects(obj._objects)
        else               
          root.allSingleObjects.push obj

    
    ###*
       * Function for binding the list of sketch according in load sketch modal.
    ###
    bindSketchList: () =>       
      $('#FileList').html("")

      if window.currentUserId != null && window.currentUserId != undefined
        $.get window.APIURL + '/GetAllSketchMaster?id='+window.currentUserId, 
          (data) ->                  
            $('#FileList').append("FileList:")
            $('#FileList').append("<option value='default' selected>- Select File -</option>")                
            for SketchName in data
              $('#FileList').append("<option value='"+SketchName+"'>"+SketchName+"</option>")
            $('#DisableBackground').hide()
            $('#pageLoader').hide()
            $('#LoadFileModal').modal('show');
            $('.modal-backdrop').show();
      else        
        Globals.get('Canvas').saveCanvasToLocal Globals.get('Canvas').reloadCurrentPage

    ###*
       * Function for calling render all method of fabric js.
    ###
    dryRender: () =>
      @_fabric.renderAll()

    ###*
       * Function for discard the active object on canvas.
    ###
    removeSelectionOnSave: () =>
      @_fabric.discardActiveObject()
    
    ###*
       * Function for removing the grid from canvas.
    ###
    removeGrid: () =>
      @_fabric.discardActiveObject()
      grpObject = root.Grid
      
      if grpObject  
        pathObj = @_model._data.objects.filter((data) => return(data._view._fabric.id == grpObject.id))
        for obj in pathObj           
          Globals.get('Canvas').removeObject obj
      @_fabric.renderAll()
 
    #Set the default value for the grid size
    root.Gridsize = 30

    ###*
       * Function for changing the size of grid on canvas.
       * @param {@value} size of a grid.
    ###
    changeGridSize: (@value) =>
      @removeGrid()
      root.GridSize = parseInt(@value) 
      root.GridSize = root.GridSize + 20
      window.GridSize = root.GridSize
      @addGrid()
    
    ###*
       * Function for overlay of an objects on canvas.
       * @param {operation} overlay type.
       * @param {object} fabric object.
    ###
    overlayOfAnObject:(operation,object)=>
      if operation == "SendToBack"
         @_fabric.sendToBack(object._view._fabric)
      else if operation == "SendBackwards"
         @_fabric.sendBackwards(object._view._fabric)
      else if operation == "BringToFront"        
         @_fabric.bringToFront(object._view._fabric)
      else if operation == "BringForward"
         @_fabric.bringForward(object._view._fabric)
      updatedObjectArray = []
      for object in Globals.get('Canvas')._view._fabric._objects
          tempObject = @_model._data.objects.filter((data) => return data.getId() == object.id)
          updatedObjectArray.push tempObject[0]
      @_model.set 'objects', updatedObjectArray
      if root.Grid != undefined
         if(window.gridSize > 0)
           this.addGrid(root.GridSize)
           @_fabric.sendToBack(root.Grid)
      @_fabric.renderAll()

    ###*
       * Function for adding grid on to canvas.
    ###
    addGrid: () =>
      $(".modeSelect-select").click();      
      separateLines = []        
      for i in [0...eval((window.innerWidth/30)*2)]
        a = new Fabric.Line([i * root.GridSize, 0, i * root.GridSize, eval(window.innerWidth * 2)], { stroke: '#ccc', id: "grid" })
        separateLines.push a

        b = new Fabric.Line([0, i * root.GridSize, eval(window.innerWidth * 2),i*root.GridSize], { stroke: '#ccc', id: "grid" })
        separateLines.push b

      groupLines = new Fabric.Group(separateLines);
      @_fabric.add groupLines
      @dispatchEvent 'Path.Created',path: groupLines    
      @_fabric.sendToBack(groupLines)          
      groupLines.set 'id', 'grid'            
      groupLines.selectable = false
      root.Grid = groupLines    
      window.Grid = groupLines    
      @_fabric.renderAll()     
      this._model.getActiveObjects()[eval(this._model.getActiveObjects().length-1)]._model._data.id = 'grid'

    ###*
       * Function for adding custom shape on to canvas.
       * @param {shapeId} id of a custom shape.
    ###
    addShape: (shapeId) =>
      @_fabric.discardActiveObject()
      coord = this.getRandomLeftTop();      
      string=$('.tool.active')[0].title
      arr = string.split("-");
      strokeWidth = parseInt(arr[1])
      if $('#Stroke').val() != "66CCFF" || $('#Fill').val() != "66CCFF"
        strokeColor='#'+$('#Stroke').val()
        fillColor='#'+$('#Fill').val()
      else
        strokeColor = this.getRandomColor()
        fillColor = this.getRandomColor()
      size =100;
      switch shapeId
          when 1
               shape = new Fabric.Circle({radius: (size / 2), left: coord.left, top: coord.top, fill: fillColor, stroke: strokeColor,strokeWidth:strokeWidth, originX: "center", originY: "center" })
          when 2
               shape = new Fabric.Rect({left: coord.left, top: coord.top, fill: fillColor,strokeWidth:strokeWidth, width: size, height: size, stroke: strokeColor, originX: "center", originY: "center" })
          when 3
               shape = new Fabric.Triangle({left: coord.left, top: coord.top, fill: fillColor,strokeWidth:strokeWidth, width: size, height: size, stroke: strokeColor, originX: "center", originY: "center" })
          when 4
               shape = new Fabric.Line([50, 50, 150, 50], { left: coord.left,strokeWidth:strokeWidth, top: coord.top, stroke: strokeColor, originX: "center", originY: "center" })
          when 5
               shape = new Fabric.Line([50, 50, 50, 150], { left: coord.left,strokeWidth:strokeWidth, top: coord.top, stroke: strokeColor, originX: "center", originY: "center" })
          when 6
               shape = new Fabric.IText("Text Here", { left: coord.left,strokeWidth:strokeWidth, top: coord.top, stroke: "#000",fill:"#000", originX: "center", originY: "center",fontSize:21 })
      
      @dispatchEvent 'Path.Created', path: shape
      if $('.tool.modeSelect-select.active').length == 0
         $('.tool.modeSelect-select').click()
      if this._fabric._objects.length > 0
        this.enableDisableSaveButton "Add"
      
    
    ###*
       * Function for getting random top and left coords for an object.
       * @return {left,top} coords of an object.
    ###
    getRandomLeftTop: () =>    
      offset = 130;
      return {
          left: this.getRandomInt(0 + offset, window.innerWidth - offset),
          top: this.getRandomInt(0 + offset, window.innerHeight - offset)
      }
    
    ###*
       * Function for generating randomize color code for an object.
       * @return {color code} color property for an object.
    ###
    getRandomColor: () =>
      return "#"+Math.random().toString(16).substr(-6);

    ###*
       * Function for generating random integer number.
       * @param {min} offset value.
       * @param {max} window coords - offset value.
       * @return {random integer} random integer generated on basis of min and max.
    ###    
    getRandomInt: (min, max) =>
      return Math.floor(Math.random() * (max - min + 1)) + min;
    
    ###*
       * Function for changing the position of a pathobject.
       * @param {left} left coord of an object.
       * @param {top} top coord of an object.
    ###    
    setObjectPosition:(left,top)=>
      activeObject = Globals.get('Canvas').getSelectedObjects()       
      activeObject["0"].setPosition
        x: left,
        y: top
    
    ###*
       * Function for handling key events on a canvas.
       * @param {e} event object of an event.
    ###    
    keyRemover: (e) =>  
      activeObject = Globals.get('Canvas').getSelectedObjects() 
      if @_model._data.selected.length == 1
        if activeObject.length > 0
          if !($("#CalibrationAndManipulationModal").data('bs.modal') || {}).isShown  
              if e.keyCode >= 37 && e.keyCode <= 40  || e.keyCode == 46 
                  movePixel = 5      
                  objectLeftcoord = activeObject["0"]._view._fabric.left
                  objectTopcoord = activeObject["0"]._view._fabric.top
                  switch e.keyCode
                      when 37
                        this.setObjectPosition objectLeftcoord - movePixel,objectTopcoord
                      when 38
                        this.setObjectPosition objectLeftcoord,objectTopcoord - movePixel
                      when 39
                        this.setObjectPosition objectLeftcoord + movePixel,objectTopcoord
                      when 40
                        this.setObjectPosition objectLeftcoord,objectTopcoord + movePixel
                      when 46
                            Globals.get('Canvas').deleteObject  activeObject
                  @dispatchEvent 'Selection.Scaling',
                      objectIds: e.target
                  activeObject["0"].enforceTransform()
                  this.dryRender()
      else if e.keyCode == 46
        Globals.get('Canvas').deleteObject  activeObject 
        ###@dispatchEvent 'Selection.Scaling',
          objectIds: e.target
        activeObject["0"].enforceTransform()###
        this.dryRender()

    ###*
       * Function for rendering objects on canvas.
       * @param {objects} list of an objects.
       * @param {isolation} mode.
    ###    
    _renderObjects: (objects, isolations) =>
      for obj in objects        
        @_fabric.discardActiveGroup()
        if obj in isolations
          @_renderObjects obj.getObjects(), isolations
        else
          if obj instanceof Group
            @_fabric.setActiveGroup obj.view().getFabric()
          obj.enforceTransform()
          @_fabric.add obj.view().getFabric()        
        #condition for checking is object of grid if it is then send it backwards on canvas.
        if obj._view._fabric.id == "grid"
          obj._view._fabric.sendToBack() 

    ###*
       * Function got triggered on path created event. 
       * @param {evt} event object.
    ###    
    _onPathCreated: (evt) =>
      @dispatchEvent 'Path.Created',
        path: evt.path
      if this._fabric._objects.length > 0
         this.enableDisableSaveButton "Add"

    ###*
       * Function for show and hide the save canvas tool on canvas.
       * @param {check} name of an action.
    ###    
    enableDisableSaveButton: (Check) =>
      if Check == "Add"
         $('.tool.SaveCanvas').show()
      else if Check == "delete"
         $('.tool.SaveCanvas').hide()

    ###*
       * Function got executed when the mouse up event got triggered.
       * @param {evt} event object.
    ###    
    _onMouseUp:(evt)=>
     calibrationMinProperty=0;
     calibrationMaxProperty=0;
     if @_model._data.selected.length > 0 && @_model._data.selected.length == 1
      if @_model._data.selected[0].getPropertyMappings().length > 0
          objectOriginalLeft = @_model._data.selected[0]._view._fabric.originalState.left;
          objectOriginalTop = @_model._data.selected[0]._view._fabric.originalState.top;
          objectLeft = @_model._data.selected[0]._view._fabric.left;
          objectTop = @_model._data.selected[0]._view._fabric.top;
          horizontalCalibrationMin = 0;
          horizontalCalibrationMax = 0;
          verticalCalibrationMin = 0;
          verticalCalibrationMax = 0;
          for obj in @_model._data.selected[0].getPropertyMappings()
            if obj.objectProperty._model._data.id == "x"
               horizontalCalibrationMin = obj.calibration.min
               horizontalCalibrationMax = obj.calibration.max
            else if obj.objectProperty._model._data.id == "y"
               verticalCalibrationMin = obj.calibration.min
               verticalCalibrationMax = obj.calibration.max
                  
          for obj in @_model._data.selected[0].getPropertyMappings()            
            calibration={}
            if obj.objectProperty._model._data.id == "x"
               if objectOriginalLeft != objectLeft
                  calibration.max = objectLeft + (horizontalCalibrationMax - horizontalCalibrationMin)
                  calibration.min = objectLeft
                  window.objectPropertyMaximum = calibration.max
                  window.objectPropertyMinimum = calibration.min
                  mappingAssignmentAction=new MappingAssignmentAction @_model._data.selected[0],obj.objectProperty,@_model._data.selected[0].getPropertyMappings()[0].dataProperty
                  mappingAssignmentAction.execute()
            else if obj.objectProperty._model._data.id == "y"
              if objectOriginalTop != objectTop
                if  verticalCalibrationMax < verticalCalibrationMin
                 calibration.min = objectTop
                 calibration.max = objectTop - Math.abs(verticalCalibrationMin - verticalCalibrationMax)
                if verticalCalibrationMax > verticalCalibrationMin
                  calibration.max = objectTop + Math.abs(verticalCalibrationMin - verticalCalibrationMax)
                  calibration.min = objectTop
                 window.objectPropertyMaximum = calibration.max
                 window.objectPropertyMinimum = calibration.min
                 mappingAssignmentAction=new MappingAssignmentAction @_model._data.selected[0],obj.objectProperty,@_model._data.selected[0].getPropertyMappings()[0].dataProperty
                 mappingAssignmentAction.execute()

    ###*
       * Function got executed when object scaling event got triggered.
       * @param {evt} event object.
    ###    
    _onObjectScaling: (evt) =>   
      if evt.target.canvas._activeObject
          @_fabricSelection = evt.target
          @_fabricSelectionMetaCache =
            position:
              x: @_fabricSelection.left
              y: @_fabricSelection.top
            rotation: @_fabricSelection.angle
            scale:
              x: @_fabricSelection.scaleX
              y: @_fabricSelection.scaleY
          this.dryRender()
          @_fabricSelection.on 'modified', @_onSelectionModified      
          @dispatchEvent 'Selection.Scaling',objectIds: evt.target

    ###*
       * Function got executed when selection event got triggered.
       * @param {evt} event object.
    ###    
    _onSelectionCreated: (evt) =>
      @_fabricSelection = evt.target
      @_fabricSelectionMetaCache =
        position:
          x: @_fabricSelection.originalLeft
          y: @_fabricSelection.originalTop
        rotation: @_fabricSelection.angle
        scale:
          x: @_fabricSelection.scaleX
          y: @_fabricSelection.scaleY
      @_fabricSelection.on 'modified', @_onSelectionModified
      @dispatchEvent 'Selection.Created',
        objectIds: (obj.get('id') for obj in evt.target.getObjects())

    ###*
       * Function got executed when before selection event got triggered.
       * @param {evt} event object.
    ###    
    _beforeSelectionCleared: (evt) =>
      @_fabricSelection?.off 'modified', @_onSelectionModified
      @_fabricSelection = null

    ###*
       * Function got executed when selection got modified on canvas.
       * @param {evt} event object.
    ###    
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

    inActiveObject:()=>
     @_fabric.discardActiveObject()
     Globals.get('Canvas').selectObjects []
     @dispatchEvent 'Selection.Cleared', {}

    selectionCleared:()=>
      if window.activeObjectsId != undefined && window.activeObjectsId.length > 1
       window.multiSelectedStampedObjectId = []
       for object in @_fabric._objects
        for obj in @_model._data.objects
          if jQuery.inArray(obj.getId(), window.activeObjectsId) != -1 && obj.getId() == object.id
            obj.setPosition
              x: object.left,
              y: object.top
            this.setObjectAnimation(obj)
      @dispatchEvent 'Selection.Cleared', {}

    ###*
       * Function got executed when on selection cleared event got triggered.
       * @param {evt} event object.
    ###    
    _onSelectionCleared: (evt) => 
      if $('.tool.modeSelect-animate.active').length == 0 && window.activeObjectsId != undefined && window.activeObjectsId.length > 1
       window.multiSelectedStampedObjectId = []
       for object in @_fabric._objects
        for obj in @_model._data.objects
          if jQuery.inArray(obj.getId(), window.activeObjectsId) != -1 && obj.getId() == object.id
            obj.setPosition
              x: object.left,
              y: object.top
            this.setObjectAnimation(obj)
      @dispatchEvent 'Selection.Cleared', {}
      

    setObjectAnimation:(object)=>
     debugger
     calibrationMinProperty=0;
     calibrationMaxProperty=0;
     if object.getPropertyMappings().length > 0
          objectOriginalLeft = object._view._fabric.originalState.left;
          objectOriginalTop = object._view._fabric.originalState.top;
          objectLeft = object._view._fabric.left;
          objectTop = object._view._fabric.top;
          horizontalCalibrationMin = 0;
          horizontalCalibrationMax = 0;
          verticalCalibrationMin = 0;
          verticalCalibrationMax = 0;
          for obj in object.getPropertyMappings()
            if obj.objectProperty._model._data.id == "x"
               horizontalCalibrationMin = obj.calibration.min
               horizontalCalibrationMax = obj.calibration.max
            else if obj.objectProperty._model._data.id == "y"
               verticalCalibrationMin = obj.calibration.min
               verticalCalibrationMax = obj.calibration.max
                  
          for obj in object.getPropertyMappings()            
            calibration={}
            if obj.objectProperty._model._data.id == "x"
               if objectOriginalLeft != objectLeft
                  calibration.max = objectLeft + (horizontalCalibrationMax - horizontalCalibrationMin)
                  calibration.min = objectLeft
                  window.objectPropertyMaximum = calibration.max
                  window.objectPropertyMinimum = calibration.min
                  mappingAssignmentAction=new MappingAssignmentAction object,obj.objectProperty,object.getPropertyMappings()[0].dataProperty
                  mappingAssignmentAction.execute()
            else if obj.objectProperty._model._data.id == "y"
              if objectOriginalTop != objectTop
                if  verticalCalibrationMax < verticalCalibrationMin
                 calibration.min = objectTop
                 calibration.max = objectTop - Math.abs(verticalCalibrationMin - verticalCalibrationMax)
                if verticalCalibrationMax > verticalCalibrationMin
                  calibration.max = objectTop + Math.abs(verticalCalibrationMin - verticalCalibrationMax)
                  calibration.min = objectTop
                 window.objectPropertyMaximum = calibration.max
                 window.objectPropertyMinimum = calibration.min
                 mappingAssignmentAction=new MappingAssignmentAction object,obj.objectProperty,object.getPropertyMappings()[0].dataProperty
                 mappingAssignmentAction.execute()

    ###*
       * Function got executed when on object selected event got triggered.
       * @param {evt} event object.
    ###    
    _onObjectSelected: (evt) =>      
      if group = @_fabric.getActiveGroup()
        objects = group.getObjects()
      else
        objects = [@_fabric.getActiveObject()]
      @dispatchEvent 'Selection.Created',
        objectIds: (obj.get('id') for obj in objects)

    ###*
       * Function for changing the dimension of canvas..
    ###    
    updateDimensions: () =>
      @_fabric.setDimensions
        width: window.innerWidth
        height: window.innerHeight      
      Globals.get('Canvas').render()

    ###*
       * Function for deactive all object on canvas.
    ###    
    clearSelection: () =>
      @_fabric.deactivateAllWithDispatch().renderAll()

    ###*
       * Function got executed when on change event got triggered.
       * @param {evt} event object.
    ###    
    _onChange: (evt) =>
      switch evt.data.path
        when "mode"
          @_onChangeMode evt.data.value
        when "strokeWidth"
          @_fabric.freeDrawingBrush.width = evt.data.value
          @_fabric.renderAll()
          if !this._fabric._activeObject && !this._fabric._activeGroup
             $(".modeSelect-draw").click();
        when "strokeColor"
          @_fabric.freeDrawingBrush.color = evt.data.value
          @_fabric.renderAll()
        when "selected"
          if evt.data.value?.length == 0
            @clearSelection()
        when "isolated"
          @render evt.currentTarget
        when "disabled"
          @_fabric.selection = !evt.data.value
          @render evt.currentTarget

    ###*
       * Function for on or off the drawing mode on canvas.
    ###    
    _onChangeMode: (val) =>
      switch val
        when "draw"
          @_fabric.discardActiveObject()
          @_fabric.isDrawingMode = true
        else
          @_fabric.isDrawingMode = false

    ###*
       * Function got executed when on object removed event got triggered.
       * @param {evt} event object.
    ###    
    _onObjectRemoved: (evt) =>
      @clearSelection()
      this.deleteObject()

    ###*
       * Function got executed when on object added event got triggered.
       * @param {evt} event object.
    ###    
    _onObjectAdded: (evt) =>
      if this._fabric._objects.length > 0
         this.addObject()

    ###*
       * Function got executed when on objects removed event got triggered.
       * @param {evt} event object.
    ###    
    _onObjectsRemoved: (evt) =>
      @clearSelection()
      this.deleteObject()

    ###*
       * Function got executed when on objects added event got triggered.
       * @param {evt} event object.
    ###    
    _onObjectsAdded: (evt) =>      
      this.addObject()
    
    ###*
       * Function for show save tool on canvas.
    ###    
    addObject:()=>      
      if this._fabric._objects.length > 0
         this.enableDisableSaveButton "Add"

    ###*
       * Function for hide save tool on canvas.
    ###    
    deleteObject:()=>      
      if this._fabric._objects.length == 0
         this.enableDisableSaveButton "delete"