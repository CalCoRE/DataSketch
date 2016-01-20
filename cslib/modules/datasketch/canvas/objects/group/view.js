(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var CanvasObjectView, Fabric, GroupView;
    CanvasObjectView = require('modules/datasketch/canvas/objects/base/view');
    Fabric = require('thirdparty/fabric');
    return GroupView = (function(superClass) {
      extend(GroupView, superClass);

      function GroupView(model) {
        this.buildFabric = bind(this.buildFabric, this);
        GroupView.__super__.constructor.call(this, model);
      }

      GroupView.prototype.buildFabric = function(model) {
        var bb, center, dims, fabric, i, j, len, len1, obj, old, ref, ref1, v;
        old = this._fabric;
        fabric = new Fabric.Group;
        fabric.originX = "center";
        fabric.originY = "center";
        center = null;
        dims = {
          left: null,
          right: null,
          top: null,
          bottom: null
        };
        ref = model.get('children');
        for (i = 0, len = ref.length; i < len; i++) {
          obj = ref[i];
          v = obj.getFabric();
          bb = v.getBoundingRect();
          dims.left = dims.left != null ? Math.min(bb.left, dims.left) : bb.left;
          dims.right = dims.right != null ? Math.max(bb.left + bb.width, dims.right) : bb.left + bb.width;
          dims.top = dims.top != null ? Math.min(bb.top, dims.top) : bb.top;
          dims.bottom = dims.bottom != null ? Math.max(bb.top + bb.height, dims.bottom) : bb.top + bb.height;
          fabric.addWithUpdate(v);
          if (v.canvas != null) {
            v.remove();
          }
        }
        if (center == null) {
          center = {
            x: (dims.left + dims.right) / 2,
            y: (dims.top + dims.bottom) / 2
          };
        }
        ref1 = model.get('children');
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          obj = ref1[j];
          obj.getFabric().setCoords();
        }
        fabric.set('id', model.get('id'));
        this.setFabric(fabric, model);
        return this.dispatchEvent("CanvasObject.FabricGenerated", {
          fabric: fabric,
          old_fabric: old
        });
      };

      return GroupView;

    })(CanvasObjectView);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/canvas/objects/group/view.js.map