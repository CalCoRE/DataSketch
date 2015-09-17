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

  class AnimationModule extends Module
    constructor: () ->
      super

    init: () =>

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
