(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var DuplicateAction, DuplicateMenuItemModule, Globals, HM, Module;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    Globals = require('core/model/globals');
    DuplicateAction = require('modules/datasketch/actions/duplicate_objects');
    return DuplicateMenuItemModule = (function(superClass) {
      extend(DuplicateMenuItemModule, superClass);

      function DuplicateMenuItemModule() {
        this._hookMenuItems = bind(this._hookMenuItems, this);
        this.init = bind(this.init, this);
        DuplicateMenuItemModule.__super__.constructor.apply(this, arguments);
      }

      DuplicateMenuItemModule.prototype.init = function() {
        return HM.hook('ContextMenu.MenuItems', this._hookMenuItems);
      };

      DuplicateMenuItemModule.prototype._hookMenuItems = function(list, meta) {
        var ref;
        if ((ref = meta.context.selection) != null ? ref.length : void 0) {
          list.push({
            id: 'duplicate-object',
            label: "Duplicate",
            action: new DuplicateAction(Globals.get('Canvas'), meta.context.selection)
          });
        }
        return list;
      };

      return DuplicateMenuItemModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/menuitems/duplicate.js.map
