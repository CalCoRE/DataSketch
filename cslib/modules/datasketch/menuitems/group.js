(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Globals, Group, GroupAction, GroupMenuItemModule, HM, Module, UngroupAction;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    Globals = require('core/model/globals');
    GroupAction = require('modules/datasketch/actions/group_objects');
    UngroupAction = require('modules/datasketch/actions/ungroup_objects');
    Group = require('modules/datasketch/canvas/objects/group/object');
    return GroupMenuItemModule = (function(superClass) {
      extend(GroupMenuItemModule, superClass);

      function GroupMenuItemModule() {
        this._hookMenuItems = bind(this._hookMenuItems, this);
        this.init = bind(this.init, this);
        GroupMenuItemModule.__super__.constructor.apply(this, arguments);
      }

      GroupMenuItemModule.prototype.init = function() {
        return HM.hook('ContextMenu.MenuItems', this._hookMenuItems);
      };

      GroupMenuItemModule.prototype._hookMenuItems = function(list, meta) {
        var ref, ref1;
        if (((ref = meta.context.selection) != null ? ref.length : void 0) > 1) {
          list.push({
            id: 'group-objects',
            label: "Group",
            action: new GroupAction(Globals.get('Canvas'), meta.context.selection)
          });
        } else if (((ref1 = meta.context.selection) != null ? ref1.length : void 0) === 1 && meta.context.selection[0] instanceof Group) {
          list.push({
            id: 'ungroup-objects',
            label: "Ungroup",
            action: new UngroupAction(Globals.get('Canvas'), meta.context.selection[0])
          });
        }
        return list;
      };

      return GroupMenuItemModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/menuitems/group.js.map