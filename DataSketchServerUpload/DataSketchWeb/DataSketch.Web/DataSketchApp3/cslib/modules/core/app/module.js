(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(function(require) {
    var EventDispatcher, Module, Utils;
    EventDispatcher = require('core/event/dispatcher');
    Utils = require('core/util/utils');
    return Module = (function(superClass) {
      extend(Module, superClass);

      function Module() {
        this.run = bind(this.run, this);
        this.init = bind(this.init, this);
        this.handlePreload = bind(this.handlePreload, this);
        this.listPreload = bind(this.listPreload, this);
        this.load = bind(this.load, this);
        return Module.__super__.constructor.apply(this, arguments);
      }

      Module.prototype.load = function() {
        return Utils.promiseRequire(this.listPreload()).then((function(_this) {
          return function(loaded) {
            return _this.handlePreload.apply(null, loaded);
          };
        })(this));
      };

      Module.prototype.listPreload = function() {
        return [];
      };

      Module.prototype.handlePreload = function() {};

      Module.prototype.init = function() {
        return Promise.resolve(true);
      };

      Module.prototype.run = function() {};

      return Module;

    })(EventDispatcher);
  });

}).call(this);

//# sourceMappingURL=../../../maps/modules/core/app/module.js.map
