(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var Globals, PropertyMap;
    Globals = require('core/model/globals');
    return PropertyMap = (function() {
      var root;

      root = typeof exports !== "undefined" && exports !== null ? exports : PropertyMap;

      function PropertyMap(settings) {
        this.applyMapping = bind(this.applyMapping, this);
        this.objectProperty = settings.objectProperty;
        this.dataProperty = settings.dataProperty;
        this.calibration = settings.calibration;
      }

      PropertyMap.prototype.applyMapping = function(object, playhead, timeDelta, dataStore) {
        var Trail1, groupObjectOriginX, groupObjectOriginY, mid, minMax, nextRow, objId, percent, prevRow, rowNext, rowPrev, val;
        rowPrev = Math.floor((playhead / 1000) / window.DataSketchConfig.timePerRow);
        rowNext = rowPrev + 1;
        window.objectLeft = object._view._fabric.left;
        window.timeRequired = dataStore.get('rows').length;
        if (dataStore.get('rows').length > rowNext) {
          mid = (playhead / 1000) / window.DataSketchConfig.timePerRow - rowPrev;
          prevRow = dataStore.get('rows')[rowPrev];
          nextRow = dataStore.get('rows')[rowNext];
          if (dataStore.get('rows')[rowPrev].getValue(this.dataProperty.getId()) !== "" || dataStore.get('rows')[rowNext].getValue(this.dataProperty.getId()) !== "") {
            val = eval(dataStore.get('rows')[rowPrev].getValue(this.dataProperty.getId())) + eval(dataStore.get('rows')[rowNext].getValue(this.dataProperty.getId()) - dataStore.get('rows')[rowPrev].getValue(this.dataProperty.getId())) * eval(mid);
            minMax = dataStore.getMinMax(this.dataProperty);
            percent = eval(val - minMax.min) / eval(minMax.max - minMax.min);
            this._canvas = Globals.get('Canvas');
            if (object._model._data.isStamping === true) {
              Trail1 = null;
              objId = object.getId();
              if (window[objId + "arrayObject"] === null || window[objId + "arrayObject"] === void 0) {
                window[objId + "arrayObject"] = [];
                window[objId + "previousRow"] = -1;
              }
              if (object._view._fabric.type !== "path" && object._view._fabric.type !== "group") {
                if (window[objId + "previousRow"] !== rowNext) {
                  Trail1 = object.clone(object._view._fabric.type);
                  Trail1.disable();
                  Trail1._view._fabric.opacity = Math.abs((window.opacityManager / 100) + 0.2).toFixed(2);
                  window.opacityManager += 1;
                  window.opacityManager = window.opacityManager - 0.02;
                  if (window.opacityManager === 0) {
                    window.opacityManager = 0.30;
                  }
                  window[objId + "arrayObject"].push(Trail1);
                  this._canvas.addStampingObjects(Trail1);
                  if (rowNext < window[objId + "previousRow"]) {
                    if (window[objId + "arrayObject"].length > 0) {
                      Globals.get('Canvas').removeObjects(window[objId + "arrayObject"]);
                    }
                    window.opacityManager = 1;
                  }
                  window[objId + "previousRow"] = rowNext;
                }
              } else {
                if (window[objId + "previousRow"] !== rowNext) {
                  groupObjectOriginX = object._view._fabric.originX;
                  groupObjectOriginY = object._view._fabric.originY;
                  object.clone(object._view._fabric.type).then((function(_this) {
                    return function(clones) {
                      var clone, i, j, len, len1, newPoint, obj, point, ref, ref1;
                      Trail1 = clones;
                      Trail1.disable();
                      console.log(clones);
                      debugger;
                      ref = clones._model._data.children;
                      for (i = 0, len = ref.length; i < len; i++) {
                        clone = ref[i];
                        clone._view._fabric.originX = groupObjectOriginX;
                        clone._view._fabric.originY = groupObjectOriginY;
                        point = clone._view._fabric.getPointByOrigin(object.originX, object.originY);
                        newPoint = clone._view._fabric.translateToGivenOrigin(point, clone._view._fabric.originX, clone._view._fabric.originY, groupObjectOriginX, groupObjectOriginY);
                        clone.setPosition({
                          x: newPoint.x,
                          y: newPoint.y
                        });
                      }
                      if (object._view._fabric.type === "group") {
                        ref1 = Trail1._view._fabric._objects;
                        for (j = 0, len1 = ref1.length; j < len1; j++) {
                          obj = ref1[j];
                          obj.opacity = Trail1._view._fabric.opacity = Math.abs((window.opacityManager / 100) + 0.2).toFixed(2);
                        }
                      } else {
                        Trail1._view._fabric.opacity = Trail1._view._fabric.opacity = Math.abs((window.opacityManager / 100) + 0.2).toFixed(2);
                      }
                      window.opacityManager += 1;
                      if (Trail1._view._fabric.opacity === 0) {
                        Trail1._view._fabric.opacity = 1;
                      }
                      window[objId + "arrayObject"].push(Trail1);
                      _this._canvas.addStampingObjects(Trail1);
                      if (rowNext < window[objId + "previousRow"]) {
                        if (window[objId + "arrayObject"].length > 0) {
                          Globals.get('Canvas').removeObjects(window[objId + "arrayObject"]);
                        }
                        window.opacityManager = 1;
                      }
                      return window[objId + "previousRow"] = rowNext;
                    };
                  })(this));
                }
              }
            }
            return this.objectProperty.setPropertyValue(object, this.calibration, percent);
          }
        }
      };

      return PropertyMap;

    })();
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/animation/property_map.js.map
