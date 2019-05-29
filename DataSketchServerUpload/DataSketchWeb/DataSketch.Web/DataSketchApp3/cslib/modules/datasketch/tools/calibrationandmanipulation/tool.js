(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var CalibrationAndManipulationTool, Globals, HM, MappingAssignmentAction, ObjectManipulationAction, RemoveCalibrationAction, StampingEffect, Tool, View;
    Tool = require('modules/toolkit/tool/tool');
    Globals = require('core/model/globals');
    HM = require('core/event/hook_manager');
    View = require('./view');
    require('link!./style.css');
    MappingAssignmentAction = require('modules/datasketch/actions/mapping_assignment');
    ObjectManipulationAction = require('modules/datasketch/actions/object_manipulation');
    RemoveCalibrationAction = require('modules/datasketch/actions/remove_calibration');
    StampingEffect = require('modules/datasketch/actions/stamping_effect');
    return CalibrationAndManipulationTool = (function(superClass) {
      extend(CalibrationAndManipulationTool, superClass);

      function CalibrationAndManipulationTool() {
        this.generateAction = bind(this.generateAction, this);
        CalibrationAndManipulationTool.__super__.constructor.call(this, {
          viewClass: View
        });
      }

      CalibrationAndManipulationTool.prototype.generateAction = function() {
        var CsvProperty, ObjectProperty, animationDataProperty, canvas, dataStore, i, j, len, len1, mappingAssignmentAction, minMax, minMaxofProperty, obj, objectDataProperty, objectManipulationAction, ref, ref1, removeCalibrationAction, stampingEffect;
        dataStore = Globals.get('DataStore');
        minMaxofProperty = [];
        if (window.currentActionId === "calibrationRemoveButton") {
          $('#maxRangeInput, #minRangeInput').val(0);
          $('#maxInput, #minInput').html(0);
          RemoveCalibrationAction(removeCalibrationAction = new RemoveCalibrationAction(Globals.get('Canvas')));
          removeCalibrationAction.execute();
          $('#colorProperty')[0].selectedIndex = 0;
        }
        if (window.currentActionId === "calibrationApplyButton") {
          this._objectProperty = HM.invoke('DataMapping.ObjectProperties', []);
          ObjectProperty = this._objectProperty.filter((function(_this) {
            return function(data) {
              return data.getId() === $('.activeMenu')[0].id;
            };
          })(this));
          $('#CalibrationAndManipulationModal').modal('hide');
          canvas = Globals.get('Canvas');
          animationDataProperty = [];
          CsvProperty = Globals.get('DataStore');
          objectDataProperty = null;
          if (window.objectPropertyId === "color") {
            objectDataProperty = $('#csvPropertyColor').val();
            window.objectPropertyMinimum = $('#colorProperty').val().split('-')[0];
            window.objectPropertyMaximum = $('#colorProperty').val().split('-')[1];
          } else if (window.objectPropertyId === "stamping") {
            StampingEffect(stampingEffect = new StampingEffect(canvas, canvas._model._data.selected[0], $('#isStamp')[0].checked));
            stampingEffect.execute();
          } else {
            objectDataProperty = $('#csvProperty').val();
            window.objectPropertyMinimum = $('#minRangeInput').val();
            window.objectPropertyMaximum = $('#maxRangeInput').val();
          }
          if (window.objectPropertyId !== "stamping") {
            ref = CsvProperty._data.properties;
            for (i = 0, len = ref.length; i < len; i++) {
              obj = ref[i];
              if (obj._data.id === objectDataProperty) {
                animationDataProperty = obj;
              }
            }
            MappingAssignmentAction(mappingAssignmentAction = new MappingAssignmentAction(canvas._model._data.selected[0], ObjectProperty[0], animationDataProperty));
            mappingAssignmentAction.execute();
          }
        }
        $('#CalibrationAndManipulationModal').on('hidden.bs.modal', (function(_this) {
          return function(e) {
            $('#shape')[0].style.pointerEvents = 'auto';
            $('#isStamp')[0].checked = false;
            $('.objectproperty-menu .menu-item').removeClass('activeMenu');
            $("input[name=minMaxValue][value='minValue']").prop("checked", true);
            $('#colorProperty').val("#f7f7f7-#252525");
            Globals.get('Canvas').applyOriginalProperty();
            $(_this).off('hide.bs.modal');
            return e.stopImmediatePropagation();
          };
        })(this));
        ref1 = dataStore._data.properties;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          obj = ref1[j];
          if (obj._data.id === $('#csvProperty').val()) {
            minMaxofProperty = obj;
          }
        }
        if ($('#csvProperty').val()) {
          minMax = dataStore.getMinMax(minMaxofProperty);
          $('#propertyMaxValue').html(minMax.max);
          $('#propertyMinValue').html(minMax.min);
        }
        if (window.currentActionId === "minRangeInput") {
          if (window.objectPropertyId === "width" || window.objectPropertyId === "height" || window.objectPropertyId === "scale") {
            $('#minInput').html(eval($('#minRangeInput').val()).toFixed(1));
          } else {
            $('#minInput').html(eval($('#minRangeInput').val()));
          }
          ObjectManipulationAction(objectManipulationAction = new ObjectManipulationAction(Globals.get('Canvas')));
          objectManipulationAction.execute();
          return $("input[name=minMaxValue][value='minValue']").prop("checked", true);
        } else if (window.currentActionId === "maxRangeInput") {
          if (window.objectPropertyId === "width" || window.objectPropertyId === "height" || window.objectPropertyId === "scale") {
            $('#maxInput').html(eval($('#maxRangeInput').val()).toFixed(1));
          } else {
            $('#maxInput').html(eval($('#maxRangeInput').val()));
          }
          ObjectManipulationAction(objectManipulationAction = new ObjectManipulationAction(Globals.get('Canvas')));
          objectManipulationAction.execute();
          return $("input[name=minMaxValue][value='maxValue']").prop("checked", true);
        }
      };

      return CalibrationAndManipulationTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/calibrationandmanipulation/tool.js.map
