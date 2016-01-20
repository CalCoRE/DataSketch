(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Controller, Globals, Menu, Model, View;
    Controller = require('core/controller/controller');
    Model = require('./model');
    View = require('./view');
    Globals = require('core/model/globals');
    Menu = (function(superClass) {
      extend(Menu, superClass);

      function Menu(config) {
        this._onActionRequest = bind(this._onActionRequest, this);
        this.addItem = bind(this.addItem, this);
        var i, item, items, len, ref, ref1;
        if (config == null) {
          config = {};
        }
        if (config.modelClass == null) {
          config.modelClass = Model;
        }
        if (config.viewClass == null) {
          config.viewClass = View;
        }
        if (((ref = config.modelData) != null ? ref.items : void 0) != null) {
          items = [];
          ref1 = config.modelData.items;
          for (i = 0, len = ref1.length; i < len; i++) {
            item = ref1[i];
            items.push(Menu.wrapMenu(item));
          }
          config.modelData.items = items;
        }
        Menu.__super__.constructor.call(this, config);
        this.view().addEventListener("Menu.ActionRequest", this._onActionRequest);
      }

      Menu.prototype.addItem = function(item) {
        var items;
        items = this._model.get('items');
        items.push(Menu.wrapMenu(item));
        return this._model.set('items', items);
      };

      Menu.prototype._onActionRequest = function(evt) {
        if (this._model.get('action')) {
          Globals.get('Relay').dispatchEvent('Action.RequestAction', {
            action: this._model.get('action')
          });
          return this.dispatchEvent('Menu.ActionRequested', {});
        }
      };

      return Menu;

    })(Controller);
    Menu.wrapMenu = (function(_this) {
      return function(item) {
        if (item instanceof Menu) {
          return item;
        }
        return Menu.createMenu(item);
      };
    })(this);
    Menu.createMenu = (function(_this) {
      return function(data) {
        return new Menu({
          modelData: data
        });
      };
    })(this);
    return Menu;
  });

}).call(this);

//# sourceMappingURL=../../maps/modules/menu/menu.js.map