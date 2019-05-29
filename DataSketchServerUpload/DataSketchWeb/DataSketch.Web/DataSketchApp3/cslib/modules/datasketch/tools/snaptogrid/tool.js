(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, SliderInput, SnapGridAction, SnapGridTool, Tool, View;
    Tool = require('modules/toolkit/tool/tool');
    SnapGridAction = require('modules/datasketch/actions/snap_to_grid');
    SliderInput = require('modules/datasketch/actions/slider_input');
    Globals = require('core/model/globals');
    View = require('./view');
    require('link!./style.css');
    return SnapGridTool = (function(superClass) {
      extend(SnapGridTool, superClass);

      function SnapGridTool(_Id) {
        this._Id = _Id;
        this._onCanvasChange = bind(this._onCanvasChange, this);
        this.generateAction = bind(this.generateAction, this);
        SnapGridTool.__super__.constructor.call(this, {
          viewClass: View,
          modelData: {
            id: "snapgrid-" + this._Id,
            tooltip: "Snap to Grid"
          }
        });
      }

      SnapGridTool.prototype.generateAction = function() {
        var sliderinput;
        if (document.getElementsByClassName("snapgrid-1")[0].className === "tool snapgrid-1") {
          this.toggleActiveDisplay(true);
          $('#SliderInputModal').modal({
            backdrop: false
          });
          $('#SliderInputModal').show();
          $('.modal-backdrop').hide();
          SliderInput(sliderinput = new SliderInput(Globals.get('Canvas'), $('#GridSizeSlider').val()));
          sliderinput.execute();
        } else if (window.currentActionId === "OnInputOfSlider" || window.currentActionId === "GridSizeSlider" && parseInt($('#GridSizeSlider').val()) !== 0) {
          SliderInput(sliderinput = new SliderInput(Globals.get('Canvas'), $('#GridSizeSlider').val()));
          sliderinput.execute();
        } else {
          this.toggleActiveDisplay(false);
          $('#SliderInputModal').hide();
          $('#SliderInputModal').modal({
            backdrop: true
          });
        }
        return $('#SliderValue').html($('#GridSizeSlider').val());
      };

      SnapGridTool.prototype._onCanvasChange = function(evt) {
        return this.toggleActiveDisplay(evt.data.mode === this._targetMode);
      };

      return SnapGridTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/snaptogrid/tool.js.map
