define (require) ->
  #Third party library
  require       'thirdparty/base64'
  Fabric        = require 'thirdparty/fabric'

  #Local imports
  View          = require './view'
  Model         = require './model'  
  Controller    = require 'core/controller/controller'
  HM            = require 'core/event/hook_manager'
  Globals       = require 'core/model/globals'
  Path          = require './objects/path/object'
  Group         = require './objects/group/object'
  ObjectBase    = require './objects/base/object'   
  ColorAction   = require 'modules/datasketch/actions/set_color'
  StrokeAction  = require 'modules/datasketch/actions/set_stroke_width'
  ObjectSummary = require 'modules/datasketch/menuitems/objectsummary'  
  PropertyMap   = require 'modules/datasketch/animation/property_map'  

  class DSCanvas extends Controller
    ###*
       * Funtion to initialize view and events on canvas.
       * @param {config} model and view configuration.
    ###
    constructor : (config) ->
      config ?= {}
      config.modelClass ?= Model
      config.viewClass ?= View      
      super config

      @_model.addEventListener 'Model.Change', @_onModelChange
      @view().addEventListener 'Selection.Created', @_onSelectionCreated
      @view().addEventListener 'Selection.Scaling', @_onSelectionScaling      
      #@view().addEventListener 'Selection.Modified', @_onSelectionModified
      @view().addEventListener 'Selection.Cleared', @_onSelectionCleared
      @view().addEventListener 'Path.Created', @_onPathCreated
    
    #Global variable instance declaration.
    root = exports ? this
    
    ###*
       * Funtion for render path object on canvas.
    ###
    render: () =>
      @_view.render @_model

    ###*
       * Funtion for render canvas.
    ###
    dryRender: () =>
      @_view.dryRender()

    ###*
       * Funtion for set the scale of an object.
       * @param {scaleX} scaleX of an object.
       * @param {scaleY} scaleY of an object.
    ###
    setObjectScale: (scaleX, scaleY) =>
      canvasActiveObject = this.getSelectedObjects()
      canvasActiveObject[0].setScale
        x: scaleX,
        y: scaleY

    ###*
       * Funtion for manipulate the effect of animation on an object when calibration input slider value got changed.
    ###
    onChangeMinMaxSlider: () =>
      if $('#maxValue').prop('checked') == true
        Scale = eval($('#maxRangeInput').val())
      else
        Scale =   eval($('#minRangeInput').val())

      if root.objectCalibrationProperty == "Transparency"
        Scale = (Math.abs(Scale)/100)
      else
        Scale = (Math.abs(Scale))
              
      canvasActiveObject = this.getSelectedObjects()
      activeObject = canvasActiveObject[0]._view._fabric
      switch root.objectCalibrationProperty
        when "X"            then  @_view.setObjectPosition Scale,activeObject.top
        when "Y"            then  @_view.setObjectPosition activeObject.left,Scale
        when "Height"       then  this.setObjectScale activeObject.scaleX,Scale
        when "Width"        then  this.setObjectScale Scale,activeObject.scaleY
        when "Rotation"     then  canvasActiveObject[0].setRotation Scale
        when "Scale"        then  this.setObjectScale Scale,Scale
        when "Transparency" then  canvasActiveObject[0].setOpacity Scale    
      canvasActiveObject[0].enforceTransform()
      
      ObjectSummary objectSummary = new ObjectSummary        
      objectSummary.ObjectProperty activeObject
      this.dryRender()

    ###*
       * Funtion for remove animation property from an oject.
    ###
    removeProperty: () =>
      @_view.deleteCurrentProperty()

    ###*
       * Funtion for set the position of an object.
       * @param {left} left coord of an object.
       * @param {top} top coord of an object.
    ###
    setActiveObjectPosition: (left,top) =>      
      activeObject = this.getSelectedObjects()      
      activeObject[0].setPosition
        x:left,
        y:top

    ###*
       * Funtion for overlay of an object.
       * @param {operation} name of an overlay operation.
    ###
    overlayObject:(operation) =>
      activeObjectsId = [];
      if @_model._data.selected.length > 1
          for obj in this._view._fabric._activeGroup._objects
            activeObjectsId.push obj.id
          @_view.removeSelectionOnSave()
          for object in activeObjectsId
            pathObj = @_model._data.objects.filter((data) => return(data._view._fabric.id == object))
            @_view.overlayOfAnObject operation,pathObj[0]
      else
        @_view.overlayOfAnObject operation,@_model._data.selected[0]    
    ###*
       * Funtion for reset the property of an object which was modified during calibration and manipulation module open.
    ###
    applyOriginalProperty: () =>      
      activeObject = this.getSelectedObjects()
      minRangeInput =  $('#minRangeInput').val()
      maxRangeInput =  $('#maxRangeInput').val()

      if window.currentObjectId == root.LastActiveObject.id
        if activeObject.length > 0
          @_model._data.selected[0]._view._fabric.opacity = eval(root.currentActiveObject["Opacity"])
          @_model._data.selected[0]._view._fabric.angle = eval(root.currentActiveObject["Angle"]) 
          activeObject[0].setRotation  eval(root.currentActiveObject["Angle"])
          if root.objectCalibrationProperty == "X" && window.currentActionId == "calibrationApplyButton"
              this.setActiveObjectPosition eval(minRangeInput), root.currentActiveObject["Y"]              
          else if root.objectCalibrationProperty == "Y" && window.currentActionId == "calibrationApplyButton"
              this.setActiveObjectPosition root.currentActiveObject["X"], eval(minRangeInput)              
          else
            this.setActiveObjectPosition root.currentActiveObject["X"], root.currentActiveObject["Y"]

          activeObject[0].setScale
            x: root.currentActiveObject["scaleX"],
            y: root.currentActiveObject["scaleY"]

          activeObject[0].setOpacity root.currentActiveObject["Opacity"]
          activeObject[0].enforceTransform()
          this.dryRender()  

    ###*
       * Funtion for storing object property before the visualization of animation on object.
       * @param {activeObject} selected fabric object.
    ###
    storeObjectProperty: (activeObject) =>
      root.currentActiveObject = {}
      root.currentActiveObject["X"]      = activeObject.left
      root.currentActiveObject["Y"]      = activeObject.top
      root.currentActiveObject["Height"] = activeObject.height
      root.currentActiveObject["scaleY"] = activeObject.scaleY
      root.currentActiveObject["Width"]  = activeObject.width
      root.currentActiveObject["scaleX"] = activeObject.scaleX
      root.currentActiveObject["Angle"]  = activeObject.angle
      root.currentActiveObject["Opacity"]= activeObject.opacity
      window.currentObjectId             = activeObject.id

    ###*
       * Funtion for management of data and calibration module of an object.
       * @param {object} selected object property from an object property menu.
    ###
    objectPropertyMenu: (object) =>
      if $('.activeMenu').length > 0
        @_objectProperty = HM.invoke 'DataMapping.ObjectProperties', []
        @_dataProperty = HM.invoke 'DataMapping.DataProperties', []      
        window.objectPropertyMaximum =  $('#maxRangeInput').val()
        window.objectPropertyMinimum =  $('#minRangeInput').val()
        @_dataProperty = @_dataProperty.filter((data)=>return data.getId() == $('#csvProperty').val())
        ObjectProperty = @_objectProperty.filter((data)=>return data.getId() == $('.activeMenu')[0].id)
        if @_dataProperty? && window.objectProperty[0]._model._data.id != "stamping"
          calibration= {}
          if window.objectProperty[0]._model._data.id == "transparency"
            calibration.max = eval(window.objectPropertyMaximum / 100)
            calibration.min = eval(window.objectPropertyMinimum / 100)
          else
            calibration.max = window.objectPropertyMaximum
            calibration.min = window.objectPropertyMinimum
          window.objectProperty = @_objectProperty
          window.dataProperty = @_dataProperty
          window.calibration = calibration
          @_map = new PropertyMap
            objectProperty: ObjectProperty[0]
            dataProperty: @_dataProperty[0]
            calibration: calibration
          this.getSelectedObjects()[0].addPropertyMapping @_map
        else
          this.getSelectedObjects()[0]._model._data.isStamping = $('#isStamp')[0].checked      

      activeObject = this.getSelectedFabric()

      if window.currentObjectId == activeObject.id
        if  !($("#CalibrationAndManipulationModal").data('bs.modal') || {}).isShown       
          this.storeObjectProperty activeObject
        else            
          window.currentObjectId = activeObject.id
          this.applyOriginalProperty()
      else     
        this.storeObjectProperty activeObject

      $('.objectproperty-menu .menu-item').removeClass('activeMenu')
      $('#'+object.toLowerCase()+'.menu-item').addClass('activeMenu')

      if ($("#CalibrationAndManipulationModal").data('bs.modal') || {}).isShown  
        this.applyOriginalProperty()         
        this.dryRender()       

      $('#maxRangeInput, #minRangeInput').val(0)
      $('#maxInput, #minInput').html(0)
      $('#shape')[0].style.pointerEvents = 'none'

      window.objectProperty = @_view.getObjectProperty object
      root.objectCalibrationProperty = object
      this.bindPropertyDropdown(object)
      rangeInput = $('#minRangeInput,#maxRangeInput')

      switch object
        when "X"          
          rangeInput.attr('max', $(window).width())
          this.setMinMaxBoth activeObject.left
        when "Y"           
          rangeInput.attr('max', $(window).height())
          this.setMinMaxBoth activeObject.top
        when "Rotation"          
          rangeInput.attr('max', 360)
          if activeObject.angle >= 0
            this.setMinMaxBoth activeObject.angle
          else
            this.setMinMaxBoth 360+Math.round(activeObject.angle)            
        when "Scale"
          this.setCommonSliderValue("Scale")
          if activeObject.scaleX == activeObject.scaleY
            this.setMinMaxBothFloat activeObject.scaleY             
        when "Height"
          this.setCommonSliderValue("Height")
          this.setMinMaxBothFloat activeObject.scaleY
        when "Width"
          this.setCommonSliderValue("Width")
          this.setMinMaxBothFloat activeObject.scaleX          
        when "Transparency"
          rangeInput.val(0)
          $('#minInput,#maxInput').html(0)
          rangeInput.attr('max', 100)
          this.setMinMaxBoth (activeObject.opacity * 100)    
        when "Stamping"
            $('#isStamp')[0].checked = this.getSelectedObjects()[0]._model._data.isStamping

      @_view.getAvailableProperty(object.toLowerCase())  
      dataStore = Globals.get 'DataStore'      
      for obj in dataStore._data.properties
        if obj._data.id == $('#csvProperty').val()
          minMax = dataStore.getMinMax obj
          $('#propertyMaxValue').html(minMax.max)
          $('#propertyMinValue').html(minMax.min)
          break

    ###*
       * Function for set the object property value to the slider input of calibration module.
       * @param {value} active object property value.
    ###
    setMinMaxBoth: (value) => 
      value = parseInt(value)
      $('#minRangeInput,#maxRangeInput').val(value)
      $('#minInput,#maxInput').html(value)
      $('#minRangeInput,#maxRangeInput').attr('step', 1)

     setMinMaxBothFloat: (value)=>
       value = eval(value)
       $('#minRangeInput,#maxRangeInput').val(value)
       $('#minInput,#maxInput').html(value.toFixed(1))

    ###*
       * Function for reset the value of an slider in calibration module.
    ###
    setCommonSliderValue: (propertyName) =>
      $('#minRangeInput,#maxRangeInput').val(0)
      $('#minInput,#maxInput').html(0)
      #$('#maxInput').html(0)
      #$('#minRangeInput').val(0)
      if(propertyName == "Width" || propertyName == "Height")
        $('#minRangeInput,#maxRangeInput').attr('step', 0.1)
      else
        $('#minRangeInput,#maxRangeInput').attr('step', 1)

      if(propertyName == "Width")
        $('#minRangeInput,#maxRangeInput').attr('max', parseInt(window.innerWidth/100))
      else
        $('#minRangeInput,#maxRangeInput').attr('max', parseInt(window.innerHeight/100))

    ###*
       * Function binding dropdown menu of csv property and color property
       * @param {menu} object property menu property.
    ###
    bindPropertyDropdown: (menu) =>      
      #Clear CSV property dropdown menu  
      $('#csvProperty,#csvPropertyColor').html("")      

      #get CSV property menu items
      CsvProperty = Globals.get 'DataStore'

      $('#manipulationandcalibrationproperty').hide()
      $('#manipulationandcalibrationpropertystamping').hide()
      $('#calibrationandmanipulationcolor').hide()
      #Condition for checking click of an color property.  
      if menu == "Color"
        for obj in CsvProperty._data.properties
          $('#csvPropertyColor').append("<option value="+obj._data.id+">"+obj._data.id+"</option>")        
        $('#calibrationandmanipulationcolor').show()
      else if menu == "Stamping"
        #For all properties except color and rotation properties of an object.
        $('#manipulationandcalibrationpropertystamping').show()        
        $('#generateAction').click();
      else 
        #For all properties except color and rotation properties of an object.
        for obj in CsvProperty._data.properties
          $('#csvProperty').append("<option value="+obj._data.id+">"+obj._data.id+"</option>")
        $('#manipulationandcalibrationproperty').show()        
        $('#generateAction').click();

      $('#CalibrationAndManipulationModal').modal('show')
      $('.modal-backdrop').hide();

    ###*
       * Function for save canvas and check the file is exist or not in database.
       * @param {@FileName} file name.
    ###
    saveCanvas: (@FileName) =>      
      $('#DisableBackground').show()      
      $('#pageLoader').show()   
      arrObject = []
      if this._view._fabric._objects.length > 0
        for obj in this._view._fabric._objects
          if !obj.fill || obj.fill == 'undefined'
            obj.fill = null

        objList = this._view._fabric._objects
        objList = JSON.parse(JSON.stringify(objList));
        objList = objList.filter((item) => return item.newId != 'grid')

        arrObject.push window.csvName
        arrObject.push '{"objects":'+JSON.stringify(objList)+'}'

        for item in @_model._data.objects
          item._model._data._canvas = null
          if item._model._data.propertyMappings.length > 0
            for object in item._model._data.propertyMappings
              object._canvas = null
              arrObject.push item._model._data

        apiData = { 
                    filename: @FileName
                    filecontent: JSON.stringify(arrObject)
                    UserId: window.currentUserId
                  }
                  
        $('#DisableBackground').show()
        #For download the saved file if user enable the download checkbox.
        if ($("#chkIsDownload").prop('checked'))
          this.downloadCSVFile arrObject

        #Check whether the file with same name exist or not.
        $.post window.APIURL + 'CheckFile', apiData, (data) ->          
          $('#DisableBackground').hide()
          $('#pageLoader').hide()
          if data == "True"                           
            alert "Sketch saved successfully."
          else if confirm "File already exist are you sure you want to rewrite it"
            $('#DisableBackground').show()
            $('#pageLoader').show()
            $.post window.APIURL + 'Save', apiData, (data) ->
              $('#DisableBackground').hide()
              $('#pageLoader').hide()
              alert "Sketch saved successfully."
      else
        alert "Sketch cannot be blank"   

    ###*
       * Function for saving canvas  to local storage.
       * @param {callback} callback function.
    ###
    saveCanvasToLocal: (callback) =>
      arrObject = []
      if this._view._fabric._objects.length > 0
        for obj in this._view._fabric._objects
          if !obj.fill || obj.fill == 'undefined'
            obj.fill = null

        objList = this._view._fabric._objects
        objList = JSON.parse(JSON.stringify(objList));
        objList = objList.filter((item) => return item.newId != 'grid')

        arrObject.push window.csvName
        arrObject.push '{"objects":'+JSON.stringify(objList)+'}'

        for item in @_model._data.objects
          item._model._data._canvas = null
          if item._model._data.propertyMappings.length > 0
            for object in item._model._data.propertyMappings
              object._canvas = null
              arrObject.push item._model._data

        localStorage.setItem('SaveCanvasToLocal',JSON.stringify(arrObject));
        
      callback();         

    ###*
       * Function for download the canvas file.
       * @param {arrObject} content of canvas.
    ###
    downloadCSVFile: (arrObject) =>
      objJsonB64 = Base64.encode(JSON.stringify(arrObject))
      a = $("<a>").attr("href", "data:application/octet-stream;charset=utf-16le;base64,"+objJsonB64).attr("download", @FileName+".txt").appendTo("body");
      a[0].click();
      a.remove();        

    ###*
       * Function for change the origin of an object.
       * @param {originX} origin selected value.
       * @param {originY} origin selected value.
    ###
    updateObjectOrigin: (originX,originY,isMultiObject) =>        
      activeObj = null;
      activeObjectsId = [];
      if isMultiObject
        for obj in this._view._fabric._activeGroup._objects
            activeObjectsId.push obj.id
        @_view.removeSelectionOnSave()
        for object in activeObjectsId
           pathObj = @_model._data.objects.filter((data) => return(data._view._fabric.id == object))
           point = pathObj[0]._view._fabric.getPointByOrigin obj.originX,obj.originY            
           newPoint = pathObj[0]._view._fabric.translateToGivenOrigin point,obj.originX,obj.originY,originX,originY
           pathObj[0]._view._fabric.originX = originX
           pathObj[0]._view._fabric.originY = originY
           pathObj[0].setPosition
             x: newPoint.x,
             y: newPoint.y
      else
          if this._view._fabric._activeGroup
            for obj in this._view._fabric._objects
              point = obj.getPointByOrigin obj.originX,obj.originY            
              newPoint = obj.translateToGivenOrigin point,obj.originX,obj.originY,originX,originY
              obj.originX = originX
              obj.originY = originY
              @_view.setObjectPosition newPoint.x,newPoint.y
            activeObj = this._view._fabric._activeGroup            
          else if this._view._fabric._activeObject
            activeObj = this._view._fabric._activeObject
            point = activeObj.getPointByOrigin activeObj.originX,activeObj.originY          
            newPoint = activeObj.translateToGivenOrigin point,activeObj.originX,activeObj.originY,originX,originY  
            activeObj.originX = originX
            activeObj.originY = originY
            @_view.setObjectPosition newPoint.x,newPoint.y          
          ObjectSummary objectSummary = new ObjectSummary
          objectSummary.ObjectProperty activeObj      
          this.dryRender()
    
    ###*
       * Function for show and hide the save canvas modal.
    ###
    saveObject: () =>
      _this = this;
      @_view.removeSelectionOnSave()  
      if parent.getCurrentUserId() > 0
         $('#SaveCanvasModal').modal('show');
      else      
         _this.saveCanvasToLocal _this.reloadCurrentPage                  

    reloadCurrentPage: () =>
      if window.location.host.includes("localhost")
        window.parent.open("http://localhost/DataSketch.Web/Account/Login?returnUrl=DataSketch/Index","_self");
      else
        window.parent.open("http://180.211.103.172:8070/Account/Login?returnUrl=DataSketch/Index","_self");        

    ###*
       * Function for creating the new file or reset canvas.
    ###
    createNewFile: () =>
      #Clear Canvas
      @_model.set 'objects', []

    ###*
       * Function for load the sketch from database.
       * @param {UserId} id of an user.
       * @param {FileName} the name of sketch.
    ###
    loadFromQueryString: (UserId,FileName) =>
      if @_model._data.objects.length == 0
        this.getSketchFromDbQueryString parseInt(UserId),FileName
      else
        while @_model._data.objects.length > 0           
          @_model.removeObjects @_model._data.objects, false
          @_model.removeObject  @_model._data.objects, false
        this.getSketchFromDbQueryString parseInt(UserId),FileName
    
    ###*
       * Function for load the sketch from database.
       * @param {UserId} id of an user.
       * @param {FileName} the name of sketch.
    ###
    getSketchFromDbQueryString:(UserId,FileName)=>      
      view=@_view
      model=@_model
      _this=this
      if @_model._data.objects.length==0 && UserId != NaN && FileName != ''
        $.get window.APIURL + 'GetSketch?UserId='+UserId+'&SketchName='+FileName, (data) -> 
          try
            if data.indexOf('<html') > 0
              if window.location.host.includes("localhost")
                window.parent.open("http://localhost/DataSketch.Web/Account/Login?returnUrl=DataSketch/Index","_self");
              else
                window.parent.open("http://180.211.103.172:8070/Account/Login?returnUrl=DataSketch/Index","_self");  
            else
              view.loadFromJson data
              $('.tool.snapgrid-1').removeClass("active")
              $('#DisableBackground').hide()
              $('#pageLoader').hide()
              if model && model._data.objects.length > 0
                _this.disableControls()
                window.isViewMode = 1
          catch e
            if window.location.host.includes("localhost")
              window.parent.open("http://localhost/DataSketch.Web/Account/Login?returnUrl=DataSketch/Index","_self");
            else
              window.parent.open("http://180.211.103.172:8070/Account/Login?returnUrl=DataSketch/Index","_self");

    ###*
       * Function for load the sketch from database.
       * @param {FileName} name of sketch.
    ###
    loadFromDb: (FileName) =>
      if @_model._data.objects.length == 0
        this.getSketchFromDb window.currentUserId, FileName
      else
        while @_model._data.objects.length > 0           
          @_model.removeObjects @_model._data.objects, false
          @_model.removeObject  @_model._data.objects, false
        this.getSketchFromDb window.currentUserId, FileName
    
    ###*
       * Function for load the sketch from database.
       * @param {UserId} id of an user.
       * @param {FileName} the name of sketch.
    ###
    getSketchFromDb:(userId, FileName)=>
      view=@_view
      if @_model._data.objects.length==0
        $.get window.APIURL + 'GetSketch?UserId='+userId+'&SketchName='+FileName, (data) -> 
          view.loadFromJson data
          $('.tool.snapgrid-1').removeClass("active")
          $('#DisableBackground').hide()
          $('#pageLoader').hide()
          if @_model
            if @_model._data.objects.length>0
              $('.tool.SaveCanvas').show()

    ###*
       * Function for load the sketch from file data.
       * @param {FileData} canvas data.
    ###
    loadFromFile: (FileData) =>      
      if @_model._data.objects.length==0
        this.getSketchFromFile FileData
      else                            
        while @_model._data.objects.length > 0           
          @_model.removeObject @_model._data.objects[0], false
          if @_model._data.objects.length == 0             
            this.getSketchFromFile FileData
            break

    ###*
       * Function for load the sketch from file data.
       * @param {FileData} canvas data.
    ###
    getSketchFromFile: (FileData) =>
      @_view.loadFromJson FileData
      $('.tool.snapgrid-1').removeClass("active")
      $('#DisableBackground').hide()
      $('#pageLoader').hide()

      if @_model
        if @_model._data.objects.length > 0
          $('.tool.SaveCanvas').show()

    ###*
       * Function for show the load modal.
    ###
    showLoadModal: () =>
      @_view.removeSelectionOnSave()
      $('#DisableBackground').show()
      $('#pageLoader').show()
      @_view.bindSketchList()

    ###*
       * Function for get the path object from canvas.
       * @return {list} list of path objects.
    ###
    getObjects: () =>
      @_model.get 'objects'

    ###*
       * Function for get the path object from canvas.
       * @return {list} list of path objects.
    ###
    getMode: () =>
      @_model.get 'mode'

    ###*
       * Function for set the mode of canvas.
    ###
    setMode: (mode) =>
      @_model.set 'mode', mode

    ###*
       * Function for get the stroke width of an active object.
       * @return {number} stroke width of an object.
    ###
    getStrokeWidth: () =>
      @_model.get 'strokeWidth'

    ###*
       * Function for set the stroke width of an active object.
    ###
    setStrokeWidth: (width) =>
      if @_model.get 'selected'
         for obj in @_model.get 'selected'
            obj.setStrokeWidth width
      @_model.set 'strokeWidth', width

    ###*
       * Function for get the stroke color of an active object.
       * @return {string} color code of an stroke.
    ###
    getStrokeColor: () => 
      @_model.get 'strokeColor'

    ###*
       * Function for update the stroke color of an active object.
       * @param {color} color code for an stroke.
    ###
    setStrokeColor: (color) =>      
      if @_model.get 'selected'
        for obj in @_model.get 'selected'
          obj.setStrokeColor color        
        this.dryRender()
          
      if color[0].id == "color-fill"
        @_model.set 'fillColor', color[1]
      else
        @_model.set 'strokeColor', color[1]      

    ###*
       * Function for getting active group or objects on canvas.
       * @return {object} active object on canvas.
    ###
    getSelectedObjects: () =>      
      @_model.get 'selected'

    ###*
       * Function  for getting active group or objects fabric class object.
       * @return {object} active object fabric on canvas.
    ###
    getSelectedFabric: () =>
      this.getSelectedObjects()[0].view().getFabric()

    ###*
       * Function  for set the object active.
       * @param {objects} list of object.
    ###
    selectObjects: (objects) =>
      objectIds = (obj.getId() for obj in objects)          
      @_model.set 'selected', (obj for obj in @_model.getActiveObjects() when obj.getId() in objectIds)

    ###*
       * Function  for adding object to canvas
       * @param {object} fabric object.
    ###
    addObject: (object, silent = false) =>
      @_model.addObject object, silent

    ###*
       * Function  for adding objects to canvas
       * @param {objects} fabric object list.
    ###
    addObjects: (objects) =>
      @_model.addObjects objects      
      this.addObject(objects)
      #this.render()

    ###*
       * Function  for adding objects to canvas in stamping mode.
       * @param {object} path object.
    ###
    addStampingObjects:(object) =>
      #@_model.addObjects objects
      this.addObject(object)      

    ###*
       * Function for adding the custom shape to canvas.
       * @param {shapeId} custom shape id.
    ###
    addShape: (shapeId) =>
      @_view.addShape shapeId
    
    ###*
       * Function for changing the grid size on canvas.
       * @param {@value} grid size.
    ###
    manageGrid: (@value) =>
      @_view.changeGridSize @value
      gridSize = parseInt(@value)
      window.gridSize = gridSize
      if gridSize > 0
        window.gridActive = true
        obj = new ObjectBase
        obj.onclickofcanvas 1, gridSize
        window.gridSize = gridSize
      else
        window.gridActive = false
        this.removeGrid()

    ###*
       * Function for adding grid to canvas and enable the grid mode.
    ###
    snapToGrid: () =>
      obj = new ObjectBase
      obj.onclickofcanvas 1
      @_view.addGrid()
    
    ###*
       * Function for remove grid to canvas and disable the grid mode.
    ###
    removeGrid: () =>      
      obj = new ObjectBase
      obj.onclickofcanvas 0
      @_view.removeGrid()

    #Global variable for checking whether isolation mode is on or not.
    window.IsolationMode = false

    ###*
       * Function for delete the object from canvas.
       * @param {object} path object.
    ###    
    deleteObject: (object) =>      
      if window.IsolationMode == false
        if object.length > 0
          if confirm"Are you sure you want to delete it?"
            @_model.removeObject object
            @_model.removeObjects object
      else
        alert "Please exit isolation mode for performing delete operation on object."
      
    ###*
       * Function for delete the object from canvas.
       * @param {object} path object.
    ###
    removeObject: (object) =>      
      @_model.removeObject object

    ###*
       * Function for delete the objects from canvas.
       * @param {object} path object.
    ###
    removeObjects: (objects) =>
      @_model.removeObjects objects

    ###*
       * Function for delete the active object from canvas.
    ###
    removeSelected: () =>
      @_model.removeSelected()

    ###*
       * Function for creating group of object from canvas.
       * @param {objects} list of an objects.
    ###
    createGroup: (objects) =>
      @_view.clearSelection()
      if !objects?
        objects = @_model.get 'selected'
      if !objects?
        return null

      for obj in objects
        obj.extractTransform()

      groupObjects = objects
      this.removeObjects objects      
      group = Group.createFromObjects groupObjects
      this.addObject group
      
      group

    ###*
       * Function for break the active group from canvas.
       * @param {group} group object.
    ###
    breakGroup: (group) =>
      objects = group.break()
      this.removeObject group
      for obj in objects
        this.addObject obj
        obj.enforceTransform()
        obj.enableControls()
      this.render()
      group.getObjects()

    ###*
       * Function for enable and disable the isolate mode of an active group.
       * @param {group} group object.
    ###
    isolate: (group) =>
      if group
        document.getElementById('shape').style.pointerEvents = 'none'
        window.IsolationMode = true
      else
        document.getElementById('shape').style.pointerEvents = 'auto'
        window.IsolationMode = false 
      @_model.isolate group
      this.render()

    ###*
       * Function for enforce the transform of an active object. 
    ###
    enforceTransform:()=>
      Path path = new Path()
      path.enforceTransform()

    ###*
       * Function for getting the isolation of an active group.
       * @return {string} isolation mode.
    ###
    getIsolation: () =>
      @_model.get 'isolated'

    ###*
       * Function for set the isolation of an group object.
       * @param {isolation} boolean value.
    ###
    setIsolation: (isolation) =>
      @_model.set 'isolated', isolation

    ###*
       * Function got executed when the mode got change on the canvas.
       * @param {evt} event object.
    ###
    _onModelChange: (evt) =>     
      switch evt.data.path
        when "strokeWidth"
          @dispatchEvent "Canvas.StrokeWidthChange",
            width: evt.data.value
        when "mode"
          @dispatchEvent "Canvas.ModeChange",
            mode: evt.data.value
            last: evt.data.old
        when "strokeColor"
          @dispatchEvent "Canvas.StrokeColorChange",
            color: evt.data.value
        when "fillColor"
          @dispatchEvent "Canvas.FillColorChange",
            color: evt.data.value
        when "isolated","selected"
          @_manageContextMenu()
        when "objects"
          this.render()

    ###*
       * Function for manage context menu according to the type of an selected object.
    ###
    _manageContextMenu: () =>
      Globals.get('Relay').dispatchEvent 'ContextMenu.ContextChange',
        context:
          selection: @_model.get('selected')
          isolation: @_model.get('isolated')

    ###*
       * Function got executed when the on path created event got triggered.
       * @param {evt} event object.
    ###
    _onPathCreated: (evt) =>
      path = Path.createFromFabric evt.data.path
      @_model.addObject path, true

    #_onObjectScaled: (e) =>      

    ###*
       * Function got executed when the on selection event got triggered.
       * @param {evt} event object.
    ###
    _onSelectionCreated : (evt) =>
      if(@_model.getActiveObjects().length > 1)
         $('#stamping').hide()

      if ($("#CalibrationAndManipulationModal").data('bs.modal') || {}).isShown  #Condition for checking property modal is open or not.
        $('#manipulationandcalibrationproperty').hide()       
      
      this.selectObjects (obj for obj in @_model.getActiveObjects() when obj.getId() in evt.data.objectIds)

      #mechanism for updating the value of color picker and stroke width on selection of an object.
      currentTarget = if evt.currentTarget._fabric._activeObject then evt.currentTarget._fabric._activeObject else evt.currentTarget._fabric.relatedTarget
      root.LastActiveObject = currentTarget

      if evt.data.objectIds.length == 1 && (currentTarget.type == "line" || currentTarget.type != "group")
        if $('#Stroke').length > 0 && $('#Fill').length > 0
          color = []
          color.push "id":'color-stroke'
          color.push currentTarget.stroke
          colorAction = new ColorAction this, color, 'color-stroke'
          colorAction.execute()
          color = currentTarget.stroke          
          $('#Stroke').next()[0].jscolor.fromString(color);
          strokeaction = new StrokeAction this,currentTarget.strokeWidth
          strokeaction.execute()
          
          if currentTarget.fill
            color = []            
            color.push "id":'color-fill'
            color.push currentTarget.fill            
            colorAction = new ColorAction this, color, 'color-fill'
            colorAction.execute()
            color = currentTarget.fill
            $('#Fill').next()[0].jscolor.fromString(color);
      window.activeObjectsId = [];
      if @_model._data.selected.length > 1
          for obj in this._view._fabric._activeGroup._objects
            window.activeObjectsId.push obj.id
      this.objectSummaryUpdate evt #Method for updating properties of an object on bottom right side of context menu.

    ###*
       * Function got executed when any object property got modified.
       * @param {evt} event object.
    ###
    _onSelectionScaling: (evt) =>  
      if ($("#CalibrationAndManipulationModal").data('bs.modal') || {}).isShown 
        activeObject = evt.currentTarget._fabric._activeObject          
        switch root.objectCalibrationProperty
          when "X"
            this.setMinMax activeObject.left
          when "Y"
            this.setMinMax activeObject.top
          when "Height" 
            this.setMinMax activeObject.scaleY
          when "Width"
            this.setMinMax activeObject.scaleX
          when "Rotation"
            this.setMinMax activeObject.angle
      this.objectSummaryUpdate evt     

    ###*
       * Function for set the range of input slider in calibration module.
       * @param {value} max property value.
    ###
    setMinMax: (value) =>
      switch root.objectCalibrationProperty
        when "X","Y","Rotation"
          if ($('#minValue').prop('checked'))
            $('#minRangeInput').val(value)
            $('#minInput').html(parseInt(value))
          else
            $('#maxRangeInput').val(value)
            $('#maxInput').html(parseInt(value))      
        when "Height","Width"
          if ($('#minValue').prop('checked'))
            $('#minRangeInput').val(value)
            $('#minInput').html(value.toFixed(1))
          else
            $('#maxRangeInput').val(value)
            $('#maxInput').html(value.toFixed(1))      

    ###*
       * Function got executed when on selection event got triggered.
       * @param {evt} event object.
    ###
    _onSelectionCleared: (evt) =>
      if ($("#CalibrationAndManipulationModal").data('bs.modal') || {}).isShown 
        this.applyOriginalProperty()
      @selectObjects []
      $('#ObjectProperties').hide() 
      $('.menu-item.parent').hide()
      #hide the properties above canvas of an active object      
      $('#CalibrationAndManipulationModal').modal('hide')       

    ###*
       * Function for intializing the canvas.
    ###
    initCanvas: () =>
      @_view.initCanvas @_model

    ###*
       * Function for disable the model.
    ###
    disable: () =>
      @_model.disable()

    ###*
       * Function for enable the model.
    ###
    enable: () =>
      @_model.enable()

    ###*
       * Function for diable the controls.
    ###
    disableControls: () =>
      @_model.disableControls()

    ###*
       * Function for enable the controls.
    ###
    enableControls: () =>
      @_model.enableControls()

    ###*
       * Function for showing the object property on bottom right.
       * @param {evt} event object.
    ###
    objectSummaryUpdate: (evt) =>
      #mechanism for showing properties above canvas on selection of object on canvas.
      activeObject = evt.currentTarget._fabric._activeObject
      if activeObject
        ObjectSummary objectSummary = new ObjectSummary
        objectSummary.ObjectProperty activeObject