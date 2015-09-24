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

  require 'link!./style.css'

  class AnimationModule extends Module
    constructor: () ->
      super

    init: () =>
      @_animator = new Animator
        canvas: Globals.get 'Canvas'
        datastore: Globals.get 'DataStore'

      HM.hook 'Toolbar.Tools', @_toolbarTools

    run: () =>
      Globals.get('Canvas').addEventListener 'Canvas.ModeChange', @_onModeChange

    _toolbarTools: (list, meta) =>
      if meta.id is "mode"
        list.push new ModeSelectTool "animate"
      list

    _onModeChange: (evt) =>
      if evt.currentTarget.getMode() == "animate"
        @_animator.cache()
        @_animator.reset()
        @_animator.play()
      else
        @_animator.pause()
        @_animator.reset()
        @_animator.restore()

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
