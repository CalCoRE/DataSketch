(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(function(require) {
    var $, AnimationObject, DSCanvasView, DataPropertyAction, DomView, Fabric, Globals, Group, HM, MappingAssignmentAction, Model, ObjectProperty, Path, PropertyMap, Template;
    require('link!./style.css');
    $ = require('jquery');
    Fabric = require('thirdparty/fabric');
    DomView = require('core/view/dom_view');
    Globals = require('core/model/globals');
    HM = require('core/event/hook_manager');
    Model = require('./model');
    Template = require('text!./view.html');
    Path = require('./objects/path/object');
    Group = require('./objects/group/object');
    PropertyMap = require('modules/datasketch/animation/property_map');
    DataPropertyAction = require('modules/datasketch/data/module');
    AnimationObject = require('modules/datasketch/animation/animator');
    ObjectProperty = require('modules/datasketch/canvas/objects/base/object');
    MappingAssignmentAction = require('modules/datasketch/actions/mapping_assignment');
    return DSCanvasView = (function(superClass) {
      var root;

      extend(DSCanvasView, superClass);


      /**
         * Funtion to initialize model class.
         * @param {model} Instance of model.
       */

      function DSCanvasView(model) {
        this.deleteObject = bind(this.deleteObject, this);
        this.addObject = bind(this.addObject, this);
        this._onObjectsAdded = bind(this._onObjectsAdded, this);
        this._onObjectsRemoved = bind(this._onObjectsRemoved, this);
        this._onObjectAdded = bind(this._onObjectAdded, this);
        this._onObjectRemoved = bind(this._onObjectRemoved, this);
        this._onChangeMode = bind(this._onChangeMode, this);
        this._onChange = bind(this._onChange, this);
        this.clearSelection = bind(this.clearSelection, this);
        this.updateDimensions = bind(this.updateDimensions, this);
        this._onObjectSelected = bind(this._onObjectSelected, this);
        this.setObjectAnimation = bind(this.setObjectAnimation, this);
        this._onSelectionCleared = bind(this._onSelectionCleared, this);
        this.selectionCleared = bind(this.selectionCleared, this);
        this.inActiveObject = bind(this.inActiveObject, this);
        this._onSelectionModified = bind(this._onSelectionModified, this);
        this._beforeSelectionCleared = bind(this._beforeSelectionCleared, this);
        this._onSelectionCreated = bind(this._onSelectionCreated, this);
        this._onObjectScaling = bind(this._onObjectScaling, this);
        this._onMouseUp = bind(this._onMouseUp, this);
        this.enableDisableSaveButton = bind(this.enableDisableSaveButton, this);
        this._onPathCreated = bind(this._onPathCreated, this);
        this._renderObjects = bind(this._renderObjects, this);
        this.keyRemover = bind(this.keyRemover, this);
        this.setObjectPosition = bind(this.setObjectPosition, this);
        this.getRandomInt = bind(this.getRandomInt, this);
        this.getRandomColor = bind(this.getRandomColor, this);
        this.getRandomLeftTop = bind(this.getRandomLeftTop, this);
        this.addShape = bind(this.addShape, this);
        this.addGrid = bind(this.addGrid, this);
        this.overlayOfAnObject = bind(this.overlayOfAnObject, this);
        this.changeGridSize = bind(this.changeGridSize, this);
        this.removeGrid = bind(this.removeGrid, this);
        this.removeSelectionOnSave = bind(this.removeSelectionOnSave, this);
        this.dryRender = bind(this.dryRender, this);
        this.bindSketchList = bind(this.bindSketchList, this);
        this.getAllSingleObjects = bind(this.getAllSingleObjects, this);
        this.getAllAnimationObjects = bind(this.getAllAnimationObjects, this);
        this.disableLoader = bind(this.disableLoader, this);
        this.applyAnimation = bind(this.applyAnimation, this);
        this.createAllNestedGroup = bind(this.createAllNestedGroup, this);
        this.callbackFunction = bind(this.callbackFunction, this);
        this.loadFromJson = bind(this.loadFromJson, this);
        this.getAvailableProperty = bind(this.getAvailableProperty, this);
        this.deleteCurrentProperty = bind(this.deleteCurrentProperty, this);
        this.getObjectProperty = bind(this.getObjectProperty, this);
        this.render = bind(this.render, this);
        this.decodeUriComponent = bind(this.decodeUriComponent, this);
        this.initCanvas = bind(this.initCanvas, this);
        DSCanvasView.__super__.constructor.call(this, Template);
        this._model = model;
        model.addEventListener('Model.Change', this._onChange);
        model.addEventListener('Canvas.ObjectRemoved', this._onObjectRemoved);
        model.addEventListener('Canvas.ObjectAdded', this._onObjectAdded);
        model.addEventListener('Canvas.ObjectsRemoved', this._onObjectsRemoved);
        model.addEventListener('Canvas.ObjectsAdded', this._onObjectsAdded);
        model.addEventListener('Canvas.ObjectsAdded', this._onObjectsAdded);
      }


      /**
         * Funtion to create canvas and initialize the fabric js events and key press events and also for loadig sketch from local storage.
         * @param {model} Instance of model.
       */

      DSCanvasView.prototype.initCanvas = function(model) {
        var _this, fileData;
        window.isViewMode = 0;
        this._fabric = new Fabric.Canvas(this.$el.find('.canvas-main')[0], {
          renderOnAddRemove: false
        });
        this._fabric.isDrawingMode = true;
        this._fabric.on('path:created', this._onPathCreated);
        this._fabric.on('object:selected', this._onObjectSelected);
        this._fabric.on('object:scaling', this._onObjectScaling);
        this._fabric.on('object:moving', this._onObjectScaling);
        this._fabric.on('object:rotating', this._onObjectScaling);
        this._fabric.on('mouse:up', this._onMouseUp);
        this._fabric.on('selection:created', this._onSelectionCreated);
        this._fabric.on('before:selection:cleared', this._beforeSelectionCleared);
        this._fabric.on('selection:cleared', this._onSelectionCleared);
        Globals.get('Relay').addEventListener('Window.Resize', this.updateDimensions);
        this.updateDimensions();
        fileData = localStorage.getItem('SaveCanvasToLocal');
        if (this.decodeUriComponent('id') !== null && this.decodeUriComponent('sketchName') !== null && this.decodeUriComponent('mode') !== null) {
          window.currentSketchMode = this.decodeUriComponent('mode');
          Globals.get('Canvas').loadFromQueryString(this.decodeUriComponent('id'), this.decodeUriComponent('sketchName'));
        }
        if (fileData !== null && fileData !== '') {
          this.loadFromJson(fileData);
          localStorage.removeItem('SaveCanvasToLocal');
        }
        _this = this;
        return $(window).on('keydown', function(e) {
          return _this.keyRemover(e);
        });
      };


      /**
         * Function for parsing query string or url.
         * @param {name} query string key value.
         * @param {url} url.
         * @return {string} query string value.
       */

      DSCanvasView.prototype.decodeUriComponent = function(name, url) {
        var regex, results;
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        results = regex.exec(url);
        if (!results) {
          return null;
        }
        if (!results[2]) {
          return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
      };


      /**
         * Function for rendering object on canvas.
         * @param {model} Instance of model.
       */

      DSCanvasView.prototype.render = function(model) {
        if (this._fabric != null) {
          this._fabric.clear();
          this._renderObjects(model.get('objects'), model.get('isolated'));
          this._fabric.discardActiveGroup();
          return this._fabric.renderAll();
        }
      };

      root = typeof exports !== "undefined" && exports !== null ? exports : DSCanvasView;


      /**
         * Function for getting the object property from an object property array.
         * @param {propertyId} id of an animation property.
         * @return {Animation property} Animation property.
       */

      DSCanvasView.prototype.getObjectProperty = function(propertyId) {
        var objProperty;
        this._objectProperty = HM.invoke('DataMapping.ObjectProperties', []);
        propertyId = propertyId.substr(0, 1).toLowerCase() + propertyId.substr(1);
        window.objectPropertyId = propertyId;
        objProperty = this._objectProperty.filter((function(_this) {
          return function(data) {
            return data.getId() === propertyId;
          };
        })(this));
        return objProperty;
      };


      /**
         * Function for removing animation property from an active object.
       */

      DSCanvasView.prototype.deleteCurrentProperty = function() {
        return Globals.get('Canvas').getSelectedObjects()[0].removePropertyMapping(root.objectProperty);
      };


      /**
         * Function for getting the object animation property data.
         * @param {objProperty} animation property name.
       */

      DSCanvasView.prototype.getAvailableProperty = function(objProperty) {
        var CsvProperty, activeObject, colorCode, j, len, maxCalibration, maxInput, maxRangeInput, minCalibration, minInput, minRangeInput, obj, ref, results1;
        activeObject = Globals.get('Canvas').getSelectedObjects();
        if (activeObject[0].getPropertyMappings().length > 0) {
          ref = activeObject[0].getPropertyMappings();
          results1 = [];
          for (j = 0, len = ref.length; j < len; j++) {
            obj = ref[j];
            if (obj.objectProperty._model._data.id === objProperty) {
              root.objectProperty = obj.objectProperty;
              minCalibration = obj.calibration.min;
              maxCalibration = obj.calibration.max;
              minRangeInput = $('#minRangeInput');
              maxRangeInput = $('#maxRangeInput');
              minInput = $('#minInput');
              maxInput = $('#maxInput');
              if (objProperty === "transparency") {
                minInput.html(Math.round(eval(minCalibration * 100)));
                maxInput.html(Math.round(eval(maxCalibration * 100)));
                maxRangeInput.val(Math.round(eval(maxCalibration * 100)));
                minRangeInput.val(Math.round(eval(minCalibration * 100)));
                CsvProperty = obj.dataProperty._data.id;
                results1.push(document.getElementById('csvProperty').value = CsvProperty);
              } else if (objProperty === "color") {
                colorCode = minCalibration + "-" + maxCalibration;
                document.getElementById('colorProperty').value = colorCode;
                CsvProperty = obj.dataProperty._data.id;
                results1.push(document.getElementById('csvPropertyColor').value = CsvProperty);
              } else if (objProperty !== "stamping") {
                minInput.html(minCalibration);
                maxInput.html(maxCalibration);
                maxRangeInput.val(eval(maxCalibration));
                minRangeInput.val(eval(minCalibration));
                CsvProperty = obj.dataProperty._data.id;
                results1.push(document.getElementById('csvProperty').value = CsvProperty);
              } else {
                results1.push(void 0);
              }
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }
      };


      /**
         * Function for loading sketch from json and render it on the canvas.
         * @param {FileData} sketch file content.
       */

      DSCanvasView.prototype.loadFromJson = function(FileData) {
        var LoadedObjects, currentPathObject, dataPropertyAction, e, fabricObject, j, k, l, len, len1, len2, newPoint, obj, pathObj, pathObject, point, ref, ref1, results1, totalObj;
        window.currentId = 0;
        $('#pageLoader').show();
        $('#DisableBackground').show();
        $(".modeSelect-select").click();
        try {
          FileData = JSON.parse(FileData);
          if (FileData[0] !== window.csvName) {
            return alert`CSV Mismatched!`;
          } else {
            totalObj = JSON.parse(FileData[1]).objects.length;
            root.FileData = FileData[1];
            root.AnimationData = FileData;
            this._objectProperty = HM.invoke('DataMapping.ObjectProperties', []);
            this._dataProperty = HM.invoke('DataMapping.DataProperties', []);
            DataPropertyAction(dataPropertyAction = new DataPropertyAction());
            if (this._dataProperty.length === 0) {
              dataPropertyAction.initDataProperty();
              this._dataProperty = HM.invoke('DataMapping.DataProperties', []);
            }
            this._fabric.loadFromJSON(FileData[1], this.callbackFunction);
            ref = Globals.get('Canvas').getObjects();
            for (j = 0, len = ref.length; j < len; j++) {
              LoadedObjects = ref[j];
              if (LoadedObjects._view._fabric.type === 'group') {
                debugger;
                ref1 = JSON.parse(FileData[1]).objects;
                for (k = 0, len1 = ref1.length; k < len1; k++) {
                  fabricObject = ref1[k];
                  currentPathObject = this._model._data.objects.filter((function(_this) {
                    return function(data) {
                      return data.getId() === fabricObject.newId;
                    };
                  })(this));
                  currentPathObject[0]._view._fabric.originX = fabricObject.originX;
                  currentPathObject[0]._view._fabric.originY = fabricObject.originY;
                  point = currentPathObject[0]._view._fabric.getPointByOrigin(fabricObject.originX, fabricObject.originY);
                  newPoint = currentPathObject[0]._view._fabric.translateToGivenOrigin(point, currentPathObject[0]._view._fabric.originX, currentPathObject[0]._view._fabric.originY, fabricObject.originX, fabricObject.originY);
                  currentPathObject[0].setPosition({
                    x: newPoint.x,
                    y: newPoint.y
                  });
                }
              }
            }
            results1 = [];
            for (l = 0, len2 = FileData.length; l < len2; l++) {
              obj = FileData[l];
              if (FileData.indexOf(obj) > 1) {
                pathObject = pathObj = this._model._data.objects.filter((function(_this) {
                  return function(data) {
                    return data.getId() === obj.id;
                  };
                })(this));
                if (pathObject.length > 0) {
                  results1.push(pathObject[0]._model._data.isStamping = obj.isStamping);
                } else {
                  results1.push(void 0);
                }
              } else {
                results1.push(void 0);
              }
            }
            return results1;
          }
        } catch (error) {
          e = error;
          return alert("File is not supported or is invalid.");
        }
      };


      /**
         * Function executed after load from json execution got finish and convert fabric to pathobject.
       */

      DSCanvasView.prototype.callbackFunction = function() {
        var j, len, obj, pathObject, ref;
        this._fabric.renderAll.bind(this._fabric);
        root.finalGrpIds = [];
        root.allSingleObjects = [];
        root.arrGroupIds = [];
        root.allObjectsGroup = [];
        root.allAnimationObjGrp = [];
        this.getAllSingleObjects(this._fabric._objects);
        this.getAllAnimationObjects(root.AnimationData);
        ref = root.allSingleObjects;
        for (j = 0, len = ref.length; j < len; j++) {
          obj = ref[j];
          pathObject = Path.createFromFabric(obj);
          pathObject._model._data.id = obj.newId;
          pathObject._view._fabric.id = obj.newId;
          this._model.addObject(pathObject);
          root.allObjectsGroup.push(pathObject);
        }
        return this.createAllNestedGroup();
      };


      /**
         * Function got executed after callback function and it is for creating nested group of objects.
       */

      DSCanvasView.prototype.createAllNestedGroup = function() {
        var grpObj, ids, j, k, l, len, len1, len2, masterObject, objId, objects, pathObj, ref, ref1, ref2, results1;
        ref = root.arrGroupIds;
        for (j = 0, len = ref.length; j < len; j++) {
          ids = ref[j];
          objects = [];
          ref1 = ids.ids.split(',');
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            objId = ref1[k];
            pathObj = this._model._data.objects.filter((function(_this) {
              return function(data) {
                return data.getId() === eval(objId);
              };
            })(this));
            if (pathObj.length > 0) {
              objects.push(pathObj[0]);
            }
          }
          if (objects.length === ids.ids.split(',').length) {
            if (window.currentId < ids.gid) {
              window.currentId = ids.gid;
            }
            masterObject = Globals.get('Canvas').createGroup(objects);
            masterObject._model._data.id = ids.gid;
            masterObject._view._fabric.id = ids.gid;
            masterObject.setPosition({
              x: ids.gleft,
              y: ids.gtop
            });
            masterObject.setScale({
              x: ids.gscaleX,
              y: ids.gscaleY
            });
            root.finalGrpIds.push(ids.gid);
            root.allObjectsGroup.push(masterObject);
          }
        }
        if (root.arrGroupIds.length > 0) {
          ref2 = root.arrGroupIds;
          results1 = [];
          for (l = 0, len2 = ref2.length; l < len2; l++) {
            ids = ref2[l];
            grpObj = root.finalGrpIds.filter((function(_this) {
              return function(data) {
                return data === eval(ids.gid);
              };
            })(this));
            if (grpObj.length === 0) {
              this.createAllNestedGroup();
              break;
            }
            if (root.arrGroupIds.indexOf(ids) === root.arrGroupIds.length - 1) {
              this.render(this._model);
              results1.push(this.applyAnimation());
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        } else {
          return this.applyAnimation();
        }
      };


      /**
         * Function got executed after create all nested group and for applying animation to an objects.
       */

      DSCanvasView.prototype.applyAnimation = function() {
        var animationItem, dataProperty, isBreak, j, k, len, len1, obj, objProperty, pathObj, ref, ref1;
        $('#DisableBackground').hide();
        $('#pageLoader').hide();
        ref = root.allAnimationObjGrp;
        for (j = 0, len = ref.length; j < len; j++) {
          obj = ref[j];
          isBreak = false;
          pathObj = root.allObjectsGroup.filter((function(_this) {
            return function(data) {
              return data.getId() === obj.id;
            };
          })(this));
          if (pathObj.length > 0) {
            ref1 = obj.propertyMappings;
            for (k = 0, len1 = ref1.length; k < len1; k++) {
              animationItem = ref1[k];
              objProperty = this._objectProperty.filter((function(_this) {
                return function(data) {
                  return data.getId() === animationItem.objectProperty._model._data.id;
                };
              })(this));
              dataProperty = this._dataProperty.filter((function(_this) {
                return function(data) {
                  return data.getId() === animationItem.dataProperty._data.id;
                };
              })(this));
              if (dataProperty.length === 0) {
                Globals.get('Canvas').createNewFile();
                alert("CSV Mismatched!");
                isBreak = true;
                break;
              }
              this._map = new PropertyMap({
                objectProperty: objProperty[0],
                dataProperty: dataProperty[0],
                calibration: animationItem.calibration
              });
              pathObj[0].addPropertyMapping(this._map);
            }
            if (isBreak) {
              break;
            }
          }
        }
        return setTimeout(this.disableLoader, 15000);
      };


      /**
         * Function for remove the loader and backdrop from canvas and render it.
       */

      DSCanvasView.prototype.disableLoader = function() {
        $('#pageLoader').hide();
        $('#DisableBackground').hide();
        return this.render(this._model);
      };


      /**
         * Function for getting the object which are applied an animation on it.
         * @param {allObjects} list of path objects.
       */

      DSCanvasView.prototype.getAllAnimationObjects = function(allObjects) {
        var j, len, obj, propertyMappings, results1;
        results1 = [];
        for (j = 0, len = allObjects.length; j < len; j++) {
          obj = allObjects[j];
          propertyMappings = {};
          if (obj.propertyMappings && obj.propertyMappings.length > 0) {
            propertyMappings["id"] = obj.id;
            propertyMappings["propertyMappings"] = obj.propertyMappings;
            root.allAnimationObjGrp.push(propertyMappings);
          }
          if (obj.children && obj.children.length > 0) {
            this.getAllAnimationObjects(obj.children);
          }
          if (obj._model && obj._model._data.propertyMappings && obj._model._data.propertyMappings.length > 0) {
            propertyMappings = {};
            propertyMappings["id"] = obj._model._data.id;
            propertyMappings["propertyMappings"] = obj._model._data.propertyMappings;
            root.allAnimationObjGrp.push(propertyMappings);
          }
          if (obj._model && obj._model._data.children && obj._model._data.children.length > 0) {
            results1.push(this.getAllAnimationObjects(obj._model._data.children));
          } else {
            results1.push(void 0);
          }
        }
        return results1;
      };


      /**
         * Function for getting the single object in path object list.
         * @param {allObjects} list of path objects.
       */

      DSCanvasView.prototype.getAllSingleObjects = function(allObjects) {
        var groupIds, ids, j, len, obj, results1;
        results1 = [];
        for (j = 0, len = allObjects.length; j < len; j++) {
          obj = allObjects[j];
          if (obj.type === 'group') {
            groupIds = {};
            groupIds["gid"] = obj.newId;
            groupIds["gtop"] = obj.top;
            groupIds["gleft"] = obj.left;
            groupIds["gscaleX"] = obj.scaleX;
            groupIds["gscaleY"] = obj.scaleY;
            ids = obj._objects.map((function(_this) {
              return function(data) {
                return data.newId;
              };
            })(this)).join(',');
            groupIds['ids'] = ids;
            root.arrGroupIds.push(groupIds);
            results1.push(this.getAllSingleObjects(obj._objects));
          } else {
            results1.push(root.allSingleObjects.push(obj));
          }
        }
        return results1;
      };


      /**
         * Function for binding the list of sketch according in load sketch modal.
       */

      DSCanvasView.prototype.bindSketchList = function() {
        $('#FileList').html("");
        if (window.currentUserId !== null && window.currentUserId !== void 0) {
          return $.get(window.APIURL + '/GetAllSketchMaster?id=' + window.currentUserId, function(data) {
            var SketchName, j, len;
            $('#FileList').append("FileList:");
            $('#FileList').append("<option value='default' selected>- Select File -</option>");
            for (j = 0, len = data.length; j < len; j++) {
              SketchName = data[j];
              $('#FileList').append("<option value='" + SketchName + "'>" + SketchName + "</option>");
            }
            $('#DisableBackground').hide();
            $('#pageLoader').hide();
            $('#LoadFileModal').modal('show');
            return $('.modal-backdrop').show();
          });
        } else {
          return Globals.get('Canvas').saveCanvasToLocal(Globals.get('Canvas').reloadCurrentPage);
        }
      };


      /**
         * Function for calling render all method of fabric js.
       */

      DSCanvasView.prototype.dryRender = function() {
        return this._fabric.renderAll();
      };


      /**
         * Function for discard the active object on canvas.
       */

      DSCanvasView.prototype.removeSelectionOnSave = function() {
        return this._fabric.discardActiveObject();
      };


      /**
         * Function for removing the grid from canvas.
       */

      DSCanvasView.prototype.removeGrid = function() {
        var grpObject, j, len, obj, pathObj;
        this._fabric.discardActiveObject();
        grpObject = root.Grid;
        if (grpObject) {
          pathObj = this._model._data.objects.filter((function(_this) {
            return function(data) {
              return data._view._fabric.id === grpObject.id;
            };
          })(this));
          for (j = 0, len = pathObj.length; j < len; j++) {
            obj = pathObj[j];
            Globals.get('Canvas').removeObject(obj);
          }
        }
        return this._fabric.renderAll();
      };

      root.Gridsize = 30;


      /**
         * Function for changing the size of grid on canvas.
         * @param {@value} size of a grid.
       */

      DSCanvasView.prototype.changeGridSize = function(value) {
        this.value = value;
        this.removeGrid();
        root.GridSize = parseInt(this.value);
        root.GridSize = root.GridSize + 20;
        window.GridSize = root.GridSize;
        return this.addGrid();
      };


      /**
         * Function for overlay of an objects on canvas.
         * @param {operation} overlay type.
         * @param {object} fabric object.
       */

      DSCanvasView.prototype.overlayOfAnObject = function(operation, object) {
        var j, len, ref, tempObject, updatedObjectArray;
        if (operation === "SendToBack") {
          this._fabric.sendToBack(object._view._fabric);
        } else if (operation === "SendBackwards") {
          this._fabric.sendBackwards(object._view._fabric);
        } else if (operation === "BringToFront") {
          this._fabric.bringToFront(object._view._fabric);
        } else if (operation === "BringForward") {
          this._fabric.bringForward(object._view._fabric);
        }
        updatedObjectArray = [];
        ref = Globals.get('Canvas')._view._fabric._objects;
        for (j = 0, len = ref.length; j < len; j++) {
          object = ref[j];
          tempObject = this._model._data.objects.filter((function(_this) {
            return function(data) {
              return data.getId() === object.id;
            };
          })(this));
          updatedObjectArray.push(tempObject[0]);
        }
        this._model.set('objects', updatedObjectArray);
        if (root.Grid !== void 0) {
          if (window.gridSize > 0) {
            this.addGrid(root.GridSize);
            this._fabric.sendToBack(root.Grid);
          }
        }
        return this._fabric.renderAll();
      };


      /**
         * Function for adding grid on to canvas.
       */

      DSCanvasView.prototype.addGrid = function() {
        var a, b, groupLines, i, j, ref, separateLines;
        $(".modeSelect-select").click();
        separateLines = [];
        for (i = j = 0, ref = eval((window.innerWidth / 30) * 2); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          a = new Fabric.Line([i * root.GridSize, 0, i * root.GridSize, eval(window.innerWidth * 2)], {
            stroke: '#ccc',
            id: "grid"
          });
          separateLines.push(a);
          b = new Fabric.Line([0, i * root.GridSize, eval(window.innerWidth * 2), i * root.GridSize], {
            stroke: '#ccc',
            id: "grid"
          });
          separateLines.push(b);
        }
        groupLines = new Fabric.Group(separateLines);
        this._fabric.add(groupLines);
        this.dispatchEvent('Path.Created', {
          path: groupLines
        });
        this._fabric.sendToBack(groupLines);
        groupLines.set('id', 'grid');
        groupLines.selectable = false;
        root.Grid = groupLines;
        window.Grid = groupLines;
        this._fabric.renderAll();
        return this._model.getActiveObjects()[eval(this._model.getActiveObjects().length - 1)]._model._data.id = 'grid';
      };


      /**
         * Function for adding custom shape on to canvas.
         * @param {shapeId} id of a custom shape.
       */

      DSCanvasView.prototype.addShape = function(shapeId) {
        var arr, coord, fillColor, shape, size, string, strokeColor, strokeWidth;
        this._fabric.discardActiveObject();
        coord = this.getRandomLeftTop();
        string = $('.tool.active')[0].title;
        arr = string.split("-");
        strokeWidth = parseInt(arr[1]);
        if ($('#Stroke').val() !== "66CCFF" || $('#Fill').val() !== "66CCFF") {
          strokeColor = '#' + $('#Stroke').val();
          fillColor = '#' + $('#Fill').val();
        } else {
          strokeColor = this.getRandomColor();
          fillColor = this.getRandomColor();
        }
        size = 100;
        switch (shapeId) {
          case 1:
            shape = new Fabric.Circle({
              radius: size / 2,
              left: coord.left,
              top: coord.top,
              fill: fillColor,
              stroke: strokeColor,
              strokeWidth: strokeWidth,
              originX: "center",
              originY: "center"
            });
            break;
          case 2:
            shape = new Fabric.Rect({
              left: coord.left,
              top: coord.top,
              fill: fillColor,
              strokeWidth: strokeWidth,
              width: size,
              height: size,
              stroke: strokeColor,
              originX: "center",
              originY: "center"
            });
            break;
          case 3:
            shape = new Fabric.Triangle({
              left: coord.left,
              top: coord.top,
              fill: fillColor,
              strokeWidth: strokeWidth,
              width: size,
              height: size,
              stroke: strokeColor,
              originX: "center",
              originY: "center"
            });
            break;
          case 4:
            shape = new Fabric.Line([50, 50, 150, 50], {
              left: coord.left,
              strokeWidth: strokeWidth,
              top: coord.top,
              stroke: strokeColor,
              originX: "center",
              originY: "center"
            });
            break;
          case 5:
            shape = new Fabric.Line([50, 50, 50, 150], {
              left: coord.left,
              strokeWidth: strokeWidth,
              top: coord.top,
              stroke: strokeColor,
              originX: "center",
              originY: "center"
            });
            break;
          case 6:
            shape = new Fabric.IText("Text Here", {
              left: coord.left,
              strokeWidth: strokeWidth,
              top: coord.top,
              stroke: "#000",
              fill: "#000",
              originX: "center",
              originY: "center",
              fontSize: 21
            });
        }
        this.dispatchEvent('Path.Created', {
          path: shape
        });
        if ($('.tool.modeSelect-select.active').length === 0) {
          $('.tool.modeSelect-select').click();
        }
        if (this._fabric._objects.length > 0) {
          return this.enableDisableSaveButton("Add");
        }
      };


      /**
         * Function for getting random top and left coords for an object.
         * @return {left,top} coords of an object.
       */

      DSCanvasView.prototype.getRandomLeftTop = function() {
        var offset;
        offset = 130;
        return {
          left: this.getRandomInt(0 + offset, window.innerWidth - offset),
          top: this.getRandomInt(0 + offset, window.innerHeight - offset)
        };
      };


      /**
         * Function for generating randomize color code for an object.
         * @return {color code} color property for an object.
       */

      DSCanvasView.prototype.getRandomColor = function() {
        return "#" + Math.random().toString(16).substr(-6);
      };


      /**
         * Function for generating random integer number.
         * @param {min} offset value.
         * @param {max} window coords - offset value.
         * @return {random integer} random integer generated on basis of min and max.
       */

      DSCanvasView.prototype.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };


      /**
         * Function for changing the position of a pathobject.
         * @param {left} left coord of an object.
         * @param {top} top coord of an object.
       */

      DSCanvasView.prototype.setObjectPosition = function(left, top) {
        var activeObject;
        activeObject = Globals.get('Canvas').getSelectedObjects();
        return activeObject["0"].setPosition({
          x: left,
          y: top
        });
      };


      /**
         * Function for handling key events on a canvas.
         * @param {e} event object of an event.
       */

      DSCanvasView.prototype.keyRemover = function(e) {
        var activeObject, movePixel, objectLeftcoord, objectTopcoord;
        activeObject = Globals.get('Canvas').getSelectedObjects();
        if (this._model._data.selected.length === 1) {
          if (activeObject.length > 0) {
            if (!($("#CalibrationAndManipulationModal").data('bs.modal') || {}).isShown) {
              if (e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode === 46) {
                movePixel = 5;
                objectLeftcoord = activeObject["0"]._view._fabric.left;
                objectTopcoord = activeObject["0"]._view._fabric.top;
                switch (e.keyCode) {
                  case 37:
                    this.setObjectPosition(objectLeftcoord - movePixel, objectTopcoord);
                    break;
                  case 38:
                    this.setObjectPosition(objectLeftcoord, objectTopcoord - movePixel);
                    break;
                  case 39:
                    this.setObjectPosition(objectLeftcoord + movePixel, objectTopcoord);
                    break;
                  case 40:
                    this.setObjectPosition(objectLeftcoord, objectTopcoord + movePixel);
                    break;
                  case 46:
                    Globals.get('Canvas').deleteObject(activeObject);
                }
                this.dispatchEvent('Selection.Scaling', {
                  objectIds: e.target
                });
                activeObject["0"].enforceTransform();
                return this.dryRender();
              }
            }
          }
        } else if (e.keyCode === 46) {
          Globals.get('Canvas').deleteObject(activeObject);

          /*@dispatchEvent 'Selection.Scaling',
            objectIds: e.target
          activeObject["0"].enforceTransform()
           */
          return this.dryRender();
        }
      };


      /**
         * Function for rendering objects on canvas.
         * @param {objects} list of an objects.
         * @param {isolation} mode.
       */

      DSCanvasView.prototype._renderObjects = function(objects, isolations) {
        var j, len, obj, results1;
        results1 = [];
        for (j = 0, len = objects.length; j < len; j++) {
          obj = objects[j];
          this._fabric.discardActiveGroup();
          if (indexOf.call(isolations, obj) >= 0) {
            this._renderObjects(obj.getObjects(), isolations);
          } else {
            if (obj instanceof Group) {
              this._fabric.setActiveGroup(obj.view().getFabric());
            }
            obj.enforceTransform();
            this._fabric.add(obj.view().getFabric());
          }
          if (obj._view._fabric.id === "grid") {
            results1.push(obj._view._fabric.sendToBack());
          } else {
            results1.push(void 0);
          }
        }
        return results1;
      };


      /**
         * Function got triggered on path created event. 
         * @param {evt} event object.
       */

      DSCanvasView.prototype._onPathCreated = function(evt) {
        this.dispatchEvent('Path.Created', {
          path: evt.path
        });
        if (this._fabric._objects.length > 0) {
          return this.enableDisableSaveButton("Add");
        }
      };


      /**
         * Function for show and hide the save canvas tool on canvas.
         * @param {check} name of an action.
       */

      DSCanvasView.prototype.enableDisableSaveButton = function(Check) {
        if (Check === "Add") {
          return $('.tool.SaveCanvas').show();
        } else if (Check === "delete") {
          return $('.tool.SaveCanvas').hide();
        }
      };


      /**
         * Function got executed when the mouse up event got triggered.
         * @param {evt} event object.
       */

      DSCanvasView.prototype._onMouseUp = function(evt) {
        var calibration, calibrationMaxProperty, calibrationMinProperty, horizontalCalibrationMax, horizontalCalibrationMin, j, k, len, len1, mappingAssignmentAction, obj, objectLeft, objectOriginalLeft, objectOriginalTop, objectTop, ref, ref1, results1, verticalCalibrationMax, verticalCalibrationMin;
        calibrationMinProperty = 0;
        calibrationMaxProperty = 0;
        if (this._model._data.selected.length > 0 && this._model._data.selected.length === 1) {
          if (this._model._data.selected[0].getPropertyMappings().length > 0) {
            objectOriginalLeft = this._model._data.selected[0]._view._fabric.originalState.left;
            objectOriginalTop = this._model._data.selected[0]._view._fabric.originalState.top;
            objectLeft = this._model._data.selected[0]._view._fabric.left;
            objectTop = this._model._data.selected[0]._view._fabric.top;
            horizontalCalibrationMin = 0;
            horizontalCalibrationMax = 0;
            verticalCalibrationMin = 0;
            verticalCalibrationMax = 0;
            ref = this._model._data.selected[0].getPropertyMappings();
            for (j = 0, len = ref.length; j < len; j++) {
              obj = ref[j];
              if (obj.objectProperty._model._data.id === "x") {
                horizontalCalibrationMin = obj.calibration.min;
                horizontalCalibrationMax = obj.calibration.max;
              } else if (obj.objectProperty._model._data.id === "y") {
                verticalCalibrationMin = obj.calibration.min;
                verticalCalibrationMax = obj.calibration.max;
              }
            }
            ref1 = this._model._data.selected[0].getPropertyMappings();
            results1 = [];
            for (k = 0, len1 = ref1.length; k < len1; k++) {
              obj = ref1[k];
              calibration = {};
              if (obj.objectProperty._model._data.id === "x") {
                if (objectOriginalLeft !== objectLeft) {
                  calibration.max = objectLeft + (horizontalCalibrationMax - horizontalCalibrationMin);
                  calibration.min = objectLeft;
                  window.objectPropertyMaximum = calibration.max;
                  window.objectPropertyMinimum = calibration.min;
                  mappingAssignmentAction = new MappingAssignmentAction(this._model._data.selected[0], obj.objectProperty, this._model._data.selected[0].getPropertyMappings()[0].dataProperty);
                  results1.push(mappingAssignmentAction.execute());
                } else {
                  results1.push(void 0);
                }
              } else if (obj.objectProperty._model._data.id === "y") {
                if (objectOriginalTop !== objectTop) {
                  if (verticalCalibrationMax < verticalCalibrationMin) {
                    calibration.min = objectTop;
                    calibration.max = objectTop - Math.abs(verticalCalibrationMin - verticalCalibrationMax);
                  }
                  if (verticalCalibrationMax > verticalCalibrationMin) {
                    calibration.max = objectTop + Math.abs(verticalCalibrationMin - verticalCalibrationMax);
                    calibration.min = objectTop;
                  }
                  window.objectPropertyMaximum = calibration.max;
                  window.objectPropertyMinimum = calibration.min;
                  mappingAssignmentAction = new MappingAssignmentAction(this._model._data.selected[0], obj.objectProperty, this._model._data.selected[0].getPropertyMappings()[0].dataProperty);
                  results1.push(mappingAssignmentAction.execute());
                } else {
                  results1.push(void 0);
                }
              } else {
                results1.push(void 0);
              }
            }
            return results1;
          }
        }
      };


      /**
         * Function got executed when object scaling event got triggered.
         * @param {evt} event object.
       */

      DSCanvasView.prototype._onObjectScaling = function(evt) {
        if (evt.target.canvas._activeObject) {
          this._fabricSelection = evt.target;
          this._fabricSelectionMetaCache = {
            position: {
              x: this._fabricSelection.left,
              y: this._fabricSelection.top
            },
            rotation: this._fabricSelection.angle,
            scale: {
              x: this._fabricSelection.scaleX,
              y: this._fabricSelection.scaleY
            }
          };
          this.dryRender();
          this._fabricSelection.on('modified', this._onSelectionModified);
          return this.dispatchEvent('Selection.Scaling', {
            objectIds: evt.target
          });
        }
      };


      /**
         * Function got executed when selection event got triggered.
         * @param {evt} event object.
       */

      DSCanvasView.prototype._onSelectionCreated = function(evt) {
        var obj;
        this._fabricSelection = evt.target;
        this._fabricSelectionMetaCache = {
          position: {
            x: this._fabricSelection.originalLeft,
            y: this._fabricSelection.originalTop
          },
          rotation: this._fabricSelection.angle,
          scale: {
            x: this._fabricSelection.scaleX,
            y: this._fabricSelection.scaleY
          }
        };
        this._fabricSelection.on('modified', this._onSelectionModified);
        return this.dispatchEvent('Selection.Created', {
          objectIds: (function() {
            var j, len, ref, results1;
            ref = evt.target.getObjects();
            results1 = [];
            for (j = 0, len = ref.length; j < len; j++) {
              obj = ref[j];
              results1.push(obj.get('id'));
            }
            return results1;
          })()
        });
      };


      /**
         * Function got executed when before selection event got triggered.
         * @param {evt} event object.
       */

      DSCanvasView.prototype._beforeSelectionCleared = function(evt) {
        var ref;
        if ((ref = this._fabricSelection) != null) {
          ref.off('modified', this._onSelectionModified);
        }
        return this._fabricSelection = null;
      };


      /**
         * Function got executed when selection got modified on canvas.
         * @param {evt} event object.
       */

      DSCanvasView.prototype._onSelectionModified = function(evt) {
        var delta;
        if (this._fabricSelection != null) {
          delta = {
            position: {
              x: this._fabricSelection.left - this._fabricSelectionMetaCache.position.x,
              y: this._fabricSelection.top - this._fabricSelectionMetaCache.position.y
            },
            rotation: this._fabricSelection.angle - this._fabricSelectionMetaCache.rotation,
            scale: {
              x: this._fabricSelection.scaleX - this._fabricSelectionMetaCache.scale.x,
              y: this._fabricSelection.scaleY - this._fabricSelectionMetaCache.scale.y
            }
          };
          return this.dispatchEvent('Selection.Modified', {
            delta: delta
          });
        }
      };

      DSCanvasView.prototype.inActiveObject = function() {
        this._fabric.discardActiveObject();
        Globals.get('Canvas').selectObjects([]);
        return this.dispatchEvent('Selection.Cleared', {});
      };

      DSCanvasView.prototype.selectionCleared = function() {
        var j, k, len, len1, obj, object, ref, ref1;
        if (window.activeObjectsId !== void 0 && window.activeObjectsId.length > 1) {
          window.multiSelectedStampedObjectId = [];
          ref = this._fabric._objects;
          for (j = 0, len = ref.length; j < len; j++) {
            object = ref[j];
            ref1 = this._model._data.objects;
            for (k = 0, len1 = ref1.length; k < len1; k++) {
              obj = ref1[k];
              if (jQuery.inArray(obj.getId(), window.activeObjectsId) !== -1 && obj.getId() === object.id) {
                obj.setPosition({
                  x: object.left,
                  y: object.top
                });
                this.setObjectAnimation(obj);
              }
            }
          }
        }
        return this.dispatchEvent('Selection.Cleared', {});
      };


      /**
         * Function got executed when on selection cleared event got triggered.
         * @param {evt} event object.
       */

      DSCanvasView.prototype._onSelectionCleared = function(evt) {
        var j, k, len, len1, obj, object, ref, ref1;
        if ($('.tool.modeSelect-animate.active').length === 0 && window.activeObjectsId !== void 0 && window.activeObjectsId.length > 1) {
          window.multiSelectedStampedObjectId = [];
          ref = this._fabric._objects;
          for (j = 0, len = ref.length; j < len; j++) {
            object = ref[j];
            ref1 = this._model._data.objects;
            for (k = 0, len1 = ref1.length; k < len1; k++) {
              obj = ref1[k];
              if (jQuery.inArray(obj.getId(), window.activeObjectsId) !== -1 && obj.getId() === object.id) {
                obj.setPosition({
                  x: object.left,
                  y: object.top
                });
                this.setObjectAnimation(obj);
              }
            }
          }
        }
        return this.dispatchEvent('Selection.Cleared', {});
      };

      DSCanvasView.prototype.setObjectAnimation = function(object) {
        debugger;
        var calibration, calibrationMaxProperty, calibrationMinProperty, horizontalCalibrationMax, horizontalCalibrationMin, j, k, len, len1, mappingAssignmentAction, obj, objectLeft, objectOriginalLeft, objectOriginalTop, objectTop, ref, ref1, results1, verticalCalibrationMax, verticalCalibrationMin;
        calibrationMinProperty = 0;
        calibrationMaxProperty = 0;
        if (object.getPropertyMappings().length > 0) {
          objectOriginalLeft = object._view._fabric.originalState.left;
          objectOriginalTop = object._view._fabric.originalState.top;
          objectLeft = object._view._fabric.left;
          objectTop = object._view._fabric.top;
          horizontalCalibrationMin = 0;
          horizontalCalibrationMax = 0;
          verticalCalibrationMin = 0;
          verticalCalibrationMax = 0;
          ref = object.getPropertyMappings();
          for (j = 0, len = ref.length; j < len; j++) {
            obj = ref[j];
            if (obj.objectProperty._model._data.id === "x") {
              horizontalCalibrationMin = obj.calibration.min;
              horizontalCalibrationMax = obj.calibration.max;
            } else if (obj.objectProperty._model._data.id === "y") {
              verticalCalibrationMin = obj.calibration.min;
              verticalCalibrationMax = obj.calibration.max;
            }
          }
          ref1 = object.getPropertyMappings();
          results1 = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            obj = ref1[k];
            calibration = {};
            if (obj.objectProperty._model._data.id === "x") {
              if (objectOriginalLeft !== objectLeft) {
                calibration.max = objectLeft + (horizontalCalibrationMax - horizontalCalibrationMin);
                calibration.min = objectLeft;
                window.objectPropertyMaximum = calibration.max;
                window.objectPropertyMinimum = calibration.min;
                mappingAssignmentAction = new MappingAssignmentAction(object, obj.objectProperty, object.getPropertyMappings()[0].dataProperty);
                results1.push(mappingAssignmentAction.execute());
              } else {
                results1.push(void 0);
              }
            } else if (obj.objectProperty._model._data.id === "y") {
              if (objectOriginalTop !== objectTop) {
                if (verticalCalibrationMax < verticalCalibrationMin) {
                  calibration.min = objectTop;
                  calibration.max = objectTop - Math.abs(verticalCalibrationMin - verticalCalibrationMax);
                }
                if (verticalCalibrationMax > verticalCalibrationMin) {
                  calibration.max = objectTop + Math.abs(verticalCalibrationMin - verticalCalibrationMax);
                  calibration.min = objectTop;
                }
                window.objectPropertyMaximum = calibration.max;
                window.objectPropertyMinimum = calibration.min;
                mappingAssignmentAction = new MappingAssignmentAction(object, obj.objectProperty, object.getPropertyMappings()[0].dataProperty);
                results1.push(mappingAssignmentAction.execute());
              } else {
                results1.push(void 0);
              }
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }
      };


      /**
         * Function got executed when on object selected event got triggered.
         * @param {evt} event object.
       */

      DSCanvasView.prototype._onObjectSelected = function(evt) {
        var group, obj, objects;
        if (group = this._fabric.getActiveGroup()) {
          objects = group.getObjects();
        } else {
          objects = [this._fabric.getActiveObject()];
        }
        return this.dispatchEvent('Selection.Created', {
          objectIds: (function() {
            var j, len, results1;
            results1 = [];
            for (j = 0, len = objects.length; j < len; j++) {
              obj = objects[j];
              results1.push(obj.get('id'));
            }
            return results1;
          })()
        });
      };


      /**
         * Function for changing the dimension of canvas..
       */

      DSCanvasView.prototype.updateDimensions = function() {
        this._fabric.setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
        return Globals.get('Canvas').render();
      };


      /**
         * Function for deactive all object on canvas.
       */

      DSCanvasView.prototype.clearSelection = function() {
        return this._fabric.deactivateAllWithDispatch().renderAll();
      };


      /**
         * Function got executed when on change event got triggered.
         * @param {evt} event object.
       */

      DSCanvasView.prototype._onChange = function(evt) {
        var ref;
        switch (evt.data.path) {
          case "mode":
            return this._onChangeMode(evt.data.value);
          case "strokeWidth":
            this._fabric.freeDrawingBrush.width = evt.data.value;
            this._fabric.renderAll();
            if (!this._fabric._activeObject && !this._fabric._activeGroup) {
              return $(".modeSelect-draw").click();
            }
            break;
          case "strokeColor":
            this._fabric.freeDrawingBrush.color = evt.data.value;
            return this._fabric.renderAll();
          case "selected":
            if (((ref = evt.data.value) != null ? ref.length : void 0) === 0) {
              return this.clearSelection();
            }
            break;
          case "isolated":
            return this.render(evt.currentTarget);
          case "disabled":
            this._fabric.selection = !evt.data.value;
            return this.render(evt.currentTarget);
        }
      };


      /**
         * Function for on or off the drawing mode on canvas.
       */

      DSCanvasView.prototype._onChangeMode = function(val) {
        switch (val) {
          case "draw":
            this._fabric.discardActiveObject();
            return this._fabric.isDrawingMode = true;
          default:
            return this._fabric.isDrawingMode = false;
        }
      };


      /**
         * Function got executed when on object removed event got triggered.
         * @param {evt} event object.
       */

      DSCanvasView.prototype._onObjectRemoved = function(evt) {
        this.clearSelection();
        return this.deleteObject();
      };


      /**
         * Function got executed when on object added event got triggered.
         * @param {evt} event object.
       */

      DSCanvasView.prototype._onObjectAdded = function(evt) {
        if (this._fabric._objects.length > 0) {
          return this.addObject();
        }
      };


      /**
         * Function got executed when on objects removed event got triggered.
         * @param {evt} event object.
       */

      DSCanvasView.prototype._onObjectsRemoved = function(evt) {
        this.clearSelection();
        return this.deleteObject();
      };


      /**
         * Function got executed when on objects added event got triggered.
         * @param {evt} event object.
       */

      DSCanvasView.prototype._onObjectsAdded = function(evt) {
        return this.addObject();
      };


      /**
         * Function for show save tool on canvas.
       */

      DSCanvasView.prototype.addObject = function() {
        if (this._fabric._objects.length > 0) {
          return this.enableDisableSaveButton("Add");
        }
      };


      /**
         * Function for hide save tool on canvas.
       */

      DSCanvasView.prototype.deleteObject = function() {
        if (this._fabric._objects.length === 0) {
          return this.enableDisableSaveButton("delete");
        }
      };

      return DSCanvasView;

    })(DomView);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/canvas/view.js.map
