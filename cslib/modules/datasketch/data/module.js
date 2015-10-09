(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DSData, DataStore, DataTableView, Globals, HM, ModeSelectTool, Module, PapaParse;
    Module = require('core/app/module');
    Globals = require('core/model/globals');
    PapaParse = require('thirdparty/papaparse');
    DataStore = require('./models/datastore');
    DataTableView = require('./views/table');
    ModeSelectTool = require('modules/datasketch/tools/mode/tool');
    HM = require('core/event/hook_manager');
    require('link!./style.css');
    return DSData = (function(superClass) {
      extend(DSData, superClass);

      function DSData() {
        this._listMappingProperties = bind(this._listMappingProperties, this);
        this._onModeChange = bind(this._onModeChange, this);
        this.run = bind(this.run, this);
        this._toolbarTools = bind(this._toolbarTools, this);
        this.init = bind(this.init, this);
        this.handlePreload = bind(this.handlePreload, this);
        this.listPreload = bind(this.listPreload, this);
        return DSData.__super__.constructor.apply(this, arguments);
      }

      DSData.prototype.constuctor = function() {};

      DSData.prototype.listPreload = function() {
        var list;
        list = DSData.__super__.listPreload.call(this);
        list.push("text!" + window.DataSketchConfig.dataSource);
        return list;
      };

      DSData.prototype.handlePreload = function(csv) {
        var d, ds;
        d = PapaParse.parse(csv, {
          header: true,
          dynamicTyping: true
        });
        ds = new DataStore({
          rows: d.data,
          properties: d.meta.fields
        });
        return Globals.set('DataStore', ds);
      };

      DSData.prototype.init = function() {
        HM.hook('Toolbar.Tools', this._toolbarTools);
        return HM.hook('DataMapping.DataProperties', this._listMappingProperties);
      };

      DSData.prototype._toolbarTools = function(list, meta) {
        if (meta.id === "mode") {
          list.push(new ModeSelectTool("data"));
        }
        return list;
      };

      DSData.prototype.run = function() {
        this._view = new DataTableView(Globals.get('DataStore'));
        Globals.get('App.view').addChild(this._view);
        return Globals.get('Canvas').addEventListener('Canvas.ModeChange', this._onModeChange);
      };

      DSData.prototype._onModeChange = function(evt) {
        if (evt.currentTarget.getMode() === "data") {
          this._view.show();
          return Globals.get('Canvas').disable();
        } else {
          this._view.hide();
          return Globals.get('Canvas').enable();
        }
      };

      DSData.prototype._listMappingProperties = function(list, meta) {
        list = list.concat(Globals.get('DataStore.properties'));
        return list;
      };

      return DSData;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/data/module.js.map