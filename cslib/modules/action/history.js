(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var ActionHistory, EventDispatcher;
    EventDispatcher = require('core/event/dispatcher');
    return ActionHistory = (function(superClass) {
      extend(ActionHistory, superClass);

      function ActionHistory() {
        this.undo = bind(this.undo, this);
        this.execute = bind(this.execute, this);
        this._history = [];
      }

      ActionHistory.prototype.execute = function(action) {
        return action.execute().then((function(_this) {
          return function() {
            _this._history.push(action);
            return _this.dispatchEvent('ActionHistory.ActionAdded', {
              action: action
            });
          };
        })(this));
      };

      ActionHistory.prototype.undo = function() {
        var action;
        action = this._history.pop();
        return action.undo().then((function(_this) {
          return function() {
            return _this.dispatchEvent('ActionHistory.ActionUndone', {
              action: action
            });
          };
        })(this));
      };

      return ActionHistory;

    })(EventDispatcher);
  });

}).call(this);

//# sourceMappingURL=../../maps/modules/action/history.js.map