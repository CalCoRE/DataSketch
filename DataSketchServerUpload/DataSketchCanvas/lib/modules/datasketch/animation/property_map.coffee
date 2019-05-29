define (require) ->
  Globals = require 'core/model/globals'
  class PropertyMap
    root = exports ? this
    constructor: (settings) ->      
      @objectProperty = settings.objectProperty
      @dataProperty = settings.dataProperty
      @calibration = settings.calibration
      
    applyMapping: (object, playhead, timeDelta, dataStore) =>
      rowPrev = Math.floor (playhead / 1000) / window.DataSketchConfig.timePerRow      
      rowNext = rowPrev + 1     
      window.objectLeft = object._view._fabric.left
      window.timeRequired = dataStore.get('rows').length
      
      
      if dataStore.get('rows').length > rowNext
        mid = (playhead / 1000) / window.DataSketchConfig.timePerRow - rowPrev
        prevRow = dataStore.get('rows')[rowPrev]
        nextRow = dataStore.get('rows')[rowNext]

        #Make an comment because of unused variable.
        #prevRowValue = prevRow.getValue(@dataProperty.getId())
        #nextRowValue = nextRow.getValue(@dataProperty.getId())       
        if(dataStore.get('rows')[rowPrev].getValue(@dataProperty.getId()) != "" || dataStore.get('rows')[rowNext].getValue(@dataProperty.getId()) != "")

            val = eval(dataStore.get('rows')[rowPrev].getValue(@dataProperty.getId())) + eval(dataStore.get('rows')[rowNext].getValue(@dataProperty.getId()) - dataStore.get('rows')[rowPrev].getValue(@dataProperty.getId())) * eval(mid)

            minMax = dataStore.getMinMax @dataProperty
            #@objCalibration = {}  
            #@objCalibration.max=@calibration.max;
            #@objCalibration.min=window.objectLeft;
            percent = eval(val - minMax.min) / eval(minMax.max - minMax.min)      

            @_canvas = Globals.get('Canvas')
            if object._model._data.isStamping == true
                Trail1 = null
                objId = object.getId()

                if window[objId+"arrayObject"] == null || window[objId+"arrayObject"] == undefined
                  window[objId+"arrayObject"] = []
                  window[objId+"previousRow"] = -1
                
                if object._view._fabric.type != "path" && object._view._fabric.type != "group"      
                  if window[objId+"previousRow"] != rowNext
                    Trail1 = object.clone(object._view._fabric.type)
                    Trail1.disable()
                    Trail1._view._fabric.opacity = Math.abs((window.opacityManager / 100) + 0.2).toFixed(2)                                
                    window.opacityManager += 1
                    window.opacityManager = window.opacityManager - 0.02
                    if window.opacityManager == 0
                      window.opacityManager = 0.30             
                    window[objId+"arrayObject"].push Trail1                  
                    @_canvas.addStampingObjects Trail1        
                    if rowNext < window[objId+"previousRow"]
                      if window[objId+"arrayObject"].length > 0
                        Globals.get('Canvas').removeObjects window[objId+"arrayObject"]
                      window.opacityManager = 1
                    window[objId+"previousRow"] = rowNext
                else
                  if window[objId+"previousRow"] != rowNext
                   groupObjectOriginX = object._view._fabric.originX
                   groupObjectOriginY = object._view._fabric.originY
                   object.clone(object._view._fabric.type).then (clones) =>
                     Trail1 = clones
                     Trail1.disable()
                     console.log clones
                     debugger
                     for clone in clones._model._data.children
                       clone._view._fabric.originX = groupObjectOriginX
                       clone._view._fabric.originY = groupObjectOriginY
                       point = clone._view._fabric.getPointByOrigin object.originX,object.originY            
                       newPoint = clone._view._fabric.translateToGivenOrigin point,clone._view._fabric.originX,clone._view._fabric.originY,groupObjectOriginX,groupObjectOriginY
                       clone.setPosition
                            x: newPoint.x,
                            y: newPoint.y
                     if object._view._fabric.type == "group" 
                       for obj in Trail1._view._fabric._objects
                         obj.opacity = Trail1._view._fabric.opacity = Math.abs((window.opacityManager / 100) + 0.2).toFixed(2)
                     else 
                       Trail1._view._fabric.opacity = Trail1._view._fabric.opacity = Math.abs((window.opacityManager / 100) + 0.2).toFixed(2)                
                     window.opacityManager += 1
                     if Trail1._view._fabric.opacity == 0
                       Trail1._view._fabric.opacity = 1     
                     window[objId+"arrayObject"].push Trail1
                     @_canvas.addStampingObjects Trail1        
                     if rowNext < window[objId+"previousRow"]
                       if window[objId+"arrayObject"].length > 0
                         Globals.get('Canvas').removeObjects window[objId+"arrayObject"]
                       window.opacityManager = 1
                     window[objId+"previousRow"] = rowNext
            
            @objectProperty.setPropertyValue object, @calibration, percent







    
    
    
       

