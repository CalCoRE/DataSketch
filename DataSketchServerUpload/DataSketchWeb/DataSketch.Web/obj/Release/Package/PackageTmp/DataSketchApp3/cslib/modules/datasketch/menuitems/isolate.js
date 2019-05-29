(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, Group, HM, IsolateGroupAction, IsolateMenuItemModule, Module;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    Globals = require('core/model/globals');
    IsolateGroupAction = require('modules/datasketch/actions/isolate_group');
    Group = require('modules/datasketch/canvas/objects/group/object');
    return IsolateMenuItemModule = (function(superClass) {
      extend(IsolateMenuItemModule, superClass);

      function IsolateMenuItemModule() {
        this._hookMenuItems = bind(this._hookMenuItems, this);
        this.init = bind(this.init, this);
        IsolateMenuItemModule.__super__.constructor.apply(this, arguments);
      }

      IsolateMenuItemModule.prototype.init = function() {
        return HM.hook('ContextMenu.MenuItems', this._hookMenuItems);
      };

      IsolateMenuItemModule.prototype._hookMenuItems = function(list, meta) {
        var ref;
        if (((ref = meta.context.selection) != null ? ref.length : void 0) === 1 && meta.context.selection[0] instanceof Group) {
          list.push({
            id: 'isolate',
            label: "Isolate",
            action: new IsolateGroupAction(Globals.get('Canvas'), meta.context.selection[0])
          });
        }
        if (meta.context.isolation.length) {
          list.push({
            id: 'exit-isolation',
            label: "Exit Isolation",
            action: new IsolateGroupAction(Globals.get('Canvas'), null)
          });
        }
        return list;
      };

      return IsolateMenuItemModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/menuitems/isolate.js.map
