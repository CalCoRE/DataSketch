define (require) ->
  EventDispatcher = require 'core/event/dispatcher'  
  Globals = require 'core/model/globals'
  class Animator extends EventDispatcher
    @_isLoop = true

    constructor: (@settings) ->
      @_playhead = 0

    play: () =>            
      Globals.get('Canvas')._view._fabric.deactivateAll();
      @_isPlaying = true
      @_lastTime = (new Date).getTime()
      window.opacityManager=1
      @_animate()
      window.arrayObject = []

    pause: () =>
      @_isPlaying = false
      clearInterval(window.timer)
      if window.arrayObject.length > 0
         Globals.get('Canvas').removeObjects window.arrayObject
      for obj in @settings.canvas.getObjects()
        if obj != undefined
          objId = obj.getId()          
          if window[objId+"arrayObject"] != undefined  && window[objId+"arrayObject"].length > 0
            Globals.get('Canvas').removeObjects window[objId+"arrayObject"]
            window[objId+"previousRow"] = null
      window.opacityManager=1

    reset: () =>
      @_playhead = 0

    cache: () =>
      for obj in @settings.canvas.getObjects()
        obj.cacheState()

    restore: () =>
      for obj in @settings.canvas.getObjects()
        obj.restoreState()
      @settings.canvas.dryRender()

    _animate: () =>
      if @_isPlaying
        currTime = (new Date).getTime()        
        total = @settings.datastore.get('rows').length * window.DataSketchConfig.timePerRow * 1000        
        delta = currTime - @_lastTime        
        @_playhead = Math.min(total, @_playhead + delta)        
        for obj in @settings.canvas.getObjects()
          if obj != undefined
            obj.animate @_playhead, delta, @settings.datastore
          
        @settings.canvas.dryRender()
        @_lastTime = currTime        

        @dispatchEvent 'Animator.Tick',
          playhead: @_playhead
          total: total
        
        if @_playhead >= total          
          this.restore()  
          @_isLoop= true
          if @_isLoop
            @_playhead = 0            
          else
            this.pause()
            this.reset()            
            ##Remove last animation from object  
            mobject = this.settings.canvas.getSelectedObjects()            
            objectProperty = mobject[0].getPropertyMappings()            
            mobject[0].removePropertyMapping objectProperty[0]
        
        window.requestAnimationFrame @_animate       