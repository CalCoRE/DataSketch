(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, SaveCanvas, Tool, View, savecanvasTool;
    Tool = require('modules/toolkit/tool/tool');
    Globals = require('core/model/globals');
    View = require('./view');
    require('link!./style.css');
    SaveCanvas = require('modules/datasketch/actions/save_canvas');
    return savecanvasTool = (function(superClass) {
      var root;

      extend(savecanvasTool, superClass);

      function savecanvasTool() {
        this.generateAction = bind(this.generateAction, this);
        savecanvasTool.__super__.constructor.call(this, {
          viewClass: View
        });
      }

      root = typeof exports !== "undefined" && exports !== null ? exports : savecanvasTool;

      root.Counter = 0;

      savecanvasTool.prototype.generateAction = function() {
        var ModalValue, regexname, savecanvas;
        ModalValue = $('#txtFileName').val();
        $('#SaveCanvasModal').on('hidden.bs.modal', (function(_this) {
          return function(e) {
            $('#txtFileName').val("");
            $('#chkIsDownload').prop('checked', false);
            $('#SaveValidationMessage').hide();
            $('#PatternValidationMessage').hide();
            return e.stopImmediatePropagation();
          };
        })(this));
        if (window.currentActionId === "SaveButton") {
          root.Counter = 0;
          regexname = /^([a-zA-Z0-9_-])*$/;
          if (ModalValue && regexname.test(ModalValue)) {
            SaveCanvas(savecanvas = new SaveCanvas(Globals.get('Canvas'), ModalValue));
            savecanvas.execute();
            $('#txtFileName').val("");
            return $('#SaveCanvasModal').modal('hide');
          } else if (ModalValue === "") {
            $('#PatternValidationMessage').hide();
            return $('#SaveValidationMessage').show();
          } else if (!regexname.test(ModalValue)) {
            $('#SaveValidationMessage').hide();
            return $('#PatternValidationMessage').show();
          }
        }
      };

      return savecanvasTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/savecanvas/tool.js.map
