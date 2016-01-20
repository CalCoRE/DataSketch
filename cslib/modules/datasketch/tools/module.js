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
          })
        };
        return toolbars;
      };

      DSToolsModule.prototype.init = function() {
        var appView, id, ref, results, tb;
        this.toolbars = this.buildToolbars();
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
        var id, ref, results, tb;
        ref = this.toolbars;
        results = [];
        for (id in ref) {
          tb = ref[id];
          results.push(tb.build());
        }
        return results;
      };

      return DSToolsModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/tools/module.js.map