define (require) ->
  Tool = require 'modules/toolkit/tool/tool'
  Globals = require 'core/model/globals'
  PlayAnimationAction = require 'modules/datasketch/actions/play_animation'

  class PlayTool extends Tool
    constructor: () ->
      super
        modelData:
          id: "play"

    generateAction: () =>
      new PlayAnimationAction Globals.get('Canvas.animator')
