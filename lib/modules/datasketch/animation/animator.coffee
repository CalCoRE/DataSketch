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

    _animate: () =>
      currTime = (new Date).getTime()
      delta = currTime - @_lastTime
      @_playhead += delta
      for obj in @settings.canvas.getObjects()
        obj.animate @_playhead, delta, @settings.datastore
      @settings.canvas.dryRender()
      @_lastTime = currTime

      if @_playhead / 1000 > @settings.datastore.get('rows').length * window.DataSketchConfig.timePerRow
        @_isPlaying = false
        @_playhead = 0

      if @_isPlaying
        window.requestAnimationFrame @_animate