(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var GroupModel, ObjectModel, Utils, defaults;
    ObjectModel = require('modules/datasketch/canvas/objects/base/model');
    Utils = require('core/util/utils');
    defaults = {
      children: []
    };
    return GroupModel = (function(superClass) {
      extend(GroupModel, superClass);

      function GroupModel(config) {
        this.restoreState = bind(this.restoreState, this);
        this.cacheState = bind(this.cacheState, this);
        config.defaults = Utils.ensureDefaults(config.defaults, defaults);
        GroupModel.__super__.constructor.call(this, config);
      }

      GroupModel.prototype.cacheState = function() {
        var child, i, len, ref, results;
        GroupModel.__super__.cacheState.call(this);
        ref = this.get('children');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          results.push(child.cacheState());
        }
        return results;
      };

      GroupModel.prototype.restoreState = function() {
        var child, i, len, ref;
        ref = this.get('children');
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          child.restoreState();
        }
        return GroupModel.__super__.restoreState.call(this);
      };

      return GroupModel;

    })(ObjectModel);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/canvas/objects/group/model.js.map