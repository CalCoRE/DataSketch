(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var ContextMenuManager, ContextMenuModule, Globals, HM, Menu, Module;
    Module = require('core/app/module');
    ContextMenuManager = require('./manager');
    HM = require('core/event/hook_manager');
    Menu = require('modules/menu/menu');
    Globals = require('core/model/globals');
    return ContextMenuModule = (function(superClass) {
      extend(ContextMenuModule, superClass);

      function ContextMenuModule() {
        this._buildMenu = bind(this._buildMenu, this);
        this._onAction = bind(this._onAction, this);
        this._onCloseRequest = bind(this._onCloseRequest, this);
        this._onDisplayRequest = bind(this._onDisplayRequest, this);
        this._onContextChange = bind(this._onContextChange, this);
        this.init = bind(this.init, this);
        ContextMenuModule.__super__.constructor.apply(this, arguments);
      }

      ContextMenuModule.prototype.init = function() {
        this._manager = new ContextMenuManager;
        Globals.get('App.view').addChild(this._manager.view());
        Globals.get('Relay').addEventListener('ContextMenu.RequestDisplay', this._onDisplayRequest);
        Globals.get('Relay').addEventListener('ContextMenu.RequestClose', this._onCloseRequest);
        Globals.get('Relay').addEventListener('ContextMenu.ContextChange', this._onContextChange);
        Globals.get('Relay').addEventListener('ContextMenu.RefreshRequest', this._onRefreshRequest);
        Globals.get('ActionHistory').addEventListener('ActionHistory.ActionAdded', this._onAction);
        return Globals.get('ActionHistory').addEventListener('ActionHistory.ActionUndone', this._onAction);
      };

      ContextMenuModule.prototype._onContextChange = function(evt) {
        this._currentContext = evt.data.context;
        return this._buildMenu();
      };

      ContextMenuModule.prototype._onDisplayRequest = function(evt) {
        this._currentContext = evt.data.context;
        return this._buildMenu();
      };

      ContextMenuModule.prototype._onCloseRequest = function(evt) {
        this._currentContext = null;
        return this._manager.close();
      };

      ContextMenuModule.prototype._onAction = function(evt) {
        return this._buildMenu();
      };

      ContextMenuModule.prototype._buildMenu = function() {
        var items;
        if (this._currentContext != null) {
          items = HM.invoke("ObjectProperty.MenuItems", [], {
            context: this._currentContext
          });
          if (items.length) {
            return this._manager.display(Menu.createMenu({
              items: items
            }));
          } else {
            return this._manager.close();
          }
        } else {
          return this._manager.close();
        }
      };

      return ContextMenuModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/objectproperty/module.js.map
