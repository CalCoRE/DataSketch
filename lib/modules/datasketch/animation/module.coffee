define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  Globals = require 'core/model/globals'

  VerticalPositionProperty = require './properties/y/module'
  HorizontalPositionProperty = require './properties/x/module'
  WidthProperty = require './properties/width/module'
  HeightProperty = require './properties/height/module'
  RotationProperty = require './properties/rotation/module'
  ColorProperty = require './properties/color/module'
  ScaleProperty = require './properties/scale/module'
  TransparencyProperty = require './properties/transparency/module'

  Animator = require './animator'
  ModeSelectTool = require 'modules/datasketch/tools/mode/tool'
  ScrubBar = require './scrubbar/scrubbar'

  require 'link!./style.css'

  class AnimationModule extends Module
    constructor: () ->
      super

    init: () =>
      @_animator = new Animator
        canvas: Globals.get 'Canvas'
        # datastore: Globals.get 'DataStore'
      @_scrubbar = new ScrubBar @_animator

      HM.hook 'Toolbar.Tools', @_toolbarTools

    run: () =>
      Globals.get('Canvas').addEventListener 'Canvas.ModeChange', @_onModeChange
      Globals.get('App.view').addChild @_scrubbar

    _toolbarTools: (list, meta) =>
      if meta.id is "mode"
        list.push new ModeSelectTool "animate"
      list

    _onModeChange: (evt) =>
      if evt.currentTarget.getMode() == "animate"
        Globals.get('Canvas').selectObjects []
        Globals.get('Canvas').disableControls()
        @_animator.cache()
        @_animator.reset()
        @_animator.play()
        @_scrubbar.show()
      else if evt.data.last == "animate"
        @_animator.pause()
        @_animator.reset()
        @_animator.restore()
        @_scrubbar.hide()

  AnimationModule.requires = [
    HorizontalPositionProperty
    VerticalPositionProperty
    WidthProperty
    HeightProperty
    RotationProperty
    ScaleProperty
    ColorProperty
    TransparencyProperty
  ]

  AnimationModule
