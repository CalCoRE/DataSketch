(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, LoadFileTool, LoadFromDb, LoadFromFile, Tool, View;
    Tool = require('modules/toolkit/tool/tool');
    Globals = require('core/model/globals');
    View = require('./view');
    require('link!./style.css');
    LoadFromDb = require('modules/datasketch/actions/load_from_db');
    LoadFromFile = require('modules/datasketch/actions/load_from_file');
    return LoadFileTool = (function(superClass) {
      extend(LoadFileTool, superClass);

      function LoadFileTool() {
        this.generateAction = bind(this.generateAction, this);
        LoadFileTool.__super__.constructor.call(this, {
          viewClass: View
        });
      }

      LoadFileTool.prototype.generateAction = function() {
        var inputFile, loadFromDb, reader;
        if (window.currentActionId === "rbtnDB") {
          $('#FormatValidationMessage').hide();
          $('#ddlLoadValidationMessage').hide();
          $('#LoadValidationMessage').hide();
          $('#FileList').prop('disabled', false);
          $('#fileUpload').prop('disabled', true);
        } else if (window.currentActionId === "rbtnFile") {
          $('#LoadValidationMessage').hide();
          $('#ddlLoadValidationMessage').hide();
          $('#FileList').prop('disabled', true);
          $('#fileUpload').prop('disabled', false);
        }
        $('#LoadFileModal').on('shown.bs.modal', (function(_this) {
          return function(e) {
            $('#rbtnFile').prop('checked', true);
            $('#FileList').prop('disabled', true);
            $('#fileUpload').prop('disabled', false);
            return e.stopImmediatePropagation();
          };
        })(this));
        $('#LoadFileModal').on('hidden.bs.modal', (function(_this) {
          return function(e) {
            $('#fmLoad')[0].reset();
            $('.modal-backdrop').hide();
            $('#LoadValidationMessage').hide();
            $('#ddlLoadValidationMessage').hide();
            $('#rbtnFile').prop('checked', true);
            $('#FileList').prop('disabled', true);
            $('#fileUpload').prop('disabled', false);
            return e.stopImmediatePropagation();
          };
        })(this));
        $('#fmLoad').on('submit', (function(_this) {
          return function(evt) {
            return false;
          };
        })(this));
        if (window.currentActionId === "LoadButton") {
          if ($('#rbtnDB').prop('checked')) {
            $('#fileUpload').val("");
            if ($('#FileList').val() && $('#FileList').val() !== "default") {
              $('#DisableBackground').show();
              $('#pageLoader').show();
              LoadFromDb(loadFromDb = new LoadFromDb(Globals.get('Canvas'), $('#FileList').val()));
              loadFromDb.execute();
              $('#LoadFileModal').modal('hide');
              $('.modal-backdrop').hide();
              return $('#fmLoad')[0].reset();
            } else {
              $('#ddlLoadValidationMessage').show();
              return $('#LoadValidationMessage').hide();
            }
          } else if ($('#rbtnFile').prop('checked')) {
            inputFile = $('#fileUpload')[0].files[0];
            if (inputFile) {
              if (inputFile.type === "text/plain") {
                $('#FormatValidationMessage').hide();
                $('#LoadValidationMessage').hide();
                reader = new FileReader(inputFile);
                reader.readAsText(inputFile);
                $('#LoadFileModal').modal('hide');
                $('.modal-backdrop').hide();
                $('#fileUpload').val("");
                return reader.onload = (function(_this) {
                  return function(e) {
                    var loadFromFile;
                    LoadFromFile(loadFromFile = new LoadFromFile(Globals.get('Canvas'), e.target.result));
                    loadFromFile.execute();
                    return $('#fmLoad')[0].reset();
                  };
                })(this);
              } else {
                $('#FormatValidationMessage').show();
                return $('#fmLoad')[0].reset();
              }
            } else {
              $('#ddlLoadValidationMessage').hide();
              return $('#LoadValidationMessage').show();
            }
          }
        }
      };

      return LoadFileTool;

    })(Tool);
  });

}).call(this);

//# sourceMappingURL=../../../../maps/modules/datasketch/tools/loadfile/tool.js.map
