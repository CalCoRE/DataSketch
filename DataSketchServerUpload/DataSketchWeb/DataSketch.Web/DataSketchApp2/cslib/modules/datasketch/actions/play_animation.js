(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var Action, PlayAnimationAction;
    Action = require('modules/action/action');
    return PlayAnimationAction = (function(superClass) {
      extend(PlayAnimationAction, superClass);

      function PlayAnimationAction(_animator) {
        this._animator = _animator;
        this.undo = bind(this.undo, this);
        this.execute = bind(this.execute, this);
      }

      PlayAnimationAction.prototype.execute = function() {
        return new Promise((function(_this) {
          return function(resolve, reject) {
            _this._animator.reset();
            _this._animator.play();
            return resolve(true);
          };
        })(this));
      };

      PlayAnimationAction.prototype.undo = function() {};

      return PlayAnimationAction;

    })(Action);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/datasketch/actions/play_animation.js.map
