define (require) ->
  class PropertyMap
    constructor: (settings) ->
      @objectProperty = settings.objectProperty
      @dataProperty = settings.dataProperty
      @calibration = settings.calibration

    applyMapping: (object, playhead, timeDelta, dataStore) =>
      rowPrev = Math.floor (playhead / 1000) / window.DataSketchConfig.timePerRow
      rowNext = rowPrev + 1
      if dataStore.get('rows').length > rowNext
        mid = (playhead / 1000) / window.DataSketchConfig.timePerRow - rowPrev
        prevRow = dataStore.get('rows')[rowPrev]
        nextRow = dataStore.get('rows')[rowNext]
        prevRowValue = prevRow.getValue(@dataProperty.getId())
        nextRowValue = nextRow.getValue(@dataProperty.getId())
        val = dataStore.get('rows')[rowPrev].getValue(@dataProperty.getId()) + (dataStore.get('rows')[rowNext].getValue(@dataProperty.getId()) - dataStore.get('rows')[rowPrev].getValue(@dataProperty.getId())) * mid
        minMax = dataStore.getMinMax @dataProperty
        percent = (val - minMax.min) / (minMax.max - minMax.min)
        @objectProperty.setPropertyValue object, @calibration, percent