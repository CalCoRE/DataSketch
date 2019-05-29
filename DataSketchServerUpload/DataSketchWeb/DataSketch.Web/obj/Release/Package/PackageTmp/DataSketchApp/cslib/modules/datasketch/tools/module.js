(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DSToolsModule, Globals, HM, Module, Toolbar;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    Globals = require('core/model/globals');
    Toolbar = require('modules/toolkit/toolbar/toolbar');
    return DSToolsModule = (function(superClass) {
      extend(DSToolsModule, superClass);

      function DSToolsModule() {
        this.run = bind(this.run, this);
        this.init = bind(this.init, this);
        this.buildViewToolbars = bind(this.buildViewToolbars, this);
        this.buildToolbars = bind(this.buildToolbars, this);
        DSToolsModule.__super__.constructor.call(this);
      }

      DSToolsModule.prototype.buildToolbars = function() {
        var toolbars;
        toolbars = {
          stroke: new Toolbar({
            modelData: {
              id: "stroke"
            }
          }),
          color: new Toolbar({
            modelData: {
              id: "color"
            }
          }),
          mode: new Toolbar({
            modelData: {
              id: "mode"
            }
          }),
          trash: new Toolbar({
            modelData: {
              id: "trash"
            }
          }),
          objectoverlay: new Toolbar({
            modelData: {
              id: "objectoverlay"
            }
          }),
          shape: new Toolbar({
            modelData: {
              id: "shape"
            }
          }),
          snapgrid: new Toolbar({
            modelData: {
              id: "snapgrid"
            }
          }),
          markAsOrigin: new Toolbar({
            modelData: {
              id: "markAsOrigin"
            }
          }),
          LoadSave: new Toolbar({
            modelData: {
              id: "LoadSave"
            }
          }),
          LoadFile: new Toolbar({
            modelData: {
              id: "LoadFile"
            }
          }),
          ModalInput: new Toolbar({
            modelData: {
              id: "savecanvas"
            }
          }),
          calibrationAndManipulation: new Toolbar({
            modelData: {
              id: "calibrationandmanipulation"
            }
          })

          /*CreateFile: new Toolbar
            modelData:
              id: "CreateFile"
           */
        };
        return toolbars;
      };

      DSToolsModule.prototype.buildViewToolbars = function() {
        var toolbars;
        toolbars = {
          mode: new Toolbar({
            modelData: {
              id: "mode"
            }
          })
        };
        return toolbars;
      };

      DSToolsModule.prototype.init = function() {
        var appView, id, ref, results, tb;
        if (window.currentSketchMode === 'view') {
          this.toolbars = this.buildViewToolbars();
        } else {
          this.toolbars = this.buildToolbars();
        }
        appView = Globals.get('App.view');
        ref = this.toolbars;
        results = [];
        for (id in ref) {
          tb = ref[id];
          results.push(appView.addChild(tb.view()));
        }
        return results;
      };

      DSToolsModule.prototype.run = function() {
        var id, ref, tb;
        ref = this.toolbars;
        for (id in ref) {
          tb = ref[id];
          tb.build();
        }
        this._model = Globals.get('Canvas')._model;
        if (this._model) {
          if (this._model._data.objects.length > 0) {
            $('.tool.SaveCanvas').show();
          }
        }
        if (window.currentSketchMode === 'view') {
          $('.tool.modeSelect-draw').hide();
          return $('.tool.modeSelect-data').hide();
        }
      };

      return DSToolsModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/tools/module.js.map
