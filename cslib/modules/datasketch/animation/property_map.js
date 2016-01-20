(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var PropertyMap;
    return PropertyMap = (function() {
      function PropertyMap(settings) {
        this.applyMapping = bind(this.applyMapping, this);
        this.objectProperty = settings.objectProperty;
        this.dataProperty = settings.dataProperty;
        this.calibration = settings.calibration;
      }

      PropertyMap.prototype.applyMapping = function(object, playhead, timeDelta, dataStore) {
        var mid, minMax, nextRow, nextRowValue, percent, prevRow, prevRowValue, rowNext, rowPrev, val;
        rowPrev = Math.floor((playhead / 1000) / window.DataSketchConfig.timePerRow);
        rowNext = rowPrev + 1;
        if (dataStore.get('rows').length > rowNext) {
          mid = (playhead / 1000) / window.DataSketchConfig.timePerRow - rowPrev;
          prevRow = dataStore.get('rows')[rowPrev];
          nextRow = dataStore.get('rows')[rowNext];
          prevRowValue = prevRow.getValue(this.dataProperty.getId());
          nextRowValue = nextRow.getValue(this.dataProperty.getId());
          val = dataStore.get('rows')[rowPrev].getValue(this.dataProperty.getId()) + (dataStore.get('rows')[rowNext].getValue(this.dataProperty.getId()) - dataStore.get('rows')[rowPrev].getValue(this.dataProperty.getId())) * mid;
          minMax = dataStore.getMinMax(this.dataProperty);
          percent = (val - minMax.min) / (minMax.max - minMax.min);
          return this.objectProperty.setPropertyValue(object, this.calibration, percent);
        }
      };

      return PropertyMap;

    })();
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/animation/property_map.js.map