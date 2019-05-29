(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(function(require) {
    var DeleteMenuItemModule, Globals, HM, MappingAssignmentAction, Module;
    Module = require('core/app/module');
    HM = require('core/event/hook_manager');
    Globals = require('core/model/globals');
    MappingAssignmentAction = require('modules/datasketch/actions/mapping_assignment');
    return DeleteMenuItemModule = (function(superClass) {
      extend(DeleteMenuItemModule, superClass);

      function DeleteMenuItemModule() {
        this._hookMenuItems = bind(this._hookMenuItems, this);
        this.init = bind(this.init, this);
        DeleteMenuItemModule.__super__.constructor.apply(this, arguments);
      }

      DeleteMenuItemModule.prototype.init = function() {
        return HM.hook('ObjectProperty.MenuItems', this._hookMenuItems);
      };

      DeleteMenuItemModule.prototype._hookMenuItems = function(list, meta) {
        var dataProps, disabled, dp, i, items, j, k, len, len1, len2, m, mappedProps, mappings, objectProps, op, ref, ref1, ref2, subitems;
        if (((ref = meta.context.selection) != null ? ref.length : void 0) === 1) {
          objectProps = HM.invoke('DataMapping.ObjectProperties', []);
          dataProps = HM.invoke('DataMapping.DataProperties', []);
          items = [];
          mappings = meta.context.selection[0].getPropertyMappings();
          mappedProps = (function() {
            var i, len, results;
            results = [];
            for (i = 0, len = mappings.length; i < len; i++) {
              m = mappings[i];
              results.push(m.objectProperty.getId());
            }
            return results;
          })();
          for (i = 0, len = objectProps.length; i < len; i++) {
            op = objectProps[i];
            subitems = [];
            if (ref1 = op.getId(), indexOf.call(mappedProps, ref1) >= 0) {
              dp = null;
              for (j = 0, len1 = mappings.length; j < len1; j++) {
                m = mappings[j];
                if (m.objectProperty.getId() === op.getId()) {
                  dp = m.dataProperty;
                }
              }
            } else {
              for (k = 0, len2 = dataProps.length; k < len2; k++) {
                dp = dataProps[k];
                subitems.push({
                  id: (op.getId()) + "-" + (dp.getId()),
                  label: dp.getName(),
                  action: new MappingAssignmentAction(meta.context.selection[0], op, dp)
                });
              }
            }
            disabled = false;
            if ((op.getId() === "scale" && (indexOf.call(mappedProps, "height") >= 0 || indexOf.call(mappedProps, "width") >= 0)) || (((ref2 = op.getId()) === "height" || ref2 === "width") && indexOf.call(mappedProps, "scale") >= 0)) {
              disabled = true;
            }
            list.push({
              id: op.getId(),
              label: op.getName(),
              items: subitems
            });
          }
        }
        return list;
      };

      return DeleteMenuItemModule;

    })(Module);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/menuitems/map.js.map
