(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, StampingEffectAction;
    Action = require('modules/action/action');
    return StampingEffectAction = (function(superClass) {
      extend(StampingEffectAction, superClass);

      function StampingEffectAction(canvas, _objects, _isStamping) {
        this.canvas = canvas;
        this._objects = _objects;
        this._isStamping = _isStamping;
        this.execute = bind(this.execute, this);
      }

      StampingEffectAction.prototype.execute = function() {
        return this._objects._model._data.isStamping = $('#isStamp')[0].checked;
      };

      return StampingEffectAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/stamping_effect.js.map
