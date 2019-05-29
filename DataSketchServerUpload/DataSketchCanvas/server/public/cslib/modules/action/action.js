(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var Action;
    return Action = (function() {
      function Action() {
        this.undo = bind(this.undo, this);
        this.execute = bind(this.execute, this);
      }

      Action.prototype.execute = function() {
        return Promise.resolve(true);
      };

      Action.prototype.undo = function() {
        return Promise.resolve(true);
      };

      return Action;

    })();
  });

}).call(this);

//# sourceMappingURL=../../maps/modules/action/action.js.map
