define (require) ->
  AnimationProperty = require '../base/module'
  CalibrationForm = require './calibration/form'
  Utils = require 'core/util/utils'

  class ColorProperty extends AnimationProperty
    constructor: () ->
      super
        id: 'color'
        name: 'Color'

    getCalibrationForm: () =>
      new CalibrationForm

    setPropertyValue: (object, calibration, percent) =>
      hexre = /^\#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i
      minSplit = hexre.exec calibration.min
      maxSplit = hexre.exec calibration.max
      red =
        min: parseInt minSplit[1], 16
        max: parseInt maxSplit[1], 16
      green =
        min: parseInt minSplit[2], 16
        max: parseInt maxSplit[2], 16
      blue =
        min: parseInt minSplit[3], 16
        max: parseInt maxSplit[3], 16

      redVal = Utils.zeropad(Math.round(red.min + percent * (red.max - red.min)).toString(16), 2)
      greenVal = Utils.zeropad(Math.round(green.min + percent * (green.max - green.min)).toString(16), 2)
      blueVal = Utils.zeropad(Math.round(blue.min + percent * (blue.max - blue.min)).toString(16), 2)
      object.setStrokeColor "##{redVal}#{greenVal}#{blueVal}"
