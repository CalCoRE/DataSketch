define (require) ->
  Module = require 'core/app/module'
  HM = require 'core/event/hook_manager'
  Globals = require 'core/model/globals'

  VerticalPositionProperty = require './properties/vertical_position'
  HorizontalPositionProperty = require './properties/horizontal_position'
  WidthProperty = require './properties/width'
  HeightProperty = require './properties/height'
  RotationProperty = require './properties/rotation'
  ColorProperty = require './properties/color'
  ScaleProperty = require './properties/scale'
  TransparencyProperty = require './properties/transparency'

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
