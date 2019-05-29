(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var CanvasObjectView, CustomView, Fabric;
    CanvasObjectView = require('modules/datasketch/canvas/objects/base/view');
    Fabric = require('thirdparty/fabric');
    return CustomView = (function(superClass) {
      extend(CustomView, superClass);

      function CustomView(model) {
        this.cloneFabric = bind(this.cloneFabric, this);
        this.buildFabric = bind(this.buildFabric, this);
        this._onChange = bind(this._onChange, this);
        CustomView.__super__.constructor.call(this, model);
      }

      CustomView.prototype._onChange = function(evt) {
        var ref, ref1;
        CustomView.__super__._onChange.call(this, evt);
        switch (evt.data.path) {
          case "stroke.width":
            return (ref = this._fabric) != null ? ref.strokeWidth = evt.data.value : void 0;
          case "stroke.color":
            return (ref1 = this._fabric) != null ? ref1.stroke = evt.data.value : void 0;
        }
      };

      CustomView.prototype.buildFabric = function() {};

      CustomView.prototype.cloneFabric = function() {
        return new Promise((function(_this) {
          return function(resolve, reject) {
            return _this._fabric.clone(resolve);
          };
        })(this));
      };

      return CustomView;

    })(CanvasObjectView);
  });

}).call(this);

//# sourceMappingURL=../../../../../maps/modules/datasketch/canvas/objects/custom/view.js.map
