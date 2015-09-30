define (require) ->
  EventDispatcher = require 'core/event/dispatcher'

  class Animator extends EventDispatcher
    constructor: (@settings) ->
      @_playhead = 0

    play: () =>
      @_isPlaying = true
      @_lastTime = (new Date).getTime()
      @_animate()

    pause: () =>
      @_isPlaying = false

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
          obj.animate @_playhead, delta, @settings.datastore
        @settings.canvas.dryRender()
        @_lastTime = currTime

        @dispatchEvent 'Animator.Tick',
          playhead: @_playhead
          total: total

        if @_playhead >= total
          # @_isPlaying = false
          @_playhead = 0

        window.requestAnimationFrame @_animate