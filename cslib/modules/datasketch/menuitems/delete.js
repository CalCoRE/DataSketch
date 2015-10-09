(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DeleteAction, DeleteMenuItemModule, Globals, HM, Module;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    Globals = require('core/model/globals');
    DeleteAction = require('modules/datasketch/actions/delete_objects');
    return DeleteMenuItemModule = (function(superClass) {
      extend(DeleteMenuItemModule, superClass);

      function DeleteMenuItemModule() {
        this._hookMenuItems = bind(this._hookMenuItems, this);
        this.init = bind(this.init, this);
        DeleteMenuItemModule.__super__.constructor.apply(this, arguments);
      }

      DeleteMenuItemModule.prototype.init = function() {
        return HM.hook('ContextMenu.MenuItems', this._hookMenuItems);
      };

      DeleteMenuItemModule.prototype._hookMenuItems = function(list, meta) {
        var ref;
        if ((ref = meta.context.selection) != null ? ref.length : void 0) {
          list.push({
            id: 'delete-object',
            label: "Delete",
            action: new DeleteAction(Globals.get('Canvas'), meta.context.selection)
          });
        }
        return list;
      };

      return DeleteMenuItemModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/menuitems/delete.js.map