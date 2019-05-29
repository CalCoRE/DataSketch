(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(function(require) {
    var ColorAction, Controller, DSCanvas, Fabric, Globals, Group, HM, Model, ObjectBase, ObjectSummary, Path, PropertyMap, StrokeAction, View;
    require('thirdparty/base64');
    Fabric = require('thirdparty/fabric');
    View = require('./view');
    Model = require('./model');
    Controller = require('core/controller/controller');
    HM = require('core/event/hook_manager');
    Globals = require('core/model/globals');
    Path = require('./objects/path/object');
    Group = require('./objects/group/object');
    ObjectBase = require('./objects/base/object');
    ColorAction = require('modules/datasketch/actions/set_color');
    StrokeAction = require('modules/datasketch/actions/set_stroke_width');
    ObjectSummary = require('modules/datasketch/menuitems/objectsummary');
    PropertyMap = require('modules/datasketch/animation/property_map');
    return DSCanvas = (function(superClass) {
      var root;

      extend(DSCanvas, superClass);


      /**
         * Funtion to initialize view and events on canvas.
         * @param {config} model and view configuration.
       */

      function DSCanvas(config) {
        this.objectSummaryUpdate = bind(this.objectSummaryUpdate, this);
        this.enableControls = bind(this.enableControls, this);
        this.disableControls = bind(this.disableControls, this);
        this.enable = bind(this.enable, this);
        this.disable = bind(this.disable, this);
        this.initCanvas = bind(this.initCanvas, this);
        this._onSelectionCleared = bind(this._onSelectionCleared, this);
        this.setMinMax = bind(this.setMinMax, this);
        this._onSelectionScaling = bind(this._onSelectionScaling, this);
        this._onSelectionCreated = bind(this._onSelectionCreated, this);
        this._onPathCreated = bind(this._onPathCreated, this);
        this._manageContextMenu = bind(this._manageContextMenu, this);
        this._onModelChange = bind(this._onModelChange, this);
        this.setIsolation = bind(this.setIsolation, this);
        this.getIsolation = bind(this.getIsolation, this);
        this.enforceTransform = bind(this.enforceTransform, this);
        this.isolate = bind(this.isolate, this);
        this.breakGroup = bind(this.breakGroup, this);
        this.createGroup = bind(this.createGroup, this);
        this.removeSelected = bind(this.removeSelected, this);
        this.removeObjects = bind(this.removeObjects, this);
        this.removeObject = bind(this.removeObject, this);
        this.deleteObject = bind(this.deleteObject, this);
        this.removeGrid = bind(this.removeGrid, this);
        this.snapToGrid = bind(this.snapToGrid, this);
        this.manageGrid = bind(this.manageGrid, this);
        this.addShape = bind(this.addShape, this);
        this.addStampingObjects = bind(this.addStampingObjects, this);
        this.addObjects = bind(this.addObjects, this);
        this.addObject = bind(this.addObject, this);
        this.selectObjects = bind(this.selectObjects, this);
        this.getSelectedFabric = bind(this.getSelectedFabric, this);
        this.getSelectedObjects = bind(this.getSelectedObjects, this);
        this.setStrokeColor = bind(this.setStrokeColor, this);
        this.getStrokeColor = bind(this.getStrokeColor, this);
        this.setStrokeWidth = bind(this.setStrokeWidth, this);
        this.getStrokeWidth = bind(this.getStrokeWidth, this);
        this.setMode = bind(this.setMode, this);
        this.getMode = bind(this.getMode, this);
        this.getObjects = bind(this.getObjects, this);
        this.showLoadModal = bind(this.showLoadModal, this);
        this.getSketchFromFile = bind(this.getSketchFromFile, this);
        this.loadFromFile = bind(this.loadFromFile, this);
        this.getSketchFromDb = bind(this.getSketchFromDb, this);
        this.loadFromDb = bind(this.loadFromDb, this);
        this.getSketchFromDbQueryString = bind(this.getSketchFromDbQueryString, this);
        this.loadFromQueryString = bind(this.loadFromQueryString, this);
        this.createNewFile = bind(this.createNewFile, this);
        this.reloadCurrentPage = bind(this.reloadCurrentPage, this);
        this.saveObject = bind(this.saveObject, this);
        this.updateObjectOrigin = bind(this.updateObjectOrigin, this);
        this.downloadCSVFile = bind(this.downloadCSVFile, this);
        this.saveCanvasToLocal = bind(this.saveCanvasToLocal, this);
        this.saveCanvas = bind(this.saveCanvas, this);
        this.bindPropertyDropdown = bind(this.bindPropertyDropdown, this);
        this.setCommonSliderValue = bind(this.setCommonSliderValue, this);
        this.setMinMaxBothFloat = bind(this.setMinMaxBothFloat, this);
        this.setMinMaxBoth = bind(this.setMinMaxBoth, this);
        this.objectPropertyMenu = bind(this.objectPropertyMenu, this);
        this.storeObjectProperty = bind(this.storeObjectProperty, this);
        this.applyOriginalProperty = bind(this.applyOriginalProperty, this);
        this.overlayObject = bind(this.overlayObject, this);
        this.setActiveObjectPosition = bind(this.setActiveObjectPosition, this);
        this.removeProperty = bind(this.removeProperty, this);
        this.onChangeMinMaxSlider = bind(this.onChangeMinMaxSlider, this);
        this.setObjectScale = bind(this.setObjectScale, this);
        this.dryRender = bind(this.dryRender, this);
        this.render = bind(this.render, this);
        if (config == null) {
          config = {};
        }
        if (config.modelClass == null) {
          config.modelClass = Model;
        }
        if (config.viewClass == null) {
          config.viewClass = View;
        }
        DSCanvas.__super__.constructor.call(this, config);
        this._model.addEventListener('Model.Change', this._onModelChange);
        this.view().addEventListener('Selection.Created', this._onSelectionCreated);
        this.view().addEventListener('Selection.Scaling', this._onSelectionScaling);
        this.view().addEventListener('Selection.Cleared', this._onSelectionCleared);
        this.view().addEventListener('Path.Created', this._onPathCreated);
      }

      root = typeof exports !== "undefined" && exports !== null ? exports : DSCanvas;


      /**
         * Funtion for render path object on canvas.
       */

      DSCanvas.prototype.render = function() {
        return this._view.render(this._model);
      };


      /**
         * Funtion for render canvas.
       */

      DSCanvas.prototype.dryRender = function() {
        return this._view.dryRender();
      };


      /**
         * Funtion for set the scale of an object.
         * @param {scaleX} scaleX of an object.
         * @param {scaleY} scaleY of an object.
       */

      DSCanvas.prototype.setObjectScale = function(scaleX, scaleY) {
        var canvasActiveObject;
        canvasActiveObject = this.getSelectedObjects();
        return canvasActiveObject[0].setScale({
          x: scaleX,
          y: scaleY
        });
      };


      /**
         * Funtion for manipulate the effect of animation on an object when calibration input slider value got changed.
       */

      DSCanvas.prototype.onChangeMinMaxSlider = function() {
        var Scale, activeObject, canvasActiveObject, objectSummary;
        if ($('#maxValue').prop('checked') === true) {
          Scale = eval($('#maxRangeInput').val());
        } else {
          Scale = eval($('#minRangeInput').val());
        }
        if (root.objectCalibrationProperty === "Transparency") {
          Scale = Math.abs(Scale) / 100;
        } else {
          Scale = Math.abs(Scale);
        }
        canvasActiveObject = this.getSelectedObjects();
        activeObject = canvasActiveObject[0]._view._fabric;
        switch (root.objectCalibrationProperty) {
          case "X":
            this._view.setObjectPosition(Scale, activeObject.top);
            break;
          case "Y":
            this._view.setObjectPosition(activeObject.left, Scale);
            break;
          case "Height":
            this.setObjectScale(activeObject.scaleX, Scale);
            break;
          case "Width":
            this.setObjectScale(Scale, activeObject.scaleY);
            break;
          case "Rotation":
            canvasActiveObject[0].setRotation(Scale);
            break;
          case "Scale":
            this.setObjectScale(Scale, Scale);
            break;
          case "Transparency":
            canvasActiveObject[0].setOpacity(Scale);
        }
        canvasActiveObject[0].enforceTransform();
        ObjectSummary(objectSummary = new ObjectSummary);
        objectSummary.ObjectProperty(activeObject);
        return this.dryRender();
      };


      /**
         * Funtion for remove animation property from an oject.
       */

      DSCanvas.prototype.removeProperty = function() {
        return this._view.deleteCurrentProperty();
      };


      /**
         * Funtion for set the position of an object.
         * @param {left} left coord of an object.
         * @param {top} top coord of an object.
       */

      DSCanvas.prototype.setActiveObjectPosition = function(left, top) {
        var activeObject;
        activeObject = this.getSelectedObjects();
        return activeObject[0].setPosition({
          x: left,
          y: top
        });
      };


      /**
         * Funtion for overlay of an object.
         * @param {operation} name of an overlay operation.
       */

      DSCanvas.prototype.overlayObject = function(operation) {
        var activeObjectsId, i, j, len, len1, obj, object, pathObj, ref, results;
        activeObjectsId = [];
        if (this._model._data.selected.length > 1) {
          ref = this._view._fabric._activeGroup._objects;
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            activeObjectsId.push(obj.id);
          }
          this._view.removeSelectionOnSave();
          results = [];
          for (j = 0, len1 = activeObjectsId.length; j < len1; j++) {
            object = activeObjectsId[j];
            pathObj = this._model._data.objects.filter((function(_this) {
              return function(data) {
                return data._view._fabric.id === object;
              };
            })(this));
            results.push(this._view.overlayOfAnObject(operation, pathObj[0]));
          }
          return results;
        } else {
          return this._view.overlayOfAnObject(operation, this._model._data.selected[0]);
        }
      };


      /**
         * Funtion for reset the property of an object which was modified during calibration and manipulation module open.
       */

      DSCanvas.prototype.applyOriginalProperty = function() {
        var activeObject, maxRangeInput, minRangeInput;
        activeObject = this.getSelectedObjects();
        minRangeInput = $('#minRangeInput').val();
        maxRangeInput = $('#maxRangeInput').val();
        if (window.currentObjectId === root.LastActiveObject.id) {
          if (activeObject.length > 0) {
            this._model._data.selected[0]._view._fabric.opacity = eval(root.currentActiveObject["Opacity"]);
            this._model._data.selected[0]._view._fabric.angle = eval(root.currentActiveObject["Angle"]);
            activeObject[0].setRotation(eval(root.currentActiveObject["Angle"]));
            if (root.objectCalibrationProperty === "X" && window.currentActionId === "calibrationApplyButton") {
              this.setActiveObjectPosition(eval(minRangeInput), root.currentActiveObject["Y"]);
            } else if (root.objectCalibrationProperty === "Y" && window.currentActionId === "calibrationApplyButton") {
              this.setActiveObjectPosition(root.currentActiveObject["X"], eval(minRangeInput));
            } else {
              this.setActiveObjectPosition(root.currentActiveObject["X"], root.currentActiveObject["Y"]);
            }
            activeObject[0].setScale({
              x: root.currentActiveObject["scaleX"],
              y: root.currentActiveObject["scaleY"]
            });
            activeObject[0].setOpacity(root.currentActiveObject["Opacity"]);
            activeObject[0].enforceTransform();
            return this.dryRender();
          }
        }
      };


      /**
         * Funtion for storing object property before the visualization of animation on object.
         * @param {activeObject} selected fabric object.
       */

      DSCanvas.prototype.storeObjectProperty = function(activeObject) {
        root.currentActiveObject = {};
        root.currentActiveObject["X"] = activeObject.left;
        root.currentActiveObject["Y"] = activeObject.top;
        root.currentActiveObject["Height"] = activeObject.height;
        root.currentActiveObject["scaleY"] = activeObject.scaleY;
        root.currentActiveObject["Width"] = activeObject.width;
        root.currentActiveObject["scaleX"] = activeObject.scaleX;
        root.currentActiveObject["Angle"] = activeObject.angle;
        root.currentActiveObject["Opacity"] = activeObject.opacity;
        return window.currentObjectId = activeObject.id;
      };


      /**
         * Funtion for management of data and calibration module of an object.
         * @param {object} selected object property from an object property menu.
       */

      DSCanvas.prototype.objectPropertyMenu = function(object) {
        var ObjectProperty, activeObject, calibration, dataStore, i, len, minMax, obj, rangeInput, ref, results;
        if ($('.activeMenu').length > 0) {
          this._objectProperty = HM.invoke('DataMapping.ObjectProperties', []);
          this._dataProperty = HM.invoke('DataMapping.DataProperties', []);
          window.objectPropertyMaximum = $('#maxRangeInput').val();
          window.objectPropertyMinimum = $('#minRangeInput').val();
          this._dataProperty = this._dataProperty.filter((function(_this) {
            return function(data) {
              return data.getId() === $('#csvProperty').val();
            };
          })(this));
          ObjectProperty = this._objectProperty.filter((function(_this) {
            return function(data) {
              return data.getId() === $('.activeMenu')[0].id;
            };
          })(this));
          if ((this._dataProperty != null) && window.objectProperty[0]._model._data.id !== "stamping") {
            calibration = {};
            if (window.objectProperty[0]._model._data.id === "transparency") {
              calibration.max = eval(window.objectPropertyMaximum / 100);
              calibration.min = eval(window.objectPropertyMinimum / 100);
            } else {
              calibration.max = window.objectPropertyMaximum;
              calibration.min = window.objectPropertyMinimum;
            }
            window.objectProperty = this._objectProperty;
            window.dataProperty = this._dataProperty;
            window.calibration = calibration;
            this._map = new PropertyMap({
              objectProperty: ObjectProperty[0],
              dataProperty: this._dataProperty[0],
              calibration: calibration
            });
            this.getSelectedObjects()[0].addPropertyMapping(this._map);
          } else {
            this.getSelectedObjects()[0]._model._data.isStamping = $('#isStamp')[0].checked;
          }
        }
        activeObject = this.getSelectedFabric();
        if (window.currentObjectId === activeObject.id) {
          if (!($("#CalibrationAndManipulationModal").data('bs.modal') || {}).isShown) {
            this.storeObjectProperty(activeObject);
          } else {
            window.currentObjectId = activeObject.id;
            this.applyOriginalProperty();
          }
        } else {
          this.storeObjectProperty(activeObject);
        }
        $('.objectproperty-menu .menu-item').removeClass('activeMenu');
        $('#' + object.toLowerCase() + '.menu-item').addClass('activeMenu');
        if (($("#CalibrationAndManipulationModal").data('bs.modal') || {}).isShown) {
          this.applyOriginalProperty();
          this.dryRender();
        }
        $('#maxRangeInput, #minRangeInput').val(0);
        $('#maxInput, #minInput').html(0);
        $('#shape')[0].style.pointerEvents = 'none';
        window.objectProperty = this._view.getObjectProperty(object);
        root.objectCalibrationProperty = object;
        this.bindPropertyDropdown(object);
        rangeInput = $('#minRangeInput,#maxRangeInput');
        switch (object) {
          case "X":
            rangeInput.attr('max', $(window).width());
            this.setMinMaxBoth(activeObject.left);
            break;
          case "Y":
            rangeInput.attr('max', $(window).height());
            this.setMinMaxBoth(activeObject.top);
            break;
          case "Rotation":
            rangeInput.attr('max', 360);
            if (activeObject.angle >= 0) {
              this.setMinMaxBoth(activeObject.angle);
            } else {
              this.setMinMaxBoth(360 + Math.round(activeObject.angle));
            }
            break;
          case "Scale":
            this.setCommonSliderValue("Scale");
            if (activeObject.scaleX === activeObject.scaleY) {
              this.setMinMaxBothFloat(activeObject.scaleY);
            }
            break;
          case "Height":
            this.setCommonSliderValue("Height");
            this.setMinMaxBothFloat(activeObject.scaleY);
            break;
          case "Width":
            this.setCommonSliderValue("Width");
            this.setMinMaxBothFloat(activeObject.scaleX);
            break;
          case "Transparency":
            rangeInput.val(0);
            $('#minInput,#maxInput').html(0);
            rangeInput.attr('max', 100);
            this.setMinMaxBoth(activeObject.opacity * 100);
            break;
          case "Stamping":
            $('#isStamp')[0].checked = this.getSelectedObjects()[0]._model._data.isStamping;
        }
        this._view.getAvailableProperty(object.toLowerCase());
        dataStore = Globals.get('DataStore');
        ref = dataStore._data.properties;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          obj = ref[i];
          if (obj._data.id === $('#csvProperty').val()) {
            minMax = dataStore.getMinMax(obj);
            $('#propertyMaxValue').html(minMax.max);
            $('#propertyMinValue').html(minMax.min);
            break;
          } else {
            results.push(void 0);
          }
        }
        return results;
      };


      /**
         * Function for set the object property value to the slider input of calibration module.
         * @param {value} active object property value.
       */

      DSCanvas.prototype.setMinMaxBoth = function(value) {
        value = parseInt(value);
        $('#minRangeInput,#maxRangeInput').val(value);
        $('#minInput,#maxInput').html(value);
        return $('#minRangeInput,#maxRangeInput').attr('step', 1);
      };

      DSCanvas.prototype.setMinMaxBothFloat = function(value) {
        value = eval(value);
        $('#minRangeInput,#maxRangeInput').val(value);
        return $('#minInput,#maxInput').html(value.toFixed(1));
      };


      /**
         * Function for reset the value of an slider in calibration module.
       */

      DSCanvas.prototype.setCommonSliderValue = function(propertyName) {
        $('#minRangeInput,#maxRangeInput').val(0);
        $('#minInput,#maxInput').html(0);
        if (propertyName === "Width" || propertyName === "Height") {
          $('#minRangeInput,#maxRangeInput').attr('step', 0.1);
        } else {
          $('#minRangeInput,#maxRangeInput').attr('step', 1);
        }
        if (propertyName === "Width") {
          return $('#minRangeInput,#maxRangeInput').attr('max', parseInt(window.innerWidth / 100));
        } else {
          return $('#minRangeInput,#maxRangeInput').attr('max', parseInt(window.innerHeight / 100));
        }
      };


      /**
         * Function binding dropdown menu of csv property and color property
         * @param {menu} object property menu property.
       */

      DSCanvas.prototype.bindPropertyDropdown = function(menu) {
        var CsvProperty, i, j, len, len1, obj, ref, ref1;
        $('#csvProperty,#csvPropertyColor').html("");
        CsvProperty = Globals.get('DataStore');
        $('#manipulationandcalibrationproperty').hide();
        $('#manipulationandcalibrationpropertystamping').hide();
        $('#calibrationandmanipulationcolor').hide();
        if (menu === "Color") {
          ref = CsvProperty._data.properties;
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            $('#csvPropertyColor').append("<option value=" + obj._data.id + ">" + obj._data.id + "</option>");
          }
          $('#calibrationandmanipulationcolor').show();
        } else if (menu === "Stamping") {
          $('#manipulationandcalibrationpropertystamping').show();
          $('#generateAction').click();
        } else {
          ref1 = CsvProperty._data.properties;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            obj = ref1[j];
            $('#csvProperty').append("<option value=" + obj._data.id + ">" + obj._data.id + "</option>");
          }
          $('#manipulationandcalibrationproperty').show();
          $('#generateAction').click();
        }
        $('#CalibrationAndManipulationModal').modal('show');
        return $('.modal-backdrop').hide();
      };


      /**
         * Function for save canvas and check the file is exist or not in database.
         * @param {@FileName} file name.
       */

      DSCanvas.prototype.saveCanvas = function(FileName1) {
        var apiData, arrObject, i, item, j, k, len, len1, len2, obj, objList, object, ref, ref1, ref2;
        this.FileName = FileName1;
        $('#DisableBackground').show();
        $('#pageLoader').show();
        arrObject = [];
        if (this._view._fabric._objects.length > 0) {
          ref = this._view._fabric._objects;
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            if (!obj.fill || obj.fill === 'undefined') {
              obj.fill = null;
            }
          }
          objList = this._view._fabric._objects;
          objList = JSON.parse(JSON.stringify(objList));
          objList = objList.filter((function(_this) {
            return function(item) {
              return item.newId !== 'grid';
            };
          })(this));
          arrObject.push(window.csvName);
          arrObject.push('{"objects":' + JSON.stringify(objList) + '}');
          ref1 = this._model._data.objects;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            item = ref1[j];
            item._model._data._canvas = null;
            if (item._model._data.propertyMappings.length > 0) {
              ref2 = item._model._data.propertyMappings;
              for (k = 0, len2 = ref2.length; k < len2; k++) {
                object = ref2[k];
                object._canvas = null;
                arrObject.push(item._model._data);
              }
            }
          }
          apiData = {
            filename: this.FileName,
            filecontent: JSON.stringify(arrObject),
            UserId: window.currentUserId
          };
          $('#DisableBackground').show();
          if ($("#chkIsDownload").prop('checked')) {
            this.downloadCSVFile(arrObject);
          }
          return $.post(window.APIURL + 'CheckFile', apiData, function(data) {
            $('#DisableBackground').hide();
            $('#pageLoader').hide();
            if (data === "True") {
              return alert("Sketch saved successfully.");
            } else if (confirm("File already exist are you sure you want to rewrite it")) {
              $('#DisableBackground').show();
              $('#pageLoader').show();
              return $.post(window.APIURL + 'Save', apiData, function(data) {
                $('#DisableBackground').hide();
                $('#pageLoader').hide();
                return alert("Sketch saved successfully.");
              });
            }
          });
        } else {
          return alert("Sketch cannot be blank");
        }
      };


      /**
         * Function for saving canvas  to local storage.
         * @param {callback} callback function.
       */

      DSCanvas.prototype.saveCanvasToLocal = function(callback) {
        var arrObject, i, item, j, k, len, len1, len2, obj, objList, object, ref, ref1, ref2;
        arrObject = [];
        if (this._view._fabric._objects.length > 0) {
          ref = this._view._fabric._objects;
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            if (!obj.fill || obj.fill === 'undefined') {
              obj.fill = null;
            }
          }
          objList = this._view._fabric._objects;
          objList = JSON.parse(JSON.stringify(objList));
          objList = objList.filter((function(_this) {
            return function(item) {
              return item.newId !== 'grid';
            };
          })(this));
          arrObject.push(window.csvName);
          arrObject.push('{"objects":' + JSON.stringify(objList) + '}');
          ref1 = this._model._data.objects;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            item = ref1[j];
            item._model._data._canvas = null;
            if (item._model._data.propertyMappings.length > 0) {
              ref2 = item._model._data.propertyMappings;
              for (k = 0, len2 = ref2.length; k < len2; k++) {
                object = ref2[k];
                object._canvas = null;
                arrObject.push(item._model._data);
              }
            }
          }
          localStorage.setItem('SaveCanvasToLocal', JSON.stringify(arrObject));
        }
        return callback();
      };


      /**
         * Function for download the canvas file.
         * @param {arrObject} content of canvas.
       */

      DSCanvas.prototype.downloadCSVFile = function(arrObject) {
        var a, objJsonB64;
        objJsonB64 = Base64.encode(JSON.stringify(arrObject));
        a = $("<a>").attr("href", "data:application/octet-stream;charset=utf-16le;base64," + objJsonB64).attr("download", this.FileName + ".txt").appendTo("body");
        a[0].click();
        return a.remove();
      };


      /**
         * Function for change the origin of an object.
         * @param {originX} origin selected value.
         * @param {originY} origin selected value.
       */

      DSCanvas.prototype.updateObjectOrigin = function(originX, originY, isMultiObject) {
        var activeObj, activeObjectsId, i, j, k, len, len1, len2, newPoint, obj, object, objectSummary, pathObj, point, ref, ref1, results;
        activeObj = null;
        activeObjectsId = [];
        if (isMultiObject) {
          ref = this._view._fabric._activeGroup._objects;
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            activeObjectsId.push(obj.id);
          }
          this._view.removeSelectionOnSave();
          results = [];
          for (j = 0, len1 = activeObjectsId.length; j < len1; j++) {
            object = activeObjectsId[j];
            pathObj = this._model._data.objects.filter((function(_this) {
              return function(data) {
                return data._view._fabric.id === object;
              };
            })(this));
            point = pathObj[0]._view._fabric.getPointByOrigin(obj.originX, obj.originY);
            newPoint = pathObj[0]._view._fabric.translateToGivenOrigin(point, obj.originX, obj.originY, originX, originY);
            pathObj[0]._view._fabric.originX = originX;
            pathObj[0]._view._fabric.originY = originY;
            results.push(pathObj[0].setPosition({
              x: newPoint.x,
              y: newPoint.y
            }));
          }
          return results;
        } else {
          if (this._view._fabric._activeGroup) {
            ref1 = this._view._fabric._objects;
            for (k = 0, len2 = ref1.length; k < len2; k++) {
              obj = ref1[k];
              point = obj.getPointByOrigin(obj.originX, obj.originY);
              newPoint = obj.translateToGivenOrigin(point, obj.originX, obj.originY, originX, originY);
              obj.originX = originX;
              obj.originY = originY;
              this._view.setObjectPosition(newPoint.x, newPoint.y);
            }
            activeObj = this._view._fabric._activeGroup;
          } else if (this._view._fabric._activeObject) {
            activeObj = this._view._fabric._activeObject;
            point = activeObj.getPointByOrigin(activeObj.originX, activeObj.originY);
            newPoint = activeObj.translateToGivenOrigin(point, activeObj.originX, activeObj.originY, originX, originY);
            activeObj.originX = originX;
            activeObj.originY = originY;
            this._view.setObjectPosition(newPoint.x, newPoint.y);
          }
          ObjectSummary(objectSummary = new ObjectSummary);
          objectSummary.ObjectProperty(activeObj);
          return this.dryRender();
        }
      };


      /**
         * Function for show and hide the save canvas modal.
       */

      DSCanvas.prototype.saveObject = function() {
        var _this;
        _this = this;
        this._view.removeSelectionOnSave();
        if (parent.getCurrentUserId() > 0) {
          return $('#SaveCanvasModal').modal('show');
        } else {
          return _this.saveCanvasToLocal(_this.reloadCurrentPage);
        }
      };

      DSCanvas.prototype.reloadCurrentPage = function() {
        if (window.location.host.includes("localhost")) {
          return window.parent.open("http://localhost/DataSketch.Web/Account/Login?returnUrl=DataSketch/Index", "_self");
        } else {
          return window.parent.open("http://180.211.103.172:8070/Account/Login?returnUrl=DataSketch/Index", "_self");
        }
      };


      /**
         * Function for creating the new file or reset canvas.
       */

      DSCanvas.prototype.createNewFile = function() {
        return this._model.set('objects', []);
      };


      /**
         * Function for load the sketch from database.
         * @param {UserId} id of an user.
         * @param {FileName} the name of sketch.
       */

      DSCanvas.prototype.loadFromQueryString = function(UserId, FileName) {
        if (this._model._data.objects.length === 0) {
          return this.getSketchFromDbQueryString(parseInt(UserId), FileName);
        } else {
          while (this._model._data.objects.length > 0) {
            this._model.removeObjects(this._model._data.objects, false);
            this._model.removeObject(this._model._data.objects, false);
          }
          return this.getSketchFromDbQueryString(parseInt(UserId), FileName);
        }
      };


      /**
         * Function for load the sketch from database.
         * @param {UserId} id of an user.
         * @param {FileName} the name of sketch.
       */

      DSCanvas.prototype.getSketchFromDbQueryString = function(UserId, FileName) {
        var _this, model, view;
        view = this._view;
        model = this._model;
        _this = this;
        if (this._model._data.objects.length === 0 && UserId !== (0/0) && FileName !== '') {
          return $.get(window.APIURL + 'GetSketch?UserId=' + UserId + '&SketchName=' + FileName, function(data) {
            var e;
            try {
              if (data.indexOf('<html') > 0) {
                if (window.location.host.includes("localhost")) {
                  return window.parent.open("http://localhost/DataSketch.Web/Account/Login?returnUrl=DataSketch/Index", "_self");
                } else {
                  return window.parent.open("http://180.211.103.172:8070/Account/Login?returnUrl=DataSketch/Index", "_self");
                }
              } else {
                view.loadFromJson(data);
                $('.tool.snapgrid-1').removeClass("active");
                $('#DisableBackground').hide();
                $('#pageLoader').hide();
                if (model && model._data.objects.length > 0) {
                  _this.disableControls();
                  return window.isViewMode = 1;
                }
              }
            } catch (error) {
              e = error;
              if (window.location.host.includes("localhost")) {
                return window.parent.open("http://localhost/DataSketch.Web/Account/Login?returnUrl=DataSketch/Index", "_self");
              } else {
                return window.parent.open("http://180.211.103.172:8070/Account/Login?returnUrl=DataSketch/Index", "_self");
              }
            }
          });
        }
      };


      /**
         * Function for load the sketch from database.
         * @param {FileName} name of sketch.
       */

      DSCanvas.prototype.loadFromDb = function(FileName) {
        if (this._model._data.objects.length === 0) {
          return this.getSketchFromDb(window.currentUserId, FileName);
        } else {
          while (this._model._data.objects.length > 0) {
            this._model.removeObjects(this._model._data.objects, false);
            this._model.removeObject(this._model._data.objects, false);
          }
          return this.getSketchFromDb(window.currentUserId, FileName);
        }
      };


      /**
         * Function for load the sketch from database.
         * @param {UserId} id of an user.
         * @param {FileName} the name of sketch.
       */

      DSCanvas.prototype.getSketchFromDb = function(userId, FileName) {
        var view;
        view = this._view;
        if (this._model._data.objects.length === 0) {
          return $.get(window.APIURL + 'GetSketch?UserId=' + userId + '&SketchName=' + FileName, function(data) {
            view.loadFromJson(data);
            $('.tool.snapgrid-1').removeClass("active");
            $('#DisableBackground').hide();
            $('#pageLoader').hide();
            if (this._model) {
              if (this._model._data.objects.length > 0) {
                return $('.tool.SaveCanvas').show();
              }
            }
          });
        }
      };


      /**
         * Function for load the sketch from file data.
         * @param {FileData} canvas data.
       */

      DSCanvas.prototype.loadFromFile = function(FileData) {
        var results;
        if (this._model._data.objects.length === 0) {
          return this.getSketchFromFile(FileData);
        } else {
          results = [];
          while (this._model._data.objects.length > 0) {
            this._model.removeObject(this._model._data.objects[0], false);
            if (this._model._data.objects.length === 0) {
              this.getSketchFromFile(FileData);
              break;
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      };


      /**
         * Function for load the sketch from file data.
         * @param {FileData} canvas data.
       */

      DSCanvas.prototype.getSketchFromFile = function(FileData) {
        this._view.loadFromJson(FileData);
        $('.tool.snapgrid-1').removeClass("active");
        $('#DisableBackground').hide();
        $('#pageLoader').hide();
        if (this._model) {
          if (this._model._data.objects.length > 0) {
            return $('.tool.SaveCanvas').show();
          }
        }
      };


      /**
         * Function for show the load modal.
       */

      DSCanvas.prototype.showLoadModal = function() {
        this._view.removeSelectionOnSave();
        $('#DisableBackground').show();
        $('#pageLoader').show();
        return this._view.bindSketchList();
      };


      /**
         * Function for get the path object from canvas.
         * @return {list} list of path objects.
       */

      DSCanvas.prototype.getObjects = function() {
        return this._model.get('objects');
      };


      /**
         * Function for get the path object from canvas.
         * @return {list} list of path objects.
       */

      DSCanvas.prototype.getMode = function() {
        return this._model.get('mode');
      };


      /**
         * Function for set the mode of canvas.
       */

      DSCanvas.prototype.setMode = function(mode) {
        return this._model.set('mode', mode);
      };


      /**
         * Function for get the stroke width of an active object.
         * @return {number} stroke width of an object.
       */

      DSCanvas.prototype.getStrokeWidth = function() {
        return this._model.get('strokeWidth');
      };


      /**
         * Function for set the stroke width of an active object.
       */

      DSCanvas.prototype.setStrokeWidth = function(width) {
        var i, len, obj, ref;
        if (this._model.get('selected')) {
          ref = this._model.get('selected');
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            obj.setStrokeWidth(width);
          }
        }
        return this._model.set('strokeWidth', width);
      };


      /**
         * Function for get the stroke color of an active object.
         * @return {string} color code of an stroke.
       */

      DSCanvas.prototype.getStrokeColor = function() {
        return this._model.get('strokeColor');
      };


      /**
         * Function for update the stroke color of an active object.
         * @param {color} color code for an stroke.
       */

      DSCanvas.prototype.setStrokeColor = function(color) {
        var i, len, obj, ref;
        if (this._model.get('selected')) {
          ref = this._model.get('selected');
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            obj.setStrokeColor(color);
          }
          this.dryRender();
        }
        if (color[0].id === "color-fill") {
          return this._model.set('fillColor', color[1]);
        } else {
          return this._model.set('strokeColor', color[1]);
        }
      };


      /**
         * Function for getting active group or objects on canvas.
         * @return {object} active object on canvas.
       */

      DSCanvas.prototype.getSelectedObjects = function() {
        return this._model.get('selected');
      };


      /**
         * Function  for getting active group or objects fabric class object.
         * @return {object} active object fabric on canvas.
       */

      DSCanvas.prototype.getSelectedFabric = function() {
        return this.getSelectedObjects()[0].view().getFabric();
      };


      /**
         * Function  for set the object active.
         * @param {objects} list of object.
       */

      DSCanvas.prototype.selectObjects = function(objects) {
        var obj, objectIds;
        objectIds = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = objects.length; i < len; i++) {
            obj = objects[i];
            results.push(obj.getId());
          }
          return results;
        })();
        return this._model.set('selected', (function() {
          var i, len, ref, ref1, results;
          ref = this._model.getActiveObjects();
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            if (ref1 = obj.getId(), indexOf.call(objectIds, ref1) >= 0) {
              results.push(obj);
            }
          }
          return results;
        }).call(this));
      };


      /**
         * Function  for adding object to canvas
         * @param {object} fabric object.
       */

      DSCanvas.prototype.addObject = function(object, silent) {
        if (silent == null) {
          silent = false;
        }
        return this._model.addObject(object, silent);
      };


      /**
         * Function  for adding objects to canvas
         * @param {objects} fabric object list.
       */

      DSCanvas.prototype.addObjects = function(objects) {
        this._model.addObjects(objects);
        return this.addObject(objects);
      };


      /**
         * Function  for adding objects to canvas in stamping mode.
         * @param {object} path object.
       */

      DSCanvas.prototype.addStampingObjects = function(object) {
        return this.addObject(object);
      };


      /**
         * Function for adding the custom shape to canvas.
         * @param {shapeId} custom shape id.
       */

      DSCanvas.prototype.addShape = function(shapeId) {
        return this._view.addShape(shapeId);
      };


      /**
         * Function for changing the grid size on canvas.
         * @param {@value} grid size.
       */

      DSCanvas.prototype.manageGrid = function(value1) {
        var gridSize, obj;
        this.value = value1;
        this._view.changeGridSize(this.value);
        gridSize = parseInt(this.value);
        window.gridSize = gridSize;
        if (gridSize > 0) {
          window.gridActive = true;
          obj = new ObjectBase;
          obj.onclickofcanvas(1, gridSize);
          return window.gridSize = gridSize;
        } else {
          window.gridActive = false;
          return this.removeGrid();
        }
      };


      /**
         * Function for adding grid to canvas and enable the grid mode.
       */

      DSCanvas.prototype.snapToGrid = function() {
        var obj;
        obj = new ObjectBase;
        obj.onclickofcanvas(1);
        return this._view.addGrid();
      };


      /**
         * Function for remove grid to canvas and disable the grid mode.
       */

      DSCanvas.prototype.removeGrid = function() {
        var obj;
        obj = new ObjectBase;
        obj.onclickofcanvas(0);
        return this._view.removeGrid();
      };

      window.IsolationMode = false;


      /**
         * Function for delete the object from canvas.
         * @param {object} path object.
       */

      DSCanvas.prototype.deleteObject = function(object) {
        if (window.IsolationMode === false) {
          if (object.length > 0) {
            if (confirm`Are you sure you want to delete it?`) {
              this._model.removeObject(object);
              return this._model.removeObjects(object);
            }
          }
        } else {
          return alert("Please exit isolation mode for performing delete operation on object.");
        }
      };


      /**
         * Function for delete the object from canvas.
         * @param {object} path object.
       */

      DSCanvas.prototype.removeObject = function(object) {
        return this._model.removeObject(object);
      };


      /**
         * Function for delete the objects from canvas.
         * @param {object} path object.
       */

      DSCanvas.prototype.removeObjects = function(objects) {
        return this._model.removeObjects(objects);
      };


      /**
         * Function for delete the active object from canvas.
       */

      DSCanvas.prototype.removeSelected = function() {
        return this._model.removeSelected();
      };


      /**
         * Function for creating group of object from canvas.
         * @param {objects} list of an objects.
       */

      DSCanvas.prototype.createGroup = function(objects) {
        var group, groupObjects, i, len, obj;
        this._view.clearSelection();
        if (objects == null) {
          objects = this._model.get('selected');
        }
        if (objects == null) {
          return null;
        }
        for (i = 0, len = objects.length; i < len; i++) {
          obj = objects[i];
          obj.extractTransform();
        }
        groupObjects = objects;
        this.removeObjects(objects);
        group = Group.createFromObjects(groupObjects);
        this.addObject(group);
        return group;
      };


      /**
         * Function for break the active group from canvas.
         * @param {group} group object.
       */

      DSCanvas.prototype.breakGroup = function(group) {
        var i, len, obj, objects;
        objects = group["break"]();
        this.removeObject(group);
        for (i = 0, len = objects.length; i < len; i++) {
          obj = objects[i];
          this.addObject(obj);
          obj.enforceTransform();
          obj.enableControls();
        }
        this.render();
        return group.getObjects();
      };


      /**
         * Function for enable and disable the isolate mode of an active group.
         * @param {group} group object.
       */

      DSCanvas.prototype.isolate = function(group) {
        if (group) {
          document.getElementById('shape').style.pointerEvents = 'none';
          window.IsolationMode = true;
        } else {
          document.getElementById('shape').style.pointerEvents = 'auto';
          window.IsolationMode = false;
        }
        this._model.isolate(group);
        return this.render();
      };


      /**
         * Function for enforce the transform of an active object.
       */

      DSCanvas.prototype.enforceTransform = function() {
        var path;
        Path(path = new Path());
        return path.enforceTransform();
      };


      /**
         * Function for getting the isolation of an active group.
         * @return {string} isolation mode.
       */

      DSCanvas.prototype.getIsolation = function() {
        return this._model.get('isolated');
      };


      /**
         * Function for set the isolation of an group object.
         * @param {isolation} boolean value.
       */

      DSCanvas.prototype.setIsolation = function(isolation) {
        return this._model.set('isolated', isolation);
      };


      /**
         * Function got executed when the mode got change on the canvas.
         * @param {evt} event object.
       */

      DSCanvas.prototype._onModelChange = function(evt) {
        switch (evt.data.path) {
          case "strokeWidth":
            return this.dispatchEvent("Canvas.StrokeWidthChange", {
              width: evt.data.value
            });
          case "mode":
            return this.dispatchEvent("Canvas.ModeChange", {
              mode: evt.data.value,
              last: evt.data.old
            });
          case "strokeColor":
            return this.dispatchEvent("Canvas.StrokeColorChange", {
              color: evt.data.value
            });
          case "fillColor":
            return this.dispatchEvent("Canvas.FillColorChange", {
              color: evt.data.value
            });
          case "isolated":
          case "selected":
            return this._manageContextMenu();
          case "objects":
            return this.render();
        }
      };


      /**
         * Function for manage context menu according to the type of an selected object.
       */

      DSCanvas.prototype._manageContextMenu = function() {
        return Globals.get('Relay').dispatchEvent('ContextMenu.ContextChange', {
          context: {
            selection: this._model.get('selected'),
            isolation: this._model.get('isolated')
          }
        });
      };


      /**
         * Function got executed when the on path created event got triggered.
         * @param {evt} event object.
       */

      DSCanvas.prototype._onPathCreated = function(evt) {
        var path;
        path = Path.createFromFabric(evt.data.path);
        return this._model.addObject(path, true);
      };


      /**
         * Function got executed when the on selection event got triggered.
         * @param {evt} event object.
       */

      DSCanvas.prototype._onSelectionCreated = function(evt) {
        var color, colorAction, currentTarget, i, len, obj, ref, strokeaction;
        if (this._model.getActiveObjects().length > 1) {
          $('#stamping').hide();
        }
        if (($("#CalibrationAndManipulationModal").data('bs.modal') || {}).isShown) {
          $('#manipulationandcalibrationproperty').hide();
        }
        this.selectObjects((function() {
          var i, len, ref, ref1, results;
          ref = this._model.getActiveObjects();
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            if (ref1 = obj.getId(), indexOf.call(evt.data.objectIds, ref1) >= 0) {
              results.push(obj);
            }
          }
          return results;
        }).call(this));
        currentTarget = evt.currentTarget._fabric._activeObject ? evt.currentTarget._fabric._activeObject : evt.currentTarget._fabric.relatedTarget;
        root.LastActiveObject = currentTarget;
        if (evt.data.objectIds.length === 1 && (currentTarget.type === "line" || currentTarget.type !== "group")) {
          if ($('#Stroke').length > 0 && $('#Fill').length > 0) {
            color = [];
            color.push({
              "id": 'color-stroke'
            });
            color.push(currentTarget.stroke);
            colorAction = new ColorAction(this, color, 'color-stroke');
            colorAction.execute();
            color = currentTarget.stroke;
            $('#Stroke').next()[0].jscolor.fromString(color);
            strokeaction = new StrokeAction(this, currentTarget.strokeWidth);
            strokeaction.execute();
            if (currentTarget.fill) {
              color = [];
              color.push({
                "id": 'color-fill'
              });
              color.push(currentTarget.fill);
              colorAction = new ColorAction(this, color, 'color-fill');
              colorAction.execute();
              color = currentTarget.fill;
              $('#Fill').next()[0].jscolor.fromString(color);
            }
          }
        }
        window.activeObjectsId = [];
        if (this._model._data.selected.length > 1) {
          ref = this._view._fabric._activeGroup._objects;
          for (i = 0, len = ref.length; i < len; i++) {
            obj = ref[i];
            window.activeObjectsId.push(obj.id);
          }
        }
        return this.objectSummaryUpdate(evt);
      };


      /**
         * Function got executed when any object property got modified.
         * @param {evt} event object.
       */

      DSCanvas.prototype._onSelectionScaling = function(evt) {
        var activeObject;
        if (($("#CalibrationAndManipulationModal").data('bs.modal') || {}).isShown) {
          activeObject = evt.currentTarget._fabric._activeObject;
          switch (root.objectCalibrationProperty) {
            case "X":
              this.setMinMax(activeObject.left);
              break;
            case "Y":
              this.setMinMax(activeObject.top);
              break;
            case "Height":
              this.setMinMax(activeObject.scaleY);
              break;
            case "Width":
              this.setMinMax(activeObject.scaleX);
              break;
            case "Rotation":
              this.setMinMax(activeObject.angle);
          }
        }
        return this.objectSummaryUpdate(evt);
      };


      /**
         * Function for set the range of input slider in calibration module.
         * @param {value} max property value.
       */

      DSCanvas.prototype.setMinMax = function(value) {
        switch (root.objectCalibrationProperty) {
          case "X":
          case "Y":
          case "Rotation":
            if ($('#minValue').prop('checked')) {
              $('#minRangeInput').val(value);
              return $('#minInput').html(parseInt(value));
            } else {
              $('#maxRangeInput').val(value);
              return $('#maxInput').html(parseInt(value));
            }
            break;
          case "Height":
          case "Width":
            if ($('#minValue').prop('checked')) {
              $('#minRangeInput').val(value);
              return $('#minInput').html(value.toFixed(1));
            } else {
              $('#maxRangeInput').val(value);
              return $('#maxInput').html(value.toFixed(1));
            }
        }
      };


      /**
         * Function got executed when on selection event got triggered.
         * @param {evt} event object.
       */

      DSCanvas.prototype._onSelectionCleared = function(evt) {
        if (($("#CalibrationAndManipulationModal").data('bs.modal') || {}).isShown) {
          this.applyOriginalProperty();
        }
        this.selectObjects([]);
        $('#ObjectProperties').hide();
        $('.menu-item.parent').hide();
        return $('#CalibrationAndManipulationModal').modal('hide');
      };


      /**
         * Function for intializing the canvas.
       */

      DSCanvas.prototype.initCanvas = function() {
        return this._view.initCanvas(this._model);
      };


      /**
         * Function for disable the model.
       */

      DSCanvas.prototype.disable = function() {
        return this._model.disable();
      };


      /**
         * Function for enable the model.
       */

      DSCanvas.prototype.enable = function() {
        return this._model.enable();
      };


      /**
         * Function for diable the controls.
       */

      DSCanvas.prototype.disableControls = function() {
        return this._model.disableControls();
      };


      /**
         * Function for enable the controls.
       */

      DSCanvas.prototype.enableControls = function() {
        return this._model.enableControls();
      };


      /**
         * Function for showing the object property on bottom right.
         * @param {evt} event object.
       */

      DSCanvas.prototype.objectSummaryUpdate = function(evt) {
        var activeObject, objectSummary;
        activeObject = evt.currentTarget._fabric._activeObject;
        if (activeObject) {
          ObjectSummary(objectSummary = new ObjectSummary);
          return objectSummary.ObjectProperty(activeObject);
        }
      };

      return DSCanvas;

    })(Controller);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/canvas/canvas.js.map
